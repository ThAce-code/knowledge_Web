import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/KnowledgeDetails.css';

const AiApps = () => {
  const navigate = useNavigate();

  const knowledgeCards = [
    {
      id: 1,
      icon: '💬',
      title: 'ChatGPT',
      description: '强大的AI对话助手，支持代码编写、问题解答、创意写作等多种任务，是提升工作效率的得力助手。',
      features: [
        '智能对话：自然语言交互体验',
        '代码助手：编程问题解答和调试',
        '创意写作：文案、故事、诗歌创作',
        '学习辅导：知识解释和答疑解惑'
      ],
      tags: ['对话AI', 'ChatGPT', '代码助手'],
      buttonText: '查看详情',
      detailPath: '/knowledge/ai-apps/chatgpt'
    },
    {
      id: 2,
      icon: '👨‍💻',
      title: 'GitHub Copilot',
      description: '基于AI的代码补全工具，实时提供智能代码建议，大幅提升编程效率和代码质量。',
      features: [
        '智能补全：实时代码建议和自动完成',
        '多语言支持：支持主流编程语言',
        '上下文理解：基于项目上下文生成代码',
        'IDE集成：无缝集成到开发环境'
      ],
      tags: ['代码补全', 'GitHub', 'AI编程'],
      buttonText: '查看详情',
      detailPath: '/knowledge/ai-apps/copilot'
    },
    {
      id: 3,
      icon: '🎨',
      title: 'Midjourney',
      description: '顶级AI图像生成工具，通过文字描述创造出令人惊艳的艺术作品和设计图像。',
      features: [
        '文字生图：通过提示词生成高质量图像',
        '艺术风格：多种艺术风格和画面效果',
        '高分辨率：支持高清图像输出',
        '创意无限：激发设计灵感和创意'
      ],
      tags: ['图像生成', 'AI绘画', '艺术创作'],
      buttonText: '查看详情',
      detailPath: '/knowledge/ai-apps/midjourney'
    }
  ];

  // 处理卡片点击事件
  const handleCardClick = (detailPath) => {
    navigate(detailPath);
  };

  return (
    <div className="knowledge-details">
      <div className="knowledge-header">
        <div className="header-icon">🤖</div>
        <div className="header-content">
          <h1>A I 应 用</h1>
          <p>探索人工智能的无限可能</p>
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

export default AiApps;