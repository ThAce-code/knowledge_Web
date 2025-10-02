# GitHub 使用与最佳实践

GitHub 是当前最流行的代码托管与协作平台，提供从个人项目到企业级工程的完整开发协作能力。

## 为什么选择 GitHub
- 全球最大开源社区，生态与资源丰富
- Issues/PR/Projects/Actions 一体化协作
- 出色的代码审核（Code Review）流程
- 与开发工具链（IDE/CI/CD/容器云）高度集成

## 核心功能快速上手
1. 仓库管理（Repository）
   - 初始化 README、LICENSE、.gitignore
   - 使用分支模型：main 开发主线，feature/*、hotfix/*

2. 协作流程（Issues & Pull Requests）
   - 使用 Issue 模板与 Label 管理需求与缺陷
   - 发起 PR 并关联 Issue，启用必须通过的检查

3. 自动化（GitHub Actions）
   - 常见工作流：CI 构建/测试、Lint、发布、镜像推送
   - 示例触发器：on: [push, pull_request, release]

4. 安全与合规
   - 启用分支保护（Branch Protection Rules）
   - 使用 CODEOWNERS 限制关键目录审阅人
   - Dependabot 自动依赖升级与安全告警

## 实用技巧
- 使用 Draft PR 提前同步设计与进度
- 利用 Projects（v2）进行轻量项目管理
- 结合 Releases 管理版本与变更日志
- 使用 Discussions 进行社区 Q&A 与知识沉淀

## 参考
- 官方文档：https://docs.github.com/
- Actions 市场：https://github.com/marketplace?type=actions