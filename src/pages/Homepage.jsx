import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedArticle from '../components/FeaturedArticle';
import '../components/Homepage.css';
import '../styles/card.css';

const Homepage = () => {
  return (
    <div className="homepage">
      {/* 合并内容区域以减少留白 */}
      <div className="main-content-section">
        <FeaturedArticle />
        
        {/* 三个主要内容卡片 - 使用新的炫酷卡片样式 */}
        <div className="content-cards-grid">
          <div className="card">
            <div className="card__border"></div>
            <div className="featured-badge">精选</div>
            
            <div className="card_title__container">
              <div className="card_icon">🔧</div>
              <div>
                <h3 className="card_title">什么是嵌入式系统</h3>
                <p className="card_paragraph">
                  嵌入式系统是专门设计用于执行特定功能的计算机系统，通常集成在更大的设备中。
                  它们具有实时性、可靠性和低功耗的特点，广泛应用于物联网、汽车电子、医疗设备等领域。
                </p>
              </div>
            </div>
            
            <hr className="line" />
            
            <div className="card__list">
              <div className="card__list_item">
                <div className="check">
                  <svg className="check_svg" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </div>
                <span className="list_text">实时操作系统 (RTOS)</span>
              </div>
              <div className="card__list_item">
                <div className="check">
                  <svg className="check_svg" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </div>
                <span className="list_text">微控制器与处理器</span>
              </div>
              <div className="card__list_item">
                <div className="check">
                  <svg className="check_svg" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </div>
                <span className="list_text">硬件抽象层 (HAL)</span>
              </div>
              <div className="card__list_item">
                <div className="check">
                  <svg className="check_svg" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </div>
                <span className="list_text">低功耗设计原理</span>
              </div>
            </div>
            
            <Link to="/embedded-systems" className="button">深入了解</Link>
          </div>

          <div className="card">
            <div className="card__border"></div>
            <div className="featured-badge">精选</div>
            
            <div className="card_title__container">
              <div className="card_icon">💻</div>
              <div>
                <h3 className="card_title">前端开发技术栈</h3>
                <p className="card_paragraph">
                  现代前端开发涵盖了从基础的HTML/CSS/JavaScript到复杂的框架和工具链。
                  掌握React、Vue等框架，以及构建工具和状态管理，是成为优秀前端开发者的关键。
                </p>
              </div>
            </div>
            
            <hr className="line" />
            
            <div className="card__list">
              <div className="card__list_item">
                <div className="check">
                  <svg className="check_svg" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </div>
                <span className="list_text">React / Vue / Angular</span>
              </div>
              <div className="card__list_item">
                <div className="check">
                  <svg className="check_svg" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </div>
                <span className="list_text">TypeScript 类型系统</span>
              </div>
              <div className="card__list_item">
                <div className="check">
                  <svg className="check_svg" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </div>
                <span className="list_text">Webpack / Vite 构建工具</span>
              </div>
              <div className="card__list_item">
                <div className="check">
                  <svg className="check_svg" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </div>
                <span className="list_text">状态管理与路由</span>
              </div>
            </div>
            
            <Link to="/frontend-stack" className="button">开始学习</Link>
          </div>

          <div className="card">
            <div className="card__border"></div>
            <div className="featured-badge">精选</div>
            
            <div className="card_title__container">
              <div className="card_icon">☁️</div>
              <div>
                <h3 className="card_title">云原生架构设计</h3>
                <p className="card_paragraph">
                  云原生架构利用容器化、微服务和DevOps实践，构建可扩展、弹性和可观测的应用程序。
                  Docker、Kubernetes和服务网格是云原生生态系统的核心组件。
                </p>
              </div>
            </div>
            
            <hr className="line" />
            
            <div className="card__list">
              <div className="card__list_item">
                <div className="check">
                  <svg className="check_svg" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </div>
                <span className="list_text">容器化与Docker</span>
              </div>
              <div className="card__list_item">
                <div className="check">
                  <svg className="check_svg" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </div>
                <span className="list_text">Kubernetes 编排</span>
              </div>
              <div className="card__list_item">
                <div className="check">
                  <svg className="check_svg" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </div>
                <span className="list_text">微服务架构</span>
              </div>
              <div className="card__list_item">
                <div className="check">
                  <svg className="check_svg" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </div>
                <span className="list_text">CI/CD 流水线</span>
              </div>
            </div>
            
            <Link to="/cloud-native" className="button">探索架构</Link>
          </div>
        </div>
        
        {/* 添加底部内容区域，填充空白 */}
        <div className="bottom-content-section">
          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">技术文章</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">代码示例</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">在线支持</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">开源免费</div>
            </div>
          </div>
          
          {/* <div className="quick-links-section">
            <h3 className="section-title">快速导航</h3>
            <div className="quick-links-grid">
              <Link to="/hardware-basics" className="quick-link">
                <span className="quick-link-icon">🔧</span>
                <span className="quick-link-text">硬件基础</span>
              </Link>
              <Link to="/programming" className="quick-link">
                <span className="quick-link-icon">💻</span>
                <span className="quick-link-text">编程开发</span>
              </Link>
              <Link to="/mcu-guide" className="quick-link">
                <span className="quick-link-icon">🎛️</span>
                <span className="quick-link-text">单片机指南</span>
              </Link>
              <Link to="/ai-apps" className="quick-link">
                <span className="quick-link-icon">🤖</span>
                <span className="quick-link-text">AI应用</span>
              </Link>
              <Link to="/products" className="quick-link">
                <span className="quick-link-icon">🛍️</span>
                <span className="quick-link-text">产品推荐</span>
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;