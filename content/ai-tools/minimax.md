---
title: "MiniMax - 引领AGI时代的中国AI独角兽"
date: 2026-01-05
author: "嵌入式知识库"
category: "ai-tools"
tags: ["MiniMax", "AI", "AGI", "API"]
description: "深入了解MiniMax公司的发展历程、核心产品和技术成就，掌握其API使用方法"
icon: "/icons/MiniMax.svg"
important: true
---

# MiniMax - 引领AGI时代的中国AI独角兽

## 概述

在 2024 年末至 2025 年初的 AI 浪潮中，开源模型界杀出了一匹黑马。当大家还在讨论 Llama 和 Qwen 时，MiniMax (稀宇科技) 发布的 MiniMax-M2.1 以其惊人的编程和逻辑推理能力，迅速占领了开发者的视线。

特别是对于正在寻找 Claude 3.5 Sonnet 平替方案，或者希望在 Cline、Cursor 中使用高性价比国产模型的开发者来说，MiniMax-M2.1 是一个绕不开的选项。

本文将带你深入了解这款模型，并手把手教你如何将其接入最流行的 AI 编程工具中。

## MiniMax-M2.1 的前世今生

### 1. 出处：独角兽“稀宇科技”

MiniMax-M2.1 并非横空出世，它背后的公司是 MiniMax (稀宇科技)，这是一家中国领先的通用人工智能科技公司。

定位：M2.1 是其最新一代的旗舰模型，采用了 MoE (Mixture-of-Experts) 架构。

参数规模：拥有约 230B (2300亿) 的总参数量，但在推理时仅激活约 10B 参数。这种架构保证了它拥有庞大的知识库，同时推理速度极快，成本极低。

开源精神：该模型已在 Hugging Face 上开源（MiniMaxAI/MiniMax-M2.1），打破了“高性能 Coding 模型必须闭源”的刻板印象。

### 2. 核心能力：为何适合编程？

M2.1 最大的亮点在于其 “交错思维” (Interleaved Thinking) 机制。类似于 OpenAI o1，它在输出最终代码前，会进行深度思考（CoT）。

超长上下文：支持极长的 Context Window，适合阅读整个代码库。

多语言编程：在 Rust, C++, Java, Python 等语言上表现优异。

Agent 能力：在 VIBE 等基准测试中，其构建全栈应用的能力甚至在某些维度超越了顶尖闭源模型。

### 3. 多模态AI模型

- **文本模型** ：
    - MiniMax-M2.1
    - MiniMax-M2
    - MiniMax-M2.1-lightning

- **同步语音合成接口** ：
    - speech-2.6-hd
    - speech-2.6-turbo
    - speech-02-hd
    - speech-02-turbo


## 核心产品

### MiniMax开放平台

### 1. 账号注册

**步骤1：访问官网**
打开 [MiniMax开放平台](https://platform.minimaxi.com/user-center/basic-information)

**步骤2：注册账号**
- 点击"注册"按钮
- 使用手机号或邮箱完成注册
- 完成身份验证

**步骤3：实名认证**
- 企业用户：上传营业执照
- 个人用户：上传身份证正反面

### 2. 获取API Key

**操作流程**：
1. 登录MiniMax开放平台控制台
2. 进入"API管理"页面
3. 点击"创建密钥"按钮
4. 设置密钥名称和权限
5. 保存生成的API Key（请妥善保管）

**注意事项**：
- API Key具有访问权限，请勿泄露
- 每个账号可创建多个API Key
- 建议定期更换API Key

### 3. 计费与套餐

**计费方式**：
- **Token计费**：按输入输出token数量计费
- **调用次数**：部分API按调用次数计费
- **套餐包**：提供月度/年度套餐包

**免费额度**：
- 新用户注册送免费额度
- 每月赠送一定量的免费调用
- 适合测试和小规模应用

### 5. 开发资源

**官方文档**：
- [API文档中心](https://platform.minimaxi.com/docs/guides/models-intro)

## 实际应用案例

### 以API Key接入 <span style="color: #f7a359;">Claude Code</span>

- 1.安装Claude Code，参考[Claude Code安装](https://www.thace.top/article/ai-tools/Claude-Code)

- 2.配置API Key
    * 方案一 直接配置 <span style="color: #FF3B30;">user/username/.claude/settings.json</span> 和 <span style="color: #FF3B30;">user/username/.claude/config.json</span>
    
    <span style="color: #34C759; font-weight: bold; font-size: 1.2em;">settings.json:</span>

    ```json
    {
    "env": {
        "ANTHROPIC_AUTH_TOKEN": "your_api_key",
        "ANTHROPIC_BASE_URL": "https://api.minimaxi.com/anthropic"
    },
    "includeCoAuthoredBy": false,
    }
    ```
    <span style="color: #34C759; font-weight: bold; font-size: 1.2em;">config.json:</span>

    ```json
    {
    "primaryApiKey": "any"
    }
    ```
    * 方案二 使用 <span style="color: #FF3B30; font-weight: bold; font-size: 1.2em;">cc-switch</span>配置，安装[cc-switch](https://github.com/farion1231/cc-switch/releases/download/v3.8.3/CC-Switch-v3.8.3-Windows-Portable.zip)

    按照图示配置
    <img src="/images/minimax-api-1.webp" alt="cc-witch配置" style="max-width: 920px; width: 100%; height: auto; display: block; margin: 12px auto;" loading="lazy" />

    <img src="/images/minimax-api-2.webp" alt="cc-witch配置" style="max-width: 920px; width: 100%; height: auto; display: block; margin: 12px auto;" loading="lazy" />

    ```txt
    https://api.minimaxi.com/anthropic
    ```
    最后在power shell里输入：
    ```powershell
    claude
    ```
    即可运行成功
    <img src="/images/minimax-api-3.webp" alt="cc-witch配置" style="max-width: 920px; width: 100%; height: auto; display: block; margin: 12px auto;" loading="lazy" />





## 总结

MiniMax以其强大的技术实力和丰富的产品矩阵，成为中国AGI领域的重要力量。无论是C端的海螺AI，还是B端的开放平台API，都展现了其在AI技术上的深厚积累。对于开发者而言，MiniMax提供了易用、强大的AI能力，帮助快速构建智能化应用。

**推荐指数**：⭐⭐⭐⭐⭐

**适合人群**：
- 开发者：构建AI应用
- 企业：提升业务效率
- 用户：日常AI助手
- 研究者：AI技术探索

通过MiniMax的API服务，我们可以轻松将AI能力集成到自己的项目中，创造更多可能！
