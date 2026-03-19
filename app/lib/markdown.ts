import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
  children?: TocItem[];
}

export interface Article {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  description: string;
  content: string;
  htmlContent: string;
  toc: TocItem[];
  icon?: string;
  important?: boolean;
}

export interface Announcement {
  id: number;
  slug: string;
  title: string;
  date: string;
  content: string;
  htmlContent: string;
}

// 获取内容目录路径
const contentDir = path.join(process.cwd(), 'content');

/**
 * 从 AST 中提取目录（TOC）
 * 递归提取所有文本内容，支持嵌套元素
 */
function extractTextFromNode(node: any): string {
  if (!node) return '';

  if (node.type === 'text') {
    return node.value || '';
  }

  if (node.children && Array.isArray(node.children)) {
    return node.children.map((child: any) => extractTextFromNode(child)).join('');
  }

  return '';
}

function extractToc(tree: any): TocItem[] {
  const toc: TocItem[] = [];
  let currentH2: TocItem | null = null;

  visit(tree, 'element', (node: any) => {
    if (node.tagName === 'h2' || node.tagName === 'h3') {
      // 递归提取所有文本内容（包括嵌套在 code、strong 等元素中的文本）
      const text = extractTextFromNode(node).trim();

      // 跳过空标题
      if (!text) return;

      const id = node.properties?.id || '';
      const level = node.tagName === 'h2' ? 2 : 3;
      const item: TocItem = { id, text, level };

      if (level === 2) {
        // H2 作为顶层项
        currentH2 = item;
        item.children = [];
        toc.push(item);
      } else if (level === 3 && currentH2) {
        // H3 作为 H2 的子项
        currentH2.children!.push(item);
      }
    }
  });

  return toc;
}

/**
 * 获取所有文章
 */
export async function getAllArticles(): Promise<Article[]> {
  const articles: Article[] = [];
  const categories = fs.readdirSync(contentDir);

  for (const category of categories) {
    // 跳过 announcements 目录
    if (category === 'announcements') continue;

    const categoryPath = path.join(contentDir, category);
    const stat = fs.statSync(categoryPath);

    if (stat.isDirectory()) {
      const files = fs.readdirSync(categoryPath);

      for (const file of files) {
        if (file.endsWith('.md')) {
          const slug = file.replace(/\.md$/, '');
          const article = await getArticleBySlug(category, slug);
          if (article) {
            articles.push(article);
          }
        }
      }
    }
  }

  // 按日期排序
  return articles.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * 根据 slug 获取文章
 */
export async function getArticleBySlug(
  category: string,
  slug: string
): Promise<Article | null> {
  try {
    const filePath = path.join(contentDir, category, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // 动态导入 remark-rehype 以解决 ESM 兼容性问题
    const { default: remarkRehypePlugin } = await import('remark-rehype');

    // 使用 unified 处理链：Markdown → HTML with GFM tables + syntax highlighting + math + TOC
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)               // GitHub Flavored Markdown（表格、删除线、任务列表等）
      .use(remarkMath)              // 解析 LaTeX 数学语法 ($inline$ 和 $$display$$)
      .use(remarkRehypePlugin, { allowDangerousHtml: true })
      .use(rehypeSlug)
      .use(rehypeHighlight)
      .use(rehypeKatex)             // 渲染数学公式为 KaTeX HTML
      .use(rehypeStringify, { allowDangerousHtml: true });

    const ast = processor.parse(content);
    const tree = await processor.run(ast);
    const htmlContent = processor.stringify(tree);

    // 从 AST 中提取 TOC
    const toc = extractToc(tree);

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      author: data.author || 'Anonymous',
      category,
      tags: data.tags || [],
      description: data.description || '',
      content,
      htmlContent: String(htmlContent),
      toc,
      icon: data.icon || undefined,
      important: data.important || false,
    };
  } catch (error) {
    console.error(`Error loading article ${category}/${slug}:`, error);
    return null;
  }
}

/**
 * 获取分类下的所有文章
 */
export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter(article => article.category === category);
}

/**
 * 获取所有分类
 */
export function getAllCategories(): string[] {
  return fs.readdirSync(contentDir).filter(item => {
    // 跳过 announcements 目录
    if (item === 'announcements') return false;

    const stat = fs.statSync(path.join(contentDir, item));
    return stat.isDirectory();
  });
}

/**
 * 获取所有公告（按日期倒序）
 */
export async function getAllAnnouncements(): Promise<Announcement[]> {
  try {
    const announcementsDir = path.join(contentDir, 'announcements');
    const files = fs.readdirSync(announcementsDir);
    const announcements: Announcement[] = [];

    const { default: remarkRehypePlugin } = await import('remark-rehype');

    for (const file of files) {
      if (file.endsWith('.md')) {
        const slug = file.replace(/\.md$/, '');
        const filePath = path.join(announcementsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        const processor = unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkRehypePlugin, { allowDangerousHtml: true })
          .use(rehypeStringify, { allowDangerousHtml: true });

        const htmlContent = String(await processor.process(content.trim()));

        announcements.push({
          id: announcements.length + 1,
          slug,
          title: data.title || slug,
          date: data.date || new Date().toISOString(),
          content: content.trim(),
          htmlContent,
        });
      }
    }

    // 按日期倒序排列（最新的在前面）
    return announcements.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error loading announcements:', error);
    return [];
  }
}

/**
 * 获取最新的N条公告
 */
export async function getLatestAnnouncements(limit: number = 4): Promise<Announcement[]> {
  const announcements = await getAllAnnouncements();
  return announcements.slice(0, limit);
}
