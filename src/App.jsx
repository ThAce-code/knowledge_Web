import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './contexts/SearchContext';
import MainLayout from './components/MainLayout';
import Homepage from './pages/Homepage';
import AiApps from './pages/AiApps';
import Programming from './pages/Programming';
import CloudNative from './pages/CloudNative';
import EmbeddedSystems from './pages/EmbeddedSystems';
import FrontendStack from './pages/FrontendStack';
import HardwareBasics from './pages/HardwareBasics';
import McuGuide from './pages/McuGuide';
import ProductRecommendations from './pages/ProductRecommendations';
import FileManager from './pages/FileManager';
import SearchResults from './pages/SearchResults';
import DynamicKnowledgeDetails from './components/DynamicKnowledgeDetails';

import './styles/global.css';

function App() {
  return (
    <Router>
      <SearchProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/ai-apps" element={<AiApps />} />
            <Route path="/programming" element={<Programming />} />
            <Route path="/cloud-native" element={<CloudNative />} />
            <Route path="/embedded-systems" element={<EmbeddedSystems />} />
            <Route path="/frontend-stack" element={<FrontendStack />} />
            <Route path="/hardware-basics" element={<HardwareBasics />} />
            <Route path="/mcu-guide" element={<McuGuide />} />
            <Route path="/products" element={<ProductRecommendations />} />
            <Route path="/file-manager" element={<FileManager />} />
            
            {/* 搜索结果页面 */}
            <Route path="/search" element={<SearchResults />} />
            
            {/* 动态知识详情页面路由 */}
            <Route path="/knowledge/:category/:slug" element={<DynamicKnowledgeDetails />} />
          </Routes>
        </MainLayout>
      </SearchProvider>
    </Router>
  );
}

export default App;