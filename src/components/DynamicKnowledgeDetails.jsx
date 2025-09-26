import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  getArticleMetadata, 
  loadArticleContent, 
  getRelatedArticles 
} from '../utils/contentLoader';
import '../styles/DetailsPage.css';

const DynamicKnowledgeDetails = () => {
  const { category, slug } = useParams();
  const [metadata, setMetadata] = useState(null);
  const [content, setContent] = useState('');
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setError(null);

        // 加载文章元数据
        const articleMetadata = getArticleMetadata(category, slug);
        if (!articleMetadata) {
          throw new Error('文章不存在');
        }
        setMetadata(articleMetadata);

        // 加载文章内容
        const articleContent = await loadArticleContent(category, slug);
        setContent(articleContent);

        // 加载相关文章
        const related = getRelatedArticles(
          category, 
          slug, 
          articleMetadata.tags, 
          3
        );
        setRelatedArticles(related);

      } catch (err) {
        console.error('Error loading article:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (category && slug) {
      loadArticle();
    }
  }, [category, slug]);

  // 自定义 Markdown 组件
  const markdownComponents = {
    // 代码块样式
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline ? (
        <pre className="code-block">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      ) : (
        <code className="inline-code" {...props}>
          {children}
        </code>
      );
    },
    // 表格样式
    table: ({ children }) => (
      <div className="table-wrapper">
        <table className="markdown-table">{children}</table>
      </div>
    ),
    // 链接样式
    a: ({ href, children }) => (
      <a href={href} className="markdown-link" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    // 引用块样式
    blockquote: ({ children }) => (
      <blockquote className="markdown-blockquote">
        {children}
      </blockquote>
    )
  };

  if (loading) {
    return (
      <div className="details-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>正在加载文章...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-page">
        <div className="error-container">
          <h1>😕 加载失败</h1>
          <p>{error}</p>
          <Link to="/" className="back-home-btn">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  if (!metadata) {
    return (
      <div className="details-page">
        <div className="error-container">
          <h1>📄 文章未找到</h1>
          <p>请求的文章不存在或已被删除</p>
          <Link to="/" className="back-home-btn">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="details-page">
      {/* Header */}
      <header className="details-header">
        <nav className="breadcrumb">
          <Link to="/">首页</Link>
          <span>›</span>
          <span>{metadata.category}</span>
          <span>›</span>
          <span>{metadata.title}</span>
        </nav>
        
        <h1 className="details-title">{metadata.title}</h1>
        
        <div className="details-meta">
          <span>📅 {metadata.date}</span>
          <span>👤 {metadata.author}</span>
          <span>⏱️ {metadata.readTime}</span>
          <div className="knowledge-tags">
            {metadata.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="details-content">
        <ReactMarkdown
          components={markdownComponents}
          remarkPlugins={[remarkGfm]}
        >
          {content}
        </ReactMarkdown>
      </main>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="related-section">
          <h2 className="related-title">相关文章</h2>
          <div className="related-grid">
            {relatedArticles.map((article) => (
              <Link 
                key={`${article.category}-${article.slug}`}
                to={`/knowledge/${article.category}/${article.slug}`}
                className="knowledge-card"
              >
                <div className="knowledge-category">{article.categoryName}</div>
                <h3 className="knowledge-title">{article.title}</h3>
                <p className="knowledge-description">{article.description}</p>
                <div className="knowledge-tags">
                  {article.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DynamicKnowledgeDetails;