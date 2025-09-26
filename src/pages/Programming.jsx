import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getArticlesByCategory } from '../utils/contentLoader';
import '../styles/KnowledgeDetails.css';

const Programming = () => {
  const navigate = useNavigate();
  
  // 从动态内容系统获取文章数据
  const articles = getArticlesByCategory('programming');
  
  // 为每篇文章添加图标和特性描述
  const getArticleIcon = (slug) => {
    const icons = {
      'c-basics': '🔤',
      'dev-tools': '🛠️',
      'debug-optimize': '🐛'
    };
    return icons[slug] || '📄';
  };
  
  const getArticleFeatures = (slug) => {
    const features = {
      'c-basics': [
        '变量与数据类型：理解不同数据类型的特点',
        '函数与指针：掌握函数调用和指针操作',
        '内存管理：学习动态内存分配和释放',
        '结构体与联合：组织复杂数据结构'
      ],
      'dev-tools': [
        'Keil uVision：ARM开发的专业IDE',
        'STM32CubeIDE：STM32官方开发环境',
        'PlatformIO：跨平台开发环境',
        'Git版本控制：代码管理和团队协作'
      ]
    };
    return features[slug] || ['深入学习相关技术知识', '掌握实用开发技能'];
  };

  // 处理卡片点击事件
  const handleCardClick = (detailPath) => {
    navigate(detailPath);
  };

  return (
    <div className="knowledge-details">
      <div className="knowledge-header">
        <div className="header-icon">💻</div>
        <div className="header-content">
          <h1>编 程 开 发</h1>
          <p>掌握嵌入式编程技能</p>
        </div>
      </div>

      <div className="knowledge-cards-grid">
        {articles.map((article, index) => (
          <div key={article.slug} className="knowledge-card-small">
            <div className="card-header">
              <span className="card-icon">{getArticleIcon(article.slug)}</span>
              <h3 className="card-title">{article.title}</h3>
            </div>
            
            <div className="card-content">
              <p className="card-description">{article.description}</p>
              
              <div className="card-tags">
                {article.tags.map((tag, index) => (
                  <span key={index} className="card-tag">{tag}</span>
                ))}
              </div>
              
              <ul className="card-features">
                {getArticleFeatures(article.slug).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="card-footer">
              <button 
                className="card-button"
                onClick={() => handleCardClick(`/knowledge/programming/${article.slug}`)}
              >
                继续阅读
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programming;