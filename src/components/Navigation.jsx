import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/hardware-basics', label: '硬件基础', icon: '🔧' },
    { path: '/programming', label: '编程开发', icon: '💻' },
    { path: '/mcu-guide', label: '单片机指南', icon: '🎛️' },
    { path: '/ai-apps', label: 'AI应用', icon: '🤖' },
    { path: '/products', label: '产品推荐', icon: '🛍️' }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleFileManagerOpen = () => {
    window.dispatchEvent(new Event('open-file-manager'));
  };

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        {/* Logo区域 */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">嵌入式开发指南</span>
        </Link>

        {/* 桌面端导航菜单 */}
        <div className="nav-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* 工具按钮 */}
        <div className="nav-tools">
          <button 
            className="tool-button"
            onClick={handleFileManagerOpen}
            title="打开文件管理系统"
          >
            <span>📁</span>
          </button>
          
          {/* 移动端菜单按钮 */}
          <button 
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span>{isMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* 移动端下拉菜单 */}
      {isMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
          <button 
            className="mobile-nav-item tool-item"
            onClick={() => {
              handleFileManagerOpen();
              setIsMenuOpen(false);
            }}
          >
            <span className="nav-icon">📁</span>
            <span className="nav-label">文件管理</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;