import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/KnowledgeDetails.css';

const McuGuide = () => {
  const navigate = useNavigate();
  const knowledgeCards = [
    {
      id: 1,
      icon: '🎯',
      title: 'STM32 系列单片机',
      description: '基于ARM Cortex-M内核的32位单片机，功能强大，应用广泛，是嵌入式开发的热门选择。',
      features: [
        'STM32F103：入门级选择，性价比高',
        'STM32F407：高性能应用，168MHz主频',
        'STM32L4：超低功耗设计，适合电池供电',
        'HAL库支持：简化开发流程'
      ],
      tags: ['STM32', '单片机', 'ARM'],
      buttonText: '继续阅读',
      detailPath: '/knowledge/mcu/stm32-series'
    },
    {
      id: 2,
      icon: '🎨',
      title: 'Arduino 开发平台',
      description: '开源硬件平台，简单易用，适合初学者和快速原型开发，拥有丰富的社区资源。',
      features: [
        'Arduino Uno：经典入门开发板',
        'ESP32：集成WiFi和蓝牙功能',
        '图形化编程：简化代码编写',
        '丰富库支持：快速实现功能'
      ],
      tags: ['Arduino', 'ESP32', '开源'],
      buttonText: '继续阅读',
      detailPath: '/knowledge/mcu/arduino-platform'
    },
    {
      id: 3,
      icon: '🚀',
      title: '项目开发流程',
      description: '从需求分析到产品化的完整开发流程，掌握系统性的项目管理和开发方法。',
      features: [
        '需求分析：明确项目目标和约束',
        '硬件设计：电路设计和PCB布局',
        '固件开发：编写和调试嵌入式代码',
        '系统测试：验证功能和性能指标'
      ],
      tags: ['项目管理', '开发流程', 'PCB'],
      buttonText: '继续阅读',
      detailPath: '/knowledge/mcu/dev-process'
    }
  ];

  // 处理卡片点击事件
  const handleCardClick = (detailPath) => {
    navigate(detailPath);
  };

  return (
    <div className="knowledge-details">
      <div className="knowledge-header">
        <div className="header-icon">🎛️</div>
        <div className="header-content">
          <h1>单 片 机 指 南</h1>
          <p>深入学习单片机开发</p>
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

export default McuGuide;