# 文件管理系统扫描脚本

功能概述：
- 自动分类（images/css/js/fonts/html/json/md/other）
- 冗余检测（未被代码/样式/HTML引用的静态资源）
- 重复文件检测（按内容哈希）
- 报告生成（public/content/file-report.json）
- 可选清理（--apply 将冗余文件移动到 .trash/，支持回滚）

使用：
1. 预览（生成报告，不做修改）
   node ./scripts/file-manager/scan.mjs --dry-run

2. 执行清理（将冗余文件搬运到 .trash/）
   node ./scripts/file-manager/scan.mjs --apply

报告查看：
- 前端页面：src/pages/FileManager.jsx
- 组件：src/features/fileManager/components/FileManagerDashboard.jsx
- 报告 JSON：public/content/file-report.json（可下载）

注意：
- 引用分析基于正则启发式，可能存在误报/漏报，务必先预览确认。
- 清理采用搬运到 .trash/ 的安全策略，若有误可从 .trash/ 还原。