import React from 'react';
import FeaturedArticle from '../components/FeaturedArticle';
import '../components/Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage">
      {/* 顶部黑洞背景横幅 */}
      <div className="main-content-section">
        <FeaturedArticle />
      </div>
      
      {/* 三个主要内容卡片 */}
      <div className="main-content-section">
        <div className="content-cards-grid">
          <div className="content-card">
            <div className="featured-badge">精选</div>
            <div className="content-card-header">
              <div className="content-card-icon">🔧</div>
              <h3 className="content-card-title">什么是嵌入式系统</h3>
            </div>
            <div className="content-card-body">
              <p className="content-card-description">
                嵌入式系统是专门设计用于执行特定功能的计算机系统，通常集成在更大的设备中。
                它们具有实时性、可靠性和低功耗的特点，广泛应用于物联网、汽车电子、医疗设备等领域。
              </p>
              <ul className="content-card-features">
                <li>实时操作系统 (RTOS)</li>
                <li>微控制器与处理器</li>
                <li>硬件抽象层 (HAL)</li>
                <li>低功耗设计原理</li>
              </ul>
            </div>
            <div className="content-card-footer">
              <button className="content-card-button">深入了解</button>
            </div>
          </div>

          <div className="content-card">
            <div className="featured-badge">精选</div>
            <div className="content-card-header">
              <div className="content-card-icon">💻</div>
              <h3 className="content-card-title">前端开发技术栈</h3>
            </div>
            <div className="content-card-body">
              <p className="content-card-description">
                现代前端开发涵盖了从基础的HTML/CSS/JavaScript到复杂的框架和工具链。
                掌握React、Vue等框架，以及构建工具和状态管理，是成为优秀前端开发者的关键。
              </p>
              <ul className="content-card-features">
                <li>React / Vue / Angular</li>
                <li>TypeScript 类型系统</li>
                <li>Webpack / Vite 构建工具</li>
                <li>状态管理与路由</li>
              </ul>
            </div>
            <div className="content-card-footer">
              <button className="content-card-button">开始学习</button>
            </div>
          </div>

          <div className="content-card">
            <div className="featured-badge">精选</div>
            <div className="content-card-header">
              <div className="content-card-icon">☁️</div>
              <h3 className="content-card-title">云原生架构设计</h3>
            </div>
            <div className="content-card-body">
              <p className="content-card-description">
                云原生架构利用容器化、微服务和DevOps实践，构建可扩展、弹性和可观测的应用程序。
                Docker、Kubernetes和服务网格是云原生生态系统的核心组件。
              </p>
              <ul className="content-card-features">
                <li>容器化与Docker</li>
                <li>Kubernetes 编排</li>
                <li>微服务架构</li>
                <li>CI/CD 流水线</li>
              </ul>
            </div>
            <div className="content-card-footer">
              <button className="content-card-button">探索架构</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Homepage;