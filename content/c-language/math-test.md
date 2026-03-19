---
title: "数学公式测试"
date: 2024-01-20
author: "ThAce"
category: "c-language"
tags: ["测试", "数学公式"]
description: "测试 KaTeX 数学公式渲染功能，验证行内公式与块级公式的正确显示，包含常见数学符号与复杂公式示例"
icon: "/icons/C.svg"
---

# 数学公式渲染测试

## 行内数学公式

这是一个行内公式示例：质能方程 $E = mc^2$ 是爱因斯坦提出的。

圆的面积公式是 $A = \pi r^2$，其中 $r$ 是半径。

勾股定理：$a^2 + b^2 = c^2$

## 块级数学公式

### 积分公式

$$
\int_0^\infty x^2 dx = \frac{x^3}{3} \bigg|_0^\infty
$$

### 求和公式

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

### 矩阵

$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
$$

### 二次公式

$$
x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}
$$

### 微积分

傅里叶变换：

$$
F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-i\omega t} dt
$$

### 希腊字母和符号

$$
\alpha, \beta, \gamma, \Delta, \Theta, \lambda, \mu, \pi, \sigma, \Omega
$$

$$
\leq, \geq, \neq, \approx, \equiv, \subset, \supset, \in, \notin
$$

### 分数和根号

$$
\frac{1}{2} + \frac{3}{4} = \frac{5}{4}
$$

$$
\sqrt{16} = 4, \quad \sqrt[3]{27} = 3
$$

## 组合使用

在算法分析中，我们常用大 O 符号表示时间复杂度。例如，快速排序的平均时间复杂度为 $O(n \log n)$。

最坏情况下的时间复杂度为：

$$
T(n) = O(n^2)
$$

空间复杂度为 $O(\log n)$，因为需要递归调用栈。

## 代码块与数学公式结合

```c
// 计算圆的面积
double calculateCircleArea(double radius) {
    // 面积公式：A = πr²
    return 3.14159 * radius * radius;
}
```

对应的数学公式：$A = \pi r^2$

## 总结

这个测试文件包含了：

- ✅ 行内数学公式（使用单个 `$`）
- ✅ 块级数学公式（使用双 `$$`）
- ✅ 各种数学符号和希腊字母
- ✅ 积分、求和、矩阵等复杂公式
- ✅ 代码块与数学公式的组合使用
