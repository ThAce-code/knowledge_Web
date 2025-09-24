import React from 'react';
import { FileManagerDashboard } from '../features/fileManager';

function FileManager() {
  return (
    <div style={{ 
      padding: 16,
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4d 25%, #4c1d95 50%, #2d1b4d 75%, #1a0b2e 100%)'
    }}>
      <FileManagerDashboard />
    </div>
  );
}

export default FileManager;