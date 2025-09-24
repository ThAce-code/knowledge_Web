import React from 'react';
import { useFileReport } from '../hooks/useFileReport';

export function FileManagerDashboard() {
  const { report, loading, error, reload } = useFileReport();

  if (loading) return <p>正在加载文件整理报告…</p>;
  if (error) return <p style={{ color: 'red' }}>加载报告失败：{String(error)}</p>;
  if (!report) return <p>暂无报告。请先运行脚本生成报告。</p>;

  const { summary, categories, duplicates, redundant } = report;

  return (
    <div style={{ padding: 16 }}>
      <h2>文件管理系统报告</h2>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div>
          <h3>概要</h3>
          <ul>
            <li>文件总数：{summary.totalFiles}</li>
            <li>重复分组：{summary.duplicateGroups}</li>
            <li>冗余文件：{summary.redundantCount}</li>
            <li>被引用文件：{summary.referencedCount}</li>
          </ul>
        </div>

        <div>
          <h3>分类统计</h3>
          <ul>
            {Object.entries(summary.categories).map(([k, v]) => (
              <li key={k}>{k}: {v}</li>
            ))}
          </ul>
        </div>
      </div>

      <hr />

      <h3>冗余文件（建议清理）</h3>
      {redundant.length === 0 ? (
        <p>未发现冗余文件。</p>
      ) : (
        <ul>
          {redundant.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}

      <h3>重复文件分组（按内容哈希）</h3>
      {duplicates.length === 0 ? (
        <p>未发现重复文件。</p>
      ) : (
        duplicates.map((grp) => (
          <div key={grp.hash} style={{ border: '1px solid #eee', margin: '8px 0', padding: 8 }}>
            <div>哈希：{grp.hash.slice(0, 12)}…（共 {grp.files.length} 个）</div>
            <ul>
              {grp.files.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))
      )}

      <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
        <button onClick={reload}>刷新报告</button>
        <a
          href="/content/file-report.json"
          download="file-report.json"
          style={{ textDecoration: 'none' }}
        >
          <button>下载报告 JSON</button>
        </a>
      </div>

      <p style={{ color: '#666', marginTop: 12 }}>
        提示：清理操作需在本地运行脚本（--apply），浏览器无法直接修改本地文件。
      </p>
    </div>
  );
}

export default FileManagerDashboard;