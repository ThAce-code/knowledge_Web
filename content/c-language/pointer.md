---
title: "C语言指针详解"
date: 2024-01-17
author: "嵌入式知识库"
category: "c-language"
tags: ["C语言","指针","进阶"]
description: "系统讲解C语言指针的基础知识、指针运算、动态内存分配及指针与数组的关系"
icon: "/icons/C.svg"
---

# 指针

## 引言

本章逻辑结构如下：
- 先介绍指针基础。
- 然后讲解指针运算和高级类型。
- 接着讨论动态内存分配。
- 最后探讨数组与指针的关系、字符串指针、常见错误和最佳实践。

## 第一节：指针基础

指针变量存储其他变量的内存地址。

### 1.1 为什么用指针？

- 修改函数参数（传引用）。
- 动态分配内存。
- 高效遍历数组/字符串。
- 构建数据结构如链表。

### 1.2 声明和初始化

- 语法：类型 *指针名;
- 示例：int *p; // p指向int
- 初始化：int x=10; int *p = &x; // &取地址
- 空指针：int *p = NULL; // #include <stdlib.h>

### 1.3 取地址&和解引用*

- &x：x的地址。
- *p：p指向的值。
- 修改：*p = 20; // x=20

**示例代码**：
```c
#include <stdio.h>

int main() {
    int x = 10;
    int *p = &x;
    printf("x: %d, 地址: %p\n", x, (void*)p);
    *p += 5;
    printf("修改后x: %d\n", x);  // 15
    return 0;
}
```

### 1.4 指针类型和兼容性

- 类型决定步长：int* +1 跳4字节，char* +1 跳1字节。
- void*：通用，可转任何，但不可*。

**注意事项**：
- 野指针：未初始化p，随机地址。
- 强制转换：(double*)p，但小心对齐。

## 第二节：指针运算和高级指针

### 2.1 指针算术

- p + n、p - n、++p、p++。
- p1 - p2：元素间距离。
- 示例：遍历int arr[5]; int *p=arr; *(p+2)=30;

### 2.2 指针比较

- ==, !=, <, > 等，比较地址。

### 2.3 const指针

- const int *p; // 不可改*p
- int *const p; // 不可改p
- const int *const p; // 两者不可

### 2.4 多级指针

- int **pp; // 二级
- 示例：修改指针int *p; int **pp=&p; *pp = &y;

### 2.5 函数指针

- int (*func)(int);
- 用作回调：qsort用比较函数指针。

**示例**：函数指针数组。
```c
int add(int a, int b) { return a+b; }
int sub(int a, int b) { return a-b; }
int (*ops[2])(int,int) = {add, sub};
printf("%d\n", ops[0](5,3));  // 8
```

## 第三节：动态内存分配

指针实现运行时分配。

- #include <stdlib.h>
- malloc(size)：分配字节，返回void*
- 示例：int *arr = malloc(5*sizeof(int));
- calloc(n, size)：清零分配。
- realloc(p, new_size)：调整。
- free(p); p=NULL;

**示例**：动态数组。
c
int *arr = malloc(3*sizeof(int));
arr[0]=1; arr[1]=2; arr[2]=3;
arr = realloc(arr, 5*sizeof(int));
arr[3]=4; arr[4]=5;
free(arr);


**注意事项**：
- 检查NULL：if(!arr) { perror("malloc"); exit(1); }
- 内存碎片：频繁alloc。

## 第四节：数组与指针的关系

- 数组名arr == &arr[0]，是指针常量。
- arr[i] == *(arr + i)
- 函数传int arr[] == int*
- 多维：int matrix[3][4]; int (*p)[4] = matrix;

**字符串指针**：
- char *s = "hello"; // 常量，不可改
- 修改需数组或malloc。

## 第五节：常见错误和最佳实践

- **解引用无效**：NULL、悬挂（free后）。
- **内存泄漏**：忘free。
- **溢出**：指针+超范围。
- **最佳实践**：用valgrind查漏。const防误。RAII思维（分配后立即计划free）。

## 总结与进阶

这一章我们深入指针，从基础到动态应用，与数组结合强大。

进阶：指针与struct、文件指针。