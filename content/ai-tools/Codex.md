---
title: "Codex 全面指南"
date: 2026-01-07
author: "ThAce"
category: "ai-tools"
tags: ["OpenAI", "AI", "编程助手", "命令行工具", "Codex"]
description: "全面解析 OpenAI 终端编程助手 Codex 的核心功能与使用技巧。本文涵盖 CLI 安装配置、Suggest/Auto-Edit/Full-Auto 三种审批模式、AGENTS.md 项目指令文件、/init /undo /model 等常用命令、MCP Server 集成、云端沙箱并行任务等高阶玩法，助你打造高效的 AI 编程工作流"
icon: "/icons/Chatgpt.svg"
important: true
---

# Codex 全面指南：OpenAI 的终端编程助手

如果说 Claude Code 是 Anthropic 在终端领域的重磅炸弹，那么 OpenAI 推出的 **Codex** 则是这场 AI 编程革命中不可忽视的另一支劲旅。它不仅是一个 CLI 工具，更是一个能在终端、IDE、云端甚至手机上无缝切换的 **"全平台编程代理"**。

~~最令人兴奋的是，Codex 背后是专为软件工程优化的 **codex-1** 模型（基于 o3），并且它还提供了云端沙箱环境，可以并行处理多个任务。~~

Codex 生态的模型与能力更新很快；建议以 Codex 官方文档与 CLI 内的模型列表为准。本文将带你全面了解 Codex，从基础安装到高阶玩法。

## 什么是 Codex？

**Codex** 是 OpenAI 官方推出的编程代理系统，包含 CLI 工具和云端服务两部分。与单纯的代码补全不同，Codex 是一个能够：

- **直接访问本地文件**：读取、编辑、创建文件
- **执行终端命令**：运行测试、安装依赖、Git 操作
- **云端并行任务**：在隔离的沙箱环境中同时处理多个编程任务
- **跨平台无缝切换**：终端、VSCode、Cursor、Windsurf、ChatGPT 网页版、手机端都能使用

它的核心优势在于 **"一个代理，处处可用"**。你可以在本地终端开始一个任务，然后在 ChatGPT 网页版继续推进，状态完全同步。

### CLI vs 云端

| 特性 | Codex CLI | Codex Cloud |
|------|-----------|-------------|
| 运行环境 | 本地终端 | OpenAI 云端沙箱 |
| 默认模型 | codex-mini-latest | codex-1 (o3 优化版) |
| 代码隐私 | 代码不离开本机 | 代码上传至云端处理 |
| 并行任务 | 单任务 | 支持多任务并行 |
| 网络访问 | 默认禁用（沙箱） | 可选开启 |

## 安装与配置

Codex CLI 提供了多种安装方式，支持 macOS、Linux 和 Windows。

### 前置要求

- **OS**: macOS, Linux, 或 Windows
- **Node.js**: 18 或更高版本（npm 安装方式需要）
- **OpenAI 账号**: ChatGPT Plus/Pro/Business/Edu/Enterprise 订阅，或 API Key

### 安装步骤

#### 方法一：NPM 安装（跨平台通用）

```bash
npm install -g @openai/codex
```

#### 方法二：Homebrew 安装（macOS）

```bash
brew install --cask codex
```

#### 方法三：官方脚本

- <span style="color: #34C759;">macOS/Linux</span>
```bash
curl -fsSL https://codex.openai.com/install.sh | bash
```

- <span style="color: #34C759;">Windows PowerShell</span>
```bash
irm https://codex.openai.com/install.ps1 | iex
```

### 初始化与登录

安装完成后，在终端输入以下命令启动：

```bash
codex
```

首次运行会引导你登录 OpenAI 账号或输入 API Key。

> **提示**：建议在<span style="color: #34C759;">项目根目录下运行 codex</span>，并确保该目录是一个 Git 仓库，这样 Codex 能更好地识别项目上下文并在需要时回滚更改。

## 常用命令速查

Codex CLI 的交互模式支持 **Slash Commands（斜杠命令）** 来控制 Agent 的行为。在输入框中输入 `/` 即可打开命令菜单。

| 命令 | 说明 | 场景 |
|------|------|------|
| `/help` | 查看所有可用命令 | 忘记命令时使用 |
| <span style="color: #FF3B30;">`/init`</span> | 初始化项目配置 | <span style="color: #34C759;">强烈推荐</span>，生成 AGENTS.md |
| <span style="color: #FF3B30;">`/model`</span> | 切换模型 | 在 gpt-4.1-mini、gpt-4.1 等模型间切换 |
| <span style="color: #FF3B30;">`/mode`</span> 或 `/approvals` | 切换审批模式 | 在 Suggest/Auto-Edit/Full-Auto 间切换 |
| `/compact` | 压缩对话历史 | 对话太长时使用，保留核心记忆 |
| <span style="color: #FF3B30;">`/undo`</span> | 撤销上一步操作 | <span style="color: #34C759;">关键命令</span>，回滚文件更改和命令 |
| `/diff` | 查看 Git 差异 | 预览已暂存、未暂存和未跟踪的更改 |
| `/review` | 代码审查 | 扫描工作区问题，关注行为变更和缺失测试 |
| `/mention` | 提及文件路径 | 例如 `/mention src/lib/api.ts` |
| `/plan` | 规划模式 | 复杂任务前先规划步骤 |
| `/mcp` | 查看 MCP 服务器 | 管理活跃的外部工具集成 |
| `/status` | 查看状态 | 查看会话 ID 等信息 |
| `/quit` 或 `/exit` | 退出 CLI | 确保先保存或提交工作 |

### 键盘快捷键

| 快捷键 | 说明 |
|--------|------|
| `⌘-/` (macOS) 或 `Ctrl+/` | 查看所有快捷键 |
| `Ctrl+C` | 中断当前生成 |
| `Esc` | 取消当前请求 |
| `Esc Esc`（双击） | 编辑上一条消息，继续按可回溯更早消息 |
| `Ctrl+G` | 打开外部编辑器（$VISUAL 或 $EDITOR） |
| `Ctrl+O` | 选择云端环境 |
| `@` | 模糊搜索文件，Tab/Enter 插入路径 |

### 启动参数与会话管理

```bash
# 基础启动
codex                          # 交互模式
codex -q "Fix bug in main.js"  # Quick 模式，执行后退出

# 审批模式
codex --suggest                # 建议模式（默认）
codex --auto-edit              # 自动编辑模式
codex --full-auto              # 全自动模式

# 会话恢复
codex resume                   # 打开会话选择器
codex resume --last            # 恢复最近的会话
codex resume --all             # 显示所有目录的会话
codex resume <SESSION_ID>      # 恢复指定会话

# 非交互模式恢复
codex exec resume --last "Fix the race conditions"

# MCP 管理
codex mcp add                  # 添加 MCP 服务器
codex mcp --help               # 查看 MCP 命令

# 高风险选项
codex --dangerously-bypass-approvals-and-sandbox  # 跳过所有保护（又称 --yolo）
```

> <span style="color: #FF3B30;">风险提示</span>：`--yolo` 会完全跳过沙箱和审批，仅在专用沙箱 VM 中使用。

## 核心功能与使用技巧

要想真正发挥 Codex 的威力，掌握以下技巧至关重要。

### 技巧一：项目指令文件 AGENTS.md

这是 Codex 的灵魂功能，类似于 Claude Code 的 CLAUDE.md。运行 <span style="color: #34C759;">`/init`</span> 命令可以自动生成一个基础模板。Codex 每次启动时都会读取这个文件作为<span style="color: #f7a359;">**系统提示词**</span>的一部分。

#### 文件发现顺序

Codex 会按以下顺序构建指令链：

1. **全局范围**：`~/.codex/AGENTS.override.md` 或 `~/.codex/AGENTS.md`
2. **项目范围**：从项目根目录到当前工作目录，依次查找 `AGENTS.override.md` → `AGENTS.md`

> **提示**：`.override.md` 文件优先级更高，适合存放个人偏好而不影响团队共享配置。

#### 你应该在 AGENTS.md 里写什么？

- **项目架构**：简单的目录结构说明
- **代码风格**：例如 "使用 TypeScript，不使用分号，优先使用函数式编程"
- **常用命令**：项目如何构建、如何测试、如何部署
- **特殊规则**：例如 "永远不要修改 legacy/ 目录下的文件"

#### 示例 AGENTS.md

```markdown
# Project Guidelines

- This is a React project using Vite.
- Use Tailwind CSS for styling.
- Run tests with `npm test`.
- When writing components, always include a simple unit test.
- Never modify files in the `legacy/` directory.
```

### 技巧二：三种审批模式（Approval Modes）

Codex 提供了三种不同的自动化级别，你可以根据任务的风险程度灵活选择。使用 `/mode` 命令可以在会话中随时切换。

#### 1. Suggest Mode（建议模式）<span style="color: #34C759;"> — 默认</span>

- 每一步操作都会征求你的同意
- 创建文件、编辑文件、运行命令都需要确认
- **适用场景**：生产环境操作、不熟悉的代码库

```bash
codex --suggest
```

#### 2. Auto-Edit Mode（自动编辑模式）

- 自动执行文件的创建和编辑
- 运行 Shell 命令前仍会询问
- **适用场景**：大规模重构、批量文件修改

```bash
codex --auto-edit
```

#### 3. Full-Auto Mode（全自动模式）

- 完全自主执行所有操作
- 文件编辑和命令执行都无需确认
- 在<span style="color: #f7a359;">**网络禁用的沙箱**</span>中运行以确保安全
- **适用场景**：开发环境中的自动化任务

```bash
codex --full-auto
```

> <span style="color: #FF3B30;">风险提示</span>：开启 Full-Auto 模式前，请确保你的 Git 仓库是干净的。如果目录不在版本控制下，Codex 会发出警告。

### 技巧三：撤销与回滚（/undo）

这是 Codex 的一个杀手级功能。当 Codex 做了错误的编辑或运行了不想要的命令时，输入 `/undo` 即可：

- 回滚文件更改
- 撤销命令执行
- 恢复到上一个状态

确认回滚后，Codex 会告诉你具体移除了什么。这比手动 `git checkout` 更加方便和精确。

### 技巧四：沙箱安全机制

Codex 的一大亮点是其强大的沙箱机制，确保即使在全自动模式下也能保护你的系统。

#### 沙箱配置

在 `~/.codex/config.toml` 中可以精细控制沙箱行为：

```toml
approval_policy = "on-request"  # 可选: on-request, on-failure, never
sandbox_mode = "workspace-write"

[sandbox_workspace_write]
exclude_tmpdir_env_var = false  # 允许访问 $TMPDIR
exclude_slash_tmp = false       # 允许访问 /tmp
writable_roots = ["/Users/YOU/.pyenv/shims"]  # 额外可写路径
network_access = false          # 网络访问（默认禁用）
```

#### 平台实现

- **macOS**：使用 Apple Seatbelt（sandbox-exec）
- **Linux**：使用 Docker 容器隔离

> <span style="color: #FF3B30;">严重警告</span>：`--dangerously-bypass-approvals-and-sandbox`（或 `--yolo`）会完全跳过沙箱和审批机制。除非你在专门的沙箱 VM 中工作，否则<span style="color: #FF3B30;">**永远不要使用**</span>这个选项。

### 技巧五：会话恢复（Resume）

Codex 会将每个会话的日志保存为 JSONL 格式在 `~/.codex/sessions/` 目录下。你可以随时恢复之前的工作：

```bash
# 打开会话选择器，高亮显示可查看摘要
codex resume

# 直接恢复最近的会话
codex resume --last

# 恢复指定会话并继续工作
codex resume <SESSION_ID>

# 非交互模式下恢复并追加指令
codex exec resume --last "Implement the plan"
```

每个恢复的会话都保留原始的对话记录、计划历史和审批状态，Codex 可以利用这些上下文继续工作。

### 技巧六：精准上下文控制

与 Claude Code 类似，你可以显式告诉 Codex 关注哪些文件：

- **@ 语法搜索**：在输入框中输入 `@`，会打开模糊文件搜索，按 Tab 或 Enter 插入路径
- **引用文件**：直接在提示中提到文件路径 `src/App.tsx`
- **使用 /mention**：`/mention src/lib/api.ts` 显式添加文件上下文
- **引用目录**：提到目录名让它搜索 `src/utils/`

## 高阶扩展：MCP 集成与云端沙箱

这是 Codex 真正区别于其他工具的"杀手锏"。

### Model Context Protocol（MCP）

**MCP** 是一种让 AI 模型连接外部工具和上下文的开放协议。Codex CLI 和 IDE 扩展都支持 MCP 服务器。

#### 如何配置 MCP

MCP 配置存储在 `~/.codex/config.toml` 中，CLI 和 IDE 扩展共享同一份配置：

```toml
[mcp.servers.context7]
command = "npx"
args = ["-y", "@context7/mcp-server"]

[mcp.servers.playwright]
command = "npx"
args = ["-y", "@anthropic/mcp-playwright"]
```

#### 常用 MCP 服务器

| 服务器 | 用途 |
|--------|------|
| **Context7** | 获取最新的开发者文档 |
| **Playwright** | 控制浏览器进行自动化测试 |
| **Chrome DevTools** | 检查和调试 Chrome 页面 |
| **Figma** | 访问设计稿（本地/远程） |
| **Linear** | 管理项目 Issue |
| **Sentry** | 访问错误日志 |

#### 管理 MCP 服务器

```bash
# 添加 MCP 服务器（交互式）
codex mcp add

# 查看所有 MCP 命令
codex mcp --help

# 在 TUI 中查看活跃服务器
/mcp
```

#### 将 Codex 作为 MCP 服务器

Codex 本身也可以作为 MCP 服务器运行，供其他 Agent 调用：

```bash
codex --mcp-server
```

这对于构建复杂的多 Agent 工作流非常有用，例如让 Claude Code 调用 Codex 的能力。

### 云端沙箱（Codex Cloud）

这是 Codex 的独特优势——你可以把任务交给云端处理。

#### 核心特性

- **隔离环境**：每个任务运行在独立的沙箱中，预装你的代码仓库
- **并行处理**：可以同时处理多个编程任务
- **实时监控**：可以实时查看任务进度
- **状态同步**：本地和云端之间无缝切换，不丢失状态

#### 使用方式

1. 在 ChatGPT 网页版侧边栏找到 **Codex**
2. 输入提示后点击 **"Code"** 开始编码任务
3. 点击 **"Ask"** 则是询问代码库相关问题
4. 任务完成后可以：
   - 请求进一步修改
   - 直接创建 GitHub PR
   - 将更改同步到本地环境

#### 任务耗时

根据复杂度不同，任务完成时间从 **1 分钟到 30 分钟**不等。Codex 会提供终端日志和测试输出的引用，让你可以追溯每一步操作。

#### Slack 集成

在 Slack 中 @Codex，它会自动启动云端任务，从 Slack 线程获取上下文，完成后在线程中回复 PR 链接。

> <span style="color: #FF3B30;">注意</span>：云端任务会将代码上传至 OpenAI 服务器处理。如果你的代码包含敏感信息，建议使用本地 CLI 模式。

### 模型选择

Codex 生态系统提供了多个优化模型：

| 模型 | 说明 | 适用场景 |
|------|------|----------|
| codex-1 | o3 的软件工程优化版 | 云端复杂任务 |
| codex-mini-latest | o4-mini 的编码优化版 | CLI 日常使用（默认） |
| gpt-4.1 | GPT-4 Turbo 系列 | 通用任务 |
| gpt-4.1-mini | 轻量快速版本 | 简单查询 |
| ~~GPT-5.1-Codex~~ | ~~GPT-5 的长时间代理任务优化版~~ | 超复杂项目 |

可用模型名称会随版本变化，建议在 CLI 中用 `/model`（或等效命令）查看当前列表，并以官方文档为准。

使用 `/model` 命令可以在会话中切换模型。

## 自定义提示（Custom Prompts）

Codex 支持创建自定义提示，它们会像新的斜杠命令一样工作。自定义提示可以包含参数和元数据，通过 `/prompts:<n>` 的格式调用。

这对于团队共享常用工作流非常有用，例如：
- 标准化的代码审查流程
- 特定框架的组件生成模板
- 项目特定的部署检查清单

## 与 Claude Code 的对比

| 特性 | Codex | Claude Code |
|------|-------|-------------|
| 开发商 | OpenAI | Anthropic |
| 开源 | ✅ 是（Rust 编写） | ✅ 是 |
| 云端任务 | ✅ 支持（Codex Cloud） | ❌ 仅本地 |
| 默认模型 | codex-mini-latest | Claude Sonnet/Opus |
| 沙箱机制 | Seatbelt/Docker | 内置沙箱 |
| MCP 支持 | ✅ 支持 | ✅ 支持 |
| 项目配置文件 | AGENTS.md | CLAUDE.md |
| 会话恢复 | ✅ `codex resume` | ✅ 支持 |
| 撤销功能 | ✅ `/undo` 命令 | ✅ 支持 |
| 订阅要求 | ChatGPT Plus+ | Claude Pro+ |

## 总结

Codex 代表了 OpenAI 在 AI 编程领域的最新布局。它不仅有强大的本地 CLI 工具，更有独特的云端沙箱能力，让你可以把复杂任务交给云端并行处理。对于已经在使用 ChatGPT 的开发者来说，Codex 提供了从网页到终端的无缝体验。

**一句话建议**：运行 <span style="color: #34C759;">`/init`</span> 生成 <span style="color: #f7a359;">**AGENTS.md**</span>，根据任务风险选择合适的<span style="color: #34C759;">**审批模式**</span>，善用 <span style="color: #FF3B30;">`/undo`</span> 来安全试错——这是用好 Codex 的三板斧。

---

**参考资料**：
- [Codex 官方文档](https://developers.openai.com/codex/)
- [Codex CLI Slash Commands](https://developers.openai.com/codex/cli/slash-commands/)
- [Codex CLI GitHub](https://github.com/openai/codex)
- [OpenAI 官方介绍](https://openai.com/codex/)
- [AGENTS.md 指南](https://developers.openai.com/codex/guides/agents-md/)

（补充）OpenAI API 侧的能力变化与迁移建议可关注：
- https://developers.openai.com/api/docs/changelog
- https://developers.openai.com/api/docs/guides/migrate-to-responses/
