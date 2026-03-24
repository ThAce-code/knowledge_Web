import { useState } from "react";
import { useLoaderData, Link, useNavigate } from "react-router";
import type { Route } from "./+types/_index";
import { getAllArticles, getLatestAnnouncements } from "../lib/markdown";
import { Modal } from "../components/Modal";
import type { Announcement } from "../lib/markdown";
import { TypeAnimation } from "react-type-animation";
import ShinyText from "../components/ShinyText";
import AnimatedButton from "../components/AnimatedButton";
import ClickSpark from "../components/ClickSpark";
import GradientText from "../components/GradientText";

export async function loader() {
  const articles = await getAllArticles();
  const latestAnnouncements = await getLatestAnnouncements(4);
  const allAnnouncements = await getLatestAnnouncements(100); // 获取所有公告

  // 只返回最新的3篇文章
  return {
    articles: articles.slice(0, 3),
    announcements: latestAnnouncements,
    allAnnouncements
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "嵌入式知识库 - 首页" },
    { name: "description", content: "学习嵌入式开发，从这里开始" },
  ];
}

export default function Index() {
  const { articles, announcements, allAnnouncements } = useLoaderData<typeof loader>();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [showAllAnnouncements, setShowAllAnnouncements] = useState(false);
  const [isFromAllAnnouncementsList, setIsFromAllAnnouncementsList] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <ClickSpark sparkColor="#FF9500" sparkSize={10} sparkRadius={15} sparkCount={12} duration={500}>
      <div className="flex min-h-screen bg-bg-primary gap-4 md:gap-8 p-4 md:p-8">
      {/* 左侧独立功能区块 */}
      <div className="hidden lg:flex lg:w-80 flex-col gap-6 h-full">
        {/* LOGO + WEB'S NAME 卡片 */}
        <div className="rounded-lg p-6 flex-shrink-0 h-40 flex flex-col items-center justify-center gap-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-26 h-26 object-contain"
          />
          <ShinyText
            text="WIKI OF SIT ComCter"
            className="text-2xl font-semibold"
            speed={3}
            color="#1D1D1F"
            shineColor="#ffffff"
          />
        </div>

        {/* ANNOUNCEMENT 卡片 */}
        <div className="glass-effect rounded-lg border border-border p-6 flex-shrink-0 h-[28rem] flex flex-col relative mt-16">
          <h2 className="text-lg font-semibold text-text-primary mb-4 pb-3 border-b border-blue-200">
            ANNOUNCEMENT
          </h2>

          {announcements.map((announcement) => (
            <button
              key={announcement.id}
              onClick={() => {
                setIsFromAllAnnouncementsList(false);
                setSelectedAnnouncement(announcement);
              }}
              className="bg-white/60 rounded-lg p-4 border border-blue-200 hover:border-purple-400 hover:bg-white/80 transition-all cursor-pointer mb-3 text-center shadow-sm"
            >
              <h3 className="text-sm font-medium text-text-primary">{announcement.title}</h3>
            </button>
          ))}

          <div className="absolute bottom-4 left-0 right-0 text-center">
            <button
              onClick={() => setShowAllAnnouncements(true)}
              className="font-bold"
            >
              <GradientText
                className="text-xl"
                colors={['#667eea', '#764ba2', '#f093fb']}
                animationSpeed={5}
              >
                MORE →
              </GradientText>
            </button>
          </div>
        </div>

        {/* 社交图标卡片 - 沉底 */}
        <div className="rounded-lg p-6 flex-shrink-0 h-20 flex items-center justify-between mt-auto">
          <a
            href="https://github.com/ThAce-code/knowledge_Web/tree/ui-refactor-lightweight-blog"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-red-500 text-white transition-all flex items-center justify-center hover:-translate-y-1 hover:shadow-lg"
          >
            <img src="/icons/github.svg" alt="GitHub" className="w-10 h-10" />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-yellow-400 text-white transition-all flex items-center justify-center hover:-translate-y-1 hover:shadow-lg"
          >
            <img src="/icons/react.svg" alt="React" className="w-8 h-8" />
          </a>
          <a
            href="https://vitejs.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-green-500 text-white transition-all flex items-center justify-center hover:-translate-y-1 hover:shadow-lg"
          >
            <img src="/icons/vite.svg" alt="Vite" className="w-8 h-8" />
          </a>
        </div>
      </div>

      {/* 右侧主内容区 */}
      <main className="flex-1 overflow-hidden">
        {/* Hero Section - Code Editor Style */}
        <section className="px-4 md:px-8 lg:px-12 pt-6 pb-10">
          <div className="max-w-7xl mx-auto">
            <div className="bg-bg-code-editor rounded-xl overflow-hidden shadow-2xl border border-gray-800">
              {/* 编辑器标题栏 */}
              <div className="bg-bg-code-editor-titlebar px-4 py-3 flex items-center gap-2 border-b border-gray-800">
                {/* macOS 窗口控制按钮 */}
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E]/80 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/80 transition-colors"></div>
                </div>
                {/* 文件标签 */}
                <div className="ml-4 bg-bg-code-editor px-4 py-1.5 rounded-t-lg border-t border-x border-gray-700 text-code-text text-sm font-mono">
                  welcome.tsx
                </div>
              </div>

              {/* 编辑器内容区 */}
              <div className="flex min-h-[440px]">
                {/* 内容区 */}
                <div className="flex-1 p-12 flex flex-col justify-center gap-8">
                  <TypeAnimation
                    sequence={[
                      'Welcome Back!',
                      1000,
                    ]}
                    wrapper="div"
                    speed={50}
                    style={{
                      fontSize: '4rem',
                      fontWeight: 'bold',
                      color: 'white',
                      lineHeight: '1.2'
                    }}
                    cursor={false}
                    repeat={0}
                  />
                  <TypeAnimation
                    sequence={[
                      1000, // 等待第一行打完 (13字符*50ms + 1000ms暂停)
                      'The beautiful thing about learning\nis that no one can take it away from you.',
                      2000,
                    ]}
                    wrapper="div"
                    speed={50}
                    style={{
                      fontSize: '2rem',
                      color: '#9CA3AF',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-line'
                    }}
                    repeat={Infinity}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Bar + Get Start Button */}
        <section className="px-4 md:px-8 lg:px-12 pb-8 md:pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
              <div
                className="search-form w-full md:w-2/3"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('[DEBUG] Search button clicked, query:', searchQuery);
                    if (searchQuery.trim()) {
                      const url = `/search?q=${encodeURIComponent(searchQuery)}`;
                      console.log('[DEBUG] Navigating to:', url);
                      try {
                        navigate(url);
                        console.log('[DEBUG] Navigate called successfully');
                      } catch (error) {
                        console.error('[DEBUG] Navigate error:', error);
                      }
                    } else {
                      console.log('[DEBUG] Search query is empty');
                    }
                  }}
                >
                  <svg width={17} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                    <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <input
                  className="search-input"
                  placeholder="搜索文章..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    console.log('[DEBUG] Key pressed:', e.key);
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('[DEBUG] Enter pressed, query:', searchQuery);
                      if (searchQuery.trim()) {
                        const url = `/search?q=${encodeURIComponent(searchQuery)}`;
                        console.log('[DEBUG] Navigating to:', url);
                        try {
                          navigate(url);
                          console.log('[DEBUG] Navigate called successfully');
                        } catch (error) {
                          console.error('[DEBUG] Navigate error:', error);
                        }
                      } else {
                        console.log('[DEBUG] Search query is empty');
                      }
                    }
                  }}
                />
                <button
                  className="reset-btn"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSearchQuery('');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <Link to="/category/all">
                <AnimatedButton>
                  GET START
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </section>

        {/* 最新的3篇文章 */}
        <section className="px-4 md:px-8 lg:px-12 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {articles.map((article, index) => (
                <Link
                  key={article.slug}
                  to={`/article/${article.category}/${article.slug}`}
                  className="group"
                >
                  <article className="bg-bg-secondary rounded-card p-4 md:p-6 border border-border hover:border-primary-blue transition-all hover:shadow-md h-full flex flex-col">
                    <h4 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-primary-blue transition-colors border-b border-border pb-3">
                      {article.title}
                    </h4>

                    <p className="text-text-secondary text-base mb-4 flex-1 line-clamp-3">
                      {article.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-text-tertiary pt-3 border-t border-border">
                      <span>AUTHOR: {article.author}</span>
                      <time>DATE: {new Date(article.date).toLocaleDateString('zh-CN')}</time>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Single Announcement Detail Modal */}
      <Modal
        isOpen={selectedAnnouncement !== null}
        onClose={() => {
          setSelectedAnnouncement(null);
          if (isFromAllAnnouncementsList) {
            setShowAllAnnouncements(true);
            setIsFromAllAnnouncementsList(false);
          }
        }}
      >
        {selectedAnnouncement && (
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              {selectedAnnouncement.title}
            </h2>
            <p className="text-sm text-text-secondary mb-6">
              {new Date(selectedAnnouncement.date).toLocaleDateString('zh-CN')}
            </p>
            <div
              className="prose prose-sm max-w-none text-text-primary leading-relaxed prose-headings-enhanced"
              dangerouslySetInnerHTML={{ __html: selectedAnnouncement.htmlContent }}
            />
          </div>
        )}
      </Modal>

      {/* All Announcements List Modal */}
      <Modal
        isOpen={showAllAnnouncements}
        onClose={() => setShowAllAnnouncements(false)}
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">所有公告</h2>
        <div className="space-y-4">
          {allAnnouncements.map((announcement) => (
            <button
              key={announcement.id}
              onClick={() => {
                setShowAllAnnouncements(false);
                setIsFromAllAnnouncementsList(true);
                setSelectedAnnouncement(announcement);
              }}
              className="w-full border border-border rounded-lg p-4 hover:border-primary-blue transition-colors cursor-pointer text-left"
            >
              <h3 className="text-lg font-semibold text-text-primary mb-1">
                {announcement.title}
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                {new Date(announcement.date).toLocaleDateString('zh-CN')}
              </p>
              <div
                className="prose prose-sm max-w-none text-sm text-text-secondary line-clamp-2 prose-headings-enhanced"
                dangerouslySetInnerHTML={{ __html: announcement.htmlContent }}
              />
            </button>
          ))}
        </div>
      </Modal>
    </div>
    </ClickSpark>
  );
}
