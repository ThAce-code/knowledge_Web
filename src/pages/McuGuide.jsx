import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArticlesByCategory } from '../utils/contentLoader';
import '../styles/KnowledgeDetails.css';
import Pagination from '../components/Pagination.jsx';
import CardMeta from '../components/CardMeta.jsx';

const McuGuide = () => {
  const navigate = useNavigate();

  // 动态加载 mcu 分类文章并按日期新→旧
  const allArticles = useMemo(() => {
    return getArticlesByCategory('mcu')
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, []);

  // 与其它页面统一：每页 12 条
  const pageSize = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const pagedArticles = Array.isArray(allArticles)
    ? allArticles.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  const handleCardClick = (slug) => {
    navigate(`/knowledge/mcu/${slug}`);
  };

  return (
    <div className="knowledge-details">
      {/* Header：统一使用同一套样式 */}
      <div className="knowledge-header">
        <div className="header-icon">🎛️</div>
        <div className="header-content">
          <h1>单 片 机 指 南</h1>
          <p>学习 MCU 的基础知识、常用外设与工程实践</p>
        </div>
      </div>

      {/* 卡片栅格：与硬件基础一致的类名与结构 */}
      <div className="knowledge-cards-grid">
        {pagedArticles.map((item, idx) => (
          <div key={`${item.slug}-${idx}`} className="knowledge-card-small">
            <div className="card-header">
              <span className="card-icon">{item.icon || '💡'}</span>
              <h3 className="card-title">{item.title}</h3>
            </div>

            <div className="card-content">
              <p className="card-description">{item.description}</p>

              {/* 标签（最多展示 3 个，统一类名） */}
              {Array.isArray(item.tags) && item.tags.length > 0 && (
                <div className="card-tags">
                  {item.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="card-tag">{tag}</span>
                  ))}
                </div>
              )}

              <CardMeta author={item.author} date={item.date} readTime={item.readTime} />
            </div>

            <div className="card-footer">
              <button
                className="card-button"
                onClick={() => handleCardClick(item.slug)}
              >
                继续阅读
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 分页：与其它页面保持一致 */}
      <Pagination
        totalItems={allArticles.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        variant="ellipsis"
      />
    </div>
  );
};

export default McuGuide;