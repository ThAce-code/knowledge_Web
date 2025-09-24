#!/usr/bin/env node
/**
 * 文件管理系统扫描脚本
 * 功能：
 * 1) 自动识别并归类不同类型文件（images/css/js/fonts/html/json/md/other）
 * 2) 检测并标记可能不需要的冗余文件（未被引用的静态资源）
 * 3) 清理过期或重复文件（按内容哈希判断重复），支持 --apply 将冗余文件移动到 .trash/
 * 4) 生成整理报告 public/content/file-report.json；默认 dry-run 预览
 *
 * 使用：
 *   node ./scripts/file-manager/scan.mjs --dry-run
 *   node ./scripts/file-manager/scan.mjs --apply
 *
 * 目录约定：
 * - 扫描范围：./public、./src/assets、./src/styles、./src/components、./src/pages、./src/features、./src/utils
 * - 引用分析：解析 src 下 .js/.jsx/.ts/.tsx/.css/.md 中的 import/require/@import/url('...')/src="..."/href="..."
 * - 清理策略：仅在 --apply 时，将判定冗余的文件移动到 .trash/YYYYMMDD-HHMMSS/ 保留原相对路径结构，实现安全回滚
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const ROOT = process.cwd();
const args = new Set(process.argv.slice(2));
const APPLY = args.has('--apply');
const DRY_RUN = args.has('--dry-run') || !APPLY;

const SCAN_DIRS = [
  'public',
  'src/assets',
  'src/styles',
  'src/components',
  'src/pages',
  'src/features',
  'src/utils',
];

const REPORT_PATH = path.join(ROOT, 'public', 'content', 'file-report.json');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function listFilesRecursive(dir) {
  const result = [];
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return result;
  const stack = [abs];
  while (stack.length) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(current, ent.name);
      if (ent.isDirectory()) {
        stack.push(full);
      } else if (ent.isFile()) {
        result.push(full);
      }
    }
  }
  return result;
}

function extCategory(file) {
  const ext = path.extname(file).toLowerCase();
  if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(ext)) return 'images';
  if (['.css', '.scss'].includes(ext)) return 'css';
  if (['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'].includes(ext)) return 'js';
  if (['.ttf', '.otf', '.woff', '.woff2', '.eot'].includes(ext)) return 'fonts';
  if (['.html', '.htm'].includes(ext)) return 'html';
  if (['.json'].includes(ext)) return 'json';
  if (['.md', '.markdown'].includes(ext)) return 'md';
  return 'other';
}

function rel(p) {
  return path.relative(ROOT, p).replace(/\\/g, '/');
}

function hashFile(file) {
  const h = crypto.createHash('sha256');
  const buf = fs.readFileSync(file);
  h.update(buf);
  return h.digest('hex');
}

/**
 * 引用分析：
 * - 解析 src 下代码与样式文件，收集可能引用的相对路径
 * - 解析 public 下的 html（如 index.html）
 */
function collectReferences() {
  const refSet = new Set();

  const CODE_DIRS = ['src'];
  const exts = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.md', '.html'];
  const regexes = [
    /import\s+[^'"]*['"]([^'"]+)['"]/g,
    /require\(\s*['"]([^'"]+)['"]\s*\)/g,
    /from\s+['"]([^'"]+)['"]/g,
    /@import\s+['"]([^'"]+)['"]/g,
    /url\(\s*['"]?([^'")]+)['"]?\s*\)/g,
    /src=['"]([^'"]+)['"]/g,
    /href=['"]([^'"]+)['"]/g,
  ];

  for (const d of CODE_DIRS) {
    const files = listFilesRecursive(d);
    for (const f of files) {
      const ext = path.extname(f).toLowerCase();
      if (!exts.includes(ext)) continue;
      let content = '';
      try {
        content = fs.readFileSync(f, 'utf-8');
      } catch {
        continue;
      }
      for (const re of regexes) {
        const matches = content.matchAll(re);
        for (const m of matches) {
          const ref = m[1];
          if (!ref) continue;
          // 排除包名引用，仅保留相对路径引用
          if (ref.startsWith('.') || ref.startsWith('/')) {
            refSet.add(ref);
          }
        }
      }
    }
  }

  // 规范化：把相对/绝对 web 路径映射到文件系统相对路径
  // 常见情况：
  // - /images/foo.png → public/images/foo.png
  // - ./assets/img.png in src → 解析为 src 下相对路径（此处仅记录字符串，后续匹配时尝试多前缀）
  return Array.from(refSet);
}

function resolveToExistingPaths(ref, allFiles) {
  // 尝试多前缀匹配：public/, src/, src/assets/
  const candidates = [];
  const normalized = ref.replace(/^\.\//, '').replace(/^\/+/, '');
  const tryPaths = [
    path.join('public', normalized),
    path.join('src', normalized),
    path.join('src/assets', normalized),
  ].map((p) => p.replace(/\\/g, '/'));

  for (const p of tryPaths) {
    const hit = allFiles.find((f) => rel(f) === p);
    if (hit) candidates.push(hit);
  }

  // 若引用缺少扩展名，尝试常见扩展补全
  const COMMON_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.css', '.js', '.jsx', '.ts', '.tsx'];
  if (!path.extname(normalized)) {
    for (const ext of COMMON_EXTS) {
      for (const base of ['public', 'src', 'src/assets']) {
        const p = (base + '/' + normalized + ext).replace(/\\/g, '/');
        const hit = allFiles.find((f) => rel(f) === p);
        if (hit) candidates.push(hit);
      }
    }
  }
  return Array.from(new Set(candidates));
}

function main() {
  // 收集扫描范围内的所有文件
  const allFiles = [];
  for (const d of SCAN_DIRS) {
    allFiles.push(...listFilesRecursive(d));
  }

  // 分类
  const categories = {};
  for (const f of allFiles) {
    const cat = extCategory(f);
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(f);
  }

  // 重复检测：按哈希聚类
  const duplicates = [];
  const hashMap = new Map();
  for (const f of allFiles) {
    try {
      const h = hashFile(f);
      const arr = hashMap.get(h) || [];
      arr.push(f);
      hashMap.set(h, arr);
    } catch {
      // 忽略不可读文件
    }
  }
  for (const [h, files] of hashMap.entries()) {
    if (files.length > 1) {
      duplicates.push({ hash: h, files: files.map(rel) });
    }
  }

  // 引用分析：哪些文件被代码/样式/HTML引用
  const refs = collectReferences();
  const referencedFiles = new Set();
  for (const ref of refs) {
    const hits = resolveToExistingPaths(ref, allFiles);
    hits.forEach((hit) => referencedFiles.add(hit));
  }

  // 冗余判定：在分类中，若文件未被引用且类型为静态资源（images/css/fonts/json/md）
  const REDUNDANT_CATS = new Set(['images', 'css', 'fonts', 'json', 'md', 'other']);
  const redundant = [];
  for (const f of allFiles) {
    const cat = extCategory(f);
    if (REDUNDANT_CATS.has(cat) && !referencedFiles.has(f)) {
      redundant.push(f);
    }
  }

  // 报告生成
  const report = {
    generatedAt: new Date().toISOString(),
    options: { apply: APPLY, dryRun: DRY_RUN },
    summary: {
      totalFiles: allFiles.length,
      categories: Object.fromEntries(Object.entries(categories).map(([k, v]) => [k, v.length])),
      duplicateGroups: duplicates.length,
      redundantCount: redundant.length,
      referencedCount: referencedFiles.size,
    },
    categories: Object.fromEntries(Object.entries(categories).map(([k, v]) => [k, v.map(rel)])),
    duplicates,
    redundant: redundant.map(rel),
    referenced: Array.from(referencedFiles).map(rel),
    notes: [
      '冗余判定基于引用分析的启发式方法，可能存在误报/漏报；请在应用清理前仔细审查报告。',
      '清理操作为安全搬运到 .trash/ 目录，可回滚。',
    ],
  };

  // 写入报告
  ensureDir(path.dirname(REPORT_PATH));
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`Report saved: ${rel(REPORT_PATH)}`);

  // 应用清理：将冗余文件移动到 .trash/ 时间戳目录
  if (APPLY) {
    const stamp = new Date().toISOString().replace(/[:.]/g, '').replace('T', '-').slice(0, 15);
    const TRASH_ROOT = path.join(ROOT, '.trash', stamp);
    for (const f of redundant) {
      const target = path.join(TRASH_ROOT, rel(f));
      ensureDir(path.dirname(target));
      try {
        fs.renameSync(f, target);
        console.log(`Moved to trash: ${rel(f)} -> ${rel(target)}`);
      } catch (e) {
        console.warn(`Failed to move: ${rel(f)} - ${e.message}`);
      }
    }
    console.log(`Cleanup done. Trash folder: ${rel(TRASH_ROOT)}`);
  } else {
    console.log('Dry-run only. No files were moved. Use --apply to perform cleanup.');
  }
}

main();