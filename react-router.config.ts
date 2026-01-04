import type { Config } from "@react-router/dev/config";
import fs from "fs";
import path from "path";
import { getAllCategoryIds } from "./app/lib/categories";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default {
  // 禁用运行时 SSR，启用纯静态部署
  ssr: false,

  // 启用静态预渲染（构建时生成完整 HTML）
  async prerender() {
    const contentDir = path.join(process.cwd(), "content");
    const routes = ["/"];

    // 扫描所有 Markdown 文件，生成文章路径
    const categories = fs.readdirSync(contentDir);
    for (const category of categories) {
      // 跳过 announcements 目录
      if (category === 'announcements') continue;

      const categoryPath = path.join(contentDir, category);
      const stat = fs.statSync(categoryPath);

      if (stat.isDirectory()) {
        const files = fs.readdirSync(categoryPath);
        for (const file of files) {
          if (file.endsWith(".md")) {
            const slug = file.replace(/\.md$/, "");
            routes.push(`/article/${category}/${slug}`);
          }
        }
      }
    }

    // 添加分类页面路由
    const allCategories = getAllCategoryIds();
    for (const category of allCategories) {
      routes.push(`/category/${category}`);
    }

    // 添加搜索页面路由（预渲染空状态）
    routes.push("/search");

    // 添加下载页面路由
    routes.push("/downloads");

    console.log("📝 Prerendering routes:", routes);
    return routes;
  },

  // Vite 配置
  vite: {
    optimizeDeps: {
      include: ['fuse.js'],
    },
    plugins: [
      ViteImageOptimizer({
        test: /\.(jpe?g|png|gif|svg|webp|avif)$/i,
        includePublic: true,  // 优化 public 文件夹中的图片
        logStats: true,       // 显示优化统计信息

        // PNG 优化设置
        png: {
          quality: 85,
          compressionLevel: 9,
        },

        // JPEG 优化设置
        jpeg: {
          quality: 85,
          progressive: true,
        },

        // WebP 优化设置
        webp: {
          lossless: false,
          quality: 85,
        },

        // AVIF 优化设置
        avif: {
          lossless: false,
          quality: 80,
        },

        // SVG 优化设置
        svg: {
          multipass: true,
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,  // 保留 viewBox 以支持响应式
                },
              },
            },
          ],
        },
      }),
    ],
  },
} satisfies Config;
