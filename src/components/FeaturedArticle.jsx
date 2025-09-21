import React from 'react';
import './FeaturedArticle.css';

const FeaturedArticle = () => {
  return (
    <article className="featured-article">
      <div className="featured-article-background">
        <div className="featured-article-overlay">
          <div className="featured-article-content">
            <div className="featured-title-container">
              <h1 className="featured-title featured-title-front">嵌 入 式 系 统</h1>
              <h2 className="featured-title featured-title-back">开 发 指 南</h2>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedArticle;