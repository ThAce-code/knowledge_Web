import React from 'react';
import './MainContent.css';

const MainContent = ({ children, isArticlePage = false }) => {
  return (
    <main className={`main-content-container ${isArticlePage ? 'article-page-content' : ''}`}>
      <div className="main-content-inner">
        {children}
      </div>
    </main>
  );
};

export default MainContent;