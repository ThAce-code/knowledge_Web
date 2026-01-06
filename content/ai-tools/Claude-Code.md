---
title: "Claude Code 全面指南"
date: 2026-01-05
author: "嵌入式知识库"
category: "ai-tools"
tags: ["Claude", "AI", "编程助手", "命令行工具", "Anthropic"]
description: "深入了解 Anthropic 的终端编程助手 Claude Code，掌握从安装到高阶使用的完整指南"
icon: "/icons/Anthropic.svg"
important: true
---

# Claude Code 全面指南：Anthropic 的终端编程助手

在 AI 辅助编程领域，我们已经习惯了 GitHub Copilot 这样的 IDE 插件，或者是 Cursor 这样的 AI 原生编辑器。但最近，Anthropic 推出了一个返璞归真的"大杀器"——**Claude Code**。这不是一个简单的聊天机器人，而是一个**直接生活在你终端（Terminal）里的 Agent**。

它能读懂你的整个代码库，执行命令，管理 Git 提交，甚至帮你修 Bug，而这一切都发生在开发者最熟悉的命令行环境中。本文将带你全面了解 Claude Code，从安装到高阶使用技巧。

## 什么是 Claude Code？

**Claude Code** 是 Anthropic 官方推出的一个命令行工具（CLI）。不同于在网页版复制粘贴代码，Claude Code 可以：

- **直接访问本地文件**：读取、编辑、创建文件
- **执行终端命令**：运行测试、安装依赖、Git 操作
- **理解项目上下文**：通过智能的文件读取和搜索，理解复杂的项目结构

它的核心设计哲学是 **"Agentic"（代理化）** 和 **"Unopinionated"（非独断）**。它不强迫你换编辑器（你依然可以用 VS Code、JetBrains 或 Vim），它只是作为一个超级助手常驻在你的终端里。

## 安装与配置

Claude Code 提供了多种安装方式，推荐使用 npm 进行安装（需要 Node.js 环境）。

### 前置要求

- **OS**: macOS, Linux, 或 Windows (WSL 2 体验最佳)
- **Node.js**: 18 或更高版本
- **Anthropic 账号**: 需要 Claude.ai 订阅或 API Key

### 安装步骤

#### 方法一：NPM 安装（最通用）

如果你已经安装了 Node.js：

```bash
npm install -g @anthropic-ai/claude-code
```

#### 方法二：官方脚本（macOS/Linux）

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### 初始化与登录

安装完成后，在终端输入以下命令启动：

```bash
claude
```

首次运行时，它会引导你进行认证。你可以选择通过浏览器登录（连接你的 Claude.ai Pro/Team 账号）或者输入 API Key。

> **提示**：建议在<span style="color: #34C759;">项目根目录下运行 claude</span>，这样它能更好地识别当前项目的上下文。

## 常用命令速查

Claude Code 的交互模式非常像一个聊天窗口，但它混入了特殊的**Slash Commands（斜杠命令）**来控制 Agent 的行为。

| 命令 | 说明 | 场景 |
|------|------|------|
| `/help` | 查看所有可用命令 | 忘记命令时使用 |
| <span style="color: #FF3B30;">`/init`</span> | 初始化项目配置 | <span style="color: #34C759;">强烈推荐</span>，生成 CLAUDE.md |
| `/clear` | 清除当前会话上下文 | 开启新任务时使用，节省 Token |
| <span style="color: #FF3B30;">`/compact`</span> | 压缩对话历史 | 对话太长时使用，保留核心记忆 |
| <span style="color: #FF3B30;"> `/model`</span> | 选择模型 | 针对不同复杂度的任务可切换合适的模型 |
| `/cost` | 查看当前会话消耗 | 关注 API 成本时使用 |
| `/bug` | 报告 Claude Code 本身的问题 | 遇到工具崩溃时 |
| `! <命令>` | 强制执行 Shell 命令 | 例如 `! npm test` |
| `Ctrl+C` | 中断当前生成 | Claude 废话太多时打断它 |
| `Esc` | 退出/停止 | 停止 Agent 的行动 |

此外，你还可以在启动时使用参数：

- `claude -p "Fix the bug in main.js"`：Print Mode，执行单次指令后退出（适合脚本化）
- `claude --dangerously-skip-permissions`：<span style="color: #FF3B30;">高风险模式</span>，跳过所有文件修改的确认步骤（仅在完全信任时使用）

## 核心功能与使用技巧

要想真正发挥 Claude Code 的威力，掌握以下技巧至关重要。

### 技巧一：项目记忆文件 CLAUDE.md

这是 Claude Code 的灵魂功能。在项目根目录下创建一个 `CLAUDE.md` 文件，这里面写的内容会作为<span style="color: #f7a359;">**System Prompt（系统提示词）**</span>的一部分被 Claude 每次读取。

#### 你应该在 CLAUDE.md 里写什么？

- **项目架构**：简单的目录结构说明
- **代码风格**：例如 "使用 TypeScript，不使用分号，优先使用函数式编程"
- **常用命令**：项目如何构建、如何测试、如何部署
- **特殊规则**："永远不要修改 legacy/ 目录下的文件"

#### 示例 CLAUDE.md

```markdown
# Project Guidelines

- This is a React project using Vite.
- Use Tailwind CSS for styling.
- Run tests with `npm test`.
- When writing components, always include a simple unit test.
```

运行 <span style="color: #34C759;">`/init`</span> 命令可以自动帮你生成一个基础模板。

### 技巧二：精准上下文控制（@ 符号）

虽然 Claude Code 可以自己搜索文件，但为了节省 Token 和提高准确率，建议显式告诉它看哪里。

- **引用文件**：`@src/App.tsx` 请帮我重构这个组件
- **引用目录**：`@src/utils/` 帮我检查这个目录下的工具函数是否有重复
- **引用定义**：它通常支持模糊搜索，输入 `@MainConfig` 可以直接定位到类或配置

### 技巧三：Auto-Accept（自动接受）模式

默认情况下，Claude Code 在执行任何 Shell 命令或修改文件前都会询问你 (y/n)。这很安全，但在进行大规模重构时很繁琐。

- **临时自动接受**：在会话中按 `Shift + Tab` 可以切换"自动接受"模式
- **快捷键循环**：你也可以通过按 <span style="color: #34C759;">`Alt + m`</span> 循环切换 Default / Auto-Accept / Plan 等模式

> <span style="color: #FF3B30;">风险提示</span>：开启此模式后，请确保你的 Git 仓库是干净的，以便随时回滚。

### 技巧四：Plan Mode（规划模式）

遇到复杂任务（例如"重构整个鉴权模块"）时，不要直接让它写代码。先让它<span style="color: #34C759;">**Plan（规划）**</span>。

你可以直接说："Plan the migration from Redux to Zustand"（规划从 Redux 迁移到 Zustand 的过程）。Claude 会列出一个步骤清单，然后你可以让它一步步执行。这种 Chain-of-Thought（思维链）的方式能显著降低错误率。

快捷切换：同样可以通过 <span style="color: #34C759;">`Alt + m`</span> 快捷键直接循环切换到 Plan 模式。

## 高阶扩展：MCP Server 与 Claude Skills

这是 Claude Code 区别于其他工具的"杀手锏"，让它不仅仅是一个聊天机器人，而是一个能联网、能使用工具、拥有特定领域知识的超级 Agent。

### Model Context Protocol（MCP）

**MCP** 是 Anthropic 制定的一种开放标准，类似于 AI 时代的 USB 接口。它允许 Claude Code 连接到外部数据源（如数据库、GitHub、Linear）或工具（如浏览器搜索、文件系统）。

#### 如何使用

添加 MCP Server：在终端中运行以下命令，Claude 会启动交互式向导：

```bash
claude mcp add
```

或者直接添加特定的 Server（例如 Brave 搜索）：

```bash
claude mcp add brave-search --env BRAVE_API_KEY=your_key
```

#### 常用 MCP Server

- **Filesystem**：允许 Claude 访问指定目录之外的文件
- **PostgreSQL**：让 Claude 直接查询你的数据库架构和数据
- **GitHub**：让 Claude 能够创建 Issue、查看 PR
- **Brave Search**：赋予 Claude 实时联网搜索的能力

#### 配置范围（Scopes）

- **Project Scope**: 配置保存在 `.claude/config.json`，仅对当前项目生效（适合团队共享）
- **Global Scope**: 配置保存在用户主目录，对所有项目生效

> <span style="color: #FF3B30;">严重警告</span>：MCP 会将外部工具的定义和返回结果大量注入到 Prompt 中。启用过多的 Server 或进行大规模搜索会导致 <span style="color: #FF3B30;">Token 消耗非常大</span>（可能迅速耗尽你的配额）。请务必时刻关注 `/cost` 并在不需要时禁用不必要的 Server。

### Claude Skills（Agent Skills）

如果说 MCP 是给 Claude 添加"四肢"（工具），那么 **Skills** 就是给 Claude 植入"专业记忆"（大脑皮层）。

Skills 是定义明确的任务处理流程，当你的请求匹配到某个 Skill 的描述时，Claude 会自动激活该 Skill 并加载详细的指令。

#### Skills 的结构

一个 Skill 本质上是一个包含 **SKILL.md** 的文件夹，通常位于项目根目录的 `.claude/skills/` 下。

#### 如何创建一个 Skill

1. **创建目录**

```bash
mkdir -p .claude/skills/code-review
```

2. **编写 SKILL.md**

这个文件告诉 Claude 这个技能是干什么的，以及具体怎么做：

```markdown
---
name: Code Review Specialist
description: When user asks for a code review or to check PR quality.
---

# Code Review Guidelines

1. Check for security vulnerabilities first.
2. Ensure variable naming follows camelCase.
3. Look for O(n^2) loops in the critical path.
4. If you find issues, suggest specific code fixes.
```

#### 自动激活

当你下次对 Claude 说 "Review this code" 时，它会匹配到 description，自动加载这个 Skill，并严格按照你的 Guidelines 执行，而不需要你每次都把规则复制粘贴一遍。

## 总结

Claude Code 是一个非常极客的工具。它没有漂亮的 UI，但它提供了通过自然语言控制整个开发环境的能力。对于那些习惯使用终端、希望 AI 不仅仅是"写代码"而是"干活（执行、调试、提交）"的开发者来说，Claude Code 是目前市面上最强大的辅助工具之一。

**一句话建议**：从今天开始，在你的项目根目录建一个 <span style="color: #f7a359;">**CLAUDE.md**</span>，你会发现 AI 突然变得懂你了。
