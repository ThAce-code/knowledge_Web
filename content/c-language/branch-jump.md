---
title: "C语言分支与跳转"
date: 2024-01-21
author: "ThAce"
category: "c-language"
tags: ["C语言","分支","基础"]
description: "掌握if-else、switch-case等分支语句及break、continue跳转控制"
icon: "/icons/C.svg"
---

# 分支与跳转

## 引言

本章逻辑结构如下：
- 先介绍分支语句（if 和 switch）。
- 然后讲解跳转语句（break 和 continue）。
- 最后讨论嵌套分支、常见错误和最佳实践。

## 第一节：分支基础

分支语句根据条件表达式的结果，选择执行不同的代码块。条件通常是关系或逻辑表达式，返回真（非0）或假（0）。

**关键术语**：
- **条件表达式**：如 a > b，返回1或0。
- **代码块**：用{}包围的语句组。
- **else**：可选的“否则”部分。

分支让程序“聪明”起来，处理多种可能性。

## 第二节：if 语句

if 语句是最基本的分支：如果条件真，执行代码块。

**语法**：
```c
if (条件) {
    // 代码块
}
```

**示例**：检查正数。
```c
#include <stdio.h>

int main() {
    int num = 5;
    if (num > 0) {
        printf("正数\n");
    }
    printf("继续执行\n");  // 总是执行
    return 0;
}
```
输出：正数\n继续执行

### 2.1 if-else 语句

添加 else 处理条件假的情况。

**语法**：
```c
if (条件) {
    // 真时执行
} else {
    // 假时执行
}
```

**示例**：
```c
if (num > 0) {
    printf("正数\n");
} else {
    printf("非正数\n");
}
```

### 2.2 else if 梯级

处理多个条件，像阶梯一样检查。

**语法**：
```c
if (条件1) {
    // ...
} else if (条件2) {
    // ...
} else {
    // 默认
}
```

**示例**：成绩等级。
```c
int score = 85;
if (score >= 90) {
    printf("A\n");
} else if (score >= 80) {
    printf("B\n");
} else if (score >= 70) {
    printf("C\n");
} else {
    printf("D\n");
}
```
输出：B

**注意事项**：
- 条件从上到下检查，一旦真，就执行并跳出。
- {} 可省略如果只有一个语句，但推荐总是用{}避免错误。
- 嵌套 if：if 内可有另一个 if。

## 第三节：switch 语句

switch 用于多分支选择，基于整数值匹配 case。比长链 else if 更高效、可读。

**语法**：
```c
switch (表达式) {
    case 值1:
        // 代码
        break;
    case 值2:
        // 代码
        break;
    default:
        // 默认
}
```

**示例**：星期选择。
```c
#include <stdio.h>

int main() {
    int day = 3;
    switch (day) {
        case 1:
            printf("星期一\n");
            break;
        case 2:
            printf("星期二\n");
            break;
        case 3:
            printf("星期三\n");
            break;
        default:
            printf("无效\n");
    }
    return 0;
}
```
输出：星期三

**注意事项**：
- 表达式必须是整数类型（int、char 等）。
- case 值是常量。
- break 防止“掉落”（fall-through），否则继续下一个 case。如果有意fall-through，可以省略break，但需添加注释说明。
- default 可选，处理不匹配。
- 支持 case 范围（C99+）：case 1 ... 5: 但不标准，用 if 代替。

## 第四节：跳转语句

跳转语句改变正常执行顺序。在本节，我们重点讲解break和continue，它们不仅用于循环，还可与分支结合使用。

### 4.1 break 语句

break 用于立即退出当前结构：
- 在循环中：退出循环，继续执行循环后的代码。
- 在switch中：退出switch，防止fall-through。

**示例（switch中）**：
```c
switch (day) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        printf("工作日\n");
        break;  // 退出switch
    case 6:
    case 7:
        printf("周末\n");
        break;
}
```

**示例（循环中回顾）**：
```c
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;  // 提前退出循环
    }
    printf("%d ", i);  // 输出: 1 2 3 4
}
```

**注意事项**：
- 在嵌套结构中，break只影响最近的循环或switch。
- 使用break可以简化代码，但过多使用可能降低可读性。

### 4.2 continue 语句

continue 用于跳过当前迭代的剩余代码，直接进入下一次迭代。只适用于循环（while、do-while、for），不能用于switch或if。

**示例**：
```c
for (int i = 1; i <= 5; i++) {
    if (i % 2 == 0) {
        continue;  // 跳过偶数，继续下一次
    }
    printf("%d ", i);  // 输出: 1 3 5
}
```

**注意事项**：
- continue 会跳到循环的更新部分（for的第三部分）或条件检查。
- 在while/do-while中，确保更新语句在continue前，否则可能无限循环。
- 用continue可以避免深嵌套if，提高代码清晰度。

## 第五节：嵌套分支和最佳实践

### 5.1 嵌套分支

分支可嵌套，如 if 内有 switch。

**示例**：检查年龄和性别。
```c
if (age >= 18) {
    if (gender == 'M') {
        printf("成年男性\n");
    } else {
        printf("成年女性\n");
    }
} else {
    printf("未成年\n");
}
```

### 5.2 常见错误

- 悬挂 else：忘记{}导致 else 匹配错 if。
- switch 忘 break：意外 fall-through。
- 浮点比较：用 fabs(a - b) < epsilon 代替 a == b。
- 逻辑错误：条件写反，如 > 写成 <。
- continue/break 误用：continue 只在循环中有效。

### 5.3 最佳实践

- 用 switch 处理多常量分支，if 处理范围或复杂条件。
- 保持嵌套浅（不超过3层），否则用函数拆分。
- 用条件运算符简化简单分支：max = (a > b) ? a : b;
- 在循环中使用continue/break简化逻辑，但注释说明意图。

## 总结

这一章我们掌握了分支（if、switch）和跳转（break 和 continue），结合循环，你能写出完整控制流程序。决策让程序活起来！
