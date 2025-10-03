import React from 'react';
import '../styles/Pagination.css';

function range(start, end) {
  const arr = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
}

/**
 * Pagination 组件
 * props:
 * - totalItems: 总条目数
 * - pageSize: 每页条目数（默认 12）
 * - currentPage: 当前页（从 1 开始）
 * - onPageChange: (page:number) => void
 * - variant: 'ellipsis' | 'scroll'（默认 'ellipsis'）
 */
const Pagination = ({
  totalItems = 0,
  pageSize = 12,
  currentPage = 1,
  onPageChange = () => {},
  variant = 'ellipsis',
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const goTo = (p) => {
    const next = Math.min(Math.max(1, p), totalPages);
    if (next !== currentPage) onPageChange(next);
  };

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  // 省略风格：仅显示 首页、末页、当前页±2，其他用“…”折叠
  const buildEllipsisPages = () => {
    if (totalPages <= 7) return range(1, totalPages);
    const pages = new Set();
    pages.add(1);
    pages.add(totalPages);
    pages.add(currentPage);
    pages.add(Math.max(1, currentPage - 1));
    pages.add(Math.max(1, currentPage - 2));
    pages.add(Math.min(totalPages, currentPage + 1));
    pages.add(Math.min(totalPages, currentPage + 2));
    return Array.from(pages).sort((a, b) => a - b);
  };

  const pages = variant === 'scroll' ? range(1, totalPages) : buildEllipsisPages();

  // 渲染页码（ellipsis 风格在间断处插入“…”）
  const renderPageButtons = () => {
    if (variant === 'scroll') {
      return pages.map((p) => (
        <button
          key={p}
          className={`pg-page ${p === currentPage ? 'active' : ''}`}
          onClick={() => goTo(p)}
        >
          {p}
        </button>
      ));
    }

    const buttons = [];
    for (let i = 0; i < pages.length; i++) {
      const p = pages[i];
      buttons.push(
        <button
          key={`p-${p}`}
          className={`pg-page ${p === currentPage ? 'active' : ''}`}
          onClick={() => goTo(p)}
        >
          {p}
        </button>
      );
      // 检测间断，添加省略符
      const next = pages[i + 1];
      if (next && next !== p + 1) {
        buttons.push(
          <span key={`ellipsis-${p}`} className="pg-ellipsis" title="更多">…</span>
        );
      }
    }
    return buttons;
  };

  return (
    <div className={`pg-container ${variant === 'scroll' ? 'pg-scroll' : ''}`}>
      <button className="pg-nav" disabled={prevDisabled} onClick={() => goTo(currentPage - 1)}>
        上一页
      </button>

      <div className="pg-pages">
        {renderPageButtons()}
      </div>

      <button className="pg-nav" disabled={nextDisabled} onClick={() => goTo(currentPage + 1)}>
        下一页
      </button>

      <div className="pg-meta" aria-label="分页信息">
        第 {currentPage} / {totalPages} 页，共 {totalItems} 条
      </div>
    </div>
  );
};

export default Pagination;