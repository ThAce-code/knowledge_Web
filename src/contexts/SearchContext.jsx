import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { searchIndex } from '../features/search/searchIndex.js';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    tags: []
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isIndexReady, setIsIndexReady] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // 执行搜索的核心函数
  const doSearch = useCallback(async (searchQuery, searchFilters) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    if (!isIndexReady) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const searchResults = await searchIndex.search(searchQuery, {
        category: searchFilters.category,
        tags: searchFilters.tags,
        limit: 50
      });
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [isIndexReady]);

  // 执行搜索（使用当前filters）
  const performSearch = useCallback(async (searchQuery, searchFilters = filters) => {
    await doSearch(searchQuery, searchFilters);
  }, [doSearch, filters]);

  // 初始化搜索索引
  useEffect(() => {
    const initializeIndex = async () => {
      try {
        await searchIndex.initialize();
        setIsIndexReady(true);
      } catch (error) {
        console.error('Failed to initialize search index:', error);
      }
    };
    
    initializeIndex();
  }, []);

  // 从 URL 参数读取查询
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlQuery = urlParams.get('q');
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery);
    }
  }, [location.search, query]);

  // 当索引准备好且有查询时，执行搜索
  useEffect(() => {
    if (isIndexReady && query.trim()) {
      doSearch(query, filters);
    }
  }, [isIndexReady, query, doSearch, filters]);

  // 搜索函数（带导航）
  const search = useCallback((searchQuery = query, navigateToResults = true) => {
    if (!searchQuery.trim()) return;
    
    if (navigateToResults) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      doSearch(searchQuery, filters);
    }
  }, [query, filters, navigate, doSearch]);

  // 更新查询
  const updateQuery = useCallback((newQuery) => {
    setQuery(newQuery);
  }, []);

  // 更新过滤器
  const updateFilters = useCallback((newFilters) => {
    const newFiltersState = { ...filters, ...newFilters };
    setFilters(newFiltersState);
    if (query.trim()) {
      doSearch(query, newFiltersState);
    }
  }, [query, filters, doSearch]);

  // 清空搜索
  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setFilters({ category: '', tags: [] });
  }, []);

  const value = {
    query,
    setQuery: updateQuery,
    filters,
    setFilters: updateFilters,
    results,
    loading,
    isIndexReady,
    search,
    clearSearch,
    performSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};