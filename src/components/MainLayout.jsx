import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './LeftSidebar.jsx';
import MainContent from './MainContent.jsx';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="main-layout">
      {/* 主要内容区域 */}
      <div className="layout-container">
        {/* 左侧边栏 */}
        <LeftSidebar />
        
        {/* 主内容区 */}
        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </div>
  );
};

export default MainLayout;