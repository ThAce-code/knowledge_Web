import React from 'react';

const CardMeta = ({ author, date, readTime }) => {
  const safeAuthor = author || '未知作者';
  const safeDate = date || '日期未知';
  const safeRead = readTime || '时长未知';
  return (
    <div className="card-meta" style={{ marginTop: 10, lineHeight: 1.6 }}>
      <div className="meta-author" style={{ color: '#E8E6FF' }}>作者：{safeAuthor}</div>
      <div className="meta-date" style={{ color: '#D2D0FF' }}>日期：{safeDate}</div>
      <div className="meta-read" style={{ color: '#D2D0FF' }}>阅读时间：{safeRead}</div>
    </div>
  );
};

export default CardMeta;