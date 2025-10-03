import React from 'react';
import { Link } from 'react-router-dom';
import { getPinnedArticles } from '../utils/contentLoader';
import '../components/Homepage.css';

const Pinned = () => {
  const articles = getPinnedArticles();

  const iconByCategory = {
    'embedded-systems': '🔧',
    'frontend-stack': '💻',
    'cloud-native': '☁️',
    'programming': '📝',
    'products': '🚀',
    'mcu': '💡'
  };

  return (
    <div className="homepage pinned-page">
      {/* 固定在右上角的返回首页按钮 */}
      <Link to="/" className="back-home-fixed">返回首页</Link>
      <style>
        {`
          .back-home-fixed {
            position: fixed;
            top: 16px;
            right: 24px;
            z-index: 1000;
            padding: 8px 14px;
            border-radius: 8px;
            background: rgba(255,255,255,0.14);
            color: #fff;
            font-weight: 600;
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            border: 1px solid rgba(255,255,255,0.25);
            transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease;
          }
          .back-home-fixed:hover {
            background: rgba(255,255,255,0.24);
            box-shadow: 0 4px 16px rgba(0,0,0,0.25);
            transform: translateY(-1px);
          }
          .back-home-fixed:active {
            transform: translateY(0);
          }
          .pinned-articles-list {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            width: 100%;
            max-width: 900px;
            margin: 16px auto 0 auto;
          }

          .article-bar {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            padding: 1.3125rem 1.5rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1), 0 0 8px rgba(169, 154, 237, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            color: #fff;
            transition: background 0.2s, box-shadow 0.3s;
          }

          .article-bar:hover {
            background: rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1), 0 0 25px rgba(169, 154, 237, 0.5);
          }

          .article-bar__icon {
            font-size: 1.5rem;
          }

          .article-bar__content {
            flex-grow: 1;
          }

          .article-bar__title {
            font-size: 1.1rem;
            font-weight: 600;
            margin: 0 0 0.25rem 0;
          }

          .article-bar__description {
            font-size: 0.9rem;
            color: #a99aed;
            margin: 0;
          }

          .article-bar__meta {
            display: flex;
            gap: 1rem;
            font-size: 0.9rem;
            color: #c0c0c0;
            white-space: nowrap;
          }
          
          .article-bar .button {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
            white-space: nowrap;
            margin: 0;
            height: auto;
          }
        `}
      </style>
      <div className="main-content-section">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '900px', margin: '0 auto 2rem auto' }}>
          <h2 style={{ margin: 0, color: '#fff', fontSize: '54px', fontWeight: 700 }}>置顶文档</h2>
        </div>

        <div className="pinned-articles-list">
          {articles.map((article, idx) => (
            <div className="article-bar" key={`${article.category}-${article.slug}-${idx}`}>
              <div className="article-bar__icon">{article.icon || iconByCategory[article.category] || '📄'}</div>
              <div className="article-bar__content">
                <h3 className="article-bar__title">{article.title}</h3>
                <p className="article-bar__description">{article.description}</p>
              </div>
              <div className="article-bar__meta">
                <span>{article.categoryName}</span>
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
              <Link to={`/knowledge/${article.category}/${article.slug}`} className="button">
                查看详情
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pinned;