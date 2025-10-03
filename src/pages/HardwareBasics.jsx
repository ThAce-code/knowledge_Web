import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/KnowledgeDetails.css';
import Pagination from '../components/Pagination.jsx';

const HardwareBasics = () => {
  const navigate = useNavigate();
  const knowledgeCards = [
    {
      id: 1,
      icon: '🔧',
      title: 'CPU处理器基础',
      description: '深入了解CPU的工作原理、架构设计和性能优化，掌握处理器的核心技术和发展趋势。',
      features: [
        'CPU架构：x86、ARM、RISC-V等主流架构',
        '指令集：CISC和RISC指令集的区别',
        '流水线：提高处理器执行效率的关键技术',
        '缓存系统：L1、L2、L3缓存的层次结构'
      ],
      tags: ['CPU', '处理器', '架构'],
      buttonText: '继续阅读',
      detailPath: '/knowledge/hardware/cpu-basics'
    },
    {
      id: 2,
      icon: '💾',
      title: '内存系统原理',
      description: '学习内存的工作机制、类型分类和性能优化，理解内存在计算机系统中的重要作用。',
      features: [
        'RAM类型：DDR4、DDR5等内存技术',
        '内存控制器：内存访问的管理机制',
        '虚拟内存：操作系统的内存管理策略',
        '内存优化：提高内存使用效率的方法'
      ],
      tags: ['内存', 'RAM', 'DDR'],
      buttonText: '继续阅读',
      detailPath: '/knowledge/hardware/memory-systems'
    },
    {
      id: 3,
      icon: '💿',
      title: '存储设备技术',
      description: '探索各种存储设备的技术原理，包括机械硬盘、固态硬盘和新兴存储技术的特点。',
      features: [
        'HDD机械硬盘：传统磁存储技术',
        'SSD固态硬盘：基于闪存的高速存储',
        'NVMe协议：高性能存储接口标准',
        '存储优化：RAID、缓存等技术应用'
      ],
      tags: ['存储', 'SSD', 'HDD'],
      buttonText: '继续阅读',
      detailPath: '/knowledge/hardware/storage-devices'
    }
  ];

  // 处理卡片点击事件
  // 分页（每页12条）
  const pageSize = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const pagedCards = Array.isArray(knowledgeCards)
    ? knowledgeCards.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  const handleCardClick = (detailPath) => {
    navigate(detailPath);
  };

  return (
    <div className="knowledge-details">
      <div className="knowledge-header">
        <div className="header-icon">🔧</div>
        <div className="header-content">
          <h1>硬 件 基 础</h1>
          <p>学习电子硬件的基础知识</p>
        </div>
      </div>

      <div className="knowledge-cards-grid">
        {pagedCards.map(card => (
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
      <Pagination
        totalItems={knowledgeCards.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        variant="ellipsis"
      />
    </div>
  );
};

export default HardwareBasics;