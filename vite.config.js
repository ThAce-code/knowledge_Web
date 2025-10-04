import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  assetsInclude: ['**/*.md', '**/*.mdx'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          markdown: ['react-markdown', 'remark-gfm', 'remark-math', 'rehype-raw', 'rehype-slug', 'rehype-autolink-headings', 'rehype-katex', 'katex']
        }
      }
    }
  }
})