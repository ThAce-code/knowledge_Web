---
title: "STM32入门教程"
date: 2024-01-15
author: "嵌入式知识库"
category: "microcontroller"
tags: ["STM32", "ARM", "嵌入式"]
description: "从零开始学习STM32开发,了解ARM Cortex-M架构和开发环境搭建"
icon: "/icons/Core, processor.svg"
---

# STM32入门教程

欢迎来到STM32的世界！本教程将带你从零开始学习STM32微控制器开发。

## 什么是STM32

STM32是意法半导体(ST)公司推出的基于ARM Cortex-M内核的32位微控制器系列。它具有以下特点：

- 高性能：主频可达480MHz (STM32H7系列)
- 低功耗：多种低功耗模式
- 丰富外设：SPI、I2C、UART、CAN、USB等
- 开发便捷：完善的开发工具链

## 开发环境搭建

### 1. 硬件准备

- STM32开发板（推荐STM32F103C8T6核心板）
- ST-Link调试器
- USB数据线

### 2. 软件安装

下载并安装以下软件：

1. **Keil MDK** 或 **STM32CubeIDE**
2. **STM32CubeMX** - 图形化配置工具
3. **ST-Link驱动程序**

## 第一个程序：LED闪烁

让我们编写第一个程序，让板载LED灯闪烁起来。

### 代码示例

```c
#include "stm32f1xx_hal.h"

// LED初始化
void LED_Init(void) {
    __HAL_RCC_GPIOC_CLK_ENABLE();

    GPIO_InitTypeDef GPIO_InitStruct = {0};
    GPIO_InitStruct.Pin = GPIO_PIN_13;
    GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
    GPIO_InitStruct.Pull = GPIO_NOPULL;
    GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
    HAL_GPIO_Init(GPIOC, &GPIO_InitStruct);
}

int main(void) {
    HAL_Init();
    LED_Init();

    while(1) {
        HAL_GPIO_TogglePin(GPIOC, GPIO_PIN_13);
        HAL_Delay(500);
    }
}
```

### 代码解析

1. `LED_Init()` - 初始化GPIOC的13号引脚为推挽输出模式
2. `HAL_GPIO_TogglePin()` - 翻转GPIO引脚状态
3. `HAL_Delay()` - 延时500毫秒

## GPIO工作原理

STM32的GPIO具有多种工作模式：

- **输入模式**：浮空输入、上拉输入、下拉输入
- **输出模式**：推挽输出、开漏输出
- **复用功能**：SPI、I2C、UART等外设功能
- **模拟模式**：ADC、DAC等模拟外设

## 下一步学习

掌握LED控制后，可以继续学习：

1. 按键输入和中断
2. 定时器的使用
3. 串口通信 (UART)
4. PWM输出
5. ADC模数转换

## 总结

本教程介绍了STM32的基础知识和第一个LED闪烁程序。希望你能动手实践，享受嵌入式开发的乐趣！

## 参考资料

- [STM32官方文档](https://www.st.com)
- STM32F1系列参考手册
- HAL库用户手册
