# Responsive Design Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement responsive design for embedded-wiki supporting mobile (<768px), tablet (768-1024px), and desktop (>1024px) breakpoints.

**Architecture:** Progressive adaptation approach - preserve existing design language while fixing breakpoint issues. Mobile-first CSS with Tailwind responsive prefixes.

**Tech Stack:** React Router v7, Tailwind CSS 4.x, TypeScript

---

## File Structure

| File | Changes |
|------|---------|
| `app/routes/_index.tsx` | Homepage layout - hide sidebar on mobile, responsive padding, responsive grid |
| `app/routes/category.$category.tsx` | Category page - responsive sidebar width, LOGO margin fix, content padding |
| `app/routes/article.$category.$slug.tsx` | Article page - responsive title size, content padding, breadcrumb visibility |
| `app/index.css` | Verify/update breakpoint configuration |

---

## Task 1: Homepage Layout (_index.tsx)

**Files:**
- Modify: `app/routes/_index.tsx`

### Steps

- [ ] **Step 1: Remove h-screen and fix main container height**

Locate line 43: `className="flex h-screen bg-bg-primary gap-8 p-8 overflow-hidden"`

Change to:
```tsx
className="flex min-h-screen bg-bg-primary gap-4 md:gap-8 p-4 md:p-8"
```

- [ ] **Step 2: Hide left sidebar on mobile/tablet**

Locate line 45: `className="w-80 flex flex-col gap-6 h-full"`

Change to:
```tsx
className="hidden lg:flex lg:w-80 flex-col gap-6 h-full"
```

- [ ] **Step 3: Fix hero section padding**

Locate line 129: `className="px-12 pt-6 pb-10"`

Change to:
```tsx
className="px-4 md:px-8 lg:px-12 pt-6 pb-10"
```

- [ ] **Step 4: Fix search section padding and layout**

Locate line 189: `className="px-12 pb-16"`

Change to:
```tsx
className="px-4 md:px-8 lg:px-12 pb-8 md:pb-16"
```

- [ ] **Step 5: Fix search form width (remove hardcoded calc)**

Locate lines 193-194:
```tsx
className="search-form"
style={{ width: 'calc((100% - 220px) * 2 / 3)' }}
```

Change to:
```tsx
className="search-form w-full md:w-2/3"
```

- [ ] **Step 6: Fix search section layout (stack on mobile)**

Locate line 191: `className="flex justify-between items-center"`

Change to:
```tsx
className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4"
```

- [ ] **Step 7: Fix articles section padding**

Locate line 271: `className="px-12 pb-12"`

Change to:
```tsx
className="px-4 md:px-8 lg:px-12 pb-12"
```

- [ ] **Step 8: Fix article cards grid layout**

Locate line 273: `className="flex justify-between"`

Change to:
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
```

Also locate line 278: `className={`group flex-1 ${index === 1 ? 'mx-6' : ''}`}`

Change to:
```tsx
className="group"
```

- [ ] **Step 9: Fix article card inner styling for grid**

Locate line 280:
```tsx
className="bg-bg-secondary rounded-card p-6 border border-border hover:border-primary-blue transition-all hover:shadow-md h-full flex flex-col"
```

Change to:
```tsx
className="bg-bg-secondary rounded-card p-4 md:p-6 border border-border hover:border-primary-blue transition-all hover:shadow-md h-full flex flex-col"
```

- [ ] **Step 10: Commit changes**

```bash
git add app/routes/_index.tsx
git commit -m "feat(responsive): update homepage layout for mobile/tablet

- Remove h-screen to fix overflow on mobile
- Hide left sidebar on mobile/tablet (lg:block)
- Add responsive padding throughout
- Fix search form width to responsive w-full md:w-2/3
- Stack search and button vertically on mobile
- Convert article grid to responsive grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Remove hardcoded mx-6 spacing between cards"
```

---

## Task 2: Category Page Layout (category.$category.tsx)

**Files:**
- Modify: `app/routes/category.$category.tsx`

### Steps

- [ ] **Step 1: Fix LOGO margin hack**

Locate line 137: `className="flex items-center gap-3 ml-[calc(16rem-3rem)]"`

Change to:
```tsx
className="flex items-center gap-3 ml-4 md:ml-8 lg:ml-[calc(16rem-3rem)]"
```

- [ ] **Step 2: Fix sidebar responsive width and positioning**

Locate line 158:
```tsx
className={`w-64 h-screen sidebar-champagne transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} absolute md:relative`}
```

Change to:
```tsx
className={`w-64 md:w-52 lg:w-64 h-screen sidebar-champagne transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} absolute md:relative z-10`}
```

- [ ] **Step 3: Fix content area padding**

Locate line 237: `className="flex-1 p-12"`

Change to:
```tsx
className="flex-1 p-4 md:p-6 lg:p-8 xl:p-12"
```

- [ ] **Step 4: Commit changes**

```bash
git add app/routes/category.$category.tsx
git commit -m "feat(responsive): update category page for mobile/tablet

- Fix LOGO margin to responsive ml-4 md:ml-8 lg:ml-[calc(16rem-3rem)]
- Make sidebar width responsive: w-64 md:w-52 lg:w-64
- Add z-10 to sidebar for proper layering
- Fix content padding to p-4 md:p-6 lg:p-8 xl:p-12"
```

---

## Task 3: Article Page Layout (article.$category.$slug.tsx)

**Files:**
- Modify: `app/routes/article.$category.$slug.tsx`

### Steps

- [ ] **Step 1: Fix article title responsive font size**

Locate line 140: `className="text-4xl font-bold text-text-primary mb-4"`

Change to:
```tsx
className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-4"
```

- [ ] **Step 2: Fix main content padding and max-width**

Locate line 137: `className="flex-1 px-4 md:px-12 py-8 md:py-16 max-w-6xl mx-auto"`

Change to:
```tsx
className="flex-1 px-4 md:px-8 lg:px-12 py-6 md:py-10 lg:py-16 max-w-none md:max-w-5xl lg:max-w-6xl mx-auto"
```

- [ ] **Step 3: Fix breadcrumb visibility on mobile**

Locate lines 117-120:
```tsx
<span className="hidden md:inline">&gt;</span>
<span className="hidden md:inline text-text-primary truncate max-w-[200px]">
  {article.title}
</span>
```

The article title part is already hidden on mobile which is correct. But we need to ensure the separator is only shown when title is shown. This should already work with the existing `hidden md:inline` classes.

- [ ] **Step 4: Commit changes**

```bash
git add app/routes/article.$category.$slug.tsx
git commit -m "feat(responsive): update article page for mobile/tablet

- Make title font responsive: text-2xl md:text-3xl lg:text-4xl
- Fix content padding: px-4 py-6 (mobile) to lg:px-12 lg:py-16 (desktop)
- Add responsive max-width: max-w-none (mobile), md:max-w-5xl lg:max-w-6xl (desktop)"
```

---

## Task 4: Verify CSS Breakpoints (index.css)

**Files:**
- Review: `app/index.css`

### Steps

- [ ] **Step 1: Check breakpoint configuration**

Verify that `@theme` block in `app/index.css` contains breakpoint definitions:

```css
@theme {
  /* Existing breakpoints should work with Tailwind defaults:
   * sm: 640px
   * md: 768px
   * lg: 1024px
   * xl: 1280px
   *
   * No changes needed if using Tailwind CSS 4.x defaults
   */
}
```

The existing Tailwind CSS 4.x setup should already have the correct default breakpoints matching our design spec (<768px mobile, 768-1024px tablet, >1024px desktop).

- [ ] **Step 2: Commit (if changes needed)**

Only if modifications were required:
```bash
git add app/index.css
git commit -m "docs(responsive): update breakpoint documentation if changed"
```

---

## Task 5: Final Verification

### Steps

- [ ] **Step 1: Build project**

```bash
cd D:/WIKI/embedded-wiki && npm run build
```

Expected: Build succeeds without errors

- [ ] **Step 2: Run dev server and test**

```bash
npm run dev
```

Open browser at localhost (verify port) and test:
1. Resize browser to < 768px - verify mobile layout
2. Resize to 768-1024px - verify tablet layout
3. Resize to > 1024px - verify desktop layout

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat(responsive): complete responsive design optimization

Responsive breakpoints:
- Mobile (<768px): Single column, hidden sidebars, full-width layouts
- Tablet (768-1024px): 2-column grids, narrower sidebars
- Desktop (>1024px): Full layouts with 3-column grids

Changes:
- Homepage: Responsive sidebar, search, and article grid
- Category: Responsive sidebar width and content padding
- Article: Responsive title, content padding, and max-width

Verified against design spec dated 2026-03-24."
```

---

## Verification Checklist

- [ ] Mobile (< 768px): All pages render without horizontal scroll
- [ ] Mobile: Touch targets >= 44px
- [ ] Tablet (768-1024px): Layout is balanced, not cramped
- [ ] Desktop (> 1024px): Layout matches original design
- [ ] Build completes without errors
- [ ] All commits are descriptive and atomic
