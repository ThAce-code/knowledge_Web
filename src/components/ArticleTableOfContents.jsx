import React, { useState, useEffect } from 'react';
import './LeftSidebar.css';
import './ArticleTableOfContents.css';

const ArticleTableOfContents = ({ content, currentSection = null, isOpen = false, onClose }) => {
  const [tocItems, setTocItems] = useState([]);
  const [activeSection, setActiveSection] = useState(currentSection);
  const [progress, setProgress] = useState(0);

  // 从 Markdown 内容中提取标题
  useEffect(() => {
    if (!content) return;

    const lines = content.split('\n');
    const headings = [];
    
    lines.forEach((line, index) => {
      const match = line.match(/^(#{2})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        
        // 生成与组件中相同的ID
        const id = text
          .toLowerCase()
          .replace(/\s+/g, '')
          .replace(/[^\w\u4e00-\u9fff、]/g, '')
          .replace(/^-+|-+$/g, '');

        headings.push({
          id,
          text,
          level,
          line: index
        });
      }
    });

    setTocItems(headings);
  }, [content]);
  
  // 当未提供 Markdown 内容或未解析出标题时，从已渲染 DOM 兜底生成目录
  useEffect(() => {
    if (tocItems.length > 0) return;
    const main = document.querySelector('main');
    if (!main) return;
    const nodeList = main.querySelectorAll('h2');
    if (!nodeList || nodeList.length === 0) return;
    const domHeadings = Array.from(nodeList).map((el, i) => {
      const level = Number(el.tagName.substring(1));
      const text = (el.textContent || '').trim() || `Section ${i + 1}`;
      const id = el.id || text
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[^\w\u4e00-\u9fff、]/g, '')
        .replace(/^-+|-+$/g, '');
      if (!el.id) el.id = id;
      return { id, text, level, line: i };
    });
    if (domHeadings.length > 0) setTocItems(domHeadings);
  }, [content, tocItems.length]);

  // 监听右侧滚动容器，高亮当前章节并计算阅读进度
  useEffect(() => {
    const container = document.querySelector('.layout-container') || window;

    const getScrollTop = () =>
      container === window
        ? window.pageYOffset || document.documentElement.scrollTop
        : container.scrollTop;

    const getScrollHeight = () =>
      container === window
        ? document.documentElement.scrollHeight
        : container.scrollHeight;

    const getClientHeight = () =>
      container === window
        ? window.innerHeight
        : container.clientHeight;

    const handleScroll = () => {
      const headingEls = tocItems.map(item => document.getElementById(item.id)).filter(Boolean);
      let currentActive = null;
      const top = getScrollTop();

      for (let i = headingEls.length - 1; i >= 0; i--) {
        const el = headingEls[i];
        const elTop = container === window
          ? el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop)
          : el.offsetTop;
        if (elTop <= top + 80) { // 减少偏移量，提高精确度
          currentActive = el.id;
          break;
        }
      }

      if (currentActive !== activeSection) setActiveSection(currentActive);

      const total = Math.max(1, getScrollHeight() - getClientHeight());
      setProgress(Math.min(100, (getScrollTop() / total) * 100));
    };

    handleScroll();
    const target = container === window ? window : container;
    target.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      target.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [tocItems, activeSection]);

  const handleTocClick = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    
    // 优化滚动定位，确保平滑滚动到正确位置
    const container = document.querySelector('.layout-container') || window;
    const offset = 80; // 增加偏移量，避免标题被遮挡

    const targetTop = container === window
      ? (el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop)) - offset
      : el.offsetTop - offset;

    if (container === window) {
      window.scrollTo({ 
        top: Math.max(0, targetTop), 
        behavior: 'smooth' 
      });
    } else {
      container.scrollTo({ 
        top: Math.max(0, targetTop), 
        behavior: 'smooth' 
      });
    }

    setActiveSection(id);
    if (onClose && window.innerWidth <= 768) onClose();
  };

  const getIndentClass = (level) => {
    switch (level) {
      case 1: return 'toc-level-1';
      case 2: return 'toc-level-2';
      case 3: return 'toc-level-3';
      case 4: return 'toc-level-4';
      case 5: return 'toc-level-5';
      case 6: return 'toc-level-6';
      default: return 'toc-level-2';
    }
  };

  return (
    <>
      {/* 移动端遮罩层 */}
      {isOpen && (
        <div 
          className="mobile-toc-overlay"
          onClick={onClose}
        />
      )}
      
      <aside className={`left-sidebar article-toc-sidebar ${isOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-content">
          {/* Header */}
          <div className="sidebar-header">
            <div className="logo-icon-container">📖</div>
            <h2 className="sidebar-title-main">文章</h2>
            <p className="sidebar-subtitle">目录导航</p>
          </div>

          {/* 返回按钮 */}
          <div className="toc-back-section">
            <button 
              className="toc-back-btn"
              onClick={() => window.history.back()}
            >
              ← 返回上一页
            </button>
          </div>

          {/* 目录内容 */}
          <div className="toc-content">
            <div className="toc-header">
              <h3>📋 文章目录</h3>
              <span className="toc-count">{tocItems.length} 个章节</span>
            </div>
            
            <nav className="toc-nav">
              {tocItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className={`toc-item ${getIndentClass(item.level)} ${
                    activeSection === item.id ? 'active' : ''
                  }`}
                  onClick={() => handleTocClick(item.id)}
                >
                  <div className="toc-item-content">
                    <span className="toc-number">{index + 1}</span>
                    <span className="toc-text">{item.text}</span>
                  </div>
                  <div className="toc-item-indicator"></div>
                </div>
              ))}
            </nav>
          </div>

          {/* 阅读进度 */}
          <div className="reading-progress">
            <div className="progress-header">
              <span>📊 阅读进度</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ArticleTableOfContents;