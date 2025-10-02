import React, { useEffect, useState } from 'react';
import { useSearch } from '../contexts/SearchContext.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { searchIndex } from '../features/search/searchIndex.js';
import '../styles/SearchResults.css';

const CATEGORY_DISPLAY = {
  'ai-apps': 'AI应用',
  'hardware': '硬件基础',
  'products': '好物推荐',
  'programming': '编程技术',
  'mcu': '单片机指南',
};

const SearchResults = () => {
  const { query, results, loading, filters, setFilters, performSearch } = useSearch();
  const location = useLocation();
  const [availableCategories, setAvailableCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 加载可用的分类和标签
    const loadFilters = async () => {
      try {
        const categories = searchIndex.getCategories();
        // 期望显示的分类顺序（包含“单片机指南”等中文显示）
        const desiredOrder = ['ai-apps','hardware','products','programming','mcu'];
        const merged = Array.from(new Set([...desiredOrder, ...categories]));
        setAvailableCategories(merged);
      } catch (error) {
        console.error('Failed to load filter options:', error);
      }
    };

    loadFilters();
  }, []);



  const handleResultClick = (result) => {
    navigate(result.path);
  };

  const handleCategoryFilter = (category) => {
    setFilters({
      ...filters,
      category: filters.category === category ? '' : category
    });
  };



  const clearFilters = () => {
    setFilters({ category: '' });
  };

  const renderHighlightedText = (text, highlights) => {
    if (!highlights) return text;
    return <span dangerouslySetInnerHTML={{ __html: highlights }} />;
  };

  const renderEmptyState = () => (
    <div className="search-empty-state">
      <div className="empty-icon">🔍</div>
      <h3>没有找到相关结果</h3>
      <p>尝试使用不同的关键词或调整筛选条件</p>
      {filters.category && (
        <button onClick={clearFilters} className="clear-filters-btn">
          清除筛选条件
        </button>
      )}
    </div>
  );

  const renderNoQuery = () => (
    <div className="search-empty-state">
      <div className="empty-icon">💡</div>
      <h3>开始搜索</h3>
      <p>输入关键词来搜索文章、教程和资源</p>
    </div>
  );

  return (
    <div className="search-results-page">
      <div className="search-header">
        <h1>搜索结果</h1>
        {query && (
          <div className="search-info">
            <span className="search-query">"{query}"</span>
            {!loading && (
              <span className="search-count">
                找到 {results.length} 个结果
              </span>
            )}
          </div>
        )}
      </div>

      <div className="search-content">
        {/* 侧边栏筛选 */}
        <aside className="search-filters">
          <div className="filter-section">
            <h3>分类</h3>
            <div className="filter-options">
              {availableCategories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`filter-option ${filters.category === category ? 'active' : ''}`}
                >
                  {CATEGORY_DISPLAY[category] || category}
                </button>
              ))}
            </div>
          </div>



          {filters.category && (
            <button onClick={clearFilters} className="clear-all-filters">
              清除所有筛选
            </button>
          )}
        </aside>

        {/* 主要内容区域 */}
        <main className="search-main">
          {loading ? (
            <div className="search-loading">
              <div className="loading-spinner"></div>
              <p>搜索中...</p>
            </div>
          ) : !query ? (
            renderNoQuery()
          ) : results.length === 0 ? (
            renderEmptyState()
          ) : (
            <div className="search-results">
              {results.map((result, index) => (
                <article
                  key={result.id}
                  className="search-result-item"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="result-header">
                    <h3 className="result-title">
                      {renderHighlightedText(result.title, result.highlights?.title)}
                    </h3>
                    <span className="result-category">{CATEGORY_DISPLAY[result.category] || result.category}</span>
                  </div>
                  
                  {result.summary && (
                    <p className="result-summary">
                      {renderHighlightedText(result.summary, result.highlights?.summary)}
                    </p>
                  )}
                  
                  {result.tags && result.tags.length > 0 && (
                    <div className="result-tags">
                      {result.tags.slice(0, 5).map(tag => (
                        <span key={tag} className="result-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  
                  <div className="result-meta">
                    <span className="result-score">
                      匹配度: {Math.round(result.score * 100)}%
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchResults;