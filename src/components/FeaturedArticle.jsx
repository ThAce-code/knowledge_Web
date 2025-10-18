import React, { useEffect, useRef } from 'react';
import './FeaturedArticle.css';
import GlitchText from './GlitchText';

const FeaturedArticle = () => {
  const contentRef = useRef(null);
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.classList.remove('bounce-in');
    void el.offsetWidth; // 强制重排，确保动画重新计算
    el.classList.add('bounce-in');
  }, []);

  return (
    <article className="featured-article">
      <div className="featured-article-background">
        <div className="featured-article-overlay">
          <div ref={contentRef} className="featured-article-content bounce-in">
            <div className="featured-title-container">
              <h1 className="featured-title featured-title-front">
                <GlitchText speed={2}>竞 赛 中 心</GlitchText>
              </h1>
              <h2 className="featured-title featured-title-back">
                <GlitchText speed={2}>W I K I 文 档</GlitchText>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedArticle;