import React from 'react';
import { useLocation } from 'react-router-dom';
import LeftSidebar from './LeftSidebar.jsx';
import MainContent from './MainContent.jsx';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const location = useLocation();
  
  // 检查是否是文章详情页面
  const isArticlePage = location.pathname.startsWith('/knowledge/');

  return (
    <div className="main-layout">
      {/* 主要内容区域 */}
      <div className={`layout-container ${isArticlePage ? 'article-layout' : ''}`}>
        {/* 左侧边栏 - 只在非文章页面显示 */}
        {!isArticlePage && <LeftSidebar />}
        
        {/* 主内容区 */}
        <MainContent isArticlePage={isArticlePage}>
          {children}
        </MainContent>
      </div>
    </div>
  );
};

export default MainLayout;