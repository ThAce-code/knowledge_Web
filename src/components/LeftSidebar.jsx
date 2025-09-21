import React, { useState } from 'react';
import './RightSidebar.css';

const RightSidebar = () => {
  const [activeItem, setActiveItem] = useState(null); // 不默认选中任何项目
  
  const tocItems = [
    { id: 'table-of-contents', label: '目录', icon: '📋' },
    { id: 'hardware-basics', label: '硬件基础', icon: '🔧' },
    { id: 'programming', label: '编程开发', icon: '💻' },
    { id: 'mcu-guide', label: '单片机指南', icon: '🎛️' },
    { id: 'iot-projects', label: '物联网项目', icon: '🌐' },
    { id: 'debugging-tips', label: '调试技巧', icon: '🐛' }
  ];

  const handleItemClick = (itemId, event) => {
    // 不阻止默认行为，允许页面跳转
    setActiveItem(itemId); // 设置选中状态
    
    // 平滑滚动到对应元素
    setTimeout(() => {
      const targetElement = document.getElementById(itemId);
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  return (
    <aside className="right-sidebar">
      <div className="right-sidebar-card">
        <div className="right-sidebar-content">
          <h3 className="right-sidebar-title">目录导航</h3>
          
          <nav className="right-sidebar-nav">
            <ul className="right-sidebar-list">
              {tocItems.map((item) => (
                <li key={item.id} className={`right-sidebar-item ${activeItem === item.id ? 'active' : ''}`}>
                  <a 
                    href={`#${item.id}`} 
                    className="right-sidebar-link"
                    onClick={(e) => handleItemClick(item.id, e)}
                  >
                    <span className="right-sidebar-icon">{item.icon}</span>
                    <span className="right-sidebar-label">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;