import Fuse from 'fuse.js';
import type { Article } from './markdown';

export interface SearchResult {
  article: Article;
  score: number;
  matches: any[];
}

export const SEARCH_CONFIG: Fuse.IFuseOptions<Article> = {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'description', weight: 0.3 },
    { name: 'tags', weight: 0.2 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
  includeScore: true,
  includeMatches: true,
};

export function createSearchIndex(articles: Article[]): Fuse<Article> {
  return new Fuse(articles, SEARCH_CONFIG);
}

export function searchArticles(
  fuse: Fuse<Article>,
  query: string
): SearchResult[] {
  if (!query.trim()) return [];

  const results = fuse.search(query);

  return results.map(result => ({
    article: result.item,
    score: result.score || 0,
    matches: result.matches || [],
  }));
}
