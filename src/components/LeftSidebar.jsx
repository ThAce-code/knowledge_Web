import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './LeftSidebar.css';
import GradientText from './GradientText.jsx';

const LeftSidebar = () => {
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'HOME', icon: '🏠', path: '/' },
    { id: 'ai-apps', label: 'AI应用', icon: '🤖', path: '/ai-apps' },
    { id: 'programming', label: '编程指南', icon: '💻', path: '/programming' },
    { id: 'hardware', label: '硬件基础', icon: '🔧', path: '/hardware-basics' },
    { id: 'mcu', label: '单片机指南', icon: '⚡', path: '/mcu-guide' },
    { id: 'products', label: '产品推荐', icon: '🛍️', path: '/products' }
  ];



  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="left-sidebar">
      <div className="sidebar-content">
        {/* Header */}
        <div className="sidebar-header">
          <div className="logo-icon-container">⚛️</div>
          <h2 className="sidebar-title-main">EMBEDDED</h2>
          <p className="sidebar-subtitle">KNOWLEDGE</p>
        </div>

        {/* Main Navigation */}
        <div className="main-nav-section">
          <div id="main">
            <div id="poda">
              <div className="glow"></div>
              <div className="darkBorderBg"></div>
              <div className="white"></div>
              <div className="border"></div>
              <input className="input" type="text" placeholder="搜索..." />
              <div id="input-mask"></div>
            </div>
            <span id="search-icon">🔍</span>
          </div>
          <nav className="sidebar-nav">
            <ul className="sidebar-list">
              {navItems.map((item) => (
                <li key={item.id} className="sidebar-item">
                  <Link to={item.path} className={`line-box-btn ${isActivePath(item.path) ? 'active' : ''}`}>
                    <span className="sidebar-icon">{item.icon}</span>
                    <span className="sidebar-label">
                      <GradientText
                        colors={['#7dd3fc', '#60a5fa', '#34d399', '#60a5fa', '#7dd3fc']}
                        animationSpeed={3}
                        showBorder={false}
                      >
                        {item.label}
                      </GradientText>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>


      </div>
    </aside>
  );
};

export default LeftSidebar;