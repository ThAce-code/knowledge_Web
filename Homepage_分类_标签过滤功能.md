# Homepage 分类/标签过滤功能

## Core Features

- 动态生成分类与标签

- 分类单选 + 标签多选（AND 逻辑）

- 默认显示全部，支持一键重置

- 过滤后传给 ArticlePreview 渲染

## Tech Stack

{
  "Web": {
    "arch": "react",
    "component": null
  }
}

## Design

无依赖新增，纯前端状态管理，最小侵入式；数据源为 index.json，过滤放在 Homepage，展示由 ArticlePreview 完成。

## Plan

Note: 

- [ ] is holding
- [/] is doing
- [X] is done

---

[X] 实现过滤控件与逻辑

[X] 与列表联动
