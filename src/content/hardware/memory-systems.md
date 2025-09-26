# 内存系统原理

## 概述

内存系统是计算机架构中的关键组件，负责存储程序和数据，为CPU提供快速的数据访问。理解内存的工作机制、类型分类和性能优化对于嵌入式系统设计至关重要。

## 内存层次结构

### 存储器层次
```
CPU寄存器 (1-2 cycles)
    ↓
L1缓存 (1-3 cycles)
    ↓
L2缓存 (10-20 cycles)
    ↓
L3缓存 (20-40 cycles)
    ↓
主内存 (100-300 cycles)
    ↓
存储设备 (10,000+ cycles)
```

### 性能特征对比
| 存储类型 | 容量 | 访问时间 | 成本/GB |
|---------|------|----------|---------|
| 寄存器 | 32-64B | 0.25ns | 极高 |
| L1缓存 | 32-64KB | 0.5-1ns | 很高 |
| L2缓存 | 256KB-1MB | 2-5ns | 高 |
| L3缓存 | 8-32MB | 10-20ns | 中高 |
| 主内存 | 4-64GB | 50-100ns | 中 |
| SSD | 256GB-4TB | 0.1-1ms | 低 |
| HDD | 1-16TB | 5-10ms | 很低 |

## 内存类型详解

### SRAM (静态随机存储器)
```c
// SRAM特点示例 - 用于缓存和寄存器文件
typedef struct {
    uint32_t data;
    uint8_t valid;
    uint8_t dirty;
    uint16_t tag;
} cache_line_t;

// SRAM优势
// - 访问速度快 (1-10ns)
// - 无需刷新
// - 功耗相对较低
// - 接口简单

// SRAM劣势
// - 成本高
// - 密度低
// - 面积大
```

### DRAM (动态随机存储器)
```c
// DRAM刷新机制
#define REFRESH_PERIOD_MS 64  // 64ms刷新周期
#define ROWS_COUNT 8192       // 行数

void dram_refresh_controller(void) {
    static uint32_t current_row = 0;
    static uint32_t refresh_timer = 0;
    
    refresh_timer++;
    
    // 每个刷新间隔刷新一行
    if (refresh_timer >= (REFRESH_PERIOD_MS * 1000 / ROWS_COUNT)) {
        // 发送刷新命令到当前行
        dram_refresh_row(current_row);
        
        current_row = (current_row + 1) % ROWS_COUNT;
        refresh_timer = 0;
    }
}
```

### DDR SDRAM 演进
```c
// DDR规格对比
typedef struct {
    char name[10];
    uint32_t frequency_mhz;
    uint32_t data_rate_mtps;
    uint32_t bandwidth_gbps;
    float voltage;
} ddr_spec_t;

const ddr_spec_t ddr_specs[] = {
    {"DDR",    100,  200,  1.6,  2.5},
    {"DDR2",   200,  400,  3.2,  1.8},
    {"DDR3",   400,  800,  6.4,  1.5},
    {"DDR4",   800, 1600, 12.8,  1.2},
    {"DDR5",  1600, 3200, 25.6,  1.1}
};
```

## 内存控制器

### 基本架构
```c
// 内存控制器结构
typedef struct {
    uint32_t base_address;
    uint32_t size;
    uint8_t  bus_width;
    uint8_t  cas_latency;
    uint8_t  ras_latency;
    uint8_t  refresh_rate;
} memory_controller_t;

// 内存访问时序
typedef struct {
    uint8_t cl;   // CAS Latency
    uint8_t trcd; // RAS to CAS Delay
    uint8_t trp;  // RAS Precharge
    uint8_t tras; // Active to Precharge
} memory_timing_t;

void memory_controller_init(memory_controller_t *ctrl, memory_timing_t *timing) {
    // 配置内存控制器寄存器
    MEMORY_CTRL->CONFIG = (ctrl->bus_width << 16) | 
                         (timing->cl << 8) | 
                         (timing->trcd << 4) | 
                         timing->trp;
    
    // 设置刷新率
    MEMORY_CTRL->REFRESH = (ctrl->refresh_rate << 16) | 0x1;
    
    // 使能内存控制器
    MEMORY_CTRL->ENABLE = 0x1;
}
```

### 地址映射
```c
// 内存地址解码
typedef struct {
    uint8_t bank;
    uint16_t row;
    uint16_t column;
} memory_address_t;

memory_address_t decode_address(uint32_t physical_addr) {
    memory_address_t addr;
    
    // 地址位分配 (示例)
    // [31:28] - 未使用
    // [27:25] - Bank (3位, 8个Bank)
    // [24:12] - Row (13位, 8192行)
    // [11:2]  - Column (10位, 1024列)
    // [1:0]   - 字节选择
    
    addr.bank = (physical_addr >> 25) & 0x7;
    addr.row = (physical_addr >> 12) & 0x1FFF;
    addr.column = (physical_addr >> 2) & 0x3FF;
    
    return addr;
}
```

## 缓存系统

### 缓存组织方式
```c
// 直接映射缓存
#define CACHE_SIZE 1024
#define BLOCK_SIZE 32
#define NUM_BLOCKS (CACHE_SIZE / BLOCK_SIZE)

typedef struct {
    uint32_t tag;
    uint8_t valid;
    uint8_t data[BLOCK_SIZE];
} cache_block_t;

cache_block_t cache[NUM_BLOCKS];

uint8_t cache_read(uint32_t address) {
    uint32_t block_addr = address / BLOCK_SIZE;
    uint32_t block_index = block_addr % NUM_BLOCKS;
    uint32_t tag = block_addr / NUM_BLOCKS;
    uint32_t offset = address % BLOCK_SIZE;
    
    cache_block_t *block = &cache[block_index];
    
    // 缓存命中
    if (block->valid && block->tag == tag) {
        return block->data[offset];
    }
    
    // 缓存未命中 - 从内存加载
    load_from_memory(block, address & ~(BLOCK_SIZE - 1));
    block->tag = tag;
    block->valid = 1;
    
    return block->data[offset];
}
```

### 组相联缓存
```c
// 2路组相联缓存
#define WAYS 2
#define SETS (NUM_BLOCKS / WAYS)

typedef struct {
    cache_block_t ways[WAYS];
    uint8_t lru_counter[WAYS];  // LRU替换策略
} cache_set_t;

cache_set_t cache_sets[SETS];

uint8_t set_associative_read(uint32_t address) {
    uint32_t block_addr = address / BLOCK_SIZE;
    uint32_t set_index = block_addr % SETS;
    uint32_t tag = block_addr / SETS;
    uint32_t offset = address % BLOCK_SIZE;
    
    cache_set_t *set = &cache_sets[set_index];
    
    // 检查所有路
    for (int way = 0; way < WAYS; way++) {
        if (set->ways[way].valid && set->ways[way].tag == tag) {
            // 更新LRU
            update_lru(set, way);
            return set->ways[way].data[offset];
        }
    }
    
    // 缓存未命中 - 选择LRU路替换
    int lru_way = find_lru_way(set);
    load_from_memory(&set->ways[lru_way], address & ~(BLOCK_SIZE - 1));
    set->ways[lru_way].tag = tag;
    set->ways[lru_way].valid = 1;
    update_lru(set, lru_way);
    
    return set->ways[lru_way].data[offset];
}
```

## 内存管理单元 (MMU)

### 虚拟内存映射
```c
// 页表项结构
typedef struct {
    uint32_t present : 1;      // 页面存在位
    uint32_t writable : 1;     // 可写位
    uint32_t user : 1;         // 用户访问位
    uint32_t write_through : 1; // 写通位
    uint32_t cache_disable : 1; // 缓存禁用位
    uint32_t accessed : 1;     // 访问位
    uint32_t dirty : 1;        // 脏位
    uint32_t reserved : 2;     // 保留位
    uint32_t available : 3;    // 可用位
    uint32_t frame : 20;       // 物理页框号
} page_table_entry_t;

// 地址转换
uint32_t virtual_to_physical(uint32_t virtual_addr) {
    uint32_t page_dir_index = (virtual_addr >> 22) & 0x3FF;
    uint32_t page_table_index = (virtual_addr >> 12) & 0x3FF;
    uint32_t offset = virtual_addr & 0xFFF;
    
    // 获取页目录项
    page_table_entry_t *page_dir = (page_table_entry_t*)PAGE_DIR_BASE;
    if (!page_dir[page_dir_index].present) {
        // 页面错误
        return 0xFFFFFFFF;
    }
    
    // 获取页表项
    page_table_entry_t *page_table = 
        (page_table_entry_t*)(page_dir[page_dir_index].frame << 12);
    if (!page_table[page_table_index].present) {
        // 页面错误
        return 0xFFFFFFFF;
    }
    
    // 计算物理地址
    return (page_table[page_table_index].frame << 12) | offset;
}
```

### TLB (转换后备缓冲器)
```c
// TLB项结构
typedef struct {
    uint32_t virtual_page;
    uint32_t physical_page;
    uint8_t valid;
    uint8_t dirty;
    uint8_t accessed;
} tlb_entry_t;

#define TLB_SIZE 64
tlb_entry_t tlb[TLB_SIZE];

uint32_t tlb_lookup(uint32_t virtual_addr) {
    uint32_t virtual_page = virtual_addr >> 12;
    uint32_t offset = virtual_addr & 0xFFF;
    
    // TLB查找
    for (int i = 0; i < TLB_SIZE; i++) {
        if (tlb[i].valid && tlb[i].virtual_page == virtual_page) {
            tlb[i].accessed = 1;
            return (tlb[i].physical_page << 12) | offset;
        }
    }
    
    // TLB未命中 - 查页表
    uint32_t physical_addr = virtual_to_physical(virtual_addr);
    if (physical_addr != 0xFFFFFFFF) {
        // 更新TLB
        tlb_update(virtual_page, physical_addr >> 12);
    }
    
    return physical_addr;
}
```

## 内存性能优化

### 数据局部性
```c
// 空间局部性优化 - 数组遍历
void spatial_locality_good(int *array, int size) {
    // 顺序访问，充分利用缓存行
    for (int i = 0; i < size; i++) {
        array[i] = i * 2;
    }
}

void spatial_locality_bad(int *array, int size) {
    // 跳跃访问，缓存效率低
    for (int i = 0; i < size; i += 16) {
        array[i] = i * 2;
    }
}

// 时间局部性优化 - 数据重用
void temporal_locality_example(int *matrix, int rows, int cols) {
    // 分块处理，提高数据重用率
    const int BLOCK_SIZE = 64;
    
    for (int bi = 0; bi < rows; bi += BLOCK_SIZE) {
        for (int bj = 0; bj < cols; bj += BLOCK_SIZE) {
            // 处理块内数据
            for (int i = bi; i < min(bi + BLOCK_SIZE, rows); i++) {
                for (int j = bj; j < min(bj + BLOCK_SIZE, cols); j++) {
                    matrix[i * cols + j] *= 2;
                }
            }
        }
    }
}
```

### 内存对齐
```c
// 内存对齐优化
typedef struct {
    char a;      // 1字节
    // 3字节填充
    int b;       // 4字节，4字节对齐
    char c;      // 1字节
    // 3字节填充
} aligned_struct_t;  // 总大小：12字节

// 使用packed属性减少内存占用
typedef struct __attribute__((packed)) {
    char a;      // 1字节
    int b;       // 4字节
    char c;      // 1字节
} packed_struct_t;   // 总大小：6字节

// 缓存行对齐
#define CACHE_LINE_SIZE 64
typedef struct __attribute__((aligned(CACHE_LINE_SIZE))) {
    int data[16];  // 64字节数据
} cache_aligned_t;
```

### 预取优化
```c
// 软件预取
void prefetch_optimization(int *src, int *dst, int size) {
    const int PREFETCH_DISTANCE = 8;
    
    for (int i = 0; i < size; i++) {
        // 预取未来的数据
        if (i + PREFETCH_DISTANCE < size) {
            __builtin_prefetch(&src[i + PREFETCH_DISTANCE], 0, 3);
            __builtin_prefetch(&dst[i + PREFETCH_DISTANCE], 1, 3);
        }
        
        // 处理当前数据
        dst[i] = src[i] * 2;
    }
}

// 硬件预取器配置 (ARM Cortex-A系列)
void configure_hardware_prefetcher(void) {
    uint32_t actlr;
    
    // 读取辅助控制寄存器
    __asm volatile ("mrc p15, 0, %0, c1, c0, 1" : "=r" (actlr));
    
    // 使能L1数据预取
    actlr |= (1 << 2);
    
    // 使能L2预取
    actlr |= (1 << 1);
    
    // 写回辅助控制寄存器
    __asm volatile ("mcr p15, 0, %0, c1, c0, 1" : : "r" (actlr));
}
```

## 内存调试和分析

### 内存泄漏检测
```c
// 简单的内存分配跟踪
typedef struct mem_block {
    void *ptr;
    size_t size;
    const char *file;
    int line;
    struct mem_block *next;
} mem_block_t;

static mem_block_t *allocated_blocks = NULL;

void* debug_malloc(size_t size, const char *file, int line) {
    void *ptr = malloc(size);
    if (ptr) {
        mem_block_t *block = malloc(sizeof(mem_block_t));
        block->ptr = ptr;
        block->size = size;
        block->file = file;
        block->line = line;
        block->next = allocated_blocks;
        allocated_blocks = block;
    }
    return ptr;
}

void debug_free(void *ptr) {
    mem_block_t **current = &allocated_blocks;
    while (*current) {
        if ((*current)->ptr == ptr) {
            mem_block_t *to_free = *current;
            *current = (*current)->next;
            free(to_free);
            break;
        }
        current = &(*current)->next;
    }
    free(ptr);
}

#define malloc(size) debug_malloc(size, __FILE__, __LINE__)
#define free(ptr) debug_free(ptr)
```

### 内存使用统计
```c
// 内存使用统计
typedef struct {
    size_t total_allocated;
    size_t peak_usage;
    size_t current_usage;
    uint32_t allocation_count;
    uint32_t free_count;
} memory_stats_t;

static memory_stats_t mem_stats = {0};

void update_memory_stats(size_t size, int is_allocation) {
    if (is_allocation) {
        mem_stats.total_allocated += size;
        mem_stats.current_usage += size;
        mem_stats.allocation_count++;
        
        if (mem_stats.current_usage > mem_stats.peak_usage) {
            mem_stats.peak_usage = mem_stats.current_usage;
        }
    } else {
        mem_stats.current_usage -= size;
        mem_stats.free_count++;
    }
}

void print_memory_stats(void) {
    printf("Memory Statistics:\n");
    printf("  Total allocated: %zu bytes\n", mem_stats.total_allocated);
    printf("  Peak usage: %zu bytes\n", mem_stats.peak_usage);
    printf("  Current usage: %zu bytes\n", mem_stats.current_usage);
    printf("  Allocations: %u\n", mem_stats.allocation_count);
    printf("  Frees: %u\n", mem_stats.free_count);
    printf("  Potential leaks: %u\n", 
           mem_stats.allocation_count - mem_stats.free_count);
}
```

## 嵌入式内存优化

### 栈和堆管理
```c
// 栈使用监控
extern uint32_t _stack_start;
extern uint32_t _stack_end;

uint32_t get_stack_usage(void) {
    uint32_t current_sp;
    __asm volatile ("mov %0, sp" : "=r" (current_sp));
    
    uint32_t stack_size = (uint32_t)&_stack_start - (uint32_t)&_stack_end;
    uint32_t used = (uint32_t)&_stack_start - current_sp;
    
    return (used * 100) / stack_size;  // 返回使用百分比
}

// 静态内存池
#define POOL_SIZE 1024
#define BLOCK_SIZE 32
#define NUM_BLOCKS (POOL_SIZE / BLOCK_SIZE)

static uint8_t memory_pool[POOL_SIZE];
static uint8_t block_used[NUM_BLOCKS];

void* pool_alloc(void) {
    for (int i = 0; i < NUM_BLOCKS; i++) {
        if (!block_used[i]) {
            block_used[i] = 1;
            return &memory_pool[i * BLOCK_SIZE];
        }
    }
    return NULL;  // 池已满
}

void pool_free(void *ptr) {
    if (ptr >= (void*)memory_pool && 
        ptr < (void*)(memory_pool + POOL_SIZE)) {
        int block_index = ((uint8_t*)ptr - memory_pool) / BLOCK_SIZE;
        block_used[block_index] = 0;
    }
}
```

## 总结

内存系统是计算机性能的关键因素，理解其工作原理对于优化嵌入式系统至关重要。通过本文学习，您应该掌握：

✅ **内存层次结构**和各级存储器特点  
✅ **SRAM/DRAM**的工作原理和应用场景  
✅ **缓存系统**的组织方式和优化策略  
✅ **虚拟内存**和MMU的工作机制  
✅ **内存性能优化**技术和最佳实践  
✅ **内存调试**和问题诊断方法  

合理设计和优化内存系统，将显著提升嵌入式系统的性能和可靠性。