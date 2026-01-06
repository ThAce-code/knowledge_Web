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
  'other': {
    id: 'other',
    name: '其他资源',
    description: '其他学习资源',
  },
};

// 下载资源列表
export const DOWNLOAD_RESOURCES: DownloadResource[] = [
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
