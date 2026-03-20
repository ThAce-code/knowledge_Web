---
title: "MiniMax - 引领AGI时代的中国AI独角兽"
date: 2026-01-05
author: "ThAce"
category: "ai-tools"
tags: ["MiniMax", "AI", "AGI", "API"]
description: "深度解析中国 AI 独角兽 MiniMax（稀宇科技）的发展历程与核心产品。本文介绍 MiniMax-M2.7 模型的强大编程与推理能力，手把手教你获取 API Key 并将其接入 Cline、Cursor、Continue 等主流 AI 编程工具，为寻找 Claude 高性价比平替方案的开发者提供完整指南"
icon: "/icons/MiniMax.svg"
important: true
---

# MiniMax - 引领AGI时代的中国AI独角兽

## 概述

在 2025 年的 AI 浪潮中，MiniMax (稀宇科技) 发布了其最新旗舰模型 MiniMax-M2.7，以其惊人的编程和逻辑推理能力，迅速占领了开发者的视线。

特别是对于正在寻找 Claude 平替方案，或者希望在 Cline、Cursor 中使用高性价比国产模型的开发者来说，MiniMax-M2.7 是一个绕不开的选项。

本文将带你深入了解这款模型，并手把手教你如何将其接入最流行的 AI 编程工具中。

## MiniMax-M2.7 的前世今生

### 1. 出处：独角兽"稀宇科技"

MiniMax-M2.7 并非横空出世，它背后的公司是 MiniMax (稀宇科技)，这是一家中国领先的通用人工智能科技公司。

~~定位：M2.7 是其最新一代的旗舰模型，采用了 MoE (Mixture-of-Experts) 架构。~~

定位/架构等细节更新频繁，建议以官方模型卡/技术资料为准。

~~参数规模：拥有约 230B (2300亿) 的总参数量，但在推理时仅激活约 10B 参数。~~

参数规模、激活参数等属于高变动信息，请以官方模型卡/技术资料为准。

### 2. 核心能力：为何适合编程？

**新增旗舰：MiniMax-M2.7（及 M2.7-highspeed 版）** ——官方现在主推的"自我进化"模型。

**最大亮点**：首次让模型深度参与自身进化（自己构建 Agent Harness、运行 RL 实验、优化自己的训练循环，能承担研发流程中 30-50% 工作量）。

**核心能力提升**：

- **复杂环境交互**：40+ 复杂技能（>2000 Token）保持 97% 技能遵守率
- **编程/Agent**：SWE-Pro 56.22%、Terminal Bench 2 57.0%、VIBE-Pro（全项目交付）55.6%、OpenClaw/MMClaw 逼近 Sonnet 4.6
- **办公场景**：Excel/PPT/Word 多轮复杂编辑、高保真修改大幅提升
- **GDPval-AA ELO**：1495（目前最高水平）

**性能**：比 M2.5 全面领先，尤其在端到端 Agent 任务、实时调试、生产事故分析上。

<img src="/images/minimax2.webp" alt="minimax" style="max-width: 920px; width: 100%; height: auto; display: block; margin: 12px auto;" loading="lazy" />

### 3. 多模态AI模型

- **文本模型** ：
    - MiniMax-M2.7  <span style="color: #FF3B30;">Least 🔥</span>
    - MiniMax-M2.5
    - MiniMax-M2.1

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
- 如果你买了它的会员，请<span style="color: #FF3B30;">一 定 要 使 用 ta 的 token plan</span>
<img src="/images/minimax1.webp" alt="minimax" style="max-width: 920px; width: 100%; height: auto; display: block; margin: 12px auto;" loading="lazy" />

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
    * ~~方案一 直接配置 <span style="color: #FF3B30;">user/username/.claude/settings.json</span> 和 <span style="color: #FF3B30;">user/username/.claude/config.json</span>~~

    * 方案一 直接配置 <span style="color: #FF3B30;">~/.claude/settings.json</span> 和 <span style="color: #FF3B30;">~/.claude/config.json</span>（Windows 通常在用户目录下，如 `C:\\Users\\<YOU>\\.claude\\`）
    
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
    * 方案二 使用 <span style="color: #FF3B30; font-weight: bold; font-size: 1.2em;">cc-switch</span>配置，安装[cc-switch](https://github.com/farion1231/cc-switch/releases/download/v3.8.3/CC-Switch-v3.8.3-Windows-Portable.zip)(<span style="color: #34C759;">推荐使用</span>)

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

---

**参考资料（官方）**：
- https://platform.minimaxi.com/docs/guides/models-intro
- https://huggingface.co/MiniMaxAI/MiniMax-M2.1
