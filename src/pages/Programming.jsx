import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/KnowledgeDetails.css';

const Programming = () => {
  const navigate = useNavigate();
  const knowledgeCards = [
    {
      id: 1,
      icon: '🔤',
      title: 'C 语言基础',
      description: '嵌入式开发的核心语言，掌握变量、函数、指针等基础概念，是所有嵌入式工程师的必备技能。',
      features: [
        '变量与数据类型：理解不同数据类型的特点',
        '函数与指针：掌握函数调用和指针操作',
        '内存管理：学习动态内存分配和释放',
        '结构体与联合：组织复杂数据结构'
      ],
      tags: ['C语言', '编程', '基础'],
      buttonText: '继续阅读',
      detailPath: '/knowledge/programming/c-basics'
    },
    {
      id: 2,
      icon: '🛠️',
      title: '开发工具链',
      description: '掌握专业的嵌入式开发工具，包括IDE、编译器、调试器等，提高开发效率和代码质量。',
      features: [
        'Keil uVision：ARM开发的专业IDE',
        'STM32CubeIDE：STM32官方开发环境',
        'PlatformIO：跨平台开发环境',
        'Git版本控制：代码管理和团队协作'
      ],
      tags: ['IDE', '工具', 'Keil'],
      buttonText: '继续阅读',
      detailPath: '/knowledge/programming/dev-tools'
    },
    {
      id: 3,
      icon: '🐛',
      title: '调试与优化',
      description: '学习高效的调试技巧和代码优化方法，快速定位问题并提升程序性能。',
      features: [
        '断点调试：逐步执行和变量监视',
        '串口调试：输出调试信息和状态',
        '性能优化：算法优化和资源管理',
        '代码审查：提高代码质量和可维护性'
      ],
      tags: ['调试', '优化', '性能'],
      buttonText: '继续阅读',
      detailPath: '/knowledge/programming/debug-optimize'
    }
  ];

  // 处理卡片点击事件
  const handleCardClick = (detailPath) => {
    navigate(detailPath);
  };

  return (
    <div className="knowledge-details">
      <div className="knowledge-header">
        <div className="header-icon">💻</div>
        <div className="header-content">
          <h1>编 程 开 发</h1>
          <p>掌握嵌入式编程技能</p>
        </div>
      </div>

      <div className="knowledge-cards-grid">
        {knowledgeCards.map(card => (
          <div key={card.id} className="knowledge-card-small">
            <div className="card-header">
              <span className="card-icon">{card.icon}</span>
              <h3 className="card-title">{card.title}</h3>
            </div>
            
            <div className="card-content">
              <p className="card-description">{card.description}</p>
              
              <div className="card-tags">
                {card.tags.map((tag, index) => (
                  <span key={index} className="card-tag">{tag}</span>
                ))}
              </div>
              
              <ul className="card-features">
                {card.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="card-footer">
              <button 
                className="card-button"
                onClick={() => handleCardClick(card.detailPath)}
              >
                {card.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programming;