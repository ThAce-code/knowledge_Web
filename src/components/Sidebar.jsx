import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const popularTags = [
    'C语言',
    '单片机', 
    'AI开发',
    'STM32',
    'Arduino',
    '好物推荐'
  ];

  const tocItems = [
    { id: 'home', label: '首页', icon: '📋', path: '/' },
    { id: 'hardware-basics', label: '硬件基础', icon: '🔧', path: '/knowledge/hardware' },
    { id: 'programming', label: '编程开发', icon: '💻', path: '/knowledge/programming' },
    { id: 'mcu-guide', label: '单片机指南', icon: '🎛️', path: '/mcu' },
    { id: 'product-recommendations', label: '好物推荐', icon: '🛍️', path: '/products' },
    { id: 'ai-apps', label: 'AI应用', icon: '🤖', path: '/knowledge/ai-apps' }
  ];

  // 根据当前路径判断是否激活
  const isActiveRoute = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      {/* 第一个卡片：Logo */}
      <div className="sidebar-card">
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">
              <span className="logo-symbol">🔧</span>
            </div>
            <div className="logo-text">
              <h1 className="logo-title">NEBULA</h1>
              <span className="logo-subtitle">KNOWLEDGE</span>
            </div>
          </div>
        </div>
      </div>

      {/* 第二个卡片：搜索框 + 导航菜单 */}
      <div className="sidebar-card">
        {/* 搜索框 */}
        <div className="search-section">
          <div className="search-container">
            <div className="search-icon">🔍</div>
            <input
              type="text"
              placeholder="搜索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="toc-section">
          <h3 className="section-title">目录导航</h3>
          <nav className="toc-nav">
            <ul className="toc-list">
              {tocItems.map((item, index) => (
                <li key={item.id} className={`toc-item ${isActiveRoute(item.path) ? 'active' : ''}`}>
                  <NavLink 
                    to={item.path}
                    className={({ isActive }) => `toc-link ${isActive ? 'active' : ''}`}
                  >
                    <span className="toc-icon">{item.icon}</span>
                    <span className="toc-label">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* 第三个卡片：热门标签 */}
      <div className="sidebar-card">
        <div className="popular-tags-section">
          <h3 className="section-title">热门标签</h3>
          <div className="tags-container">
            {popularTags.map((tag, index) => (
              <button key={index} className="tag-button">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;