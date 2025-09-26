import React from 'react';
import LeftSidebar from './LeftSidebar.jsx';
import MainContent from './MainContent.jsx';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      {/* 主要内容区域 */}
      <div className="layout-container">
        {/* 左侧边栏 */}
        <LeftSidebar />
        
        {/* 主内容区 */}
        <MainContent>
          {children}
        </MainContent>
      </div>
    </div>
  );
};

export default MainLayout;