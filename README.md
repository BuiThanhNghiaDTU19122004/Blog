# Retro Developer Desktop Blog (Windows 98 CRT Theme)

An optimized technical developer blog built with **Next.js (App Router)**, **MDX**, **Tailwind CSS v4**, and **98.css**.

## 🚀 Local Development

### 1. Installation
Prerequisite: **Node.js 18+**

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Static Site Generation (SSG)

```bash
npm run build
```

---

## 🌐 Route-Based i18n Architecture (`/en/`, `/vi/`)

The blog implements a **route-based i18n architecture** compatible with Next.js static site generation (SSG), SEO indexing, and shareable URLs.

### Key Rules & Behavior:
1. **URL Single Source of Truth**: All pages live under localized routes (e.g. `/en/posts/welcome`, `/vi/posts/welcome`). The URL locale segment is the only source of truth for rendering decisions.
2. **First-Visit Middleware**: Visiting the root `/` auto-detects preferred language (`Accept-Language` header or `NEXT_LOCALE` cookie) and redirects to `/[locale]/`.
3. **Legacy URL Compatibility**: Accessing legacy un-prefixed URLs like `/posts/:slug` issues a `301 Permanent Redirect` to `/en/posts/:slug`.
4. **SEO & hreflang**: Every post automatically outputs `hreflang` alternate links pointing to English and Vietnamese versions.

---

## ✍️ Writing Localized Posts & Code Tabs

To create a new article:
1. Add localized `.mdx` files inside `posts/` using suffixes: `posts/[slug].en.mdx` and `posts/[slug].vi.mdx`.
2. If a Vietnamese translation is not yet available, the system automatically falls back to `[slug].en.mdx` and displays a retro translation notice banner.

### MDX Frontmatter & Content Example:

```markdown
---
title: "Your Article Title"
description: "A short summary of the article content"
date: "2026-07-28"
tags: ["nextjs", "react", "architecture"]
---

## First Section Title

Article content written in standard Markdown or MDX...
```

### 💻 Multi-Platform Code Tabs (`<Tabs>` / `<Tab>`)

You can embed interactive code tabs directly inside any `.mdx` file without imports:

```markdown
<Tabs>
  <Tab label="PowerShell">
\`\`\`powershell
npm install
\`\`\`
  </Tab>
  <Tab label="Bash">
\`\`\`bash
npm install
\`\`\`
  </Tab>
</Tabs>
```

---

## 🛠️ Project Structure

```
.
├── app/
│   ├── [locale]/         # Localized app routes (home, posts, about, github)
│   ├── api/posts/        # Post view count API routes
│   ├── globals.css       # Win98 CSS, typography & CRT overlay
│   └── layout.tsx        # Root layout with next/font setup
├── components/
│   └── win98/            # Win98 Window, Taskbar, TableOfContents, LanguageToggle, CodeTabs
├── data/
│   └── post-views.json   # Persistent fallback view counts JSON store
├── lib/
│   ├── i18n/             # Dictionary & locale utilities
│   ├── mdx-components.tsx# Custom MDX tags, CodeTabs & typography rules
│   ├── posts.ts          # Per-locale MDX parser & TOC heading generator
│   └── views.ts          # In-memory post views store & disk queue
├── middleware.ts         # First-visit locale redirect middleware
├── posts/                # Localized MDX blog posts (*.en.mdx, *.vi.mdx)
└── public/
    └── images/           # Assets (icons & post images)
```

---

## 📊 View-Count System Architecture

The blog post view-count system (`lib/views.ts`) uses an **In-Memory RAM Store with Serialized Async File Persistence**.

### Flow Diagrams

#### GET Request Flow:
```text
GET /api/posts/[slug]/views
  │
  ▼
[Read RAM Cache (inMemoryViews)]  ──► Load-once cold start init if needed (data/post-views.json)
  │
  ▼
Return { slug, views }  (0ms Disk I/O Overhead)
```

#### POST Request Flow:
```text
POST /api/posts/[slug]/views
  │
  ▼
[Synchronously Increment RAM Cache (inMemoryViews[slug]++)]
  │
  ├──► Return Updated View Count Immediately to Client
  │
  ▼
[Enqueue to Serialized Write Queue (writeQueue)]
  │
  ▼
[Async Write to data/post-views.json] (Caught silently on read-only serverless filesystems)
```

### Why This Solution Was Chosen Over Direct File Read/Write

1. **Eliminates Disk I/O Overhead on GET**: Direct file reads on every request introduce unnecessary filesystem latency. Storing view counts in RAM makes `GET` lookups instantaneous (O(1)).
2. **Prevents Write Race Conditions**: Node's single-threaded event loop guarantees in-memory increments are thread-safe. Serializing disk writes with a promise queue (`writeQueue`) prevents overlapping `fs.writeFile` calls and JSON corruption.
3. **Lazy Cold-Start Load-Once Pattern**: `ensureViewsLoaded()` caches the initial read promise, ensuring concurrent requests during server startup read `data/post-views.json` exactly once.
4. **Zero Cloud Dependencies**: Built using standard Node.js libraries (`fs/promises`) following **ponytail** principles (no external Redis/database requirement for personal blogs).

### Serverless & Scale Considerations (Trade-Offs)

- **Per-Instance RAM Isolation**: In multi-instance serverless deployments (e.g. Vercel with auto-scaling lambdas), each container instance maintains its own in-memory cache.
- **Eventual Consistency**: View counts are eventually consistent per server instance. For a personal blog, trading global multi-region consistency for zero database costs and 0ms GET response speed is an intentional design choice.
- **Scaling Up**: If the blog scales to high traffic across distributed serverless nodes, `lib/views.ts` can be upgraded to an external serverless KV store (such as Vercel KV or Upstash Redis) using the exact same interface signatures (`getPostViews` and `incrementPostViews`).
