---
title: "C语言结构体"
date: 2024-01-18
author: "ThAce"
category: "c-language"
tags: ["C语言","结构体","进阶"]
description: "学习C语言结构体的定义、使用和高级特性，掌握复杂数据类型的组织方法"
icon: "/icons/C.svg"
---

# 结构与其他数据形式

## 引言

本章逻辑结构如下：
- 先介绍结构体基础。
- 然后讲解结构体数组、指针和嵌套。
- 接着讨论联合体和枚举。
- 最后探讨typedef、常见错误和最佳实践。


## 第一节：结构体基础

结构体（struct）是用户自定义类型，组合不同类型成员，形成一个整体。像一个“容器”，存储相关数据。

### 1.1 定义结构体

- 语法：struct 标签 { 类型 成员1; 类型 成员2; ... };
- 示例：
```c
struct Point {
    int x;
    double y;
};
```
- 标签如Point是可选的，但推荐用，便于引用。

### 1.2 声明和初始化变量

- 声明：struct Point p1; // p1是Point类型变量
- 初始化：struct Point p1 = {3, 4.5}; // 按顺序初始化成员
- 指定初始化（C11+）：struct Point p1 = {.x=3, .y=4.5};
- 指针：struct Point *pp = &p1;

### 1.3 访问成员

- . 操作符：p1.x = 10; // 点操作
- -> 操作符（指针）：pp->x = 20; // 等价 (*pp).x
- 示例：计算距离。
```c
#include <stdio.h>
#include <math.h>

struct Point {
    int x;
    double y;
};

double distance(struct Point p1, struct Point p2) {
    double dx = p1.x - p2.x;
    double dy = p1.y - p2.y;
    return sqrt(dx*dx + dy*dy);
}

int main() {
    struct Point p1 = {0, 0};
    struct Point p2 = {3, 4};
    printf("距离: %.2f\n", distance(p1, p2));  // 5.00
    return 0;
}
```

**注意事项**：
- 成员按声明顺序内存布局，可能有填充（padding）对齐（详见进阶）。
- sizeof(struct Point) = sizeof(int) + sizeof(double)，通常12字节。
- **与数组的区别**：数组是同构的（所有元素相同类型），访问用索引（arr[0]）；结构体是异构的（成员不同类型），访问用成员名（p1.x）。数组适合序列数据，结构体适合相关属性组合。

## 第二节：结构体数组、指针和嵌套

### 2.1 结构体数组

- 声明：struct Point points[5];
- 初始化：struct Point points[2] = {{1,2.0}, {3,4.0}};
- 访问：points[0].x = 10;

**示例**：打印数组中所有点。
```c
for (int i = 0; i < 2; i++) {
    printf("点%d: (%d, %.1f)\n", i, points[i].x, points[i].y);
}
```

### 2.2 结构体指针

- 传参：void printPoint(struct Point *p) { printf("(%d, %.1f)\n", p->x, p->y); }
- 动态分配：struct Point *p = malloc(sizeof(struct Point)); p->x=1; free(p);

### 2.3 嵌套结构体

- 一个struct内含另一个。
- 示例：
```c
struct Rect {
    struct Point topLeft;
    struct Point bottomRight;
};
struct Rect r = {{0,0}, {10,5}};
printf("宽度: %d\n", r.bottomRight.x - r.topLeft.x);  // 10
```

**注意事项**：
- 嵌套时，内存连续。指针可遍历结构体数组如数组指针。
- 传结构体：按值复制整个（低效大struct），推荐传指针。

## 第三节：联合体和枚举

### 3.1 联合体（union）

- 成员共享同一内存块，节省空间。大小为最大成员。
- 语法：union 标签 { 类型 成员1; 类型 成员2; };
- 示例：
```c
union Data {
    int i;
    float f;
    char c;
};
union Data d;
d.i = 65;
printf("%c %.1f\n", d.c, d.f);  // A 65.0（重叠解释）
```
- 用法：变体类型，如解析不同格式数据。

**注意事项**：
- 只保证一个成员有效。sizeof(union Data)=sizeof(float)，通常4。

### 3.2 枚举（enum）

- 定义常量集合，如颜色。
- 语法：enum 标签 { 值1=0, 值2=1, ... };
- 示例：
```c
enum Color { RED, GREEN=5, BLUE };
enum Color c = RED;  // c=0
printf("%d\n", GREEN);  // 5
```
- 默认从0递增。enum类型如int。

**示例**：switch用enum。
```c
switch (c) {
    case RED: printf("红色\n"); break;
    default: printf("未知\n");
}
```

**注意事项**：
- enum常量不可改。提升可读性。

## 第四节：typedef

- 为类型起别名，提高可读性。
- 语法：typedef 现有类型 新名;
- 示例：typedef struct Point Point_t; // Point_t 等价 struct Point
- 用法：typedef int Age; Age a=20;
- 复杂：typedef struct { ... } Node;

**示例**：
```c
typedef struct {
    char name[50];
    int age;
} Student;

Student s = {"Alice", 20};
```

**注意事项**：
- typedef不创建新类型，只别名。常用于指针：typedef int* IntPtr;

## 第五节：常见错误和最佳实践

- **成员访问错**：用.或->混淆。
- **内存对齐**：大struct传值低效，用指针。
- **union误用**：多成员同时读错值。
- **enum未用switch**：丢case。
- **最佳实践**：小struct（<sizeof(int)*4）。初始化所有成员。用const struct Point ORIGIN = {0,0}; 。函数传指针改struct。头文件放typedef和struct声明。

## 总结与进阶

这一章我们掌握了结构体等自定义类型，能创建复杂数据。结合指针（链表节点struct）和函数（操作struct），你的程序更模块化。

进阶阅读：bit-field（struct内位域）、自引用struct（链表）、内存布局（#pragma pack）。
