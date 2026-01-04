---
title: "Python基础入门"
date: 2024-02-11
author: "嵌入式知识库"
category: "python"
tags: ["Python", "入门", "教程"]
description: "Python编程语言基础入门，学习Python核心语法和特性"
icon: "/icons/Python.svg"
---

# Python基础入门

Python是一门简洁、易学的编程语言，广泛应用于数据分析、人工智能、Web开发等领域。

## 什么是Python

Python是一种解释型、面向对象、动态类型的高级编程语言。

### Python的特点

- 语法简洁清晰
- 强大的标准库
- 丰富的第三方库
- 跨平台支持

## 基础语法

### 变量与数据类型

```python
# 整数
age = 25

# 浮点数
height = 1.75

# 字符串
name = "Alice"

# 布尔值
is_student = True

# 列表
numbers = [1, 2, 3, 4, 5]

# 字典
person = {"name": "Bob", "age": 30}
```

### 控制流

```python
# if语句
if age >= 18:
    print("成年人")
else:
    print("未成年人")

# for循环
for i in range(5):
    print(i)

# while循环
count = 0
while count < 5:
    print(count)
    count += 1
```

### 函数定义

```python
def greet(name):
    return f"Hello, {name}!"

result = greet("World")
print(result)
```
