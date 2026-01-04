# 嵌入式知识库 - Embedded Wiki

基于 **React Router v7** + **Static Site Generation (SSG)** 构建的现代化知识库系统，采用 Apple 风格设计，支持完全静态部署。

[![React Router](https://img.shields.io/badge/React_Router-v7.11-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel&logoColor=white)](https://vercel.com)

## ✨ 项目特点

- 🎨 **Apple 风格 UI** - 轻盈明亮的香槟金配色，简洁优雅
- ⚡ **极速加载** - 完全静态预渲染，首屏秒开
- 📝 **Markdown 驱动** - 内容即代码，Git 版本控制
- 🔍 **完美 SEO** - 每个页面都是完整的 HTML
- 🚀 **零成本部署** - 纯静态文件，无需服务器
- 🛠️ **现代化技术栈** - React Router v7 + Tailwind CSS 4.x
- 📱 **响应式设计** - 完美适配桌面和移动端
- 🎯 **TypeScript** - 类型安全，开发体验优秀
- 📥 **资源下载中心** - 代码示例、开发工具一键下载

## 🚀 快速开始

### 环境要求

- Node.js 18.x 或 20.x
- npm 或 pnpm

### 安装依赖

```bash
cd embedded-wiki
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173/ 查看效果

### 构建生产版本

```bash
npm run build
```

生成的静态文件位于 `build/client/` 目录，可直接部署到任何静态托管服务。

### 类型检查

```bash
npm run typecheck
```

## 📁 项目结构

```
embedded-wiki/
├── app/                           # React Router 应用目录
│   ├── routes/                    # 路由文件
│   │   ├── _index.tsx            # 首页（/ ）
│   │   ├── article.$category.$slug.tsx  # 文章详情页
│   │   ├── category.$category.tsx       # 分类页
│   │   ├── downloads.tsx         # 资源下载页
│   │   └── search.tsx            # 搜索页
│   ├── components/                # UI 组件
│   │   ├── ui/                   # shadcn/ui 组件
│   │   ├── AnimatedButton.tsx    # 动画按钮
│   │   ├── ClickSpark.tsx        # 点击粒子效果
│   │   ├── GradientText.tsx      # 渐变文字
│   │   ├── ShinyText.tsx         # 光泽动画文字
│   │   ├── Modal.tsx             # 模态框
│   │   ├── TocSidebar.tsx        # 文章目录侧边栏
│   │   ├── BackToTopButton.tsx   # 回到顶部按钮
│   │   └── CodeBlockEnhancer.tsx # 代码块增强（复制按钮）
│   ├── lib/                       # 核心工具
│   │   ├── markdown.ts           # Markdown 处理
│   │   ├── categories.ts         # 分类配置
│   │   ├── downloads.ts          # 下载资源管理
│   │   ├── search.ts             # 搜索功能（Fuse.js）
│   │   └── utils.ts              # 工具函数
│   ├── hooks/                     # 自定义 Hooks
│   │   └── useScrollSpy.ts       # 滚动监听（TOC 高亮）
│   ├── root.tsx                   # 根组件
│   ├── routes.ts                  # 路由配置
│   ├── entry.client.tsx           # 客户端入口
│   ├── entry.server.tsx           # 服务端入口（预渲染）
│   └── index.css                  # 全局样式（Tailwind 4.x）
├── content/                       # Markdown 内容源文件
│   ├── announcements/            # 公告
│   ├── c-language/               # C/C++ 教程
│   ├── microcontroller/          # 单片机教程
│   ├── ai-tools/                 # AI 工具教程
│   ├── linux/                    # Linux 教程
│   ├── python/                   # Python 教程
│   └── other/                    # 其他分类
├── public/                        # 静态资源
│   ├── downloads/                # 下载资源（.zip 文件）
│   │   ├── code-samples/         # 代码示例
│   │   ├── software/             # 推荐软件
│   │   └── other/                # 其他资源
│   ├── icons/                    # 图标（SVG）
│   ├── images/                   # 文章图片
│   └── logo.png                  # 站点 Logo
├── react-router.config.ts         # React Router 配置（预渲染）
├── vercel.json                    # Vercel 部署配置
├── tailwind.config.js             # Tailwind 配置
├── tsconfig.json                  # TypeScript 配置
└── package.json
```

## 📝 内容管理

### 添加新文章

1. 在 `content/{分类名}/` 目录下创建 `.md` 文件
2. 添加 Front Matter 元数据：

```yaml
---
title: "文章标题"
date: 2024-01-20
author: "作者名"
category: "分类名"
tags: ["标签1", "标签2"]
description: "文章简介"
---

# 文章内容

这里是 Markdown 正文...
```

3. 运行 `npm run build` 即可自动生成静态页面

### 支持的 Markdown 功能

- ✅ **GitHub Flavored Markdown** - 表格、删除线、任务列表等
- ✅ **代码高亮** - 支持多种编程语言，VS Code Dark+ 主题
- ✅ **数学公式** - KaTeX 渲染，支持行内 `$...$` 和块级 `$$...$$`
- ✅ **自动目录** - H2/H3 标题自动生成 TOC
- ✅ **标题链接** - 所有标题自动添加 ID，可直接链接

### 分类配置

在 `app/lib/categories.ts` 中配置分类和标签：

```typescript
const CATEGORIES = {
  'c-language': { name: 'C/C++', description: 'C/C++语言相关文章' },
  microcontroller: { name: '单片机', description: '单片机相关文章' },
  'ai-tools': { name: 'AI & TOOLS', description: 'AI工具相关文章' },
  downloads: { name: 'DOWNLOAD', description: '资源下载' },  // 特殊分类，重定向到 /downloads
  // ... 更多分类
};

const PREDEFINED_TAGS = [
  'AI', '51单片机', '32单片机', '教程', 'C语言', 'C++',
  'Python', 'Linux', '基础', '进阶', '电子扫盲'
];
```

### 添加下载资源

1. 准备 `.zip` 文件并放入 `public/downloads/{category}/` 目录
2. 在 `app/lib/downloads.ts` 中添加资源元数据：

```typescript
{
  id: 'stm32-template',
  name: 'STM32 项目模板',
  description: 'STM32CubeMX + HAL库 + FreeRTOS 项目模板',
  category: 'code-samples',
  filePath: 'code-samples/stm32-template.zip',
  fileSize: '18.1 MB',
  version: 'v1.0',
  tags: ['STM32', 'HAL', 'FreeRTOS'],
  lastUpdated: '2026-01-04'
}
```

3. 用户访问 `/downloads` 页面即可浏览和下载资源

## 🎨 UI 设计系统

### Apple 风格配色

项目使用 Tailwind CSS 4.x 的 `@theme` 指令定义主题（在 `app/index.css` 中）：

```css
@theme {
  /* 主色调 - Apple 蓝 */
  --color-primary-blue: #007AFF;

  /* 背景色 - 香槟金系列 */
  --color-bg-primary: #FDFBF7;
  --color-card-champagne: #F4E8D8;
  --color-card-gold-accent: #D4AF76;

  /* 文字颜色 */
  --color-text-primary: #1D1D1F;
  --color-text-secondary: #86868B;

  /* 代码编辑器 */
  --color-bg-code-editor: #1E1E1E;
  --color-bg-code-editor-titlebar: #323233;
  --color-code-text: #D4D4D4;
}
```

**香槟金主题配色**（用于下载页面和特殊组件）：
- 深香槟金渐变：`#B8965F` → `#9A7E4F`（按钮激活状态）
- 浅香槟金边框：`#E8D5B8`（卡片边框）
- 金色强调：`#D4AF76`（悬停边框、点击粒子）
- 背景色：`#F9F4EE`（按钮悬停背景）

### 自定义动画组件

项目包含多个自定义动画组件：

- **ShinyText** - 流动光泽效果文字（Logo）
- **GradientText** - 动态渐变文字（"MORE →"）
- **ClickSpark** - 点击粒子效果（全局包裹）
- **AnimatedButton** - 悬停动画按钮

### shadcn/ui 集成

通过 MCP (Model Context Protocol) 集成 shadcn/ui，支持自然语言安装组件：

```bash
# Claude Code 中直接使用自然语言
"Add a Button component from shadcn"
"Install a Card component"
```

组件安装到 `app/components/ui/`，自动配置 Tailwind 样式。

## 🏗️ 技术架构

### 核心功能

**文章系统**：
- 分类浏览：侧边栏显示前 5 个分类（全部、C/C++、单片机、AI & TOOLS、DOWNLOAD）+ MORE 按钮
- 标签过滤：每个分类页面支持标签筛选
- 分页导航：每页 6 篇文章，保持状态参数
- 目录导航：文章页面左侧自动生成 TOC，支持滚动高亮
- 代码高亮：VS Code Dark+ 主题，支持一键复制

**资源下载**：
- 分类管理：代码示例、推荐软件、其他资源
- 分页显示：每页 6 个资源卡片
- 分类筛选：按钮式分类过滤，香槟金主题
- 文件信息：显示版本号、文件大小、标签、更新时间
- 一键下载：原生 `<a download>` 属性，无需后端

**搜索功能**：
- Fuse.js 模糊搜索，支持标题、描述、标签
- 实时结果显示，高亮匹配关键词

### SSG 工作流程

```
构建时（npm run build）
    ↓
1. 扫描 content/ 目录所有 Markdown 文件
    ↓
2. react-router.config.ts 生成路由列表
   （包括所有文章、分类页、下载页、搜索页）
    ↓
3. 执行每个 loader 函数加载数据
    ↓
4. 预渲染所有路由为静态 HTML + .data 文件
    ↓
5. 生成到 build/client/ 目录
   （public/ 文件夹内容自动复制，包括下载资源）
    ↓
部署后（用户访问）
    ↓
直接返回完整 HTML（极速加载！）
```

### 关键配置

**react-router.config.ts** - SSG 配置：

```typescript
export default {
  // 禁用运行时 SSR，启用纯静态部署
  ssr: false,

  // 预渲染所有路由
  async prerender() {
    // 自动扫描 Markdown 文件生成路由列表
    return [
      "/",                    // 首页
      "/downloads",           // 下载页
      "/search",              // 搜索页
      "/article/...",         // 所有文章
      "/category/...",        // 所有分类
    ];
  },
} satisfies Config;
```

**vercel.json** - Vercel 部署配置：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build/client"
}
```

## 📦 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React Router | v7.11 | 框架 + SSG |
| React | 19.2 | UI 库 |
| TypeScript | 5.9 | 类型系统 |
| Vite | 7.2 | 构建工具 |
| Tailwind CSS | 4.1 | 样式框架 |
| gray-matter | 4.0 | Front Matter 解析 |
| remark / rehype | 15.x | Markdown 处理 |
| rehype-highlight | 7.0 | 代码高亮 |
| rehype-katex | 7.0 | 数学公式渲染 |
| Fuse.js | 7.1 | 模糊搜索 |
| GSAP | 3.14 | 动画库 |
| lucide-react | 0.562 | 图标库 |

## 🚢 部署

### Vercel（推荐）

**自动部署**：
1. Fork 本仓库
2. 在 Vercel 中导入项目
3. Vercel 自动检测配置并部署

**手动部署**：
```bash
npm install -g vercel
vercel
```

**配置要点**：
- Build Command: `npm run build`
- Output Directory: `build/client`
- Framework Preset: `Other` 或 `Vite`（不要选 React Router）

### Netlify

**netlify.toml** 配置：

```toml
[build]
  command = "npm run build"
  publish = "build/client"
```

### GitHub Pages

使用 GitHub Actions 自动部署：

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build/client
```

## 📄 许可证

MIT License

---

**基于 React Router v7 Framework 构建** - 现代化的静态站点生成方案 🚀
