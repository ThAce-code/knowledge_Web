# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an embedded systems knowledge base built with **React Router v7 Framework Mode** + Static Site Generation (SSG). The project is a fully static site where all content is managed via Markdown files with Git version control, requiring no backend or database.

## Key Commands

```bash
# Development
npm run dev          # Start dev server (usually port 5173+)

# Production Build
npm run build        # Build and prerender all routes to build/client/

# Type Checking
npm run typecheck    # Generate types and run TypeScript compiler

# Preview Production Build
npm run start        # Serve the production build
```

## Architecture Overview

### SSG Architecture

This project uses React Router v7's **framework mode** with Static Site Generation:

1. **Build Time**: The `prerender()` function in `react-router.config.ts` scans all Markdown files in `content/` and generates a list of routes
2. **Prerendering**: During `npm run build`, React Router executes all loader functions and prerenders each route to static HTML
3. **Deploy**: The `build/client/` folder contains complete, SEO-friendly HTML files that can be deployed to any static host

**Critical**: Do NOT set `ssr: false` in `react-router.config.ts`. SSG requires SSR to be enabled during build time so that loader functions can execute.

### Content Management

**Directory Structure**: `content/{category}/{slug}.md`

- Each category is a folder under `content/`
- Each article is a `.md` file with YAML front matter
- Routes are automatically generated as `/article/{category}/{slug}`

**Front Matter Format**:
```yaml
---
title: "Article Title"
date: 2024-01-20
author: "Author Name"
category: "category-folder-name"
tags: ["tag1", "tag2"]
description: "Brief description"
---
```

**Adding New Content**:
1. Create a new `.md` file in the appropriate category folder under `content/`
2. Add front matter with required fields
3. Run `npm run build` - the new route will be automatically discovered and prerendered

### Routing System

Routes are manually defined in `app/routes.ts` using React Router's route config:
- `index("routes/_index.tsx")` → `/` (home page)
- `route("article/:category/:slug", "routes/article.$category.$slug.tsx")` → `/article/{category}/{slug}`
- `route("category/:category", "routes/category.$category.tsx")` → `/category/{category}`

To add new route patterns, edit `app/routes.ts` AND update the `prerender()` function in `react-router.config.ts` to discover those routes.

### Category Configuration

The `app/lib/categories.ts` module defines all categories and tags:

```typescript
// Categories with Chinese/English display names
const CATEGORIES = {
  all: { name: '全部', description: '所有文章' },
  'c-language': { name: 'C/C++', description: 'C/C++语言相关文章' },
  microcontroller: { name: '单片机', description: '单片机相关文章' },
  'ai-tools': { name: 'AI & TOOLS', description: 'AI工具相关文章' },
  linux: { name: 'Linux', description: 'Linux系统相关文章' },
  python: { name: 'Python', description: 'Python编程相关文章' },
  other: { name: 'OTHER', description: '其他文章' },
};

// Predefined tags for filtering (11 tags total)
const PREDEFINED_TAGS = [
  'AI', '51单片机', '32单片机', '教程', 'C语言', 'C++',
  'Python', 'Linux', '基础', '进阶', '电子扫盲'
];
```

Helper functions:
- `getCategoryName(categoryId)` - Maps directory names to display names
- `getAllCategoryIds()` - Returns all category IDs including 'all'

**Sidebar Display Strategy**:
- CATEGORY section shows first 4 categories + "MORE →" button
- LABEL section shows first 5 tags + "MORE →" button
- Click "MORE" opens a modal with all categories/tags

### Markdown Processing

The `app/lib/markdown.ts` module provides utilities:
- `getAllArticles()` - Returns all articles sorted by date (newest first)
- `getArticleBySlug(category, slug)` - Loads and parses a specific article
- `getArticlesByCategory(category)` - Filters articles by category
- `getAllCategories()` - Lists all content categories

Processing pipeline:
1. Read `.md` file from filesystem
2. Parse front matter with `gray-matter`
3. Convert Markdown to HTML with `remark` + `remark-html`
4. Return structured `Article` object

### Styling System

Uses **Tailwind CSS 4.x** with CSS-first configuration:

- Theme defined in `app/index.css` using the `@theme` directive
- Color scheme: Apple-style (light, bright, clean) + Champagne gold accents
- Custom CSS variables: `--color-primary-blue`, `--color-bg-secondary`, etc.
- Usage: `className="bg-bg-secondary text-text-primary"`

**Color Palette**:
- **Base Colors**: Apple-style neutrals (`--color-bg-primary: #FDFBF7`, `--color-text-primary: #1D1D1F`)
- **Champagne Gold**: Special accent color for cards and sidebar
  - `--color-card-champagne: #F4E8D8` (main background)
  - `--color-card-gold-accent: #D4AF76` (borders and accents)
  - `--color-card-warm-text: #6B5F4D` (text on champagne backgrounds)

**Custom Components**:
- `.article-card-champagne` - Card component with champagne color scheme, 21:22 aspect ratio, hover lift effect
- `.sidebar-champagne` - Sidebar with gradient background
- `.pagination-button-champagne` - Pagination buttons with champagne styling

**Important**: Do NOT use `tailwind.config.js` for theme customization. All theming is done in `app/index.css` via the `@theme {}` block.

### Entry Points

- `app/entry.client.tsx` - Client-side hydration entry point
- `app/entry.server.tsx` - Server-side rendering for prerendering (uses Node.js PassThrough streams)
- `app/root.tsx` - Root layout component (wraps all routes)

**Critical for SSR**: `entry.server.tsx` must use Node.js streams (`PassThrough`) with `createReadableStreamFromReadable()` from `@react-router/node`. Do NOT use Web Streams API directly.

## Current UI Layout

### Home Page (`app/routes/_index.tsx`)

Uses a **left sidebar + main content** layout:

**Left Sidebar** (320px fixed):
- LOGO + website name
- ANNOUNCEMENT section (3 cards + MORE button)
- Social icons at bottom

**Main Content** (flex-1):
- Hero section (welcome message in card)
- Search bar + GET START button (horizontal layout)
- Latest 3 articles grid (TITLE / INTR / AUTHOR / DATE format)

### Category Page (`app/routes/category.$category.tsx`)

Three-zone layout with responsive sidebar:

**Top Navigation Bar**:
- Hamburger menu button (toggles sidebar)
- LOGO + site name with ShinyText animation (same as homepage)
- Breadcrumb navigation (HOME > 分类名)

**Left Sidebar** (sticky, champagne gold styling):
- **CATEGORY section** (`text-base font-bold`):
  - First 4 categories displayed (全部, C/C++, 单片机, AI & TOOLS)
  - "MORE →" button opens modal with all 7 categories
  - Buttons are centered text
- **LABEL section** (`text-base font-bold`):
  - First 5 tags displayed (AI, 51单片机, 32单片机, 教程, C语言)
  - "MORE →" button opens modal with all 11 tags
  - Buttons are centered text

**Main Content** (3-column grid):
- Category title header
- Article cards with champagne styling (21:22 aspect ratio)
- **Pagination**: 12 cards per page with prev/next buttons
  - **URL State Management**: Page number and tag filters are stored in URL query parameters (`?page=2&tag=AI`)
  - Clicking an article passes current state via URL: `/article/{category}/{slug}?from={category}&page=2&tag=AI`
  - Returning from article restores exact pagination and filter state
- Tag filtering: Click tag to filter, resets to page 1
- Category switching: Automatically resets to page 1
- Mobile: Sidebar slides in with overlay backdrop

**Modal Behavior**:
- "MORE" buttons use GradientText component (purple gradient)
- Modals show all categories/tags in 2-column grid
- Champagne gold styling matches sidebar theme

## Deployment

The project generates fully static files in `build/client/` suitable for:
- **Vercel**: Direct deployment (build command: `npm run build`, output: `build/client`)
- **Netlify**: Same configuration
- **GitHub Pages**: Configure GitHub Actions to run `npm run build` and publish `build/client/`
- **Any static host**: Just upload the `build/client/` folder

## UI Component System

### Custom Components

The project includes several custom animated components in `app/components/`:

- **ShinyText** (`ShinyText.tsx`) - Animated text with moving shine/gloss effect
  - Used for "WIKI OF SIT ComCter" branding
  - Props: `text`, `className`, `speed`, `color`, `shineColor`

- **GradientText** (`GradientText.tsx`) - Animated gradient text
  - Used for "MORE →" buttons
  - Props: `className`, `colors` (array), `animationSpeed`

- **ClickSpark** (`ClickSpark.tsx`) - Particle effect on click
  - Wraps entire pages for interactive feedback
  - Props: `sparkColor`, `sparkSize`, `sparkRadius`, `sparkCount`, `duration`

- **AnimatedButton** (`AnimatedButton.tsx`) - Button with hover animations

- **Modal** (`Modal.tsx`) - Reusable modal with backdrop blur
  - ESC to close, click outside to close
  - Used for "ALL CATEGORIES" and "ALL TAGS" modals

### shadcn/ui Integration

The project is configured with **shadcn/ui** for UI components via MCP (Model Context Protocol):

**Configuration Files**:
- `components.json` - shadcn/ui configuration + ReactBits registry
- `.mcp.json` - MCP server configuration for Claude Code
- `app/lib/utils.ts` - Utility functions (`cn()` for className merging)

**Path Aliases** (configured in `tsconfig.json`):
- `@/*` → `./app/*`
- `@/components` → `./app/components`
- `@/lib` → `./app/lib`
- `@/components/ui` → `./app/components/ui`

**Adding Components**:
When using Claude Code, you can use natural language:
- "Add a Button component from shadcn"
- "Install a Card component"
- "Search for form components from reactbits"

Components will be installed to `app/components/ui/` with proper Tailwind CSS integration.

**Important**: The CSS path in `components.json` is configured as `src/index.css` but the actual file is at `app/index.css`. This is intentional - shadcn expects this path format. If issues arise, components may need manual path adjustments.

### Component Dependencies

shadcn/ui components require:
- `clsx` - Conditional className utility
- `tailwind-merge` - Merge Tailwind classes without conflicts
- `lucide-react` - Icon library (when using icons)

These are already installed and configured via the `cn()` utility function in `app/lib/utils.ts`.

## Article Detail Page Layout

The article detail page (`app/routes/article.$category.$slug.tsx`) features a specialized layout:

**Top Navigation Bar**:
- Hamburger menu button (toggles TOC sidebar)
- LOGO + site name with ShinyText animation
- Breadcrumb navigation (HOME > Category > Article)
  - Category link preserves pagination/filter state from referring page
  - Uses `from`, `page`, and `tag` URL parameters to construct return link

**TOC Sidebar** (sticky, champagne gold styling):
- **Mobile**: Slides in from left with backdrop overlay
- **Desktop**: Can be toggled on/off via hamburger menu or close (X) button
- Contains hierarchical table of contents (H2 + H3 headings)
- **Active Heading Tracking**: Uses `useScrollSpy` hook with IntersectionObserver
  - Highlights currently visible heading in champagne gold
  - rootMargin: `-100px 0px -66%` creates ~200px intersection zone
  - Selects topmost visible heading when multiple headings are in zone
- **Auto-scroll on Click**: Smooth scrolls to heading when TOC item is clicked
- Mobile auto-closes after clicking a TOC item

**Main Content Area**:
- Article metadata (author, date)
- Full article content with prose styling
- Code blocks with:
  - Language labels (font-size: 0.875rem)
  - Syntax highlighting via rehype-highlight
  - VS Code Dark+ color scheme
  - Copy button (added by CodeBlockEnhancer component)
- Math formula rendering via KaTeX (inline `$` and block `$$`)
- Back to top button (appears when scrolled down)

**Spacing & Typography**:
- Article paragraphs: `line-height: 2` (~5-6px increase)
- List items: `line-height: 1.9`
- Code block language labels: increased from 0.75rem to 0.875rem

## Content Processing Pipeline

### Markdown to HTML Conversion

The `app/lib/markdown.ts` module uses a unified processing pipeline:

```typescript
unified()
  .use(remarkParse)           // Parse Markdown to AST
  .use(remarkGfm)             // GitHub Flavored Markdown (tables, strikethrough, etc.)
  .use(remarkMath)            // Math syntax ($...$, $$...$$)
  .use(remarkRehype)          // Convert to HTML AST
  .use(rehypeSlug)            // Add IDs to headings (for TOC links)
  .use(rehypeHighlight)       // Syntax highlighting
  .use(rehypeKatex)           // Render math with KaTeX
  .use(rehypeStringify)       // Convert to HTML string
```

**TOC Extraction**: During HTML conversion, the pipeline extracts H2/H3 headings with their IDs to build the table of contents structure. The `extractTextFromNode()` function recursively extracts text from nested elements (code, strong, etc.).

**Important**:
- Headings must have IDs (added by rehype-slug) for TOC linking to work
- Math formulas in headings are preserved as text in the TOC
- Empty headings are automatically skipped

### Custom Hooks

**useScrollSpy** (`app/hooks/useScrollSpy.ts`):
- Tracks which heading is currently visible using IntersectionObserver
- Takes array of heading IDs and optional rootMargin
- Returns the ID of the topmost visible heading
- **Critical Settings**:
  - `rootMargin: '-100px 0px -66%'` - Creates intersection zone from 100px to ~34% of viewport height
  - `threshold: [0, 0.5, 1]` - Multiple thresholds for better detection
  - Uses Map to track all visible headings, then selects topmost by `boundingClientRect.top`
- **Gotcha**: If rootMargin is too restrictive (e.g., `-80px 0px -80%`), the intersection zone may be too small (<100px) and headings won't intersect properly

## Known Gotchas

1. **Stream Handling**: Always use Node.js `PassThrough` streams in `entry.server.tsx`, not Web Streams
2. **SSG Configuration**: Keep SSR enabled during build (don't set `ssr: false`) so loaders can run
3. **Route Discovery**: When adding new route patterns, update BOTH `app/routes.ts` and the `prerender()` function in `react-router.config.ts`
4. **Tailwind 4.x**: Use `@import "tailwindcss"` and `@theme {}` in CSS, not JavaScript config
5. **PostCSS**: Use `@tailwindcss/postcss` plugin, not the `tailwindcss` package directly
6. **Import Aliases**: Always use `@/` imports (e.g., `import { cn } from "@/lib/utils"`) instead of relative paths for better maintainability
7. **CSS Variables**: When using custom Tailwind colors, reference them without the `--color-` prefix (e.g., `bg-primary-blue` not `bg-color-primary-blue`)
8. **JSX Character Escaping**: In JSX, special characters like `>` must be escaped as HTML entities (e.g., `&gt;`) - this commonly affects breadcrumb separators
9. **Pagination State**: When switching categories or applying tag filters, the page always resets to page 1 (handled by `useEffect` watching `category` parameter)
10. **Sidebar Sticky Positioning**: The sidebar uses `position: sticky` with `top: 0` - it requires the parent container NOT to have `overflow: auto` or it won't stick properly
11. **Front Matter Encoding**: Markdown files may have UTF-8 BOM - use `utf-8-sig` encoding when reading to strip it automatically
12. **TOC Sidebar State Management**: The sidebar's `isOpen` state controls visibility on ALL screen sizes (not just mobile). The `translate-x-0` (visible) and `-translate-x-full` (hidden) classes are toggled based on state. DO NOT add responsive overrides like `md:translate-x-0` as this will break the hamburger menu toggle on desktop.
13. **Scroll Spy rootMargin**: The IntersectionObserver rootMargin must create a sufficiently large intersection zone. A margin of `-100px 0px -66%` on an 880px viewport creates ~200px zone. If too restrictive (e.g., `-80px 0px -80%`), the zone may be <100px and headings won't trigger intersection events.
14. **URL State Management in Category Pages**: The category page uses `useSearchParams` to store pagination and filter state in the URL. When updating these params, ALWAYS use the functional form `setSearchParams((prev) => {...})` to avoid race conditions. DO NOT use `setSearchParams(new URLSearchParams(searchParams))` as it will cause stale state issues.
15. **useEffect Infinite Loops**: When using `useEffect` with `setSearchParams` in the dependency array, use `useRef` to track actual value changes (e.g., category changes) to prevent infinite re-renders. Simply watching `category` with `setSearchParams` in deps will cause loops because `setSearchParams` triggers re-renders.
