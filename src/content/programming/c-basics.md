# C语言基础 - 嵌入式开发核心

## 概述

C语言是嵌入式系统开发的核心语言，由于其高效性、可移植性和对硬件的直接控制能力，成为嵌入式工程师必须掌握的技能。本文将深入介绍C语言在嵌入式开发中的应用。

## 为什么选择C语言？

### 🚀 性能优势
- **高效执行**：编译后的代码执行效率高
- **内存控制**：精确控制内存分配和释放
- **硬件访问**：直接操作寄存器和内存地址
- **实时性**：满足嵌入式系统的实时性要求

### 🔧 技术特点
- **结构化编程**：清晰的程序结构
- **可移植性**：跨平台兼容性好
- **丰富的库**：标准库和第三方库支持
- **工具链成熟**：编译器、调试器完善

## 基础语法回顾

### 数据类型
```c
// 基本数据类型
char c = 'A';           // 字符型，1字节
int num = 42;           // 整型，通常4字节
float pi = 3.14f;       // 单精度浮点，4字节
double e = 2.718;       // 双精度浮点，8字节

// 无符号类型
unsigned char byte = 255;
unsigned int count = 1000;

// 指定位宽的类型（stdint.h）
uint8_t  data8 = 0xFF;     // 8位无符号整数
uint16_t data16 = 0xFFFF;  // 16位无符号整数
uint32_t data32 = 0xFFFFFFFF; // 32位无符号整数
```

### 指针操作
```c
#include <stdio.h>

int main() {
    int value = 100;
    int *ptr = &value;  // 指针指向value的地址
    
    printf("值: %d\n", value);        // 输出: 100
    printf("地址: %p\n", &value);     // 输出地址
    printf("指针值: %p\n", ptr);      // 输出相同地址
    printf("指针指向的值: %d\n", *ptr); // 输出: 100
    
    // 通过指针修改值
    *ptr = 200;
    printf("修改后的值: %d\n", value); // 输出: 200
    
    return 0;
}
```

## 嵌入式特有概念

### 寄存器操作
```c
#include <stdint.h>

// 定义寄存器地址（以STM32为例）
#define GPIOA_BASE    0x40020000
#define GPIOA_MODER   (*(volatile uint32_t*)(GPIOA_BASE + 0x00))
#define GPIOA_ODR     (*(volatile uint32_t*)(GPIOA_BASE + 0x14))

void gpio_init() {
    // 设置PA5为输出模式
    GPIOA_MODER &= ~(3 << (5 * 2));  // 清除对应位
    GPIOA_MODER |= (1 << (5 * 2));   // 设置为输出模式
}

void led_toggle() {
    // 切换PA5引脚状态
    GPIOA_ODR ^= (1 << 5);
}
```

### 中断处理
```c
#include <stm32f4xx.h>

// 中断服务函数
void EXTI0_IRQHandler(void) {
    if (EXTI->PR & EXTI_PR_PR0) {
        // 处理外部中断0
        led_toggle();
        
        // 清除中断标志
        EXTI->PR |= EXTI_PR_PR0;
    }
}

// 中断初始化
void interrupt_init() {
    // 使能SYSCFG时钟
    RCC->APB2ENR |= RCC_APB2ENR_SYSCFGEN;
    
    // 配置外部中断线
    SYSCFG->EXTICR[0] &= ~SYSCFG_EXTICR1_EXTI0;
    SYSCFG->EXTICR[0] |= SYSCFG_EXTICR1_EXTI0_PA;
    
    // 配置中断触发方式
    EXTI->IMR |= EXTI_IMR_MR0;    // 使能中断
    EXTI->FTSR |= EXTI_FTSR_TR0;  // 下降沿触发
    
    // 使能NVIC中断
    NVIC_EnableIRQ(EXTI0_IRQn);
}
```

## 内存管理

### 静态内存分配
```c
// 全局变量（存储在数据段）
int global_var = 100;
static int static_var = 200;

// 常量（存储在只读段）
const int readonly_data = 300;

void function_example() {
    // 局部变量（存储在栈上）
    int local_var = 400;
    
    // 静态局部变量（存储在数据段）
    static int static_local = 500;
    
    printf("局部变量地址: %p\n", &local_var);
    printf("静态变量地址: %p\n", &static_local);
}
```

### 动态内存分配
```c
#include <stdlib.h>
#include <string.h>

void dynamic_memory_example() {
    // 分配内存
    int *buffer = (int*)malloc(10 * sizeof(int));
    if (buffer == NULL) {
        printf("内存分配失败\n");
        return;
    }
    
    // 初始化内存
    memset(buffer, 0, 10 * sizeof(int));
    
    // 使用内存
    for (int i = 0; i < 10; i++) {
        buffer[i] = i * i;
    }
    
    // 释放内存
    free(buffer);
    buffer = NULL;  // 避免悬空指针
}
```

## 位操作技巧

### 常用位操作宏
```c
// 位操作宏定义
#define SET_BIT(reg, bit)     ((reg) |= (1 << (bit)))
#define CLEAR_BIT(reg, bit)   ((reg) &= ~(1 << (bit)))
#define TOGGLE_BIT(reg, bit)  ((reg) ^= (1 << (bit)))
#define READ_BIT(reg, bit)    (((reg) >> (bit)) & 1)

// 多位操作
#define SET_BITS(reg, mask)    ((reg) |= (mask))
#define CLEAR_BITS(reg, mask)  ((reg) &= ~(mask))
#define MODIFY_BITS(reg, mask, value) \
    ((reg) = ((reg) & ~(mask)) | ((value) & (mask)))

// 使用示例
void bit_operations_example() {
    uint32_t register_value = 0x00000000;
    
    // 设置第3位
    SET_BIT(register_value, 3);
    printf("设置第3位后: 0x%08X\n", register_value);
    
    // 清除第3位
    CLEAR_BIT(register_value, 3);
    printf("清除第3位后: 0x%08X\n", register_value);
    
    // 切换第5位
    TOGGLE_BIT(register_value, 5);
    printf("切换第5位后: 0x%08X\n", register_value);
    
    // 读取第5位
    int bit_value = READ_BIT(register_value, 5);
    printf("第5位的值: %d\n", bit_value);
}
```

## 结构体与联合体

### 结构体应用
```c
// 传感器数据结构
typedef struct {
    float temperature;    // 温度
    float humidity;      // 湿度
    uint32_t timestamp;  // 时间戳
    uint8_t status;      // 状态标志
} sensor_data_t;

// 配置结构体
typedef struct {
    uint32_t baudrate;   // 波特率
    uint8_t data_bits;   // 数据位
    uint8_t stop_bits;   // 停止位
    uint8_t parity;      // 校验位
} uart_config_t;

void struct_example() {
    sensor_data_t sensor = {
        .temperature = 25.5f,
        .humidity = 60.0f,
        .timestamp = 1234567890,
        .status = 0x01
    };
    
    printf("温度: %.1f°C\n", sensor.temperature);
    printf("湿度: %.1f%%\n", sensor.humidity);
}
```

### 联合体应用
```c
// 数据转换联合体
typedef union {
    uint32_t word;
    uint16_t half_word[2];
    uint8_t byte[4];
    struct {
        uint8_t byte0;
        uint8_t byte1;
        uint8_t byte2;
        uint8_t byte3;
    } bytes;
} data_converter_t;

void union_example() {
    data_converter_t converter;
    converter.word = 0x12345678;
    
    printf("完整字: 0x%08X\n", converter.word);
    printf("高半字: 0x%04X\n", converter.half_word[1]);
    printf("低半字: 0x%04X\n", converter.half_word[0]);
    printf("字节0: 0x%02X\n", converter.bytes.byte0);
    printf("字节1: 0x%02X\n", converter.bytes.byte1);
}
```

## 编译优化

### 编译器指令
```c
// 内联函数
static inline uint32_t read_register(volatile uint32_t *reg) {
    return *reg;
}

// 强制不优化
volatile uint32_t debug_counter = 0;

// 属性指定
__attribute__((packed)) struct packed_struct {
    uint8_t byte1;
    uint32_t word1;
    uint8_t byte2;
};

// 对齐指定
__attribute__((aligned(4))) uint8_t aligned_buffer[100];

// 段指定
__attribute__((section(".custom_section"))) 
const uint32_t custom_data[] = {1, 2, 3, 4, 5};
```

## 最佳实践

### 1. 代码规范
- 使用有意义的变量名
- 保持函数简洁（不超过50行）
- 添加必要的注释
- 使用一致的缩进和格式

### 2. 错误处理
```c
typedef enum {
    STATUS_OK = 0,
    STATUS_ERROR = -1,
    STATUS_TIMEOUT = -2,
    STATUS_INVALID_PARAM = -3
} status_t;

status_t safe_function(uint8_t *buffer, size_t size) {
    // 参数检查
    if (buffer == NULL || size == 0) {
        return STATUS_INVALID_PARAM;
    }
    
    // 执行操作
    // ...
    
    return STATUS_OK;
}
```

### 3. 资源管理
```c
void resource_management_example() {
    uint8_t *buffer = malloc(1024);
    if (buffer == NULL) {
        return;  // 分配失败，直接返回
    }
    
    // 使用资源
    // ...
    
    // 确保释放资源
    free(buffer);
    buffer = NULL;
}
```

## 总结

C语言是嵌入式开发的基石，掌握其核心概念对于成为优秀的嵌入式工程师至关重要。通过本文的学习，您应该能够：

✅ 理解C语言的基本语法和数据类型  
✅ 掌握指针和内存管理  
✅ 学会位操作和寄存器编程  
✅ 了解结构体和联合体的应用  
✅ 掌握编译优化和最佳实践  

继续深入学习，结合实际项目练习，您将能够编写出高效、可靠的嵌入式程序。