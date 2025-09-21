import React from 'react';
import './ArticlePreview.css';

const ArticlePreview = () => {
  return (
    <section className="article-preview">
      <div className="preview-container">
        {/* 第一个组件 */}
        <div className="preview-card">
          <div className="preview-header">
            <div className="preview-icon">🔧</div>
            <h2 className="preview-title">什么是嵌入式系统？</h2>
          </div>
          
          <div className="preview-content">
            <p className="preview-text">
              嵌入式系统是专门设计用于执行特定功能的计算机系统，它被嵌入到更大的机械或电气系统中。与通用计算机不同，嵌入式系统具有实时性要求、资源限制和高可靠性等特点。
            </p>
            
            <ul className="preview-points">
              <li>实时性：能够在规定时间内响应外部事件</li>
              <li>资源受限：内存、处理能力和功耗有严格限制</li>
              <li>专用性：针对特定应用场景进行优化设计</li>
              <li>高可靠性：需要长期稳定运行，故障率极低</li>
            </ul>
            
            <div className="preview-footer">
              <button className="read-more-btn">继续阅读</button>
            </div>
          </div>
        </div>

        {/* 第二个组件 */}
        <div className="preview-card">
          <div className="preview-header">
            <div className="preview-icon">💻</div>
            <h2 className="preview-title">前端开发技术栈</h2>
          </div>
          
          <div className="preview-content">
            <p className="preview-text">
              现代前端开发涉及多种技术和工具，从基础的HTML、CSS、JavaScript到复杂的框架和构建工具。掌握完整的技术栈对于构建高质量的Web应用至关重要。
            </p>
            
            <ul className="preview-points">
              <li>React/Vue：现代前端框架</li>
              <li>TypeScript：类型安全的JavaScript</li>
              <li>Webpack/Vite：模块打包工具</li>
              <li>CSS预处理器：Sass/Less提升开发效率</li>
            </ul>
            
            <div className="preview-footer">
              <button className="read-more-btn">继续阅读</button>
            </div>
          </div>
        </div>

        {/* 第三个组件 */}
        <div className="preview-card">
          <div className="preview-header">
            <div className="preview-icon">🚀</div>
            <h2 className="preview-title">云原生架构设计</h2>
          </div>
          
          <div className="preview-content">
            <p className="preview-text">
              云原生架构是一种构建和运行应用程序的方法，充分利用云计算的优势。它强调容器化、微服务、DevOps和持续交付等核心概念。
            </p>
            
            <ul className="preview-points">
              <li>容器化：Docker和Kubernetes编排</li>
              <li>微服务：服务拆分和治理</li>
              <li>DevOps：自动化部署和监控</li>
              <li>弹性扩展：根据负载自动调整资源</li>
            </ul>
            
            <div className="preview-footer">
              <button className="read-more-btn">继续阅读</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlePreview;