# README

本项目为 NEBULA KNOWLEDGE 前端（Vite + React + React Router）。

更多完整的结构梳理与文件说明，请参阅 PROJECT_OVERVIEW.md。

## 开发命令
- 开发：npm run dev
- 构建：npm run build
- 预览：npm run preview
- 代码检查：npm run lint

## 目录结构
详见 PROJECT_OVERVIEW.md 中的“目录树”与“组件/路由关系图”。

## 冗余文件保留原因与后续处理计划
当前遵循“暂不删除，仅标注原因”的策略。冗余项来源与进一步说明见 PROJECT_OVERVIEW.md 的“冗余清单（未被引用）”。现阶段保留的目的：
- 历史备选实现或 UI 草稿：LeftSidebar/MainContent/NoteContent 相关组件与样式
- 暂存素材：public/images 及 src/assets 下的图片与 react.svg
- 旧入口或笔记：src/App.js、src/notes.js

后续处理计划（建议按里程碑执行）：
1) 使用场景确认：若 2 周内无明确使用计划，则移除对应文件/图片
2) 若需保留：在对应文件顶部添加注释 // retained: reason，并在 README 中登记用途
3) 资源治理：将仍需保留的图片集中到 public/assets，并建立引用清单
4) 详情页内容治理：将 KnowledgeDetails 的大文本外置（JSON/MD）并懒加载

清单来源（保持同步维护）：
- PROJECT_OVERVIEW.md → “7. 冗余清单（未被引用）”