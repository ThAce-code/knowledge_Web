# 函数

## 引言

本章逻辑结构如下：
- 先介绍函数基础（声明、定义、调用）。
- 然后讲解参数和返回值（包括指针应用）。
- 接着讨论递归和高级主题。
- 最后探讨作用域、静态函数、常见错误和最佳实践。

## 第一节：函数基础

函数是一段命名代码块，可被调用执行特定任务。C程序从main()开始，但main()可调用其他函数。

### 1.1 函数声明（原型）

- 告诉编译器函数的存在、类型和参数。
- 语法：返回类型 函数名(参数类型 参数名); // 参数名可选
- 示例：int add(int a, int b); // 声明
- 放在文件开头或头文件中。无参数：int func(void);

### 1.2 函数定义

- 实际实现。
- 语法：返回类型 函数名(参数) { // 代码; return 值; }
- 示例：
```c
int add(int a, int b) {
    return a + b;
}
```
- 无返回值：void func() { // ... } 无return，或return; 退出。

### 1.3 函数调用

- 在代码中使用函数名和参数。
- 示例：int sum = add(3, 4); // sum=7
- main()示例：
```c
#include <stdio.h>

int add(int a, int b);  // 声明

int main() {
    int result = add(5, 6);
    printf("结果: %d\n", result);  // 11
    return 0;
}

int add(int a, int b) {  // 定义
    return a + b;
}
```

**注意事项**：
- 定义前需声明，否则链接错误。
- 参数匹配：类型和数量。
- main()是入口，必须返回int。

## 第二节：参数传递与返回值

### 2.1 按值传递

- 默认方式：复制参数值给函数，修改不影响原变量。
- 示例：add(3,4) 复制3和4。

**完整示例**：交换函数（值传递版），展示无法修改原变量。
```c
#include <stdio.h>

void swap_by_value(int x, int y) {  // x 和 y 是 a 和 b 的副本
    int temp = x;
    x = y;
    y = temp;  // 只交换副本，不影响原变量
}

int main() {
    int a = 10, b = 20;
    printf("交换前: a=%d, b=%d\n", a, b);  // 10 20
    swap_by_value(a, b);
    printf("交换后: a=%d, b=%d\n", a, b);  // 仍为 10 20（未变）
    return 0;
}
```
这里，函数内交换只影响局部副本，a和b保持不变。这突显值传递的局限，与指针传参不同，后者可修改原变量。

### 2.2 指针传参数（按地址）

- 用指针修改原变量。
- 示例：交换函数。
```c
void swap(int *x, int *y) {
    int temp = *x;
    *x = *y;
    *y = temp;
}

int main() {
    int a=10, b=20;
    swap(&a, &b);  // 传地址
    printf("%d %d\n", a, b);  // 20 10
    return 0;
}
```
- 数组传参：int arr[] 实际是int *arr。

### 2.3 返回值

- return 值; // 匹配返回类型
- 多值：用指针返回多个，如void getMinMax(int arr[], int size, int *min, int *max)
- 无return的void函数可省略return。

**示例**：数组求和，用指针传size。
```c
int sumArray(int arr[], int size) {
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += arr[i];
    }
    return sum;
}
```

**注意事项**：
- 指针参数需检查NULL。
- 变参函数：用<stdarg.h>，如printf（高级，下一章）。

## 第三节：递归函数

递归：函数调用自身，解决子问题。需基线条件避免无限递归。

**示例**：阶乘。
```c
int factorial(int n) {
    if (n <= 1) return 1;  // 基线
    return n * factorial(n - 1);  // 递归
}

int main() {
    printf("%d\n", factorial(5));  // 120
    return 0;
}
```

**斐波那契**：
```c
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}
```

**注意事项**：
- 栈溢出：递归太深（如fib(40)）。
- 优化：尾递归或记忆化（用数组缓存）。
- 迭代代替：循环更高效。

## 第四节：作用域与存储类

### 4.1 作用域

- 局部：函数内变量，只在函数可见。
- 全局：文件外定义，全文件可见。
- 静态局部：static int x; // 保留值跨调用，但只函数内可见。

### 4.2 存储类

- auto：默认局部。
- register：建议寄存器存储（优化）。
- extern：声明外部变量/函数。
- static：全局只本文件可见；函数内保留值。

**示例**：静态计数器。
```c
int counter() {
    static int count = 0;  // 保留
    return ++count;
}
```

**头文件**：.h文件放声明，.c放定义。#include "myfunc.h"

## 第五节：常见错误和最佳实践

- **未定义前调用**：忘声明。
- **参数不匹配**：类型/数量错。
- **递归无基线**：栈溢出。
- **局部返回地址**：返回局部指针，悬挂。
- **最佳实践**：小函数（<20行）。单一职责。const参数防改。用头文件模块化。注释参数/返回。

## 总结与进阶

这一章我们掌握了函数，从基础到递归，学会模块化编程。结合指针，你能写传地址函数；与数组，处理批量数据。

进阶阅读：变参函数、内联函数、库函数。