import { useState, useMemo } from 'react';
import { useLoaderData, Link, useSearchParams } from "react-router";
import type { Route } from "./+types/article.$category.$slug";
import { getArticleBySlug } from "../lib/markdown";
import { getCategoryName } from "../lib/categories";
import { Menu } from 'lucide-react';
import { TocSidebar } from '../components/TocSidebar';
import { BackToTopButton } from '../components/BackToTopButton';
import { CodeBlockEnhancer } from '../components/CodeBlockEnhancer';
import { useScrollSpy } from '../hooks/useScrollSpy';
import ShinyText from '../components/ShinyText';
import ClickSpark from '../components/ClickSpark';

export async function loader({ params }: Route.LoaderArgs) {
  const { category, slug } = params;
  const article = await getArticleBySlug(category, slug);

  if (!article) {
    throw new Response("Article not found", { status: 404 });
  }

  return { article };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [{ title: "文章未找到" }];
  }

  return [
    { title: `${data.article.title} - 嵌入式知识库` },
    { name: "description", content: data.article.description },
  ];
}

export default function Article() {
  const { article } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 从 URL 参数中获取来源分类和其他状态
  const fromCategory = searchParams.get('from') || article.category;
  const page = searchParams.get('page');
  const tag = searchParams.get('tag');

  // 构建返回链接，保留原有的查询参数
  const backLink = useMemo(() => {
    const params = new URLSearchParams();
    if (page) params.set('page', page);
    if (tag) params.set('tag', tag);
    const queryString = params.toString();
    return `/category/${fromCategory}${queryString ? `?${queryString}` : ''}`;
  }, [fromCategory, page, tag]);

  // Extract all heading IDs for scroll spy
  const headingIds = useMemo(() => {
    const ids: string[] = [];
    article.toc.forEach(item => {
      ids.push(item.id);
      item.children?.forEach(child => ids.push(child.id));
    });
    return ids;
  }, [article.toc]);

  const activeId = useScrollSpy(headingIds);

  // Handle TOC item click - smooth scroll to heading
  const handleTocClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Auto-close sidebar on mobile
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <ClickSpark sparkColor="#FF9500" sparkSize={10} sparkRadius={15} sparkCount={12} duration={500}>
      <div className="min-h-screen bg-bg-primary">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center px-4 md:px-6 py-3 gap-4">
          {/* Hamburger Menu */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
            aria-label="Toggle table of contents"
          >
            <Menu size={24} />
          </button>

          {/* Logo (hidden on mobile) */}
          <Link to="/" className="hidden md:block">
            <ShinyText
              text="WIKI OF SIT ComCter"
              className="text-lg font-semibold"
              speed={3}
              color="#1D1D1F"
              shineColor="#ffffff"
            />
          </Link>

          {/* Breadcrumb */}
          <nav className="ml-auto text-sm text-text-secondary flex items-center gap-2">
            <Link to="/" className="hover:text-primary-blue transition-colors">
              HOME
            </Link>
            <span>&gt;</span>
            <Link
              to={backLink}
              className="hover:text-primary-blue transition-colors"
            >
              {getCategoryName(fromCategory)}
            </Link>
            <span className="hidden md:inline">&gt;</span>
            <span className="hidden md:inline text-text-primary truncate max-w-[200px]">
              {article.title}
            </span>
          </nav>
        </div>
      </header>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex">
        {/* TOC Sidebar */}
        <TocSidebar
          toc={article.toc}
          activeId={activeId}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onItemClick={handleTocClick}
        />

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-12 py-8 md:py-16 max-w-5xl mx-auto">
          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-text-secondary text-sm mb-6">
              <span>AUTHOR</span>
              <span>{article.author}</span>
              <span>·</span>
              <span>Updated {new Date(article.date).toLocaleDateString('zh-CN')}</span>
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag, index) => {
                  const colors = ['#f89696', '#f8e596', '#baf896', '#f896f5'];
                  const bgColor = colors[index % colors.length];
                  return (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-medium text-text-primary rounded-lg"
                      style={{ backgroundColor: bgColor }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Horizontal Divider */}
            <div className="article-divider-champagne" />
          </header>

          {/* Article Content */}
          <article
            className="prose prose-lg max-w-none prose-headings-enhanced
              prose-headings:text-text-primary prose-headings:font-semibold
              prose-p:text-text-primary prose-p:leading-relaxed
              prose-a:text-primary-blue prose-a:no-underline hover:prose-a:underline
              prose-strong:text-text-primary prose-strong:font-semibold
              prose-code:text-primary-blue prose-code:bg-bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0 prose-pre:rounded-lg prose-pre:overflow-hidden
              prose-blockquote:border-l-primary-blue prose-blockquote:text-text-secondary
              prose-li:text-text-primary
              prose-table:border prose-table:border-border
              prose-th:bg-bg-secondary prose-th:text-text-primary
              prose-td:border prose-td:border-border"
            dangerouslySetInnerHTML={{ __html: article.htmlContent }}
          />
        </main>
      </div>

      {/* Back to Top Button */}
      <BackToTopButton />

      {/* Code Block Enhancer - adds copy buttons to all code blocks */}
      <CodeBlockEnhancer />
    </div>
    </ClickSpark>
  );
}
