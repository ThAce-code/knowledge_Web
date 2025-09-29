# Micu's Knowledge Hub

一个基于 React 和 Vite 构建的、以文件系统为核心的现代化个人知识库。它允许通过简单的 JSON 和 Markdown 文件来动态管理所有内容，无需数据库。

## ✨ 核心特性 (Features)

*   **动态内容管理**: 无需数据库，通过简单的 `JSON` 元数据和 `Markdown` 文件即可管理所有文章。
*   **高性能开发体验**: 基于 Vite，享受毫秒级的热更新和快速构建。
*   **组件化架构**: 使用 React 构建，代码结构清晰，易于维护和扩展。
*   **丰富 Markdown 支持**: 借助 `react-markdown` 及其插件，支持 GFM (GitHub Flavored Markdown)、自动生成目录、语法高亮和标题链接锚点。
*   **数学公式渲染**: 集成 KaTeX，支持 LaTeX 语法的数学公式渲染，包括行内公式 `$...$` 和块级公式 `$$...$$`。
*   **图片懒加载**: 自动优化图片加载性能，只有当图片进入视口时才开始加载，提升页面响应速度。
*   **图片自动优化**: 构建时自动压缩和优化图片资源，支持 WebP 格式转换。
*   **清晰的路由管理**: 使用 `react-router-dom` 实现客户端路由。

## 🛠️ 技术栈 (Tech Stack)

*   **框架**: [React](https://react.dev/)
*   **构建工具**: [Vite](https://vitejs.dev/)
*   **路由**: [React Router](https://reactrouter.com/)
*   **Markdown 渲染**: [React Markdown](https://github.com/remarkjs/react-markdown)
*   **数学公式**: [KaTeX](https://katex.org/) + [remark-math](https://github.com/remarkjs/remark-math)
*   **图片优化**: [vite-plugin-image-optimizer](https://github.com/FatehAK/vite-plugin-image-optimizer)
*   **样式**: CSS Modules / [Tailwind CSS](https://tailwindcss.com/)

## 📂 项目结构 (Project Structure)

```
web/
├── public/              # 静态资源
├── scripts/             # 自动化脚本
│   └── file-manager/
├── src/
│   ├── api/             # API 请求封装
│   ├── assets/          # 图片、SVG等资源
│   ├── components/      # 可复用的 UI 组件
│   ├── content/         # 核心内容目录 (所有文章和元数据)
│   │   ├── index.json   # 内容元数据索引
│   │   └── ...          # 各分类的 Markdown 文件
│   ├── contexts/        # React Contexts (全局状态管理)
│   ├── features/        # 功能模块 (按功能组织)
│   ├── hooks/           # 自定义 React Hooks
│   ├── pages/           # 页面级组件
│   └── styles/          # 全局样式和CSS模块
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 快速开始 (Getting Started)

请按照以下步骤在本地运行项目：

1.  **克隆项目**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **启动开发服务**
    ```bash
    npm run dev
    ```

4.  **访问项目**
    在浏览器中打开 Vite 提供的本地地址 (通常是 `http://localhost:5173`)。

## ✍️ 如何贡献内容 (Content Contribution)

本项目的内容管理完全基于文件系统，添加一篇新文章非常简单：

1.  **创建 Markdown 文件**
    在 `src/content/` 下找到或创建一个合适的分类目录（例如 `programming`），然后在该目录中创建一个新的 `.md` 文件（例如 `new-article.md`）。

2.  **撰写文章内容**
    在新创建的 `.md` 文件中，使用 Markdown 语法撰写您的文章。

3.  **更新元数据索引**
    打开 `src/content/index.json` 文件，在对应分类的 `articles` 对象中，添加新文章的元数据。**键名**必须是您的**文件名（不含 `.md` 后缀）**。

    **示例**:
    ```json
    "programming": {
      "title": "编程技术",
      "description": "编程语言和开发技术深度解析",
      "articles": {
        // ... 其他文章
        "new-article": {
          "title": "我的新文章标题",
          "description": "这是新文章的简短描述。",
          "author": "你的名字",
          "date": "2025-09-28",
          "tags": ["React", "Vite", "Web开发"],
          "readTime": "10分钟"
        }
      }
    }
    ```

完成以上步骤后，重新启动或刷新页面，您的新文章将自动出现在网站上。

## 🧮 数学公式与图片功能 (Math & Images)

### 数学公式渲染

本项目集成了 KaTeX，支持 LaTeX 语法的数学公式渲染：

*   **行内公式**: 使用单个美元符号包围，例如 `$E = mc^2$` 会渲染为 $E = mc^2$
*   **块级公式**: 使用双美元符号包围，例如：
    ```latex
    $$\int_{a}^{b} f(x) dx = F(b) - F(a)$$
    ```

**支持的数学符号**:
*   希腊字母: `\alpha`, `\beta`, `\gamma`, `\pi`, `\sigma` 等
*   运算符: `\times`, `\div`, `\pm`, `\neq`, `\leq`, `\geq` 等
*   函数: `\sin`, `\cos`, `\log`, `\ln`, `\sqrt{}`, `\frac{}{}` 等
*   矩阵: `\begin{pmatrix}...\end{pmatrix}`, `\begin{bmatrix}...\end{bmatrix}` 等

### 图片懒加载与优化

*   **懒加载**: 图片只有在进入用户视口时才开始加载，大大提升页面性能
*   **自动优化**: 构建时自动压缩图片并生成 WebP 格式
*   **错误处理**: 当图片加载失败时，显示友好的错误提示
*   **响应式**: 图片在不同设备上自动适配

**图片引用方式**:
```markdown
![图片描述](./relative/path/to/image.jpg)
![网络图片](https://example.com/image.png)
```

### 功能演示

查看 `src/content/programming/math-demo.md` 文件，了解数学公式和图片功能的完整演示。

## 📜 可用脚本 (Available Scripts)

在项目目录中，您可以运行以下脚本：

*   `npm run dev`
    启动开发服务器，支持热更新。

*   `npm run build`
    将项目打包为用于生产环境的静态文件，输出到 `dist` 目录。

*   `npm run lint`
    使用 ESLint 检查代码中的语法和风格问题。

*   `npm run preview`
    在本地启动一个静态服务器，预览生产构建后的应用。