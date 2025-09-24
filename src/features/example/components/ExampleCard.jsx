import React from 'react';

export function ExampleCard({ title = '示例卡片', children }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12, margin: 8 }}>
      <h3 style={{ margin: '4px 0 8px', fontSize: 16 }}>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

export default ExampleCard;