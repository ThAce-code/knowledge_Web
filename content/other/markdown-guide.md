---
title: "Markdown 使用指南"
date: 2024-01-21
author: "ThAce"
category: "other"
tags: ["教程", "基础"]
description: "完整的 Markdown 写作指南，包括自定义图片大小、文字颜色、数学公式等高级用法"
icon: "/icons/markdown.svg"
---

# Markdown 使用指南

本指南将帮助你掌握在知识库中编写文章的所有 Markdown 技巧。

## 基础语法

### 标题

使用 `#` 符号创建标题：

```markdown
# 一级标题
## 二级标题
### 三级标题
```

**注意**: 目录（TOC）会自动提取所有二级和三级标题。

### 文本格式

```markdown
**粗体文本**
*斜体文本*
~~删除线~~
`行内代码`
```

效果：

**粗体文本**
*斜体文本*
~~删除线~~
`行内代码`

### 列表

**无序列表**：

```markdown
- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
```

**有序列表**：

```markdown
1. 第一步
2. 第二步
3. 第三步
```

### 链接

```markdown
[链接文字](https://example.com)
```

示例：[访问百度](https://www.baidu.com)

## 高级功能

### 插入自定义大小的图片

Markdown 原生语法不支持自定义图片大小，需要使用 HTML `<img>` 标签：

```html
<!-- 指定宽度 -->
<img src="/images/example.png" alt="描述文字" width="400" />

<!-- 指定宽度和高度 -->
<img src="/images/example.png" alt="描述文字" width="600" height="400" />

<!-- 使用百分比 -->
<img src="/images/example.png" alt="描述文字" style="width: 50%;" />

<!-- 居中对齐 -->
<div style="text-align: center;">
  <img src="/images/example.png" alt="描述文字" width="500" />
</div>
```

**实际效果示例**：

<div style="text-align: center;">
<img src="/logo.webp" alt="Logo" width="150" />
</div>

### 改变文字颜色

使用 HTML `<span>` 标签配合内联样式：

```html
<span style="color: #FF3B30;">这是红色文字</span>
<span style="color: #34C759;">这是绿色文字</span>
<span style="color: #007AFF;">这是蓝色文字</span>
<span style="color: #D4AF76;">这是香槟金色文字</span>
```

**实际效果**：

<span style="color: #FF3B30;">这是红色文字</span>
<span style="color: #34C759;">这是绿色文字</span>
<span style="color: #007AFF;">这是蓝色文字</span>
<span style="color: #D4AF76;">这是香槟金色文字</span>

**更多样式组合**：

```html
<span style="color: #FF3B30; font-weight: bold; font-size: 1.2em;">
  大号加粗红色文字
</span>
```

<span style="color: #FF3B30; font-weight: bold; font-size: 1.2em;">
  大号加粗红色文字
</span>

### 代码块

使用三个反引号创建代码块，并指定语言以启用语法高亮：

````markdown
```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```
````

效果：

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

**支持的常用语言**：`c`, `cpp`, `python`, `javascript`, `typescript`, `java`, `rust`, `go`, `bash`, `json`, `yaml`, `html`, `css`

### 数学公式

使用 KaTeX 渲染数学公式：

**行内公式**（使用单个 `$`）：

```markdown
质能方程：$E = mc^2$
```

效果：质能方程：$E = mc^2$

**块级公式**（使用双 `$$`）：

```markdown
$$
\int_0^\infty x^2 dx = \frac{x^3}{3} \bigg|_0^\infty
$$
```

效果：

$$
\int_0^\infty x^2 dx = \frac{x^3}{3} \bigg|_0^\infty
$$

**更多示例**：

```markdown
<!-- 求和 -->
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

<!-- 矩阵 -->
$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
$$

<!-- 分数 -->
$$
\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}
$$
```

### 表格

使用 GFM（GitHub Flavored Markdown）表格语法：

```markdown
| 姓名 | 年龄 | 专业 |
|------|------|------|
| 张三 | 20   | 计算机 |
| 李四 | 22   | 电子工程 |
| 王五 | 21   | 软件工程 |
```

效果：

| 姓名 | 年龄 | 专业 |
|------|------|------|
| 张三 | 20   | 计算机 |
| 李四 | 22   | 电子工程 |
| 王五 | 21   | 软件工程 |

**对齐方式**：

```markdown
| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| A      | B        | C      |
| AAA    | BBB      | CCC    |
```

| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| A      | B        | C      |
| AAA    | BBB      | CCC    |

### 引用块

```markdown
> 这是一段引用文字。
>
> 可以包含多个段落。
```

效果：

> 这是一段引用文字。
>
> 可以包含多个段落。

### 任务列表

```markdown
- [x] 已完成的任务
- [ ] 未完成的任务
- [ ] 另一个待办事项
```

效果：

- [x] 已完成的任务
- [ ] 未完成的任务
- [ ] 另一个待办事项

## Front Matter 配置

每篇文章开头的 YAML 配置区域：

```yaml
---
title: "文章标题"
date: 2024-01-21
author: "ThAce"
category: "分类名称"
tags: ["标签1", "标签2"]
description: "文章简短描述"
icon: "/icons/图标文件名.svg"
important: false
---
```

**字段说明**：

- `title`: 文章标题（必填）
- `date`: 发布日期，格式 YYYY-MM-DD（必填）
- `author`: 作者名称（必填）
- `category`: 分类文件夹名称（必填）
- `tags`: 标签数组，用于筛选（必填）
- `description`: 文章描述，显示在卡片上（必填）
- `icon`: 图标路径，显示在卡片左上角（可选）
- `important`: 是否为重要文章（可选，默认 false）

## 常用颜色参考

本站配色方案（晨曦香槟）：

```css
主蓝色: #007AFF
浅蓝色: #5AC8FA

背景色:
  - 主背景: #FDFBF7
  - 次要背景: #F5F5F7
  - 卡片背景: #F4E8D8

文字色:
  - 主文字: #1D1D1F
  - 次要文字: #86868B
  - 香槟金: #D4AF76
  - 温暖文字: #6B5F4D

强调色:
  - 绿色: #34C759
  - 橙色: #FF9500
  - 红色: #FF3B30
  - 紫色: #AF52DE
```

## 最佳实践

### 1. 文章结构

```markdown
# 文章主标题

简短介绍段落。

## 第一个主要部分

内容...

### 子章节

内容...

## 第二个主要部分

内容...

## 总结

总结性段落。
```

### 2. 图片优化

- 使用 WebP 或 AVIF 格式以获得更好的压缩率
- 将图片放在 `public/images/` 目录
- 使用有意义的文件名：`example-diagram.png` 而不是 `img001.png`
- 始终添加 `alt` 属性以提高可访问性

### 3. 代码块最佳实践

- 始终指定语言以启用语法高亮
- 保持代码示例简洁，专注于要点
- 添加注释解释关键部分
- 使用一致的缩进（2 或 4 空格）

### 4. 数学公式建议

- 行内公式用于简短表达式：$x + y = z$
- 块级公式用于复杂推导或需要重点展示的公式
- 使用 `\text{}` 在公式中插入文字说明

## 常见问题

### Q: 为什么我的图片不显示？

A: 检查以下几点：
1. 图片路径是否正确（以 `/` 开头表示从 public 目录开始）
2. 图片文件是否存在于 `public/` 目录
3. 文件名大小写是否匹配

### Q: 如何换行？

A: Markdown 中换行有两种方式：
- 段落间换行：空一行
- 行内换行：在行尾添加两个空格 + Enter

### Q: 代码块中如何显示反引号？

A: 使用四个反引号包裹三个反引号：

`````markdown
````markdown
```code```
````
`````

## 参考资源

- [Markdown 官方指南](https://www.markdownguide.org/)
- [GitHub Flavored Markdown 规范](https://github.github.com/gfm/)
- [KaTeX 支持的函数列表](https://katex.org/docs/supported.html)

---

**更新日期**: 2024-01-21
**如有问题或建议，欢迎反馈！**
