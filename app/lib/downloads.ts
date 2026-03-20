// 下载资源类型定义
export interface DownloadResource {
  id: string;
  name: string;
  description: string;
  category: 'code-samples' | 'software' | 'documentation' | 'other';
  filePath: string; // 相对于 public/downloads/ 的路径
  fileSize: string; // 人类可读格式
  version?: string;
  tags?: string[];
  icon?: string;
  lastUpdated: string; // ISO 格式日期
}

export interface DownloadCategory {
  id: string;
  name: string;
  description: string;
}

// 下载分类配置
export const DOWNLOAD_CATEGORIES: Record<string, DownloadCategory> = {
  'code-samples': {
    id: 'code-samples',
    name: '代码示例',
    description: '精选代码示例与项目模板',
  },
  'software': {
    id: 'software',
    name: '推荐软件',
    description: '嵌入式开发常用工具',
  },
  'documentation': {
    id: 'documentation',
    name: '技术文档',
    description: '技术手册与参考资料',
  },
  'other': {
    id: 'other',
    name: '其他资源',
    description: '其他学习资源',
  },
};

// 下载资源列表
export const DOWNLOAD_RESOURCES: DownloadResource[] = [
  {
    id: 'lanqiao-api',
    name: '蓝桥杯单片机驱动库',
    description: '面向蓝桥杯单片机赛道（C51/Keil）的外设驱动库，基于 STC15F2K60S2，包含 LED、数码管、按键、DS1302、I2C、单总线、超声波、串口等常用驱动，并补充了 main.c 入口示例',
    category: 'code-samples',
    filePath: 'code-samples/LANQIAO_API-main.zip',
    fileSize: '104 KB',
    version: 'v1.1',
    tags: ['51单片机', 'Keil', '蓝桥杯', 'C语言'],
    lastUpdated: '2026-03-20',
  },
  {
    id: 'freeRTOS-GCC',
    name: 'STM32 项目模板',
    description: 'STM32CubeMX + HAL库+freeRTOS项目模板，包含常用外设驱动配置',
    category: 'code-samples',
    filePath: 'code-samples/freeRTOS-GCC.zip',
    fileSize: '18.1 MB',
    version: 'v1.0',
    tags: ['STM32', 'HAL', 'CubeMX'],
    lastUpdated: '2026-01-04',
  },
  {
    id: 'lanqiao-scm-2025-1',
    name: '蓝桥杯单片机组赛点资源包（2025）- Part1',
    description: '面向蓝桥杯单片机赛道的赛点资料合集（Part1/3）。下载所有3个部分后，使用 7-Zip 或 WinRAR 同时解压。',
    category: 'documentation',
    filePath: 'documentation/DP2025_SCM_split.z01',
    fileSize: '60 MB',
    version: '2025 赛点版 Part1/3',
    tags: ['蓝桥杯', '单片机', '赛点资料', '原理图'],
    lastUpdated: '2026-03-20',
  },
  {
    id: 'lanqiao-scm-2025-2',
    name: '蓝桥杯单片机组赛点资源包（2025）- Part2',
    description: '面向蓝桥杯单片机赛道的赛点资料合集（Part2/3）。下载所有3个部分后，使用 7-Zip 或 WinRAR 同时解压。',
    category: 'documentation',
    filePath: 'documentation/DP2025_SCM_split.z02',
    fileSize: '60 MB',
    version: '2025 赛点版 Part2/3',
    tags: ['蓝桥杯', '单片机', '赛点资料', '原理图'],
    lastUpdated: '2026-03-20',
  },
  {
    id: 'lanqiao-scm-2025-3',
    name: '蓝桥杯单片机组赛点资源包（2025）- Part3',
    description: '面向蓝桥杯单片机赛道的赛点资料合集（Part3/3）。下载所有3个部分后，使用 7-Zip 或 WinRAR 同时解压。',
    category: 'documentation',
    filePath: 'documentation/DP2025_SCM_split.zip',
    fileSize: '60 MB',
    version: '2025 赛点版 Part3/3',
    tags: ['蓝桥杯', '单片机', '赛点资料', '原理图'],
    lastUpdated: '2026-03-20',
  },
  {
    id: 'cc-switch',
    name: 'CC-Switch',
    description: 'Claude Code API 切换工具，支持在不同 AI 模型之间快速切换，无需修改配置文件',
    category: 'software',
    filePath: 'software/CC-Switch-v3.8.3-Windows-Portable.zip',
    fileSize: '4.7 MB',
    version: 'v3.8.3',
    tags: ['Claude', 'AI', 'API', '工具'],
    lastUpdated: '2026-01-06',
  },
  {
    id: 'clash-verge',
    name: 'Clash Verge',
    description: '基于 Clash Meta 的代理工具，支持多种代理协议，提供可视化界面，方便管理网络规则',
    category: 'software',
    filePath: 'software/clash-verge.zip',
    fileSize: '37.6 MB',
    version: '最新稳定版',
    tags: ['代理', 'VPN', '网络', '工具'],
    lastUpdated: '2026-03-20',
  },
];

// 辅助函数：获取所有资源
export function getAllResources(): DownloadResource[] {
  return DOWNLOAD_RESOURCES;
}

// 辅助函数：按分类筛选资源
export function getResourcesByCategory(category: string): DownloadResource[] {
  return DOWNLOAD_RESOURCES.filter(resource => resource.category === category);
}

// 辅助函数：根据 ID 获取资源
export function getResourceById(id: string): DownloadResource | undefined {
  return DOWNLOAD_RESOURCES.find(resource => resource.id === id);
}