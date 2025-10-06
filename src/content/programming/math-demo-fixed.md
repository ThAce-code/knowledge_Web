---
title: "数学公式与图片渲染演示（修复版）"
description: "演示数学公式渲染和图片懒加载功能"
date: "2024-01-15"
author: "系统管理员"
tags: ["数学", "LaTeX", "KaTeX", "图片", "渲染"]
category: "编程"
readTime: "5分钟"
---

# 数学公式与图片渲染演示

## 数学公式渲染测试

### 行内公式

这是一个行内公式示例：$E = mc^2$，爱因斯坦的质能方程。

当我们讨论圆的面积时，公式是 $A = \pi r^2$，其中 $r$ 是半径。

### 块级公式

以下是一些常见的数学公式：

**二次方程求根公式：**

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

**欧拉恒等式：**

$$e^{i\pi} + 1 = 0$$

**积分公式：**

$$\int_{a}^{b} f(x) dx = F(b) - F(a)$$

**矩阵表示：**

$$\begin{pmatrix} a & b \\ c & d \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} ax + by \\ cx + dy \end{pmatrix}$$

**求和公式：**

$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$

**极限定义：**

$$\lim_{x \to 0} \frac{\sin x}{x} = 1$$

## 数学符号与特殊字符

### 希腊字母

- Alpha: $\alpha$, $\Alpha$
- Beta: $\beta$, $\Beta$  
- Gamma: $\gamma$, $\Gamma$
- Delta: $\delta$, $\Delta$
- Pi: $\pi$, $\Pi$
- Sigma: $\sigma$, $\Sigma$
- Omega: $\omega$, $\Omega$

### 数学运算符

- 加减乘除: $+ - \times \div$
- 分数: $\frac{1}{2}$, $\frac{a}{b}$
- 根号: $\sqrt{2}$, $\sqrt[3]{8}$, $\sqrt[n]{x}$
- 指数: $x^2$, $e^{-x}$, $2^{n}$
- 下标: $x_1$, $a_{ij}$, $\log_2 x$

### 比较运算符

- 等于: $=$, $\neq$, $\equiv$
- 大小: $>$, $<$, $\geq$, $\leq$
- 约等于: $\approx$, $\sim$
- 属于: $\in$, $\notin$, $\subset$, $\supset$

### 逻辑符号

- 逻辑与或: $\land$, $\lor$, $\neg$
- 蕴含: $\Rightarrow$, $\Leftarrow$, $\Leftrightarrow$
- 存在量词: $\exists$, $\forall$

## 复杂公式示例

### 傅里叶变换

$$F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-i\omega t} dt$$

### 麦克斯韦方程组

**高斯定律（电场）：**
$$\nabla \cdot \mathbf{E} = \frac{\rho}{\epsilon_0}$$

**高斯定律（磁场）：**
$$\nabla \cdot \mathbf{B} = 0$$

**法拉第定律：**
$$\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}$$

**安培定律：**
$$\nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \epsilon_0 \frac{\partial \mathbf{E}}{\partial t}$$

### 薛定谔方程

$$i\hbar \frac{\partial}{\partial t} \Psi(\mathbf{r}, t) = \hat{H} \Psi(\mathbf{r}, t)$$

### 其他重要公式

**牛顿第二定律：**
$$\mathbf{F} = m\mathbf{a}$$

**能量守恒：**
$$E = K + U = \text{常数}$$

**波动方程：**
$$\frac{\partial^2 u}{\partial t^2} = c^2 \nabla^2 u$$

## 图片渲染测试

### 本地图片

![本地测试图片](/images/blackhole-background.png)



### 图片说明

上面的图片演示了懒加载功能：
1. 图片只有在进入视口时才开始加载
2. 加载过程中显示占位符
3. 加载失败时显示错误提示

## 总结

通过以上演示，我们可以看到：

1. **数学公式渲染**：支持行内公式 `$...$` 和块级公式 `$$...$$`
2. **图片懒加载**：图片只有在进入视口时才开始加载，提升页面性能
3. **错误处理**：当图片加载失败时，显示友好的错误提示
4. **响应式设计**：图片和公式在不同设备上都有良好的显示效果

这些功能大大增强了知识库的表达能力，特别适合技术文档、数学教程和科学论文的展示。