import { useState } from "react";
import { useLoaderData } from "react-router";
import type { Route } from "./+types/downloads";
import {
  getAllResources,
  DOWNLOAD_CATEGORIES,
  type DownloadResource
} from "../lib/downloads";
import { Download } from "lucide-react";
import ClickSpark from "../components/ClickSpark";
import { BackToTopButton } from "../components/BackToTopButton";

export async function loader() {
  return {
    resources: getAllResources(),
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "资源下载 - 嵌入式知识库" },
    { name: "description", content: "下载代码示例、开发工具和技术文档" },
  ];
}

export default function DownloadsPage() {
  const { resources } = useLoaderData<typeof loader>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 过滤资源
  const filteredResources = selectedCategory
    ? resources.filter(r => r.category === selectedCategory)
    : resources;

  // 分页设置
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedResources = filteredResources.slice(startIndex, endIndex);

  // 切换分类时重置页码
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 分页导航函数
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <ClickSpark sparkColor="#D4AF76" sparkSize={10} sparkRadius={15} sparkCount={12} duration={500}>
      <div className="min-h-screen bg-bg-primary">
        {/* 主内容区 */}
        <main className="max-w-7xl mx-auto p-12">
          <h1 className="text-4xl font-bold text-text-primary mb-8 text-center">
            资源下载中心
          </h1>

          {/* 分类过滤按钮组 - 香槟金主题 */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-gradient-to-br from-[#B8965F] to-[#9A7E4F] text-white shadow-lg'
                  : 'bg-white border-2 border-[#E8D5B8] hover:border-[#D4AF76] hover:bg-[#F9F4EE]'
              }`}
            >
              全部资源
            </button>
            {Object.values(DOWNLOAD_CATEGORIES).map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-br from-[#B8965F] to-[#9A7E4F] text-white shadow-lg'
                    : 'bg-white border-2 border-[#E8D5B8] hover:border-[#D4AF76] hover:bg-[#F9F4EE]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* 资源网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

          {/* 分页组件 - 香槟金主题 */}
          {filteredResources.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-center gap-6 mt-12">
              {/* 上一页按钮 */}
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`pagination-button-champagne ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:pagination-button-champagne-hover'
                }`}
                aria-label="上一页"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* 页码显示 */}
              <div className="pagination-info-champagne px-8 py-3">
                <span className="font-semibold">{currentPage} / {totalPages}</span>
              </div>

              {/* 下一页按钮 */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`pagination-button-champagne ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:pagination-button-champagne-hover'
                }`}
                aria-label="下一页"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* 空状态 */}
          {filteredResources.length === 0 && (
            <div className="text-center text-text-secondary py-12">
              暂无资源
            </div>
          )}
        </main>

        <BackToTopButton />
      </div>
    </ClickSpark>
  );
}

// 资源卡片组件
function ResourceCard({ resource }: { resource: DownloadResource }) {
  return (
    <div className="article-card-champagne h-full flex flex-col">
      {/* 卡片头部 */}
      <div className="article-card-header-champagne px-6 py-4">
        <h4 className="text-lg font-semibold mb-2">
          {resource.name}
        </h4>
        {resource.version && (
          <span className="text-xs text-text-tertiary">
            版本: {resource.version}
          </span>
        )}
      </div>

      {/* 卡片主体 */}
      <div className="flex-1 px-6 py-4">
        <p className="article-card-description-champagne text-base mb-4">
          {resource.description}
        </p>

        {/* 标签 */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {resource.tags.map(tag => (
              <span
                key={tag}
                className="article-tag-champagne text-xs px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 卡片底部 */}
      <div className="article-card-meta-champagne px-6 py-4 flex items-center justify-between">
        <span className="text-xs text-text-secondary">
          {resource.fileSize}
        </span>
        <a
          href={`/downloads/${resource.filePath}`}
          download
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-[#B8965F] to-[#9A7E4F] text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium hover:from-[#C4A570] hover:to-[#A88D5F]"
        >
          <Download size={16} />
          下载
        </a>
      </div>
    </div>
  );
}
