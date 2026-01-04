---
title: "Git版本控制基础"
date: 2024-01-05
author: "开发工具专家"
category: "other"
tags: ["工具", "入门"]
description: "Git版本控制系统基础教程，包括常用命令、分支管理、团队协作等核心概念"
icon: "/icons/git.svg"
---

# Git版本控制基础

## 为什么要使用版本控制？

版本控制系统可以：
- 记录文件的修改历史
- 支持多人协作开发
- 方便代码回滚和比较
- 实现分支开发和合并

## Git基础命令

### 初始化仓库

```bash
git init                    # 初始化新仓库
git clone <url>             # 克隆远程仓库
```

### 基本操作

```bash
git add .                   # 暂存所有更改
git commit -m "提交信息"    # 提交更改
git status                  # 查看状态
git log                     # 查看提交历史
```

### 分支管理

```bash
git branch <name>           # 创建分支
git checkout <name>         # 切换分支
git merge <name>            # 合并分支
git branch -d <name>        # 删除分支
```

### 远程操作

```bash
git push origin main        # 推送到远程
git pull origin main        # 拉取远程更新
git remote -v               # 查看远程仓库
```

## 常见工作流

### Feature Branch工作流

1. 从main分支创建feature分支
2. 在feature分支上开发新功能
3. 提交并推送feature分支
4. 创建Pull Request进行代码审查
5. 审查通过后合并到main分支

## 最佳实践

1. 提交信息要清晰明确
2. 频繁提交，小步快跑
3. 提交前先拉取最新代码
4. 不要提交临时文件和敏感信息
5. 使用.gitignore排除不必要的文件
