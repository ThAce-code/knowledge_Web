import React from 'react';
import '../styles/KnowledgeDetails.css';

const CloudNative = () => {
  return (
    <div className="knowledge-details">
      <div className="knowledge-header">
        <div className="knowledge-icon">☁️</div>
        <div className="knowledge-title-section">
          <h1 className="knowledge-title">云原生架构设计</h1>
          <p className="knowledge-subtitle">构建可扩展、弹性和可观测的现代应用</p>
        </div>
      </div>

      <div className="knowledge-content">
        <section className="content-section">
          <h2>云原生概述</h2>
          <p>
            云原生架构利用容器化、微服务和DevOps实践，构建可扩展、弹性和可观测的应用程序。
            Docker、Kubernetes和服务网格是云原生生态系统的核心组件。
            这种架构模式能够充分发挥云计算的优势，实现应用的快速迭代和高效运维。
          </p>
        </section>

        <section className="content-section">
          <h2>核心技术组件</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🐳 容器化</h3>
              <p>Docker容器技术，实现应用的标准化打包和部署。</p>
            </div>
            <div className="feature-card">
              <h3>☸️ 容器编排</h3>
              <p>Kubernetes集群管理，自动化部署、扩缩容和故障恢复。</p>
            </div>
            <div className="feature-card">
              <h3>🔧 微服务</h3>
              <p>服务拆分和治理，提高系统的可维护性和扩展性。</p>
            </div>
            <div className="feature-card">
              <h3>🔄 DevOps</h3>
              <p>持续集成/持续部署，自动化测试和发布流程。</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>架构设计原则</h2>
          <div className="tech-stack">
            <div className="stack-layer">
              <h3>容器化与Docker</h3>
              <p>应用容器化、镜像管理、多阶段构建，实现环境一致性和快速部署。</p>
            </div>
            <div className="stack-layer">
              <h3>Kubernetes 编排</h3>
              <p>Pod管理、Service发现、配置管理、存储编排，构建弹性基础设施。</p>
            </div>
            <div className="stack-layer">
              <h3>微服务架构</h3>
              <p>服务拆分、API网关、服务注册发现、分布式事务处理。</p>
            </div>
            <div className="stack-layer">
              <h3>CI/CD 流水线</h3>
              <p>自动化构建、测试、部署，GitOps工作流，提升交付效率。</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>可观测性与监控</h2>
          <div className="applications-grid">
            <div className="app-card">
              <h4>📊 指标监控</h4>
              <p>Prometheus、Grafana、业务指标</p>
            </div>
            <div className="app-card">
              <h4>📝 日志聚合</h4>
              <p>ELK Stack、Fluentd、结构化日志</p>
            </div>
            <div className="app-card">
              <h4>🔍 链路追踪</h4>
              <p>Jaeger、Zipkin、分布式追踪</p>
            </div>
            <div className="app-card">
              <h4>🚨 告警通知</h4>
              <p>AlertManager、PagerDuty、智能告警</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>安全与治理</h2>
          <div className="security-grid">
            <div className="security-card">
              <h4>🔐 身份认证</h4>
              <p>OAuth2、JWT、RBAC权限控制</p>
            </div>
            <div className="security-card">
              <h4>🛡️ 网络安全</h4>
              <p>Service Mesh、mTLS、网络策略</p>
            </div>
            <div className="security-card">
              <h4>🔒 镜像安全</h4>
              <p>漏洞扫描、签名验证、最小权限</p>
            </div>
            <div className="security-card">
              <h4>📋 合规治理</h4>
              <p>策略引擎、审计日志、合规检查</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>实施路径</h2>
          <div className="learning-path">
            <div className="path-step">
              <h4>1. 容器化改造</h4>
              <p>应用Docker化、镜像优化、本地开发环境</p>
            </div>
            <div className="path-step">
              <h4>2. 编排部署</h4>
              <p>Kubernetes集群搭建、应用部署、服务暴露</p>
            </div>
            <div className="path-step">
              <h4>3. 微服务拆分</h4>
              <p>领域驱动设计、API设计、数据一致性</p>
            </div>
            <div className="path-step">
              <h4>4. 运维自动化</h4>
              <p>监控告警、日志分析、自动扩缩容</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CloudNative;