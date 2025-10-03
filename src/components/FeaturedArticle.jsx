import React from 'react';
import './FeaturedArticle.css';
import GlitchText from './GlitchText';

const FeaturedArticle = () => {
  return (
    <article className="featured-article">
      <div className="featured-article-background">
        <div className="featured-article-overlay">
          <div className="featured-article-content">
            <div className="featured-title-container">
              <h1 className="featured-title featured-title-front">
                <GlitchText speed={2}>竞 赛 中 心</GlitchText>
              </h1>
              <h2 className="featured-title featured-title-back">
                <GlitchText speed={2}>WIKI 文 档</GlitchText>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedArticle;