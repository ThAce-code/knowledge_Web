import { useState, useEffect, useRef } from "react";
import { useLoaderData, Link, useSearchParams } from "react-router";
import type { Route } from "./+types/category.$category";
import { getAllArticles, getArticlesByCategory } from "../lib/markdown";
import { CATEGORIES, PREDEFINED_TAGS, getCategoryName } from "../lib/categories";
import { Menu } from "lucide-react";
import ClickSpark from "../components/ClickSpark";
import { Modal } from "../components/Modal";
import GradientText from "../components/GradientText";
import ShinyText from "../components/ShinyText";

export async function loader({ params }: Route.LoaderArgs) {
  const { category } = params;

  // 验证分类是否存在
  if (!CATEGORIES[category as keyof typeof CATEGORIES]) {
    throw new Response("Category not found", { status: 404 });
  }

  // 获取文章列表
  const articles = category === 'all'
    ? await getAllArticles()
    : await getArticlesByCategory(category);

  return {
    category,
    categoryName: getCategoryName(category),
    articles
  };
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data?.categoryName || '分类'} - 嵌入式知识库` },
    { name: "description", content: `浏览${data?.categoryName || ''}分类下的所有文章` },
  ];
}

export default function CategoryPage() {
  const { category, categoryName, articles } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  // 从 URL 读取状态
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const selectedTag = searchParams.get('tag') || null;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAllTags, setShowAllTags] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // 当分类变化时，重置页码和标签（使用 useRef 避免无限循环）
  const previousCategory = useRef(category);
  useEffect(() => {
    if (previousCategory.current !== category) {
      previousCategory.current = category;
      setSearchParams({});
    }
  }, [category, setSearchParams]);

  // 标签筛选
  const filteredArticles = selectedTag
    ? articles.filter(article => article.tags.includes(selectedTag))
    : articles;

  // 分页设置
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  // 更新 URL 参数的辅助函数
  const updateSearchParams = (updates: { page?: number; tag?: string | null }) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (updates.page !== undefined) {
        if (updates.page === 1) {
          newParams.delete('page');
        } else {
          newParams.set('page', updates.page.toString());
        }
      }

      if (updates.tag !== undefined) {
        if (updates.tag) {
          newParams.set('tag', updates.tag);
        } else {
          newParams.delete('tag');
        }
      }

      return newParams;
    });
  };

  // 分页导航函数
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      updateSearchParams({ page: currentPage + 1 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      updateSearchParams({ page: currentPage - 1 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 当筛选条件变化时，重置到第一页
  const handleTagChange = (tag: string | null) => {
    updateSearchParams({ tag, page: 1 });
  };

  return (
    <ClickSpark sparkColor="#FF9500" sparkSize={10} sparkRadius={15} sparkCount={12} duration={500}>
      <div className="min-h-screen bg-bg-primary">
        {/* 顶部导航栏 */}
        <header className="bg-white border-b border-border px-6 py-4 flex items-center">
          {/* 最左侧：汉堡菜单 */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
            aria-label="切换侧边栏"
          >
            <Menu size={24} />
          </button>

          {/* 中间偏左：LOGO + 网站名（左边距对齐侧边栏右边沿） */}
          <Link to="/" className="flex items-center gap-3 ml-[calc(16rem-3rem)]">
            <img src="/logo.png" alt="Logo" className="w-12 h-12" />
            <ShinyText
              text="WIKI OF SIT ComCter"
              className="text-lg font-semibold"
              speed={3}
              color="#1D1D1F"
              shineColor="#ffffff"
            />
          </Link>

          {/* 最右侧：面包屑导航 */}
          <nav className="ml-auto mr-25 text-sm text-text-secondary">
            <Link to="/" className="hover:text-primary-blue">HOME</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-text-primary">{categoryName}</span>
          </nav>
        </header>

        <div className="flex">
          {/* 左侧边栏 */}
          <aside className={`w-64 h-screen sidebar-champagne transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full absolute md:relative'} md:sticky md:top-0 overflow-y-auto z-10`}>
            {/* CATEGORY 部分 */}
            <div className="p-6">
              <h3 className="sidebar-title-champagne text-lg mb-4 font-bold">CATEGORY</h3>
              <div className="space-y-2">
                {Object.entries(CATEGORIES).slice(0, 4).map(([id, cat]) => (
                  <Link
                    key={id}
                    to={`/category/${id}`}
                    className={`block px-4 py-2 text-center ${
                      category === id
                        ? 'sidebar-category-item-active'
                        : 'sidebar-category-item'
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}

                {/* MORE 按钮 */}
                <button
                  onClick={() => setShowAllCategories(true)}
                  className="block w-full px-4 py-2 text-center sidebar-category-item hover:sidebar-category-item-active"
                >
                  <GradientText
                    className="text-sm font-bold"
                    colors={['#667eea', '#764ba2', '#f093fb']}
                    animationSpeed={5}
                  >
                    MORE →
                  </GradientText>
                </button>
              </div>
            </div>

            {/* LABEL 部分 */}
            <div className="p-6 sidebar-divider-champagne">
              <h3 className="sidebar-title-champagne text-base mb-4 font-bold">LABEL</h3>
              <div className="space-y-2">
                {PREDEFINED_TAGS.slice(0, 5).map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagChange(selectedTag === tag ? null : tag)}
                    className={`block w-full px-4 py-2 text-center ${
                      selectedTag === tag
                        ? 'sidebar-label-item-active'
                        : 'sidebar-label-item'
                    }`}
                  >
                    {tag}
                  </button>
                ))}

                {/* MORE 按钮 */}
                <button
                  onClick={() => setShowAllTags(true)}
                  className="block w-full px-4 py-2 text-center sidebar-label-item hover:sidebar-label-item-active"
                >
                  <GradientText
                    className="text-sm font-bold"
                    colors={['#667eea', '#764ba2', '#f093fb']}
                    animationSpeed={5}
                  >
                    MORE →
                  </GradientText>
                </button>
              </div>
            </div>
          </aside>

          {/* 侧边栏遮罩层（移动端） */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* 主内容区 */}
          <main className="flex-1 p-12">
            <h1 className="text-4xl font-bold text-text-primary mb-8 text-center">{categoryName}</h1>

            {/* 文章网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/article/${article.category}/${article.slug}?from=${category}&${searchParams.toString()}`}
                  className="group block"
                >
                  <article className="article-card-champagne h-full flex flex-col overflow-hidden">
                    {/* 顶部区域：Icon + 标题 + Tags + 星标 */}
                    <div className="article-card-header-champagne px-6 py-4 relative">
                      <div className="flex gap-4">
                        {/* Icon 图标 */}
                        {article.icon && (
                          <div className="article-icon-wrapper flex-shrink-0">
                            <img
                              src={article.icon}
                              alt={article.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        )}

                        {/* 标题和标签 */}
                        <div className="flex-1 min-w-0">
                          {/* 标题 */}
                          <h4 className="text-lg font-semibold line-clamp-2 mb-2">
                            {article.title}
                          </h4>

                          {/* Tags */}
                          {article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {article.tags.slice(0, 3).map((tag) => (
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
                      </div>

                      {/* 右上角星标（如果文章被标记为 important） */}
                      {article.important && (
                        <div className="absolute top-4 right-4">
                          <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* 描述区域 - flex-1 占据主要空间 */}
                    <div className="flex-1 px-6 py-4">
                      <p className="article-card-description-champagne text-lg line-clamp-4">
                        {article.description}
                      </p>
                    </div>

                    {/* 元信息区域 - 固定底部 */}
                    <div className="article-card-meta-champagne flex items-center justify-between text-xs px-6 py-4">
                      <span>AUTHOR: {article.author}</span>
                      <time>DATE: {new Date(article.date).toLocaleDateString('zh-CN')}</time>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* 分页组件 - 始终显示 */}
            {filteredArticles.length > 0 && (
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

            {filteredArticles.length === 0 && (
              <div className="text-center text-text-secondary py-12">
                暂无文章
              </div>
            )}
          </main>
        </div>
      </div>

      {/* All Tags Modal */}
      <Modal
        isOpen={showAllTags}
        onClose={() => setShowAllTags(false)}
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">所有标签</h2>
        <div className="grid grid-cols-2 gap-4">
          {PREDEFINED_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                handleTagChange(selectedTag === tag ? null : tag);
                setShowAllTags(false);
              }}
              className={`w-full rounded-lg p-4 transition-all cursor-pointer text-center font-medium ${
                selectedTag === tag
                  ? 'bg-gradient-to-br from-[#B8965F] to-[#9A7E4F] text-white shadow-lg'
                  : 'border-2 border-[#E8D5B8] hover:border-[#D4AF76] hover:bg-[#F9F4EE]'
              }`}
            >
              <span className="text-lg">{tag}</span>
            </button>
          ))}
        </div>
      </Modal>

      {/* All Categories Modal */}
      <Modal
        isOpen={showAllCategories}
        onClose={() => setShowAllCategories(false)}
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">所有分类</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(CATEGORIES).map(([id, cat]) => (
            <Link
              key={id}
              to={`/category/${id}`}
              onClick={() => setShowAllCategories(false)}
              className={`w-full rounded-lg p-4 transition-all cursor-pointer text-center font-medium block ${
                category === id
                  ? 'bg-gradient-to-br from-[#B8965F] to-[#9A7E4F] text-white shadow-lg'
                  : 'border-2 border-[#E8D5B8] hover:border-[#D4AF76] hover:bg-[#F9F4EE]'
              }`}
            >
              <span className="text-lg">{cat.name}</span>
            </Link>
          ))}
        </div>
      </Modal>
    </ClickSpark>
  );
}
