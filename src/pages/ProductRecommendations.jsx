import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/KnowledgeDetails.css';

const ProductRecommendations = () => {
  const navigate = useNavigate();

  const knowledgeCards = [
    {
      id: 1,
      icon: '💻',
      title: '开发工具推荐',
      description: '精选高效的开发工具和软件，提升编程效率和开发体验，让代码编写更加轻松愉快。',
      features: [
        'VS Code：轻量级代码编辑器，插件丰富',
        'JetBrains系列：专业IDE，智能代码提示',
        'Git工具：版本控制和团队协作必备',
        '调试工具：高效定位和解决问题'
      ],
      tags: ['VS Code', 'IDE', 'Git'],
      buttonText: '查看详情',
      detailPath: '/knowledge/products/dev-tools'
    },
    {
      id: 2,
      icon: '🔧',
      title: '硬件设备推荐',
      description: '推荐优质的开发板、传感器、工具等硬件设备，适合学习和项目开发使用。',
      features: [
        'Arduino系列：入门友好的开发板',
        'STM32开发板：功能强大的ARM微控制器',
        '传感器模块：温湿度、距离、光照等',
        '调试工具：示波器、万用表、烧录器'
      ],
      tags: ['Arduino', 'STM32', '传感器'],
      buttonText: '查看详情',
      detailPath: '/knowledge/products/hardware'
    },
    {
      id: 3,
      icon: '📚',
      title: '学习资源推荐',
      description: '精选优质的学习资源，包括书籍、在线课程、技术博客等，助力技能提升。',
      features: [
        '经典技术书籍：深入理解计算机系统',
        '在线课程平台：Coursera、edX、慕课网',
        '技术博客：掘金、CSDN、博客园',
        '开源项目：GitHub优质项目推荐'
      ],
      tags: ['学习资源', '书籍', '在线课程'],
      buttonText: '查看详情',
      detailPath: '/knowledge/products/learning-resources'
    },
    {
      id: 4,
      icon: '🤖',
      title: 'AI应用推荐',
      description: '推荐实用的AI工具和应用，提升工作效率和创造力，体验人工智能的强大能力。',
      features: [
        'ChatGPT：智能对话和代码助手',
        'GitHub Copilot：AI编程助手',
        'Midjourney：AI图像生成工具',
        'Claude：高质量AI助手和分析工具'
      ],
      tags: ['AI工具', 'ChatGPT', 'Copilot'],
      buttonText: '查看详情',
      detailPath: '/knowledge/products/ai-apps'
    }
  ];

  // 处理卡片点击事件
  const handleCardClick = (detailPath) => {
    navigate(detailPath);
  };

  return (
    <div className="knowledge-details">
      <div className="knowledge-header">
        <div className="header-icon">🛍️</div>
        <div className="header-content">
          <h1>好 物 推 荐</h1>
          <p>精选优质工具与资源</p>
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

export default ProductRecommendations;