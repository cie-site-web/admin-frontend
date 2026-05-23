# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Next.js dev server with Turbopack on port 3000

# Build & lint
npm run build        # Production build (Turbopack)
npm run lint         # ESLint

# Tests
npm run test                  # Jest unit tests (jsdom)
npm run test:watch            # Jest in watch mode
npm run test:coverage         # Jest with coverage report
npm run test:e2e              # Playwright e2e (requires dev server running)
npm run test:e2e:headed       # Playwright with visible browser

# Docker
docker-compose --profile dev up --build   # Dev with hot reload
docker-compose --profile prod up --build  # Production build
docker-compose down                        # Stop all
```

## Architecture

This is a **Next.js 15 App Router** admin frontend for a club management system (CIE). It is a port of a Bootstrap/jQuery HTML theme (`Admin-html/`) into React components, keeping all CSS and third-party JS from the original theme served as static files from `public/assets/`.

### Layout chain

```
src/app/layout.tsx          ← Root layout: <html>/<body>, all <link> stylesheets,
                              all <Script strategy="afterInteractive"> (Bootstrap,
                              ApexCharts, GridJS, FullCalendar, app.js, dashboard init)
  └── src/app/(admin)/layout.tsx   ← Admin layout: #layout-wrapper, Header, Sidebar,
                                      HorizontalNav, <main class="app-wrapper">,
                                      Footer, ScrollToTop
        └── page.tsx                 ← Page content (single render)
```

**Critical rule**: Only the root layout owns `<html>/<body>`. The admin layout must never re-declare them. `{children}` must be rendered exactly once (was a known bug causing charts to mount in a hidden copy).

### Static assets & vanilla JS bridge

All CSS and vendor JS come from `public/assets/` (Bootstrap, ApexCharts, GridJS, FullCalendar, Swiper, Simplebar). Theme behavior scripts in `public/assets/js/` are loaded globally via `<Script>` in the root layout.

**Dashboard charts** (`public/assets/js/dashboard/e-commerce.init.js`): renders ApexCharts into `#average-line`, `#average-bar` and GridJS into `#gridjs_sort-table`. Guard: exits early if `#average-line` is absent (non-dashboard pages).

**Calendar** (`public/assets/js/app/apps-calendar.init.js`): FullCalendar instance managed as vanilla JS. Exposes `window.initCieAppsCalendar()`, `window.destroyCieAppsCalendar()`, `window.getCieCalendarEvents()`. Fires the custom event `cieCalendarEventsChanged` on every add/edit/delete so the React sidebar can re-render. The `AppCalendar` component loads these scripts imperatively via `loadScriptOnce()` and listens for `cieCalendarEventsChanged`.

### Navigation

`src/components/sections/admin/navbar/menuItems.ts` is the **single source of truth** for all navigation. Both `Sidebar` and `HorizontalNav` consume it. Adding a new page = add one entry here.

Pages (all under `(admin)` route group):
- `/dashboard` — stats, account table, ApexCharts graph, GridJS transactions
- `/member` — member table with pagination
- `/calendar` — FullCalendar + upcoming/past event sidebars
- `/activity` — ActivityCard grid
- `/treasury`, `/about`, `/project` — stubs

### Component layers

| Layer | Path | Purpose |
|-------|------|---------|
| Pages | `src/app/(admin)/*/page.tsx` | Data + layout composition |
| Sections | `src/components/sections/admin/` | Feature-specific blocks (dashboard widgets, calendar panel, header, navbar) |
| UI | `src/components/ui/` | Generic, reusable components (cards, badges, buttons, forms…) |

Mock data lives next to the component that uses it (`mockData.ts` siblings). Types live in `src/types/`.

### Key patterns

- **Server vs Client**: Pages are Server Components by default. Add `"use client"` only when state/effects are needed (pagination, calendar sync, dark mode toggle).
- **`data-simplebar`**: Apply to any scrollable container; SimpleBar auto-initializes from the global script.
- **Bootstrap modals from React**: Use `data-bs-toggle="modal"` / `data-bs-target` attributes on buttons; Bootstrap JS handles the rest.
- **`@/*` alias** maps to `src/` (configured in `tsconfig.json`).

### Admin-html reference

`Admin-html/` contains the original static HTML theme. When porting a page to React:
1. Copy only the `<main>` content (ignore `<head>`, scripts, partials includes)
2. Convert HTML attributes to JSX (`class` → `className`, `for` → `htmlFor`, inline `style` → object)
3. Replace `javascript:void(0)` hrefs with `#` or proper handlers
4. If the page needs a vanilla JS init script, mirror the pattern in `AppCalendar.tsx` (load script once, expose init/destroy on `window`, call on mount/unmount)
