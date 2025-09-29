import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { 
  getArticleMetadata, 
  loadArticleContent, 
  getRelatedArticles 
} from '../utils/contentLoader';
import ArticleTableOfContents from './ArticleTableOfContents';
import LazyImage from './LazyImage';
import '../styles/DetailsPage.css';
import './ArticleTableOfContents.css';
import 'katex/dist/katex.min.css';

const DynamicKnowledgeDetails = () => {
  const { category, slug } = useParams();
  const [metadata, setMetadata] = useState(null);
  const [content, setContent] = useState('');
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

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

  // 生成中文友好的锚点ID
  const generateChineseId = (text) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '')  // 移除所有空格
      .replace(/[^\w\u4e00-\u9fff、]/g, '')  // 保留字母、数字、中文、顿号
      .replace(/^-+|-+$/g, '');
  };

  // 自定义 Markdown 组件
  const markdownComponents = {
    // 自定义标题组件，生成中文友好的ID
    h1: ({ children }) => {
      const text = children.toString();
      const id = generateChineseId(text);
      console.log('H1 标题:', text, '生成ID:', id);
      return <h1 id={id}>{children}</h1>;
    },
    h2: ({ children }) => {
      const text = children.toString();
      const id = generateChineseId(text);
      console.log('H2 标题:', text, '生成ID:', id);
      return <h2 id={id}>{children}</h2>;
    },
    h3: ({ children }) => {
      const text = children.toString();
      const id = generateChineseId(text);
      return <h3 id={id}>{children}</h3>;
    },
    h4: ({ children }) => {
      const text = children.toString();
      const id = generateChineseId(text);
      return <h4 id={id}>{children}</h4>;
    },
    h5: ({ children }) => {
      const text = children.toString();
      const id = generateChineseId(text);
      return <h5 id={id}>{children}</h5>;
    },
    h6: ({ children }) => {
      const text = children.toString();
      const id = generateChineseId(text);
      return <h6 id={id}>{children}</h6>;
    },
    // 懒加载图片组件
    img: ({ src, alt, ...props }) => (
      <LazyImage 
        src={src} 
        alt={alt || '图片'} 
        className="markdown-image"
        {...props}
      />
    ),
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
    // 链接样式 - 区分内部锚点链接和外部链接
    a: ({ href, children }) => {
      // 如果是锚点链接（以#开头），使用内部跳转
      if (href && href.startsWith('#')) {
        const handleAnchorClick = (e) => {
          e.preventDefault();
          let targetId = href.substring(1);
          
          // 解码URL编码的中文字符
          try {
            targetId = decodeURIComponent(targetId);
          } catch (error) {
            console.log('URL解码失败，使用原始ID:', targetId);
          }
          
          console.log('点击锚点链接:', href, '解码后目标ID:', targetId);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            console.log('找到目标元素，开始滚动');
            targetElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          } else {
            console.log('未找到目标元素:', targetId);
            // 尝试查找所有可能的元素进行调试
            console.log('页面中所有带ID的元素:', Array.from(document.querySelectorAll('[id]')).map(el => el.id));
          }
        };
        
        return (
          <a 
            href={href} 
            className="markdown-link anchor-link" 
            onClick={handleAnchorClick}
          >
            {children}
          </a>
        );
      }
      
      // 外部链接
      return (
        <a href={href} className="markdown-link" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
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
    <>
      {/* 移动端目录切换按钮 */}
      <button 
        className="mobile-toc-toggle"
        onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
      >
        📖 目录
      </button>
      
      {/* 文章目录侧边栏 */}
      <ArticleTableOfContents 
        content={content} 
        isOpen={isMobileTocOpen}
        onClose={() => setIsMobileTocOpen(false)}
      />
      
      <div className="details-page article-page">
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
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
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
    </>
  );
};

export default DynamicKnowledgeDetails;