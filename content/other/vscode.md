---
title: "VScode 使用指南"
date: 2024-10-21
author: "ThAce"
category: "other"
tags: ["教程", "基础", "vscode"]
description: "完整的 vscode 写C/C++指南，包括搭建 C/C++ 开发环境并成功运行代码，安装各种插件"
icon: "/icons/vscode.svg"
---
# 在 VSCode 中配置和运行 C/C++ 代码的完整指南

## 引言
本指南旨在详细介绍如何在 VSCode 中搭建 C/C++ 开发环境并成功运行代码，适用于 Windows 10 及以上系统（Windows 7 用户需参考官方文档调整步骤）。

## 安装 VSCode
首先需确保已安装 VSCode。安装完成后，可通过后续步骤验证环境是否配置成功（如在命令行输入能显示版本信息则表示基础环境正常）。

## 安装必要插件
在 VSCode 中安装以下关键插件：
- **C/C++ 插件**：提供 C/C++ 语言支持、代码高亮和调试功能。
<img src="/images/vscode1.webp" alt="C/C++ 插件" style="max-width: 520px; width: 100%; height: auto; display: block; margin: 12px auto;" loading="lazy" />
- **Code Runner 插件**：支持一键运行代码，简化执行流程。
<img src="/images/vscode2.webp" alt="Code Runner 插件" style="max-width: 520px; width: 100%; height: auto; display: block; margin: 12px auto;" loading="lazy" />

安装完成后，重启 VSCode 使插件生效。

## 安装 MinGW-w64
MinGW-w64 是 Windows 下的 C/C++ 编译器套件，安装步骤如下：
<img src="/images/vscode3.webp" alt="MinGW-w64 安装" style="max-width: 920px; width: 100%; height: auto; display: block; margin: 12px auto;" loading="lazy" />
### 1. 下载安装程序
通过 C/C++ 插件提供的链接（按住 Ctrl 点击插件底部提示的 URL）打开浏览器，来到 https://code.visualstudio.com/docs/cpp/config-mingw ,点击 <span style="color: #FF3B30;">MSYS2</span> 下载 MinGW-w64 的 exe 安装文件。
<img src="/images/vscode4.webp" alt="MinGW-w64 安装" style="max-width: 920px; width: 100%; height: auto; display: block; margin: 12px auto;" loading="lazy" />
<img src="/images/vscode5.webp" alt="MinGW-w64 安装" style="max-width: 920px; width: 100%; height: auto; display: block; margin: 12px auto;" loading="lazy" />

### 2. 运行安装程序
双击下载的 .exe 文件，按默认配置点击 “下一步”，直至安装完成（建议保留默认安装路径，避免手动修改）。
<img src="/images/vscode6.webp" alt="MinGW-w64 安装" style="max-width: 920px; width: 100%; height: auto; display: block; margin: 12px auto;" loading="lazy" />
### 3. 配置组件
安装完成后会自动弹出配置窗口，复制命令

```bash
pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain
```
在窗口中右键粘贴并回车执行；
<img src="/images/vscode7.webp" alt="MinGW-w64 安装" style="max-width: 720px; width: 100%; height: auto; display: block; margin: 12px auto;" loading="lazy" />
输入 <span style="color: #FF3B30;">**Y**</span> （表示 yes）确认下载必要组件，等待下载完成（此过程可能耗时较长，需耐心等待）。
<img src="/images/vscode8.webp" alt="MinGW-w64 安装" style="max-width: 720px; width: 100%; height: auto; display: block; margin: 12px auto;" loading="lazy" />

### 4. 验证安装
组件安装完成后，在配置窗口分别输入以下命令：

```bash
gcc --version
```

```bash
g++ --version
```

```bash
gdb --version
```
<img src="/images/vscode9.webp" alt="MinGW-w64 安装" style="max-width: 720px; width: 100%; height: auto; display: block; margin: 12px auto;" loading="lazy" />
若均能显示版本信息，则 MinGW-w64 安装成功。

## 配置系统环境变量
为确保编译器能被系统全局识别，需将 MinGW-w64 的 bin 目录添加到系统环境变量 Path 中：

### 1. 打开环境变量设置
在 <span style="color: #FF3B30;">**任务栏搜索框**</span> 输入 <span style="color: #FF3B30;">**环境变量**</span> ，打开 <span style="color: #FF3B30;">**编辑系统环境变量**</span> ,在 "用户变量" 中找到并双击 "Path"。
<img src="/images/vscode10.webp" alt="MinGW-w64 安装" style="max-width: 420px; width: 100%; height: auto; display: block; margin: 12px auto;" loading="lazy" />
### 2. 添加路径
点击 “新建”，粘贴 MinGW-w64 的 bin 目录路径（默认安装路径下通常为 **C:\MinGW\ucrt64\bin**，需根据实际安装位置调整），点击 “确定” 保存。
<img src="/images/vscode11.webp" alt="MinGW-w64 安装" style="max-width: 920px; width: 100%; height: auto; display: block; margin: 12px auto;" loading="lazy" />
### 3. 验证配置
关闭所有已打开的命令行窗口，重新打开 PowerShell 或 cmd，输入以下命令：
```bash
gcc --version
```
<img src="/images/vscode12.webp" alt="MinGW-w64 安装" style="max-width: 720px; width: 100%; height: auto; display: block; margin: 12px auto;" loading="lazy" />
若显示版本信息则环境变量配置成功。

## 运行和调试代码
环境配置完成后，可通过以下方式运行 C/C++ 代码：

### 1. 使用 Code Runner 运行
在 VSCode 中打开 C/C++ 文件，右键点击编辑区，选择 “Run Code”，代码输出结果将显示在终端中。
<img src="/images/vscode13.webp" alt="MinGW-w64 安装" style="max-width: 920px; width: 100%; height: auto; display: block; margin: 12px auto;" loading="lazy" />
### 2. 命令行编译运行
在终端中输入编译命令（如 <span style="color: #FF3B30;">**gcc -o outputfile sourcefile.c**</span>，其中 <span style="color: #FF3B30;">**sourcefile.c**</span> 为源文件名，<span style="color: #FF3B30;">**outputfile**</span> 为输出的可执行文件名），编译成功后输入运行程序命令 <span style="color: #FF3B30;">**./outputfile**</span> 。

### 3. 调试功能
点击 VSCode 左侧 “运行和调试” 图标，选择 “调试 C/C++ 文件”，系统会自动生成调试配置并启动调试，支持断点、变量监视等功能。

## 结语
按照以上步骤操作后，即可在 VSCode 中顺利编写、编译、运行和调试 C/C++ 代码。若过程中出现版本信息无法显示等问题，建议重新检查 MinGW-w64 安装步骤或环境变量配置是否正确。
