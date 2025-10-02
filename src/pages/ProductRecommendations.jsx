import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArticlesByCategory } from '../utils/contentLoader.js';
import '../styles/KnowledgeDetails.css';

const ProductRecommendations = () => {
  const navigate = useNavigate();

  // 从内容索引动态读取 "products" 分类的所有文章
  const articles = useMemo(() => {
    // 结构: [{ slug, title, description, tags, icon, ... }]
    return getArticlesByCategory('products');
  }, []);

  const handleOpen = (slug) => {
    navigate(`/knowledge/products/${slug}`);
  };

  return (
    <div className="knowledge-details">
      <div className="knowledge-header">
        <div className="header-icon">🛍️</div>
        <div className="header-content">
          <h1>好 物 推 荐</h1>
          <p>精选优质工具与资源（基于 src/content/index.json 动态渲染，支持热更新）</p>
        </div>
      </div>

      <div className="knowledge-cards-grid">
        {articles.map((item) => (
          <div key={item.slug} className="knowledge-card-small">
            <div className="card-header">
              <span className="card-icon">{item.icon || '🔗'}</span>
              <h3 className="card-title">{item.title}</h3>
            </div>

            <div className="card-content">
              <p className="card-description">{item.description}</p>

              {Array.isArray(item.tags) && item.tags.length > 0 && (
                <div className="card-tags">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="card-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="card-footer">
              <button
                className="card-button"
                onClick={() => handleOpen(item.slug)}
              >
                查看详情
              </button>
            </div>
          </div>
        ))}

        {articles.length === 0 && (
          <div className="knowledge-empty">
            暂无产品文章。请在 src/content/products 下新增 .md 并在 src/content/index.json 的 products.articles 中配置元数据。
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductRecommendations;