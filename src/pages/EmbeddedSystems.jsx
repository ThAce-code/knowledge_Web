import React from 'react';
import '../styles/KnowledgeDetails.css';

const EmbeddedSystems = () => {
  return (
    <div className="knowledge-details">
      <div className="knowledge-header">
        <div className="knowledge-icon">🔧</div>
        <div className="knowledge-title-section">
          <h1 className="knowledge-title">什么是嵌入式系统</h1>
          <p className="knowledge-subtitle">深入了解嵌入式系统的核心概念与应用</p>
        </div>
      </div>

      <div className="knowledge-content">
        <section className="content-section">
          <h2>嵌入式系统概述</h2>
          <p>
            嵌入式系统是专门设计用于执行特定功能的计算机系统，它被嵌入到更大的机械或电气系统中。
            与通用计算机不同，嵌入式系统具有实时性要求、资源限制和高可靠性等特点，
            广泛应用于物联网、汽车电子、医疗设备、工业控制等领域。
          </p>
        </section>

        <section className="content-section">
          <h2>核心特征</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🕐 实时性</h3>
              <p>能够在规定时间内响应外部事件，满足严格的时间约束要求。</p>
            </div>
            <div className="feature-card">
              <h3>⚡ 资源受限</h3>
              <p>内存、处理能力和功耗有严格限制，需要高效的资源管理。</p>
            </div>
            <div className="feature-card">
              <h3>🎯 专用性</h3>
              <p>针对特定应用场景进行优化设计，功能专一但性能卓越。</p>
            </div>
            <div className="feature-card">
              <h3>🛡️ 高可靠性</h3>
              <p>需要长期稳定运行，故障率极低，具备容错和恢复能力。</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>技术栈组成</h2>
          <div className="tech-stack">
            <div className="stack-layer">
              <h3>实时操作系统 (RTOS)</h3>
              <p>提供任务调度、中断处理、内存管理等核心服务，确保系统的实时响应能力。</p>
            </div>
            <div className="stack-layer">
              <h3>微控制器与处理器</h3>
              <p>ARM Cortex、RISC-V、DSP等处理器架构，提供计算和控制能力。</p>
            </div>
            <div className="stack-layer">
              <h3>硬件抽象层 (HAL)</h3>
              <p>屏蔽硬件差异，提供统一的编程接口，提高代码的可移植性。</p>
            </div>
            <div className="stack-layer">
              <h3>低功耗设计</h3>
              <p>电源管理、睡眠模式、动态频率调节等技术，延长设备续航时间。</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>应用领域</h2>
          <div className="applications-grid">
            <div className="app-card">
              <h4>🚗 汽车电子</h4>
              <p>发动机控制、ABS系统、车载娱乐系统</p>
            </div>
            <div className="app-card">
              <h4>🏥 医疗设备</h4>
              <p>心电监护仪、血糖仪、植入式设备</p>
            </div>
            <div className="app-card">
              <h4>🏭 工业控制</h4>
              <p>PLC、传感器网络、自动化生产线</p>
            </div>
            <div className="app-card">
              <h4>🌐 物联网</h4>
              <p>智能家居、环境监测、可穿戴设备</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmbeddedSystems;