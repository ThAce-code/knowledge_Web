import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedArticle from '../components/FeaturedArticle';
import '../components/Homepage.css';
import '../styles/card.css';
import CardMeta from '../components/CardMeta.jsx';
import { getPinnedArticles } from '../utils/contentLoader';

const Homepage = () => {
  const pinned = getPinnedArticles(3);

  // 简单的图标兜底映射
  const iconByCategory = {
    'embedded-systems': '🔧',
    'frontend-stack': '💻',
    'cloud-native': '☁️'
  };

  return (
    <div className="homepage">
      {/* 合并内容区域以减少留白 */}
      <div className="main-content-section">
        <FeaturedArticle />
        
        {/* 置顶区整体容器 */}
        <div 
          className="pinned-wrapper"
          style={{
            margin: '24px',
            padding: '16px 24px',
            border: '1px solid rgba(133, 41, 219, 0.3)',
            borderRadius: '12px',
            background: 'rgba(30,30,60,0.35)'
          }}
        >
          {/* 置顶区头部：标题 + 查看更多 */}
          <div 
            className="pinned-header" 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '0 64px',
              marginBottom: '48px' 
            }}
          >
            <h3 className="pinned-title" style={{ margin: 0, color: '#fff', fontSize: '24px' }}>置顶文档</h3>
            <Link 
              to="/pinned" 
              className="button pinned-more"
              style={{ color: '#fff' }}
            >
              查看更多
            </Link>
          </div>

          {/* 三个主要内容卡片 - 使用现有样式，动态置顶文章 */}
          <div className="content-cards-grid">
          {pinned.map((article, idx) => (
            <div className="card" key={`${article.category}-${article.slug}-${idx}`}>
              <div className="card__border"></div>
              <div className="featured-badge">置顶</div>

              <div className="card_title__container">
                <div className="card_icon">{article.icon || iconByCategory[article.category] || '📄'}</div>
                <div>
                  <h3 className="card_title">{article.title}</h3>
                  <p className="card_paragraph">
                    {article.description}
                  </p>
                </div>
              </div>

              <hr className="line" />

              <CardMeta author={article.author} date={article.date} readTime={article.readTime} />

              <Link to={`/knowledge/${article.category}/${article.slug}`} className="button">查看详情</Link>
            </div>
          ))}
        </div>
        


        </div>

        {/* 添加底部内容区域，填充空白 */}
        <div className="bottom-content-section">
          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">技术文章</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">代码示例</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">在线支持</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">开源免费</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;