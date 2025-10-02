import MiniSearch from 'minisearch';
import { loadContentIndex } from '../../utils/contentLoader.js';

class SearchIndexManager {
  constructor() {
    this.miniSearch = null;
    this.isInitialized = false;
    this.documents = [];
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      // 加载内容索引
      const contentIndex = await loadContentIndex();
      this.documents = this.prepareDocuments(contentIndex);

      // 配置 MiniSearch
      this.miniSearch = new MiniSearch({
        fields: ['title', 'summary', 'headings', 'tags', 'category'], // 搜索字段
        storeFields: ['title', 'summary', 'tags', 'category', 'slug', 'path', 'headings'], // 存储字段
        searchOptions: {
          boost: {
            title: 3,      // 标题权重最高
            headings: 2,   // 标题层级权重
            tags: 2,       // 标签权重
            summary: 1,    // 摘要权重
            category: 1    // 分类权重
          },
          fuzzy: 0.3,      // 提高模糊匹配阈值
          prefix: true,    // 支持前缀匹配
          combineWith: 'OR' // 改为 OR，更宽松的匹配
        }
      });

      // 添加文档到索引
      this.miniSearch.addAll(this.documents);
      this.isInitialized = true;
      
      console.log(`Search index initialized with ${this.documents.length} documents`);
    } catch (error) {
      console.error('Failed to initialize search index:', error);
      throw error;
    }
  }

  prepareDocuments(contentIndex) {
    const documents = [];
    
    Object.entries(contentIndex).forEach(([category, categoryData]) => {
      if (categoryData.articles) {
        Object.entries(categoryData.articles).forEach(([slug, metadata]) => {
          // 准备搜索文档
          const doc = {
            id: `${category}-${slug}`,
            slug,
            category,
            path: `/knowledge/${category}/${slug}`,
            title: metadata.title || '',
            summary: metadata.summary || metadata.description || '',
            tags: Array.isArray(metadata.tags) ? metadata.tags.join(' ') : '',
            headings: Array.isArray(metadata.headings) ? metadata.headings.join(' ') : '',
            // 保持原始数据用于显示
            originalTags: Array.isArray(metadata.tags) ? metadata.tags : [],
            originalHeadings: Array.isArray(metadata.headings) ? metadata.headings : [],
            // 添加额外的元数据
            author: metadata.author || '',
            date: metadata.date || '',
            readTime: metadata.readTime || ''
          };
          

          
          documents.push(doc);
        });
      }
    });

    return documents;
  }

  async search(query, options = {}) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (!query.trim()) {
      return [];
    }

    try {
      // 先尝试精确搜索
      let results = this.miniSearch.search(query, {
        ...this.miniSearch.searchOptions,
        ...options
      });
      
      // 如果精确搜索没有结果，尝试分词搜索
      if (results.length === 0) {
        const queryTerms = query.split(/[\s\u4e00-\u9fff]+/).filter(term => term.length > 0);
        
        for (const term of queryTerms) {
          if (term.length > 0) {
            const termResults = this.miniSearch.search(term, {
              ...this.miniSearch.searchOptions,
              ...options,
              combineWith: 'OR'
            });
            results = results.concat(termResults);
          }
        }
        
        // 去重
        const uniqueResults = [];
        const seenIds = new Set();
        for (const result of results) {
          if (!seenIds.has(result.id)) {
            seenIds.add(result.id);
            uniqueResults.push(result);
          }
        }
        results = uniqueResults;
      }

      // 应用过滤器
      if (options.category) {
        results = results.filter(result => 
          result.category === options.category
        );
      }

      if (options.tags && options.tags.length > 0) {
        results = results.filter(result => 
          options.tags.some(tag => 
            result.originalTags.includes(tag)
          )
        );
      }

      // 限制结果数量
      if (options.limit) {
        results = results.slice(0, options.limit);
      }

      // 增强结果信息
      const enhancedResults = results.map(result => ({
        ...result,
        tags: result.originalTags,
        headings: result.originalHeadings,
        // 添加高亮信息
        highlights: this.generateHighlights(query, result),
        // 保持完整的元数据
        author: result.author,
        date: result.date,
        readTime: result.readTime
      }));



      return enhancedResults;

    } catch (error) {
      console.error('Search execution error:', error);
      return [];
    }
  }

  generateHighlights(query, result) {
    const highlights = {};
    const queryTerms = query.toLowerCase().split(/\s+/);
    
    // 高亮标题
    if (result.title) {
      highlights.title = this.highlightText(result.title, queryTerms);
    }
    
    // 高亮摘要
    if (result.summary) {
      highlights.summary = this.highlightText(result.summary, queryTerms);
    }

    return highlights;
  }

  highlightText(text, terms) {
    let highlightedText = text;
    
    terms.forEach(term => {
      if (term.length > 1) { // 忽略单字符
        const regex = new RegExp(`(${term})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
      }
    });
    
    return highlightedText;
  }

  // 获取所有可用的分类
  getCategories() {
    if (!this.isInitialized) return [];
    
    const categories = [...new Set(this.documents.map(doc => doc.category))];
    return categories.sort();
  }

  // 获取所有可用的标签
  getTags() {
    if (!this.isInitialized) return [];
    
    const allTags = this.documents.flatMap(doc => doc.originalTags || []);
    const uniqueTags = [...new Set(allTags)];
    return uniqueTags.sort();
  }

  // 获取热门标签（按使用频率）
  getPopularTags(limit = 10) {
    if (!this.isInitialized) return [];
    
    const tagCounts = {};
    this.documents.forEach(doc => {
      (doc.originalTags || []).forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    return Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([tag]) => tag);
  }
}

// 导出单例实例
export const searchIndex = new SearchIndexManager();