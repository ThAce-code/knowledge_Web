# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React + Vite based personal knowledge hub with a file-system-driven content architecture. All content is managed through JSON metadata and Markdown files without requiring a database.

## Development Commands

### Essential Commands
- `npm install` - Install dependencies after cloning
- `npm run dev` - Start Vite dev server with HMR (default: http://localhost:5173)
- `npm run build` - Production build to `dist/`
- `npm run lint` - Run ESLint (fix errors before commits)
- `npm run preview` - Preview production build locally

### Content Management Scripts
- `node ./scripts/file-manager/scan.mjs --dry-run` - Preview file analysis report
- `node ./scripts/file-manager/scan.mjs --apply` - Clean redundant files (moves to `.trash/`)

## Architecture

### Content System (File-Based CMS)
The entire content system is driven by two core files:
- **`src/content/index.json`** - Central metadata registry for all articles
  - Structure: `categories[categoryKey].articles[slug]` with metadata (title, description, tags, date, author, etc.)
  - Adding content: Create `.md` file in `src/content/{category}/`, then register in `index.json` with matching slug
- **Markdown files** - Stored in `src/content/{category}/{slug}.md`
  - Dynamically loaded via `import.meta.glob` with `?raw` query
  - Support: GFM, math formulas (KaTeX), auto-generated TOC, syntax highlighting

### Search Architecture
**MiniSearch-powered full-text search** (`src/features/search/searchIndex.js`):
- Indexes on: title (3x boost), headings (2x), tags (2x), summary, category
- Features: Fuzzy matching (0.3), prefix search, OR-based combining, Chinese tokenization fallback
- Context: `SearchContext.jsx` manages global search state with URL sync (`/search?q=...`)
- Initialization: Lazy loads on first search or app mount

### Content Loading Flow
1. **Metadata** → `contentLoader.js` reads from `index.json`
2. **Markdown** → Dynamic import: `../content/{category}/{slug}.md` via Vite glob
3. **Rendering** → `DynamicKnowledgeDetails.jsx` combines metadata + content
4. **Related articles** → Tag/category similarity scoring algorithm

### Routing
- **React Router v7** in `App.jsx`
- Dynamic route: `/knowledge/:category/:slug` → `DynamicKnowledgeDetails`
- Category pages: `/ai-apps`, `/programming`, `/hardware-basics`, `/mcu`, `/products`, `/pinned`
- Special: `/search` for search results, `/file-manager` for asset management

### Component Organization
- **`components/`** - Reusable UI (LazyImage, ArticleTableOfContents, Navigation, etc.)
- **`pages/`** - Route-level views (Homepage, SearchResults, category pages)
- **`features/`** - Feature modules (search, fileManager, example)
- **`contexts/`** - React Context providers (SearchContext)
- **`hooks/`** - Custom hooks (useFetch)
- **`api/`** - HTTP client (`client.js` with fetch wrapper)

### Styling
- **Tailwind CSS v4** via `@tailwindcss/vite`
- Component-specific CSS modules alongside `.jsx` files
- Global styles in `src/styles/global.css`

### Build Optimization
**Vite config** (`vite.config.js`):
- Manual chunks: `react` bundle (React/Router), `markdown` bundle (parsers/renderers)
- Asset handling: `.md` files included via `assetsInclude`

### Deployment (Vercel)
`vercel.json` configures:
- SPA rewrites: All routes → `/index.html` (except `/api/*`)
- Cache headers: Assets/bundles (1yr immutable), `index.html` (no-cache)

## Key Implementation Patterns

### Adding New Content
1. Create `src/content/{category}/{slug}.md`
2. Add entry to `src/content/index.json`:
   ```json
   "categories": {
     "{category}": {
       "articles": {
         "{slug}": {
           "title": "Article Title",
           "description": "Brief summary",
           "author": "ThAce",
           "date": "2025-01-15",
           "tags": ["tag1", "tag2"],
           "readTime": "10分钟"
         }
       }
     }
   }
   ```
3. Content automatically indexed for search on next rebuild/dev server restart

### Adding New Routes
1. Create page component in `src/pages/MyPage.jsx`
2. Register in `src/App.jsx`:
   ```jsx
   <Route path="/my-page" element={<MyPage />} />
   ```

### Math Formulas in Markdown
- Inline: `$E = mc^2$`
- Block: `$$\int_{a}^{b} f(x) dx$$`
- Rendered via remark-math + rehype-katex (KaTeX CSS imported in components)

### Image Handling
- Use `LazyImage` component for viewport-triggered loading
- Supports relative paths (bundled) and external URLs
- Automatic error fallback UI

## Development Workflow

### Code Style
- ESLint config: `eslint.config.js` (Flat config format)
- React Hooks rules + React Refresh plugin
- Pattern: Unused vars allowed if UPPERCASE (constants)

### Testing
- Manual testing: Use `npm run preview` after build
- No automated tests currently - validate UI in Chrome/Edge before PRs

### Git Workflow
- Main branch: `main`
- Commit style: Present tense, concise (≤72 chars)
- Pre-commit: Run `npm run lint` to catch errors

## Important Notes

### Content Index as Single Source of Truth
All article routing, search indexing, and metadata display depends on `src/content/index.json`. Missing or mismatched entries will cause 404s or broken search results.

### Search Initialization Timing
`SearchContext` initializes MiniSearch asynchronously. Components using search should check `isIndexReady` before assuming results are available.

### Vercel Deployment Cache Strategy
Static assets are aggressively cached (1 year). When updating images/CSS/JS, ensure Vite generates new hashed filenames (happens automatically in build).

### File Manager Safety
The `scan.mjs` script's redundancy detection uses regex-based heuristics. Always review `--dry-run` output before using `--apply` to avoid accidentally removing referenced assets.
