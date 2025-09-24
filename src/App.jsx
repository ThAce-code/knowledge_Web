import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout.jsx';
import Homepage from './pages/Homepage.jsx';
import AiApps from './pages/AiApps.jsx';
import Programming from './pages/Programming.jsx';
import HardwareBasics from './pages/HardwareBasics.jsx';
import McuGuide from './pages/McuGuide.jsx';
import KnowledgeDetails from './pages/KnowledgeDetails.jsx';
import ProductRecommendations from './pages/ProductRecommendations.jsx';
import EmbeddedSystems from './pages/EmbeddedSystems.jsx';
import FrontendStack from './pages/FrontendStack.jsx';
import CloudNative from './pages/CloudNative.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* 主页面路由 */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="ai-apps" element={<AiApps />} />
          <Route path="programming" element={<Programming />} />
          <Route path="hardware-basics" element={<HardwareBasics />} />
          <Route path="mcu-guide" element={<McuGuide />} />
          <Route path="products" element={<ProductRecommendations />} />
          <Route path="embedded-systems" element={<EmbeddedSystems />} />
          <Route path="frontend-stack" element={<FrontendStack />} />
          <Route path="cloud-native" element={<CloudNative />} />
          <Route path="knowledge/:id" element={<KnowledgeDetails />} />
          
          {/* 知识详情页面的子路由 */}
          <Route path="knowledge/ai-apps/:topic" element={<KnowledgeDetails />} />
          <Route path="knowledge/programming/:topic" element={<KnowledgeDetails />} />
          <Route path="knowledge/hardware/:topic" element={<KnowledgeDetails />} />
          <Route path="knowledge/mcu/:topic" element={<KnowledgeDetails />} />
        </Route>
        
        {/* 重定向未匹配的路由到首页 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;