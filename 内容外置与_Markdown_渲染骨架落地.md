# 内容外置与 Markdown 渲染骨架落地

## Core Features

- 新增内容索引 src/content/index.json

- 新增示例 Markdown public/content/my-note-1.md

- 新增 Markdown 渲染详情组件 KnowledgeDetailsMD.jsx

- App.jsx 路由导入切换到新组件

- 安装 react-markdown/remark-gfm/rehype-raw

## Tech Stack

{
  "Web": {
    "arch": "react",
    "component": null
  }
}

## Design

保持现有路由结构不变，最小侵入式改造：仅替换详情组件导入路径；内容通过索引与 public 下 .md 文件驱动渲染。

## Plan

Note: 

- [ ] is holding
- [/] is doing
- [X] is done

---

[X] 创建内容索引与示例MD

[X] 新增渲染组件

[X] 切换路由导入

[X] 安装依赖
