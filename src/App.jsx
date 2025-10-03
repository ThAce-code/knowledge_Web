import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SearchProvider } from './contexts/SearchContext';
import Pinned from './pages/Pinned.jsx';
import MainLayout from './components/MainLayout';
import Homepage from './pages/Homepage';
import AiApps from './pages/AiApps';
import Programming from './pages/Programming';
import HardwareBasics from './pages/HardwareBasics';

import ProductRecommendations from './pages/ProductRecommendations';
import FileManager from './pages/FileManager';
import SearchResults from './pages/SearchResults';
import DynamicKnowledgeDetails from './components/DynamicKnowledgeDetails';
import McuGuide from './pages/McuGuide';

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



            <Route path="/hardware-basics" element={<HardwareBasics />} />
            <Route path="/products" element={<ProductRecommendations />} />
            <Route path="/file-manager" element={<FileManager />} />
            {/* 单片机指南分类页 */}
            <Route path="/mcu" element={<McuGuide />} />
            
            {/* 置顶列表页面 */}
            <Route path="/pinned" element={<Pinned />} />

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