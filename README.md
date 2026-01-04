# 嵌入式知识库项目

基于 **React Router v7 框架** + Vite + TypeScript + Tailwind CSS 构建的现代化静态站点生成（SSG）知识库系统。

## 🎉 重大升级：迁移到 React Router v7 框架

项目已成功迁移到 React Router v7 框架模式，获得以下优势：
- ✅ **内置 SSG**：自动静态预渲染，极速加载
- ✅ **完美 SEO**：每个页面都是完整的 HTML
- ✅ **自动路由**：基于文件系统的路由约定
- ✅ **数据加载**：loader 函数在构建时执行
- ✅ **零配置**：无需手写构建脚本

## 项目结构

```
embedded-wiki/
├── app/                        # React Router 应用目录
│   ├── routes/                 # 路由文件（自动生成路由）
│   │   ├── _index.tsx         # 首页 → /
│   │   └── article.$category.$slug.tsx  # 文章详情 → /article/:category/:slug
│   ├── components/             # UI组件
│   ├── lib/                    # 核心功能
│   │   └── markdown.ts        # Markdown处理工具
│   ├── root.tsx               # 根组件
│   ├── routes.ts              # 路由配置
│   ├── entry.client.tsx       # 客户端入口
│   ├── entry.server.tsx       # 服务端入口（预渲染用）
│   └── index.css              # 全局样式（Tailwind 4.x）
├── content/                    # Markdown内容源文件
│   ├── c-language/            # C语言教程
│   │   └── pointers.md
│   ├── microcontroller/       # 单片机教程
│   │   └── stm32-intro.md
│   ├── ai-tools/              # AI工具教程
│   │   └── chatgpt-guide.md
│   └── other/                 # 其他分类
├── public/                     # 公共资源
├── react-router.config.ts     # React Router 配置
├── vite.config.ts             # Vite 配置
├── tailwind.config.js         # Tailwind 配置
└── package.json
```

## 已完成工作 ✅

### Phase 1: 框架迁移完成

1. **React Router v7 框架集成**
   - ✅ 安装 @react-router/dev 和 @react-router/node
   - ✅ 配置 SSG 模式 (ssr: false, prerender: true)
   - ✅ 创建完整的 app 目录结构
   - ✅ 实现自动路由系统

2. **核心功能实现**
   - ✅ Markdown 加载和解析工具
   - ✅ 首页路由（展示最新5篇文章）
   - ✅ 文章详情页路由（动态参数）
   - ✅ 构建时数据加载（loader 函数）

3. **Tailwind CSS 4.x 配置**
   - ✅ 使用新的 `@import "tailwindcss"` 语法
   - ✅ `@theme` 块定义 Apple 风格主题
   - ✅ CSS 变量配置（`--color-*`）
   - ✅ @tailwindcss/postcss 插件

4. **示例内容**
   - ✅ 3篇完整的 Markdown 示例文章
   - ✅ 4个内容分类目录

## 快速开始

### 开发模式
```bash
cd embedded-wiki
npm run dev
```
然后访问 http://localhost:5173/

### 构建生产版本（带预渲染）
```bash
npm run build
```
这将生成：
- `build/client/` - 静态 HTML 和资源
- 每个页面都是完整的 HTML 文件（SEO 友好）

### 类型检查
```bash
npm run typecheck
```

## SSG 工作原理

```
构建时（npm run build）
    ↓
扫描所有路由和 Markdown 文件
    ↓
执行每个 loader 函数加载数据
    ↓
预渲染所有页面为完整的 HTML
    ↓
生成到 build/client/
    ↓
部署（用户访问）
    ↓
直接返回完整 HTML（极速！）
```

## Apple风格配色

在 `app/index.css` 中使用 `@theme` 块定义：

```css
@theme {
  --color-primary-blue: #007AFF     /* 苹果蓝 */
  --color-bg-secondary: #F5F5F7     /* 卡片背景 */
  --color-text-primary: #1D1D1F     /* 主文字 */
  --color-accent-green: #34C759     /* 成功标签 */
  ...
}
```

使用时：
```tsx
<div className="bg-bg-secondary text-text-primary">
  <button className="bg-primary-blue text-white">
    按钮
  </button>
</div>
```

## 示例文章

已创建3篇高质量示例文章：

1. **STM32入门教程** (`content/microcontroller/stm32-intro.md`)
   - 访问路径: `/article/microcontroller/stm32-intro`

2. **C语言指针详解** (`content/c-language/pointers.md`)
   - 访问路径: `/article/c-language/pointers`

3. **ChatGPT使用指南** (`content/ai-tools/chatgpt-guide.md`)
   - 访问路径: `/article/ai-tools/chatgpt-guide`

## 添加新文章

1. 在 `content/分类名/` 目录下创建 `.md` 文件
2. 添加 Front Matter：
```yaml
---
title: "文章标题"
date: 2024-01-20
author: "作者名"
category: "分类名"
tags: ["标签1", "标签2"]
description: "文章描述"
---
```
3. 编写 Markdown 内容
4. 运行 `npm run dev` 或 `npm run build` 即可自动生成页面

## 技术栈

- **框架**: React Router v7（框架模式）
- **运行时**: React 19.2 + TypeScript
- **构建工具**: Vite 7.2
- **样式**: Tailwind CSS 4.1 (Apple风格)
- **Markdown**: gray-matter + remark + remark-html
- **搜索**: Fuse.js 7.1（待实现）
- **部署**: 完全静态，可部署到任何地方

## 项目特点

- 🎨 **Apple风格设计**：轻松明亮的配色，简洁优雅
- 📝 **Markdown管理**：内容即代码，Git版本控制
- ⚡ **极速加载**：SSG预渲染，首屏秒开
- 🔍 **SEO完美**：每个页面都是完整的HTML
- 🚀 **部署简单**：纯静态文件，Vercel/Netlify一键部署
- 💰 **零成本**：无需服务器，完全免费
- 🛠️ **现代化**：React Router v7 + Tailwind CSS 4.x 最新技术栈
- 📦 **类型安全**：TypeScript全覆盖

## 下一步开发

- [ ] 实现分类列表页
- [ ] 实现全站搜索功能
- [ ] 添加文章标签页
- [ ] 实现文章目录（TOC）导航
- [ ] 添加代码高亮主题
- [ ] 完善移动端响应式
- [ ] 添加暗色模式
- [ ] 实现 RSS 订阅

## 部署

### Vercel（推荐）
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
# 构建命令
npm run build

# 发布目录
build/client
```

### GitHub Pages
参考 React Router 文档配置 GitHub Actions 自动部署

## 许可证

MIT

---

**基于 React Router v7 框架构建** - 现代化的静态站点生成方案 🚀
