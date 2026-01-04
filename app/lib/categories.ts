// 分类配置
export const CATEGORIES = {
  all: {
    id: 'all',
    name: '全部',
    description: '所有文章',
  },
  'c-language': {
    id: 'c-language',
    name: 'C/C++',
    description: 'C/C++语言相关文章',
  },
  microcontroller: {
    id: 'microcontroller',
    name: '单片机',
    description: '单片机相关文章',
  },
  'ai-tools': {
    id: 'ai-tools',
    name: 'AI & TOOLS',
    description: 'AI工具相关文章',
  },
  downloads: {
    id: 'downloads',
    name: 'DOWNLOAD',
    description: '资源下载',
  },
  linux: {
    id: 'linux',
    name: 'Linux',
    description: 'Linux系统相关文章',
  },
  python: {
    id: 'python',
    name: 'Python',
    description: 'Python编程相关文章',
  },
  other: {
    id: 'other',
    name: 'OTHER',
    description: '其他文章',
  },
} as const;

// 预定义标签列表
export const PREDEFINED_TAGS = [
  'AI',
  '51单片机',
  '32单片机',
  '教程',
  'C语言',
  'C++',
  'Python',
  'Linux',
  '基础',
  '进阶',
  '电子扫盲',
] as const;

// 获取分类显示名称
export function getCategoryName(categoryId: string): string {
  return CATEGORIES[categoryId as keyof typeof CATEGORIES]?.name || categoryId;
}

// 获取所有分类（包括"全部"）
export function getAllCategoryIds(): string[] {
  return Object.keys(CATEGORIES);
}
