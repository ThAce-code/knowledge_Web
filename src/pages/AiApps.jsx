import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArticlesByCategory } from '../utils/contentLoader.js';
import '../styles/KnowledgeDetails.css';
import Pagination from '../components/Pagination.jsx';
import CardMeta from '../components/CardMeta.jsx';

const AiApps = () => {
  const navigate = useNavigate();
  const [knowledgeCards, setKnowledgeCards] = useState([]);

  // 图标映射
  const iconMap = {
    'chatgpt': '💬',
    'copilot': '👨‍💻',
    'midjourney': '🎨'
  };



  useEffect(() => {
    // 从统一数据源加载AI应用数据
    const loadAiAppsData = () => {
      try {
        const articles = getArticlesByCategory('ai-apps');
        const cards = articles.map((article, index) => ({
          id: index + 1,
          icon: iconMap[article.slug] || '🔧',
          title: article.title,
          description: article.description,
          author: article.author || '',
          date: article.date || '',
          readTime: article.readTime || '',
          tags: article.tags || [], // 使用index.json中的统一标签
          buttonText: '查看详情',
          detailPath: `/knowledge/ai-apps/${article.slug}`
        }));
        setKnowledgeCards(cards);
      } catch (error) {
        console.error('Failed to load AI apps data:', error);
        // 降级到空数组，避免页面崩溃
        setKnowledgeCards([]);
      }
    };

    loadAiAppsData();
  }, []);

  // 如果数据还没加载完成，显示原有的硬编码数据作为降级方案
  const fallbackCards = [
    {
      id: 1,
      icon: '💬',
      title: 'ChatGPT',
      description: '强大的AI对话助手，支持代码编写、问题解答、创意写作等多种任务，是提升工作效率的得力助手。',
      author: '',
      date: '',
      readTime: '',
      tags: ['对话AI', 'ChatGPT', '代码助手'],
      buttonText: '查看详情',
      detailPath: '/knowledge/ai-apps/chatgpt'
    },
    {
      id: 2,
      icon: '👨‍💻',
      title: 'GitHub Copilot',
      description: '基于AI的代码补全工具，实时提供智能代码建议，大幅提升编程效率和代码质量。',
      author: '',
      date: '',
      readTime: '',
      tags: ['代码补全', 'GitHub', 'AI编程'],
      buttonText: '查看详情',
      detailPath: '/knowledge/ai-apps/copilot'
    },
    {
      id: 3,
      icon: '🎨',
      title: 'Midjourney',
      description: '顶级AI图像生成工具，通过文字描述创造出令人惊艳的艺术作品和设计图像。',
      author: '',
      date: '',
      readTime: '',
      tags: ['图像生成', 'AI绘画', '艺术创作'],
      buttonText: '查看详情',
      detailPath: '/knowledge/ai-apps/midjourney'
    }
  ];

  // 使用动态加载的数据，如果为空则使用降级方案
  const displayCards = knowledgeCards.length > 0 ? knowledgeCards : fallbackCards;

  // 分页（每页12条）
  const pageSize = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const pagedDisplayCards = Array.isArray(displayCards)
    ? displayCards.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  // 处理卡片点击事件
  const handleCardClick = (detailPath) => {
    navigate(detailPath);
  };

  return (
    <div className="knowledge-details">
      <div className="knowledge-header">
        <div className="header-icon">🤖</div>
        <div className="header-content">
          <h1>A I 应 用</h1>
          <p>探索人工智能的无限可能</p>
        </div>
      </div>

      <div className="knowledge-cards-grid">
        {pagedDisplayCards.map(card => (
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
        totalItems={displayCards.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        variant="ellipsis"
      />
    </div>
  );
};

export default AiApps;