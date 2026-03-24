# Homepage GET START Desktop Button Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update only the homepage desktop `GET START` button so it renders as a wider single-line pill button.

**Architecture:** Keep `AnimatedButton` as the shared base component and add an optional class hook. Apply the visual change through a homepage-only CSS selector under a desktop media query so the behavior stays isolated to one route.

**Tech Stack:** React 19, React Router 7, TypeScript, global CSS

---

### Task 1: Add a scoped styling hook

**Files:**
- Modify: `app/components/AnimatedButton.tsx`

**Step 1: Update the shared component API**

Add an optional `className` prop and merge it into the rendered button class list.

**Step 2: Keep behavior unchanged by default**

Ensure existing callers still render with `btn-17` when no variant class is passed.

### Task 2: Opt the homepage button into the desktop variant

**Files:**
- Modify: `app/routes/_index.tsx`

**Step 1: Target only the homepage button**

Pass a homepage-specific class name to the `AnimatedButton` instance used for `GET START`.

**Step 2: Preserve existing layout semantics**

Do not change button text, routing target, or mobile stacking behavior.

### Task 3: Implement the desktop-only style override

**Files:**
- Modify: `app/index.css`

**Step 1: Add a desktop media query**

Create a selector for the homepage-specific button class at desktop width.

**Step 2: Match the requested visual direction**

Set single-line text, centered alignment, and a wider lower-profile pill shape while retaining the shared hover animation.

### Task 4: Verify the change

**Files:**
- Verify: `package.json`

**Step 1: Run build**

Run: `npm run build`

Expected: Build completes successfully with no TypeScript or bundling errors caused by the change.

**Step 2: Review the diff**

Confirm only the homepage button instance and its scoped styling hook were changed.
