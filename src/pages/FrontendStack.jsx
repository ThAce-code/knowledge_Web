import React from 'react';
import '../styles/KnowledgeDetails.css';

const FrontendStack = () => {
  return (
    <div className="knowledge-details">
      <div className="knowledge-header">
        <div className="knowledge-icon">💻</div>
        <div className="knowledge-title-section">
          <h1 className="knowledge-title">前端开发技术栈</h1>
          <p className="knowledge-subtitle">掌握现代前端开发的完整技术体系</p>
        </div>
      </div>

      <div className="knowledge-content">
        <section className="content-section">
          <h2>技术栈概述</h2>
          <p>
            现代前端开发涵盖了从基础的HTML/CSS/JavaScript到复杂的框架和工具链。
            掌握React、Vue等框架，以及构建工具和状态管理，是成为优秀前端开发者的关键。
            本指南将带你了解完整的前端技术生态系统。
          </p>
        </section>

        <section className="content-section">
          <h2>核心技术框架</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>⚛️ React</h3>
              <p>组件化开发、虚拟DOM、Hooks生态，构建高性能用户界面。</p>
            </div>
            <div className="feature-card">
              <h3>🟢 Vue.js</h3>
              <p>渐进式框架、双向数据绑定、组合式API，易学易用。</p>
            </div>
            <div className="feature-card">
              <h3>🅰️ Angular</h3>
              <p>企业级框架、TypeScript原生支持、依赖注入系统。</p>
            </div>
            <div className="feature-card">
              <h3>⚡ Svelte</h3>
              <p>编译时优化、无虚拟DOM、更小的包体积。</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>开发工具链</h2>
          <div className="tech-stack">
            <div className="stack-layer">
              <h3>TypeScript 类型系统</h3>
              <p>静态类型检查、更好的IDE支持、减少运行时错误，提升代码质量和开发效率。</p>
            </div>
            <div className="stack-layer">
              <h3>构建工具</h3>
              <p>Webpack、Vite、Rollup等现代构建工具，提供模块打包、热重载、代码分割等功能。</p>
            </div>
            <div className="stack-layer">
              <h3>状态管理</h3>
              <p>Redux、Zustand、Pinia等状态管理库，处理复杂应用的数据流。</p>
            </div>
            <div className="stack-layer">
              <h3>CSS预处理器</h3>
              <p>Sass、Less、Stylus，以及CSS-in-JS解决方案，提升样式开发效率。</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>现代开发实践</h2>
          <div className="applications-grid">
            <div className="app-card">
              <h4>📱 响应式设计</h4>
              <p>移动优先、弹性布局、媒体查询</p>
            </div>
            <div className="app-card">
              <h4>🚀 性能优化</h4>
              <p>代码分割、懒加载、缓存策略</p>
            </div>
            <div className="app-card">
              <h4>🧪 测试驱动</h4>
              <p>单元测试、集成测试、E2E测试</p>
            </div>
            <div className="app-card">
              <h4>♿ 可访问性</h4>
              <p>ARIA标准、键盘导航、屏幕阅读器</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>学习路径建议</h2>
          <div className="learning-path">
            <div className="path-step">
              <h4>1. 基础阶段</h4>
              <p>HTML5、CSS3、JavaScript ES6+、DOM操作、异步编程</p>
            </div>
            <div className="path-step">
              <h4>2. 框架阶段</h4>
              <p>选择React/Vue/Angular其中一个深入学习，掌握组件化思想</p>
            </div>
            <div className="path-step">
              <h4>3. 工程化阶段</h4>
              <p>构建工具、包管理、代码规范、版本控制、CI/CD</p>
            </div>
            <div className="path-step">
              <h4>4. 进阶阶段</h4>
              <p>性能优化、架构设计、微前端、服务端渲染</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FrontendStack;