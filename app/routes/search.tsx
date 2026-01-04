import { useState, useEffect, useMemo } from 'react';
import { useLoaderData, Link, useSearchParams, useNavigate } from 'react-router';
import type { Route } from './+types/search';
import { getAllArticles } from '../lib/markdown';
import { createSearchIndex, searchArticles, type SearchResult } from '../lib/search';
import ClickSpark from '../components/ClickSpark';

const RESULTS_PER_PAGE = 8;

export async function loader() {
  const articles = await getAllArticles();
  return { articles };
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: '搜索结果 - 嵌入式知识库' },
    { name: 'description', content: '搜索嵌入式知识库中的文章' },
  ];
}

export default function SearchPage() {
  const { articles } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get('q') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [searchInput, setSearchInput] = useState(query);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // Create Fuse.js index (only once)
  const fuseInstance = useMemo(() => {
    if (!articles) return null;
    return createSearchIndex(articles);
  }, [articles]);

  // Execute search when query changes
  useEffect(() => {
    if (fuseInstance && query) {
      const results = searchArticles(fuseInstance, query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [query, fuseInstance]);

  // Pagination
  const totalPages = Math.ceil(searchResults.length / RESULTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = startIndex + RESULTS_PER_PAGE;
  const paginatedResults = searchResults.slice(startIndex, endIndex);

  // Handle search
  const handleSearch = () => {
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim(), page: '1' });
    }
  };

  // Handle pagination
  const goToPage = (page: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', page.toString());
      return newParams;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ClickSpark sparkColor="#55C2C3" sparkSize={10} sparkRadius={15} sparkCount={12} duration={500}>
      <div className="min-h-screen" style={{ backgroundColor: '#F5F9FA' }}>
        {/* Top Bar: Search Box + Back Button */}
        <header className="sticky top-0 z-50 border-b border-border" style={{ backgroundColor: 'rgba(245, 249, 250, 0.8)', backdropFilter: 'blur(8px)' }}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
            {/* Search Form - Home Page Style */}
            <div className="search-form search-form-mint flex-1">
              <button
                type="button"
                onClick={handleSearch}
              >
                <svg width={17} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                  <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <input
                className="search-input"
                placeholder="搜索文章..."
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
              />
              <button
                className="reset-btn"
                type="button"
                onClick={() => setSearchInput('')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-border rounded-lg
                hover:bg-white/50 transition-colors font-medium"
            >
              返回
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-8">
          {/* Search Stats */}
          {query && (
            <div className="search-stats mb-6">
              找到 <span className="search-stats-highlight">{searchResults.length}</span> 篇文章
              关于 "<span className="search-stats-highlight">{query}</span>"
            </div>
          )}

          {/* Search Results */}
          {query && searchResults.length > 0 && (
            <>
              <div className="space-y-4">
                {paginatedResults.map((result) => (
                  <Link
                    key={result.article.slug}
                    to={`/article/${result.article.category}/${result.article.slug}`}
                    className="block"
                  >
                    <article className="search-result-card">
                      {/* First Row: Title + Tags */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="search-result-title flex-1">
                          {result.article.title}
                        </h3>
                        <div className="flex gap-2 flex-shrink-0">
                          {result.article.tags.slice(0, 3).map((tag: string) => (
                            <span key={tag} className="search-tag-mint">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Second Row: Description */}
                      <div className="search-context-box mb-3">
                        <p className="text-sm line-clamp-2">
                          {result.article.description}
                        </p>
                      </div>

                      {/* Third Row: Date (Right Aligned) */}
                      <div className="flex justify-end">
                        <time className="search-result-date text-xs">
                          {new Date(result.article.date).toLocaleDateString('zh-CN')}
                        </time>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  {/* Previous Button */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-border
                      disabled:opacity-40 disabled:cursor-not-allowed
                      hover:bg-white/50 transition-colors"
                    style={{ color: '#36454F' }}
                  >
                    上一页
                  </button>

                  {/* Page Numbers */}
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-10 h-10 rounded-lg border transition-all ${
                          currentPage === page
                            ? 'border-mint-tiffany text-white'
                            : 'border-border hover:bg-white/50'
                        }`}
                        style={{
                          backgroundColor: currentPage === page ? '#55C2C3' : 'transparent',
                          color: currentPage === page ? '#fff' : '#36454F',
                        }}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-border
                      disabled:opacity-40 disabled:cursor-not-allowed
                      hover:bg-white/50 transition-colors"
                    style={{ color: '#36454F' }}
                  >
                    下一页
                  </button>
                </div>
              )}
            </>
          )}

          {/* No Results */}
          {query && searchResults.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-semibold text-text-primary mb-2">
                未找到相关文章
              </h2>
              <p className="text-text-secondary">
                尝试使用不同的关键词或浏览分类页面
              </p>
            </div>
          )}

          {/* Initial State (No Query) */}
          {!query && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">💡</div>
              <h2 className="text-2xl font-semibold text-text-primary mb-2">
                开始搜索
              </h2>
              <p className="text-text-secondary">
                在上方输入关键词以搜索文章
              </p>
            </div>
          )}
        </main>
      </div>
    </ClickSpark>
  );
}
