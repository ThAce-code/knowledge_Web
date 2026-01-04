import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // 首页
  index("routes/_index.tsx"),

  // 搜索结果页: /search
  route("search", "routes/search.tsx"),

  // 文章详情页: /article/:category/:slug
  route("article/:category/:slug", "routes/article.$category.$slug.tsx"),

  // 分类页面: /category/:category
  route("category/:category", "routes/category.$category.tsx"),
] satisfies RouteConfig;
