import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/KnowledgeDetails.css';
import Pagination from '../components/Pagination.jsx';
import { getArticlesByCategory } from '../utils/contentLoader.js';
import CardMeta from '../components/CardMeta.jsx';

const HardwareBasics = () => {
  const navigate = useNavigate();
  // 改为动态加载 hardware 分类文章（从 index.json 读取 author/date/readTime）
  const knowledgeCards = getArticlesByCategory('hardware').map((article, idx) => ({
    id: idx + 1,
    icon: article.icon || '🔧',
    title: article.title,
    description: article.description,
    tags: article.tags || [],
    author: article.author,
    date: article.date,
    readTime: article.readTime,
    buttonText: '继续阅读',
    detailPath: `/knowledge/hardware/${article.slug}`
  }));

  // 处理卡片点击事件
  // 分页（每页12条）
  const pageSize = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const pagedCards = Array.isArray(knowledgeCards)
    ? knowledgeCards.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  const handleCardClick = (detailPath) => {
    navigate(detailPath);
  };

  return (
    <div className="knowledge-details">
      <div className="knowledge-header">
        <div className="header-icon">🔧</div>
        <div className="header-content">
          <h1>硬 件 基 础</h1>
          <p>学习电子硬件的基础知识</p>
        </div>
      </div>

      <div className="knowledge-cards-grid">
        {pagedCards.map(card => (
          <div key={card.id} className="knowledge-card-small">
            <div className="card-header">
              <span className="card-icon">{card.icon}</span>
              <h3 className="card-title">{card.title}</h3>
            </div>
            
            <div className="card-content">
              <p className="card-description">{card.description}</p>
              
              <div className="card-tags">
                {card.tags.map((tag, index) => (
                  <span key={index} className="card-tag">{tag}</span>
                ))}
              </div>
              
              <CardMeta author={card.author} date={card.date} readTime={card.readTime} />
            </div>
            
            <div className="card-footer">
              <button 
                className="card-button"
                onClick={() => handleCardClick(card.detailPath)}
              >
                {card.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalItems={knowledgeCards.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        variant="ellipsis"
      />
    </div>
  );
};

export default HardwareBasics;