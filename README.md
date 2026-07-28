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

## ✍️ Writing New Posts

To create a new article, add a `.mdx` file inside the `posts/` directory (e.g. `posts/my-new-post.mdx`).

### MDX Frontmatter Format:

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

Every `.mdx` file added to `posts/` will automatically be indexed on the main Explorer home window and pre-rendered statically at `/posts/slug`.

---

## 🛠️ Project Structure

```
.
├── app/
│   ├── about/            # About Me page route
│   ├── posts/[slug]/     # MDX Article detail route & Table of Contents
│   ├── globals.css       # Win98 CSS, typography & CRT overlay
│   ├── layout.tsx        # Root layout with next/font setup
│   └── page.tsx          # Win98 File Explorer homepage
├── components/
│   └── win98/            # Win98 Window, Taskbar, TableOfContents, FileExplorer
├── lib/
│   ├── mdx-components.tsx# Custom MDX tags & typography rules
│   └── posts.ts          # MDX parser & TOC heading generator
├── posts/                # Markdown / MDX blog posts
└── public/
    └── images/           # Assets (icons & post images)
```
