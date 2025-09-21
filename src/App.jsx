import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from '@components/Sidebar';


const Homepage = lazy(() => import('@pages/Homepage'));
const KnowledgeDetails = lazy(() => import('@pages/KnowledgeDetails'));
const HardwareBasics = lazy(() => import('@pages/HardwareBasics'));
const Programming = lazy(() => import('@pages/Programming'));
const McuGuide = lazy(() => import('@pages/McuGuide'));
const ProductRecommendations = lazy(() => import('@pages/ProductRecommendations'));
const AiApps = lazy(() => import('@pages/AiApps'));



function App() {
  return (
    <div className="app">
      {/* 左侧导航栏 */}
      <Sidebar />

      {/* 主内容区域 */}
      <main className="main-content">

        
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/knowledge/:id" element={<KnowledgeDetails />} />
            <Route path="/knowledge/hardware" element={<HardwareBasics />} />
            <Route path="/knowledge/programming" element={<Programming />} />
            <Route path="/knowledge/mcu" element={<McuGuide />} />
            <Route path="/knowledge/products" element={<ProductRecommendations />} />
            <Route path="/knowledge/ai-apps" element={<AiApps />} />

          </Routes>
        </Suspense>
      </main>



      {/* 返回顶部按钮 */}
      <button className="back-to-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        返回顶部 ↑
      </button>
    </div>
  );
}

export default App;