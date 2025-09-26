# CPU处理器基础

## 概述

中央处理器（CPU）是计算机系统的核心，负责执行指令和处理数据。在嵌入式系统中，了解CPU的工作原理对于优化程序性能和系统设计至关重要。

## CPU基本架构

### 冯·诺依曼架构
```
┌─────────────┐    ┌─────────────┐
│   控制器    │◄──►│   运算器    │
│ (Control)   │    │   (ALU)     │
└─────────────┘    └─────────────┘
       ▲                  ▲
       │                  │
       ▼                  ▼
┌─────────────────────────────────┐
│          存储器                 │
│    (指令和数据共享)             │
└─────────────────────────────────┘
```

### 哈佛架构
```
┌─────────────┐    ┌─────────────┐
│   控制器    │◄──►│   运算器    │
│ (Control)   │    │   (ALU)     │
└─────────────┘    └─────────────┘
       ▲                  ▲
       │                  │
┌─────────────┐    ┌─────────────┐
│  指令存储器  │    │  数据存储器  │
│(Program Mem)│    │ (Data Mem)  │
└─────────────┘    └─────────────┘
```

## ARM Cortex-M系列

### Cortex-M4架构特点
- **32位RISC架构**
- **哈佛架构**
- **3级流水线**
- **单精度FPU（可选）**
- **DSP指令集**

### 寄存器组织
```c
// ARM Cortex-M4 寄存器
// 通用寄存器 R0-R12
// R13: 栈指针 (SP)
// R14: 链接寄存器 (LR)  
// R15: 程序计数器 (PC)

// 特殊寄存器访问示例
uint32_t get_msp(void) {
    uint32_t result;
    __asm volatile ("MRS %0, msp" : "=r" (result));
    return result;
}

void set_msp(uint32_t topOfMainStack) {
    __asm volatile ("MSR msp, %0" : : "r" (topOfMainStack));
}
```

### 指令集示例
```assembly
; ARM汇编指令示例
.text
.global _start

_start:
    ; 数据传输指令
    MOV R0, #100        ; 立即数传送
    LDR R1, =0x20000000 ; 加载地址
    STR R0, [R1]        ; 存储数据
    
    ; 算术指令
    ADD R2, R0, R1      ; 加法
    SUB R3, R2, #50     ; 减法
    MUL R4, R2, R3      ; 乘法
    
    ; 逻辑指令
    AND R5, R0, #0xFF   ; 按位与
    ORR R6, R0, #0x100  ; 按位或
    EOR R7, R0, R1      ; 按位异或
    
    ; 分支指令
    CMP R0, #0          ; 比较
    BEQ zero_branch     ; 相等则跳转
    BL  function_call   ; 带链接的跳转
    
zero_branch:
    ; 处理零值情况
    NOP
    
function_call:
    ; 函数实现
    BX LR               ; 返回
```

## 指令执行流程

### 取指-译码-执行循环
```c
// 简化的CPU执行模型
typedef struct {
    uint32_t pc;        // 程序计数器
    uint32_t ir;        // 指令寄存器
    uint32_t registers[16]; // 通用寄存器
    uint32_t flags;     // 状态标志
} cpu_state_t;

void cpu_cycle(cpu_state_t *cpu, uint32_t *memory) {
    // 1. 取指 (Fetch)
    cpu->ir = memory[cpu->pc];
    cpu->pc += 4;  // ARM指令长度为4字节
    
    // 2. 译码 (Decode)
    uint32_t opcode = (cpu->ir >> 26) & 0x3F;
    uint32_t rd = (cpu->ir >> 12) & 0xF;
    uint32_t rn = (cpu->ir >> 16) & 0xF;
    uint32_t rm = cpu->ir & 0xF;
    
    // 3. 执行 (Execute)
    switch(opcode) {
        case 0x04: // ADD
            cpu->registers[rd] = cpu->registers[rn] + cpu->registers[rm];
            break;
        case 0x02: // SUB
            cpu->registers[rd] = cpu->registers[rn] - cpu->registers[rm];
            break;
        // ... 其他指令
    }
}
```

### 流水线技术
```
时钟周期:  1    2    3    4    5    6
指令1:   取指  译码  执行
指令2:        取指  译码  执行
指令3:             取指  译码  执行
指令4:                  取指  译码  执行
```

## 中断系统

### NVIC (嵌套向量中断控制器)
```c
#include "stm32f4xx.h"

// 中断优先级配置
void interrupt_priority_config(void) {
    // 设置中断优先级分组
    NVIC_SetPriorityGrouping(NVIC_PRIORITYGROUP_4);
    
    // 配置外部中断优先级
    NVIC_SetPriority(EXTI0_IRQn, NVIC_EncodePriority(NVIC_GetPriorityGrouping(), 2, 0));
    NVIC_EnableIRQ(EXTI0_IRQn);
    
    // 配置定时器中断优先级
    NVIC_SetPriority(TIM2_IRQn, NVIC_EncodePriority(NVIC_GetPriorityGrouping(), 1, 0));
    NVIC_EnableIRQ(TIM2_IRQn);
}

// 中断服务函数
void EXTI0_IRQHandler(void) {
    // 保存上下文（硬件自动完成）
    
    // 中断处理代码
    if (EXTI->PR & EXTI_PR_PR0) {
        // 处理外部中断
        handle_external_interrupt();
        
        // 清除中断标志
        EXTI->PR |= EXTI_PR_PR0;
    }
    
    // 恢复上下文（硬件自动完成）
}
```

### 中断向量表
```c
// 中断向量表定义
__attribute__((section(".isr_vector")))
const uint32_t vector_table[] = {
    (uint32_t)&_estack,           // 0: 栈顶指针
    (uint32_t)Reset_Handler,      // 1: 复位处理函数
    (uint32_t)NMI_Handler,        // 2: NMI处理函数
    (uint32_t)HardFault_Handler,  // 3: 硬件错误处理函数
    (uint32_t)MemManage_Handler,  // 4: 内存管理错误
    (uint32_t)BusFault_Handler,   // 5: 总线错误
    (uint32_t)UsageFault_Handler, // 6: 使用错误
    0,                            // 7: 保留
    0,                            // 8: 保留
    0,                            // 9: 保留
    0,                            // 10: 保留
    (uint32_t)SVC_Handler,        // 11: 系统调用
    (uint32_t)DebugMon_Handler,   // 12: 调试监控
    0,                            // 13: 保留
    (uint32_t)PendSV_Handler,     // 14: 可挂起系统调用
    (uint32_t)SysTick_Handler,    // 15: 系统滴答定时器
    
    // 外部中断
    (uint32_t)WWDG_IRQHandler,    // 16: 窗口看门狗
    (uint32_t)PVD_IRQHandler,     // 17: 电源电压检测
    // ... 更多中断向量
};
```

## 内存管理单元 (MMU/MPU)

### MPU配置示例
```c
// Cortex-M4 MPU配置
void mpu_config(void) {
    // 禁用MPU
    MPU->CTRL = 0;
    
    // 配置区域0: Flash存储器 (只读)
    MPU->RNR = 0;  // 选择区域0
    MPU->RBAR = 0x08000000;  // 基地址
    MPU->RASR = (0x16 << MPU_RASR_SIZE_Pos) |  // 1MB大小
                (0x06 << MPU_RASR_AP_Pos) |    // 只读权限
                MPU_RASR_ENABLE_Msk;           // 使能区域
    
    // 配置区域1: SRAM (读写)
    MPU->RNR = 1;
    MPU->RBAR = 0x20000000;
    MPU->RASR = (0x11 << MPU_RASR_SIZE_Pos) |  // 128KB大小
                (0x03 << MPU_RASR_AP_Pos) |    // 读写权限
                MPU_RASR_ENABLE_Msk;
    
    // 使能MPU
    MPU->CTRL = MPU_CTRL_ENABLE_Msk | MPU_CTRL_PRIVDEFENA_Msk;
    
    // 内存屏障指令
    __DSB();
    __ISB();
}
```

## 性能优化技术

### 缓存系统
```c
// Cortex-M7 缓存控制
void cache_config(void) {
    // 使能指令缓存
    SCB_EnableICache();
    
    // 使能数据缓存
    SCB_EnableDCache();
    
    // 缓存维护操作
    SCB_CleanDCache();        // 清理数据缓存
    SCB_InvalidateICache();   // 无效化指令缓存
}

// 缓存友好的数据访问
void cache_friendly_copy(uint32_t *dst, const uint32_t *src, size_t count) {
    // 按缓存行大小对齐的拷贝
    const size_t cache_line_size = 32;  // 32字节缓存行
    
    while (count >= cache_line_size / sizeof(uint32_t)) {
        // 预取下一个缓存行
        __builtin_prefetch(src + cache_line_size / sizeof(uint32_t), 0, 3);
        
        // 拷贝一个缓存行
        for (int i = 0; i < cache_line_size / sizeof(uint32_t); i++) {
            *dst++ = *src++;
        }
        count -= cache_line_size / sizeof(uint32_t);
    }
    
    // 处理剩余数据
    while (count--) {
        *dst++ = *src++;
    }
}
```

### 分支预测优化
```c
// 使用likely/unlikely宏优化分支预测
#define likely(x)   __builtin_expect(!!(x), 1)
#define unlikely(x) __builtin_expect(!!(x), 0)

int process_data(int *data, size_t count) {
    for (size_t i = 0; i < count; i++) {
        // 错误情况不太可能发生
        if (unlikely(data[i] < 0)) {
            return -1;  // 错误处理
        }
        
        // 正常处理路径
        if (likely(data[i] > 0)) {
            data[i] *= 2;
        }
    }
    return 0;
}
```

## 功耗管理

### 时钟管理
```c
// STM32 时钟配置
void clock_config(void) {
    // 使能HSE外部晶振
    RCC->CR |= RCC_CR_HSEON;
    while (!(RCC->CR & RCC_CR_HSERDY));
    
    // 配置PLL
    RCC->PLLCFGR = (RCC_PLLCFGR_PLLSRC_HSE |
                    (8 << RCC_PLLCFGR_PLLM_Pos) |   // PLLM = 8
                    (336 << RCC_PLLCFGR_PLLN_Pos) | // PLLN = 336
                    (0 << RCC_PLLCFGR_PLLP_Pos) |   // PLLP = 2
                    (7 << RCC_PLLCFGR_PLLQ_Pos));   // PLLQ = 7
    
    // 使能PLL
    RCC->CR |= RCC_CR_PLLON;
    while (!(RCC->CR & RCC_CR_PLLRDY));
    
    // 配置Flash等待周期
    FLASH->ACR = FLASH_ACR_ICEN | FLASH_ACR_DCEN | FLASH_ACR_LATENCY_5WS;
    
    // 切换系统时钟到PLL
    RCC->CFGR = (RCC->CFGR & ~RCC_CFGR_SW) | RCC_CFGR_SW_PLL;
    while ((RCC->CFGR & RCC_CFGR_SWS) != RCC_CFGR_SWS_PLL);
}
```

### 低功耗模式
```c
// 进入睡眠模式
void enter_sleep_mode(void) {
    // 配置唤醒源
    // ...
    
    // 进入睡眠模式
    __WFI();  // 等待中断
}

// 进入停止模式
void enter_stop_mode(void) {
    // 清除唤醒标志
    PWR->CR |= PWR_CR_CWUF;
    
    // 进入停止模式
    PWR->CR |= PWR_CR_LPDS;  // 低功耗深度睡眠
    SCB->SCR |= SCB_SCR_SLEEPDEEP_Msk;
    
    __WFI();
    
    // 唤醒后恢复时钟
    clock_config();
}
```

## 调试和性能分析

### DWT (数据观察点和跟踪)
```c
// 使能DWT计数器
void dwt_init(void) {
    // 使能DWT
    CoreDebug->DEMCR |= CoreDebug_DEMCR_TRCENA_Msk;
    
    // 复位计数器
    DWT->CYCCNT = 0;
    
    // 使能周期计数器
    DWT->CTRL |= DWT_CTRL_CYCCNTENA_Msk;
}

// 性能测量
uint32_t measure_performance(void (*func)(void)) {
    uint32_t start, end;
    
    start = DWT->CYCCNT;
    func();
    end = DWT->CYCCNT;
    
    return end - start;  // 返回时钟周期数
}
```

### ITM (仪器跟踪宏单元)
```c
// ITM输出函数
void itm_send_char(char ch) {
    if ((ITM->TCR & ITM_TCR_ITMENA_Msk) &&
        (ITM->TER & (1UL << 0))) {
        while (ITM->PORT[0].u32 == 0);
        ITM->PORT[0].u8 = ch;
    }
}

// 重定向printf到ITM
int _write(int file, char *ptr, int len) {
    for (int i = 0; i < len; i++) {
        itm_send_char(ptr[i]);
    }
    return len;
}
```

## 总结

CPU是嵌入式系统的核心，深入理解其工作原理对于系统优化至关重要。通过本文学习，您应该掌握：

✅ CPU基本架构和指令执行流程  
✅ ARM Cortex-M系列特点和编程  
✅ 中断系统的配置和使用  
✅ 内存管理和保护机制  
✅ 性能优化技术  
✅ 功耗管理策略  
✅ 调试和性能分析方法  

这些知识将帮助您设计出更高效、更可靠的嵌入式系统。