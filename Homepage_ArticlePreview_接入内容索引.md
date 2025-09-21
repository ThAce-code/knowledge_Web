# Homepage/ArticlePreview 接入内容索引

## Core Features

- ArticlePreview 接收 items 并渲染列表

- Homepage 读取 src/content/index.json 并传入 ArticlePreview

- 与 /knowledge/:id (slug) 跳转打通

## Tech Stack

{
  "Web": {
    "arch": "react",
    "component": null
  }
}

## Design

数据从 Homepage 单向流向展示组件，保持组件无副作用与易测试；按日期降序展示最新内容。

## Plan

Note: 

- [ ] is holding
- [/] is doing
- [X] is done

---

[X] 修改 ArticlePreview

[X] 修改 Homepage

[X] 路由与详情联通
