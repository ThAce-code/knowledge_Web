import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '@components/KnowledgeDetails.css';

const KnowledgeDetails = () => {
  const { id } = useParams();
  
  const knowledgeData = {
    1: {
      category: "技术文档",
      title: "React 最佳实践指南",
      date: "2024-01-15",
      author: "技术团队",
      readTime: "15 分钟",
      tags: ["React", "前端", "最佳实践"],
      content: `
        <h2>组件设计原则</h2>
        <p>在 React 开发中，良好的组件设计是构建可维护应用的基础。以下是一些核心原则：</p>
        
        <h3>单一职责原则</h3>
        <p>每个组件应该只负责一个功能。这样可以提高组件的可重用性和可测试性。</p>
        
        <ul>
          <li>保持组件功能单一且明确</li>
          <li>避免在一个组件中处理多个不相关的逻辑</li>
          <li>通过组合小组件来构建复杂功能</li>
        </ul>

        <h3>Props 设计</h3>
        <p>良好的 Props 设计能让组件更加灵活和易用：</p>
        
        <pre><code>// 推荐：明确的 Props 类型
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size, 
  disabled, 
  onClick, 
  children 
}) => {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};</code></pre>

        <h2>状态管理最佳实践</h2>
        <p>合理的状态管理是 React 应用性能和可维护性的关键。</p>

        <h3>状态提升</h3>
        <p>当多个组件需要共享状态时，应该将状态提升到它们的共同父组件中。</p>

        <blockquote>
          "状态应该尽可能接近使用它的地方，但当需要共享时，不要犹豫提升状态。"
        </blockquote>

        <h3>使用 useReducer 管理复杂状态</h3>
        <p>对于复杂的状态逻辑，useReducer 比 useState 更合适：</p>

        <pre><code>const initialState = { count: 0, loading: false };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'setLoading':
      return { ...state, loading: action.payload };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // ...
}</code></pre>

        <h2>性能优化技巧</h2>
        <p>以下是一些常用的 React 性能优化技巧：</p>

        <ol>
          <li><strong>使用 React.memo</strong> - 防止不必要的重新渲染</li>
          <li><strong>useMemo 和 useCallback</strong> - 缓存昂贵的计算和函数</li>
          <li><strong>代码分割</strong> - 使用 React.lazy 和 Suspense</li>
          <li><strong>虚拟化长列表</strong> - 对于大量数据的列表组件</li>
        </ol>

        <h3>避免常见的性能陷阱</h3>
        <ul>
          <li>避免在渲染函数中创建新对象或函数</li>
          <li>合理使用 useEffect 的依赖数组</li>
          <li>避免过度使用 Context</li>
        </ul>
      `
    },
    2: {
      category: "设计系统",
      title: "现代 UI 设计原则",
      date: "2024-01-12",
      author: "设计团队",
      readTime: "12 分钟",
      tags: ["UI设计", "用户体验", "设计系统"],
      content: `
        <h2>设计系统的重要性</h2>
        <p>设计系统是现代产品开发中不可或缺的一部分，它确保了产品在不同平台和设备上的一致性。</p>

        <h3>核心组成部分</h3>
        <ul>
          <li>设计原则和价值观</li>
          <li>颜色系统和调色板</li>
          <li>字体系统和排版规范</li>
          <li>组件库和交互模式</li>
          <li>图标系统和插图风格</li>
        </ul>

        <h2>色彩理论与应用</h2>
        <p>色彩是用户界面设计中最重要的元素之一，它不仅影响美观，还直接影响用户体验。</p>

        <h3>色彩心理学</h3>
        <p>不同的颜色会引发不同的情感反应：</p>
        <ul>
          <li><strong>蓝色</strong> - 信任、专业、稳定</li>
          <li><strong>绿色</strong> - 成功、自然、成长</li>
          <li><strong>红色</strong> - 紧急、警告、激情</li>
          <li><strong>紫色</strong> - 创新、奢华、智慧</li>
        </ul>

        <h2>交互设计原则</h2>
        <p>良好的交互设计能够引导用户完成任务，提供直观的用户体验。</p>

        <blockquote>
          "最好的界面是没有界面。但当我们需要界面时，它应该是不可见的。"
        </blockquote>
      `
    }
  };

  const relatedArticles = [
    { id: 2, title: "现代 UI 设计原则", category: "设计系统" },
    { id: 3, title: "高效开发环境配置", category: "开发工具" },
    { id: 4, title: "数据库设计模式", category: "数据库" }
  ];

  const currentKnowledge = knowledgeData[id] || knowledgeData[1];

  return (
    <div className="details-page">
      {/* Header */}
      <header className="details-header">
        <nav className="breadcrumb">
          <Link to="/">首页</Link>
          <span>›</span>
          <span>{currentKnowledge.category}</span>
          <span>›</span>
          <span>{currentKnowledge.title}</span>
        </nav>
        
        <h1 className="details-title">{currentKnowledge.title}</h1>
        
        <div className="details-meta">
          <span>📅 {currentKnowledge.date}</span>
          <span>👤 {currentKnowledge.author}</span>
          <span>⏱️ {currentKnowledge.readTime}</span>
          <div className="knowledge-tags">
            {currentKnowledge.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="details-content">
        <div dangerouslySetInnerHTML={{ __html: currentKnowledge.content }} />
      </main>

      {/* Related Articles */}
      <section className="related-section">
        <h2 className="related-title">相关文章</h2>
        <div className="related-grid">
          {relatedArticles.filter(article => article.id !== parseInt(id)).map((article) => (
            <Link 
              key={article.id}
              to={`/knowledge/${article.id}`}
              className="knowledge-card"
              style={{ textDecoration: 'none' }}
            >
              <div className="knowledge-category">{article.category}</div>
              <h3 className="knowledge-title">{article.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default KnowledgeDetails;