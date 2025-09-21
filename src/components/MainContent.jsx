import React from 'react';
import './MainContent.css';

const MainContent = ({ children }) => {
  return (
    <main className="main-content-container">
      <div className="main-content-inner">
        {children}
      </div>
    </main>
  );
};

export default MainContent;