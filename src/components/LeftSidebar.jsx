import React, { useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './LeftSidebar.css';
import GradientText from './GradientText.jsx';
import { useSearch } from '../contexts/SearchContext.jsx';

const LeftSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setQuery } = useSearch();
  const [localQuery, setLocalQuery] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);

  const navItems = [
    { id: 'home', label: 'HOME', icon: '🏠', path: '/' },
    { id: 'ai-apps', label: 'AI应用', icon: '🤖', path: '/ai-apps' },
    { id: 'programming', label: '编程指南', icon: '💻', path: '/programming' },
    { id: 'hardware', label: '硬件基础', icon: '🔧', path: '/hardware-basics' },
    { id: 'mcu', label: '单片机指南', icon: '⚡', path: '/mcu-guide' },
    { id: 'products', label: '好物推荐', icon: '🛍️', path: '/products' }
  ];



  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // 防抖处理搜索输入
  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setLocalQuery(value);

    // 清除之前的定时器
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // 设置新的防抖定时器
    const newTimer = setTimeout(() => {
      if (value.trim()) {
        setQuery(value);
      }
    }, 300);

    setDebounceTimer(newTimer);
  }, [debounceTimer, setQuery]);

  // 处理回车键搜索
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = localQuery.trim();
      if (query) {
        // 清除防抖定时器
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
        // 立即执行搜索并跳转
        setQuery(query);
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  }, [localQuery, navigate, setQuery, debounceTimer]);

  const submitSearch = useCallback(() => {
    const query = localQuery.trim();
    if (!query) return;
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    setQuery(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }, [localQuery, navigate, setQuery, debounceTimer]);

  // 清理定时器
  React.useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

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
              <input 
                className="input" 
                type="text" 
                placeholder="搜索..." 
                value={localQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <div id="input-mask"></div>
            </div>
            <button
              id="search-icon"
              className="search-trigger-btn"
              type="button"
              onClick={submitSearch}
              aria-label="提交搜索"
              title="搜索"
            >
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M2.5 12L21 3.5l-7.5 17-2.8-6.4-6.2-1.6z" fill="white" opacity="0.95"></path>
                <path d="M21 3.5L10.7 13.1" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"></path>
              </svg>
            </button>
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