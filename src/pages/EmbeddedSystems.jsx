import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArticlesByCategory } from '../utils/contentLoader.js';
import '../styles/KnowledgeDetails.css';
import Pagination from '../components/Pagination.jsx';

const EmbeddedSystems = () => {
  const navigate = useNavigate();
  const MAX_FEATURES = 4;
  const MAX_TAGS = 4;

  // 从内容索引动态读取 "mcu" 分类的所有文章
  const articles = useMemo(() => {
    // 结构: [{ slug, title, description, tags, icon, ... }]
    return getArticlesByCategory('mcu');
  }, []);

  // 分页（每页 12 条）
  const pageSize = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const pagedArticles = Array.isArray(articles)
    ? articles.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  const handleOpen = (slug) => {
    navigate(`/knowledge/mcu/${slug}`);
  };

  return (
    <div className="knowledge-details">
      <div className="knowledge-header">
        <div className="header-icon">📶</div>
        <div className="header-content">
          <h1>单 片 机 指 南</h1>
          <p>微控制器与单片机开发的精选教程与实践</p>
        </div>
      </div>

      <div className="knowledge-cards-grid">
        {pagedArticles.map((item) => (
          <div key={item.slug} className="knowledge-card-small">
            <div className="card-header">
              <span className="card-icon">{item.icon || '🔧'}</span>
              <h3 className="card-title">{item.title}</h3>
            </div>

            <div className="card-content">
              <p className="card-description">{item.description || item.summary || '暂无简介'}</p>

              {Array.isArray(item.tags) && item.tags.length > 0 && (
                <div className="card-tags">
                  {item.tags.slice(0, MAX_TAGS).map((tag, index) => (
                    <span key={index} className="card-tag">{tag}</span>
                  ))}
                </div>
              )}

              {/* 可选要点列表：与 AI应用同款样式 */}
              {Array.isArray(item.features) && item.features.length > 0 && (
                <ul className="card-features">
                  {item.features.slice(0, MAX_FEATURES).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
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
            暂无单片机文章。请在 src/content/mcu 下新增 .md，并在 src/content/index.json 的 mcu.articles 中配置元数据。
          </div>
        )}
      </div>

      <Pagination
        totalItems={articles.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        variant="ellipsis"
      />
    </div>
  );
};

export default EmbeddedSystems;