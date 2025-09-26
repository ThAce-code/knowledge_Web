// 内容加载器 - 动态加载 Markdown 文件和元数据
import contentIndex from '../content/index.json';

/**
 * 获取文章元数据
 * @param {string} category - 分类名称
 * @param {string} slug - 文章标识符
 * @returns {Object|null} 文章元数据
 */
export function getArticleMetadata(category, slug) {
  try {
    const categoryData = contentIndex.categories[category];
    if (!categoryData || !categoryData.articles[slug]) {
      console.warn(`Article not found: ${category}/${slug}`);
      return null;
    }
    return categoryData.articles[slug];
  } catch (error) {
    console.error('Error loading article metadata:', error);
    return null;
  }
}

/**
 * 动态加载 Markdown 内容
 * @param {string} category - 分类名称
 * @param {string} slug - 文章标识符
 * @returns {Promise<string>} Markdown 内容
 */
export async function loadArticleContent(category, slug) {
  try {
    // 动态导入 Markdown 文件
    const module = await import(`../content/${category}/${slug}.md?raw`);
    return module.default;
  } catch (error) {
    console.error(`Error loading article content: ${category}/${slug}`, error);
    // 返回默认内容
    return `# 文章未找到\n\n抱歉，请求的文章 "${category}/${slug}" 不存在或加载失败。\n\n请检查链接是否正确，或返回首页浏览其他内容。`;
  }
}

/**
 * 获取分类下的所有文章
 * @param {string} category - 分类名称
 * @returns {Array} 文章列表
 */
export function getArticlesByCategory(category) {
  try {
    const categoryData = contentIndex.categories[category];
    if (!categoryData || !categoryData.articles) {
      return [];
    }
    
    return Object.entries(categoryData.articles).map(([slug, metadata]) => ({
      slug,
      ...metadata
    }));
  } catch (error) {
    console.error('Error loading articles by category:', error);
    return [];
  }
}

/**
 * 获取所有分类
 * @returns {Array} 分类列表
 */
export function getAllCategories() {
  try {
    return Object.keys(contentIndex.categories).map(category => ({
      key: category,
      name: getCategoryDisplayName(category)
    }));
  } catch (error) {
    console.error('Error loading categories:', error);
    return [];
  }
}

/**
 * 获取分类显示名称
 * @param {string} category - 分类键名
 * @returns {string} 显示名称
 */
function getCategoryDisplayName(category) {
  const displayNames = {
    'ai-apps': 'AI应用',
    'programming': '编程开发',
    'hardware': '硬件基础',
    'mcu': '单片机指南',
    'cloud-native': '云原生架构',
    'embedded-systems': '嵌入式系统',
    'frontend-stack': '前端技术栈',
    'products': '产品推荐'
  };
  
  return displayNames[category] || category;
}

/**
 * 搜索文章
 * @param {string} query - 搜索关键词
 * @returns {Array} 搜索结果
 */
export function searchArticles(query) {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const results = [];
  const searchTerm = query.toLowerCase();
  
  try {
    Object.entries(contentIndex.categories).forEach(([category, categoryData]) => {
      Object.entries(categoryData.articles).forEach(([slug, metadata]) => {
        const searchableText = [
          metadata.title,
          metadata.description,
          ...metadata.tags
        ].join(' ').toLowerCase();
        
        if (searchableText.includes(searchTerm)) {
          results.push({
            category,
            slug,
            ...metadata,
            categoryName: getCategoryDisplayName(category)
          });
        }
      });
    });
    
    // 按相关性排序（标题匹配优先）
    results.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(searchTerm);
      const bTitle = b.title.toLowerCase().includes(searchTerm);
      
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      return 0;
    });
    
    return results;
  } catch (error) {
    console.error('Error searching articles:', error);
    return [];
  }
}

/**
 * 获取相关文章推荐
 * @param {string} currentCategory - 当前文章分类
 * @param {string} currentSlug - 当前文章标识符
 * @param {Array} currentTags - 当前文章标签
 * @param {number} limit - 推荐数量限制
 * @returns {Array} 相关文章列表
 */
export function getRelatedArticles(currentCategory, currentSlug, currentTags = [], limit = 3) {
  try {
    const allArticles = [];
    
    // 收集所有文章
    Object.entries(contentIndex.categories).forEach(([category, categoryData]) => {
      Object.entries(categoryData.articles).forEach(([slug, metadata]) => {
        if (category !== currentCategory || slug !== currentSlug) {
          allArticles.push({
            category,
            slug,
            ...metadata,
            categoryName: getCategoryDisplayName(category)
          });
        }
      });
    });
    
    // 计算相关性得分
    const scoredArticles = allArticles.map(article => {
      let score = 0;
      
      // 同分类加分
      if (article.category === currentCategory) {
        score += 3;
      }
      
      // 标签匹配加分
      const matchingTags = article.tags.filter(tag => 
        currentTags.includes(tag)
      );
      score += matchingTags.length * 2;
      
      return { ...article, score };
    });
    
    // 按得分排序并返回指定数量
    return scoredArticles
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
      
  } catch (error) {
    console.error('Error getting related articles:', error);
    return [];
  }
}