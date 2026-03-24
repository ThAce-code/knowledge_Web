# 首页侧边栏修复方案

**日期**: 2026-03-24
**状态**: 已批准
**目标分支**: develp

---

## 问题描述

之前的响应式优化只隐藏了侧边栏，但没有为移动端提供替代的公告显示方案。导致移动端用户看不到公告。

---

## 解决方案

### 桌面端（> 1024px）
- 保持原样：左侧 320px 侧边栏
- 内容：LOGO + 公告 + 社交图标

### 移动/平板端（< 1024px）
- 顶部显示汉堡菜单按钮（仅移动/平板可见）
- 点击汉堡菜单 → 侧边栏从左侧滑出
- 侧边栏内容：**仅公告**（不含社交图标）
- 社交图标在移动端隐藏

### 侧边栏宽度

| 设备 | 宽度 | Tailwind |
|------|------|----------|
| 移动端 | 280px | 默认 |
| 平板 | 208px | `md:w-52` |
| 桌面 | 320px | `lg:w-80` |

### 汉堡菜单按钮

- 仅在 `< 1024px` 显示：`hidden md:block lg:hidden`
- 位置：主内容区顶部左侧
- 图标：`<Menu size={24} />`

### 侧边栏行为

| 设备 | 默认状态 | 触发方式 |
|------|----------|----------|
| 移动端 | 关闭 | 汉堡菜单触发 |
| 平板 | 关闭 | 汉堡菜单触发 |
| 桌面 | 显示 | 无需触发 |

---

## 待修改文件

- `app/routes/_index.tsx`

---

## 具体改动

### 1. 添加侧边栏状态和汉堡菜单

添加 state：
```tsx
const [sidebarOpen, setSidebarOpen] = useState(false);
```

添加汉堡菜单按钮（主内容区顶部）：
```tsx
<button
  onClick={() => setSidebarOpen(!sidebarOpen)}
  className="hidden md:block lg:hidden p-2 hover:bg-bg-secondary rounded-lg transition-colors"
  aria-label="Toggle sidebar"
>
  <Menu size={24} />
</button>
```

### 2. 修改侧边栏

移除 `hidden lg:flex`，改为响应式：
```tsx
className={`
  fixed left-0 top-0 h-screen
  w-[280px] md:w-52 lg:w-80
  sidebar-champagne
  transition-transform duration-300
  ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  z-50
`}
```

### 3. 侧边栏内容 - 仅保留公告

移除社交图标部分，仅保留：
- LOGO + 网站名
- 公告卡片

### 4. 添加遮罩层（移动端）

当侧边栏打开时显示遮罩：
```tsx
{sidebarOpen && (
  <div
    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
    onClick={() => setSidebarOpen(false)}
  />
)}
```

### 5. 桌面端侧边栏保持不变

仅在 `lg:` 及以上显示完整侧边栏：
```tsx
className="hidden lg:flex lg:w-80 flex-col gap-6 h-full"
```

---

## 验收标准

1. 移动端 (< 768px) 可通过汉堡菜单打开侧边栏查看公告
2. 平板 (768-1024px) 可通过汉堡菜单打开侧边栏
3. 桌面 (> 1024px) 侧边栏默认显示，无需操作
4. 移动端公告可点击打开详情 Modal
5. 侧边栏遮罩点击可关闭
6. 无横向滚动
