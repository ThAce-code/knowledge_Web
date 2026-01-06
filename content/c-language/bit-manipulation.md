---
title: "C语言位操作"
date: 2024-01-24
author: "ThAce"
category: "c-language"
tags: ["C语言","位操作","进阶"]
description: "掌握C语言位运算符及其在嵌入式编程中的应用"
icon: "/icons/C.svg"
---

# 位运算

## 引言

本章逻辑结构如下：
- 先回顾二进制基础。
- 然后讲解进制转换。
- 接着详解位运算符。
- 然后讨论实际应用。
- 最后探讨常见错误和最佳实践。

## 第一节：二进制基础

C语言的整数（如int）在内存中以二进制存储。位（bit）是0或1，8位=1字节。

### 1.1 二进制表示

- 示例：十进制10是二进制1010（1*8 + 0*4 + 1*2 + 0*1）。
- 负数：用补码（two's complement），如-1是全1（111...1）。
- 十六进制：方便表示二进制，如0xA = 1010。

**查看二进制**：用循环和&1检查每位。
```c
#include <stdio.h>

void printBinary(int n) {
    for (int i = 31; i >= 0; i--) {  // 假设32位int
        printf("%d", (n >> i) & 1);
        if (i % 8 == 0) printf(" ");  // 分组
    }
    printf("\n");
}

int main() {
    printBinary(10);  // 输出: ...0000 0000 0000 0000 0000 0000 0000 1010
    return 0;
}
```

**注意事项**：
- int通常32位，long 64位（系统相关）。
- 无符号：unsigned int，避免负数补码问题。

## 第二节：进制转换

进制转换是位运算的基础，帮助理解二进制表示。C中常用十进制（base 10）、二进制（base 2）和十六进制（base 16）。转换可用位运算加速。

### 2.1 十进制转二进制

- 方法：除2取余，从低位到高位。
- 示例：10 / 2 = 5 余0；5 / 2 = 2 余1；2 / 2 = 1 余0；1 / 2 = 0 余1 → 1010。

**代码示例**：递归或循环转换。
```c
#include <stdio.h>

void decToBin(int n) {
    if (n == 0) {
        printf("0");
        return;
    }
    decToBin(n / 2);
    printf("%d", n % 2);
}

int main() {
    decToBin(10);  // 输出: 1010
    printf("\n");
    return 0;
}
```

### 2.2 二进制转十进制

- 方法：位权求和，从右到左：2^0, 2^1, ...
- 示例：1010 = 0*1 + 1*2 + 0*4 + 1*8 = 10。
- 用位运算：累加 (n & 1) * pow，然后 n >>= 1。

**代码示例**：
```c
#include <stdio.h>
#include <math.h>

int binToDec(int bin) {  // 假设bin是二进制值，如10=1010b
    int dec = 0, base = 1;
    while (bin > 0) {
        dec += (bin & 1) * base;
        bin >>= 1;
        base *= 2;
    }
    return dec;
}

int main() {
    printf("%d\n", binToDec(10));  // 10 (1010b=10d)
    return 0;
}
```

### 2.3 十六进制转换

- 十六进制：0-9,A-F（10-15）。每位4二进制。
- C中：printf("%x", n); // 小写十六进制

#### 2.3.1 十进制转十六进制

- 方法：除16取余，从低位到高位。
- 示例：255 / 16 = 15 余15 (F)；15 / 16 = 0 余15 (F) → FF。

**代码示例**：
```c
#include <stdio.h>

void decToHex(int n) {
    if (n == 0) {
        printf("0");
        return;
    }
    decToHex(n / 16);
    int rem = n % 16;
    if (rem < 10) printf("%d", rem);
    else printf("%c", 'A' + rem - 10);
}

int main() {
    decToHex(255);  // 输出: FF
    printf("\n");
    return 0;
}
```

### 2.3.2 十六进制转二进制

- 方法：每个十六进制位转换为4位二进制（nibbles）。这可以用“8421”法的便捷方法：对于每个十六进制数字digit（0-F），检查其位权（8=位3, 4=位2, 2=位1, 1=位0），用&运算提取每位。
- 示例：0xA4 = 0b10100100；检查 (A & 8)=0 (位3=0), (A & 4)!=0 (位2=1), (A & 2)=0 (位1=0), (A & 1)=0 (位0=0) → 0100。

这种方法类似于8421 BCD码的位权提取，高效且直观，尤其适合硬件或嵌入式实现。

**代码示例**：十六进制字符串转二进制打印（用8421位权方法）。
```c
#include <stdio.h>
#include <ctype.h>

void hexToBin(char *hex) {
    int len = 0;
    while (hex[len]) len++;
    for (int i = 0; i < len; i++) {
        int digit;
        if (isdigit(hex[i])) digit = hex[i] - '0';
        else digit = toupper(hex[i]) - 'A' + 10;
        // 用8421位权便捷提取：位3(8),位2(4),位1(2),位0(1)
        printf("%d", (digit & 8) ? 1 : 0);  // 位3 (8的权重)
        printf("%d", (digit & 4) ? 1 : 0);  // 位2 (4的权重)
        printf("%d", (digit & 2) ? 1 : 0);  // 位1 (2的权重)
        printf("%d", (digit & 1) ? 1 : 0);  // 位0 (1的权重)
    }
    printf("\n");
}

int main() {
    hexToBin("A");   // 输出: 1010
    hexToBin("FF");  // 输出: 11111111
    return 0;
}
```

**注意事项**：
- 大数用long long。
- 负数转换：先转正，处理符号。
- 库函数：sprintf(buf, "%x", n); 格式化到字符串。

### 2.4 8421法（BCD码）

“8421”法，也称为8421 BCD码（Binary-Coded Decimal，二进制编码十进制），是一种将十进制数字转换为二进制表示的方法，常用于数字显示设备（如LED数码管）或金融计算中，以确保十进制与二进制间的精确转换。它将每个十进制数字（0-9）用4位二进制码表示，位权重分别为8、4、2、1（从高位到低位）。

- **基本原理**：每个十进制数字独立编码为4位二进制：
  - 0: 0000
  - 1: 0001
  - 2: 0010
  - 3: 0011
  - 4: 0100
  - 5: 0101
  - 6: 0110
  - 7: 0111
  - 8: 1000
  - 9: 1001
- 示例：十进制数123编码为 0001 0010 0011（每个数字4位，共12位）。
- 与纯二进制不同，BCD码不进行进位压缩（如十进制99的纯二进制是1100011（7位），但8421 BCD是1001 1001（8位）），因此它保持了十进制的“形状”，便于显示和验证。

**优点与应用**：
- **优点**：易于十进制转换和校验，避免二进制累加误差；适合硬件实现。
- **缺点**：浪费位数（4位表示0-9，只用10种组合）。
- **应用**：老式计算器、时钟显示、信用卡磁条编码。C语言中，可用位运算（如&、|、<<）实现编码/解码。

**代码示例**：十进制转8421 BCD。
```c
#include <stdio.h>

void decToBCD(int num) {
    if (num < 0 || num > 999) {  // 假设3位数
        printf("无效输入\n");
        return;
    }
    char bcd[12] = {0};  // 12位缓冲
    int pos = 0;
    int temp = num;
    while (temp > 0) {
        int digit = temp % 10;
        // 8421编码digit
        bcd[pos++] = (digit & 8) ? '1' : '0';  // 第3位 (8)
        bcd[pos++] = (digit & 4) ? '1' : '0';  // 第2位 (4)
        bcd[pos++] = (digit & 2) ? '1' : '0';  // 第1位 (2)
        bcd[pos++] = (digit & 1) ? '1' : '0';  // 第0位 (1)
        temp /= 10;
    }
    // 逆序打印（高位在前）
    for (int i = pos - 1; i >= 0; i--) {
        printf("%c", bcd[i]);
    }
    printf("\n");
}

int main() {
    decToBCD(123);  // 输出: 000100100011
    return 0;
}
```

**注意事项**：
- 大数用long long。
- 负数转换：先转正，处理符号。
- 库函数：sprintf(buf, "%x", n); 格式化到字符串。

## 第三节：位运算符

位运算符操作两个整数的对应位。优先级低于算术，高于关系。

<table>
  <thead>
    <tr>
      <th>运算符</th>
      <th>描述</th>
      <th>示例（a=5:0101, b=3:0011）</th>
      <th>结果（二进制）</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>&</td>
      <td>按位与</td>
      <td>a & b</td>
      <td>0001 (1)</td>
    </tr>
    <tr>
      <td>&#124;</td>
      <td>按位或</td>
      <td>a &#124; b</td>
      <td>0111 (7)</td>
    </tr>
    <tr>
      <td>^</td>
      <td>按位异或</td>
      <td>a ^ b</td>
      <td>0110 (6)</td>
    </tr>
    <tr>
      <td>~</td>
      <td>按位取反</td>
      <td>~a</td>
      <td>...1010 (负数)</td>
    </tr>
    <tr>
      <td><<</td>
      <td>左移</td>
      <td>a << 1</td>
      <td>1010 (10)</td>
    </tr>
    <tr>
      <td>>></td>
      <td>右移</td>
      <td>a >> 1</td>
      <td>0010 (2)</td>
    </tr>
  </tbody>
</table>

### 3.1 按位与（&）

- 两对应位都1，结果1。
- 应用：掩码，提取位，如检查奇偶：n & 1。

**示例**：设置标志。
```c
#define FLAG_READ 1   // 0001
#define FLAG_WRITE 2  // 0010

int flags = FLAG_READ | FLAG_WRITE;  // 0011 (3)
if (flags & FLAG_READ) printf("可读\n");  // 是
```

### 3.2 按位或（|）

- 一对应位为1，结果1。
- 应用：设置位，如flags |= FLAG_WRITE;

### 3.3 按位异或（^）

- 对应位不同，结果1。
- 应用：交换变量（无临时）：a ^= b; b ^= a; a ^= b; 或加密XOR。

**示例**：交换。
```c
int a=10, b=20;
a ^= b; b ^= a; a ^= b;
printf("%d %d\n", a, b);  // 20 10
```

### 3.4 按位取反（~）

- 翻转每位。
- 注意：符号位翻转，~5 = -6（补码）。

### 3.5 移位运算（<< 和 >>）

- "<<"：左移，相当于*2^n（n位）。
- ">>"：右移，相当于/2^n。正数逻辑移，负数算术移（符号位保留）。
- 示例：a << 2 = 20 (10100)。

**注意事项**：
- 移位超位宽未定义（int 32位，移32位错）。
- 无符号右移填充0。

## 第四节：位运算应用

### 4.1 位掩码

- 用&/|设置/清除位。
- 示例：清除第3位：flags &= ~(1 << 2); // ~010 = ...101

### 4.2 位字段（bit-field）

- struct内指定位宽，节省空间。
- 语法：struct { int flag:1; int value:7; }; // 1位标志，7位值
- 示例：
```c
struct Flags {
    unsigned int read:1;
    unsigned int write:1;
    unsigned int execute:1;
};

struct Flags f = {1,0,1};
printf("%d\n", f.read);  // 1
```

### 4.3 其他应用

- 快速乘除：<<2 *4，>>1 /2。
- 人口计数（popcount）：__builtin_popcount(n)（GCC）。
- 加密：XOR密钥。

**示例**：权限检查。
```c
int checkPerm(int user, int perm) {
    return (user & perm) == perm;  // 用户有所有所需权限
}
```

**注意事项**：
- 位字段实现依赖编译器，大端/小端。
- 优化时用无符号。

## 第五节：常见错误和最佳实践

- **符号位移**：负数>>保留符号，意外。用意数unsigned。
- **移位超宽**：n << 32 未定义。用n % 32。
- **~误用**：~int 翻符号位，负数大。
- **位字段对齐**：跨int边界填充。
- **最佳实践**：用#define宏定义掩码（如FLAG_READ (1<<0)）。无符号位运算。注释位含义。测试二进制打印。避免复杂表达式，用临时变量。

## 总结与进阶

这一章我们掌握了位运算，从运算符到应用，能优化底层代码。结合指针（位操作内存）和结构体（位字段），你的C技能更全面。

进阶阅读：内在函数（如__builtin_clz计数前导0）、SIMD位运算。
