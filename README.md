# Micu's Knowledge Hub

一个基于 React 和 Vite 构建的、以文件系统为核心的现代化个人知识库。它允许通过简单的 JSON 和 Markdown 文件来动态管理所有内容，无需数据库。

## ✨ 核心特性 (Features)

*   **动态内容管理**: 无需数据库，通过简单的 `JSON` 元数据和 `Markdown` 文件即可管理所有文章。
*   **高性能开发体验**: 基于 Vite，享受毫秒级的热更新和快速构建。
*   **组件化架构**: 使用 React 构建，代码结构清晰，易于维护和扩展。
*   **丰富 Markdown 支持**: 借助 `react-markdown` 及其插件，支持 GFM (GitHub Flavored Markdown)、自动生成目录、语法高亮和标题链接锚点。
*   **清晰的路由管理**: 使用 `react-router-dom` 实现客户端路由。

## 🛠️ 技术栈 (Tech Stack)

*   **框架**: [React](https://react.dev/)
*   **构建工具**: [Vite](https://vitejs.dev/)
*   **路由**: [React Router](https://reactrouter.com/)
*   **Markdown 渲染**: [React Markdown](https://github.com/remarkjs/react-markdown)
*   **样式**: CSS Modules / [Tailwind CSS](https://tailwindcss.com/) (集成中)

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