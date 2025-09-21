import React, { createContext, useContext, useState, useEffect } from 'react';

const TagFilterContext = createContext();

export const useTagFilter = () => {
  const context = useContext(TagFilterContext);
  if (!context) {
    throw new Error('useTagFilter must be used within a TagFilterProvider');
  }
  return context;
};

export const TagFilterProvider = ({ children }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagClickCounts, setTagClickCounts] = useState({});

  // 从localStorage加载数据
  useEffect(() => {
    const savedTags = localStorage.getItem('selectedTags');
    const savedCounts = localStorage.getItem('tagClickCounts');
    
    if (savedTags) {
      try {
        setSelectedTags(JSON.parse(savedTags));
      } catch (e) {
        console.error('Failed to parse saved tags:', e);
      }
    }
    
    if (savedCounts) {
      try {
        setTagClickCounts(JSON.parse(savedCounts));
      } catch (e) {
        console.error('Failed to parse saved tag counts:', e);
      }
    }
  }, []);

  // 保存到localStorage
  useEffect(() => {
    localStorage.setItem('selectedTags', JSON.stringify(selectedTags));
  }, [selectedTags]);

  useEffect(() => {
    localStorage.setItem('tagClickCounts', JSON.stringify(tagClickCounts));
  }, [tagClickCounts]);

  // 切换标签选择状态
  const toggleTag = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  // 增加标签点击次数
  const incrementTagClick = (tag) => {
    setTagClickCounts(prev => ({
      ...prev,
      [tag]: (prev[tag] || 0) + 1
    }));
  };

  // 清除所有选中的标签
  const clearSelectedTags = () => {
    setSelectedTags([]);
  };

  // 获取热门标签（按点击次数排序）
  const getPopularTags = (limit = 10) => {
    return Object.entries(tagClickCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([tag]) => tag);
  };

  // 检查标签是否被选中
  const isTagSelected = (tag) => {
    return selectedTags.includes(tag);
  };

  const value = {
    selectedTags,
    tagClickCounts,
    toggleTag,
    incrementTagClick,
    clearSelectedTags,
    getPopularTags,
    isTagSelected
  };

  return (
    <TagFilterContext.Provider value={value}>
      {children}
    </TagFilterContext.Provider>
  );
};