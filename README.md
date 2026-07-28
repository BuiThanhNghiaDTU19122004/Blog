# Personal Dev Blog

Blog cá nhân được tối ưu hóa hiệu năng, xây dựng bằng **Next.js (App Router)**, **MDX**, **Tailwind CSS v4** và triển khai miễn phí trên **Vercel**.

<!-- ponytail: minimal, clear developer documentation -->

## 🚀 Hướng Dẫn Chạy Ở Local (Local Development)

### 1. Cài đặt thư viện
Yêu cầu môi trường: **Node.js 18+**

```bash
npm install
```

### 2. Khởi chạy máy chủ thử nghiệm (Development Server)
```bash
npm run dev
```
Mở trình duyệt truy cập: [http://localhost:3000](http://localhost:3000)

### 3. Kiểm tra Build Production (Static Site Generation)
```bash
npm run build
```

---

## ✍️ Hướng Dẫn Viết Bài Mới

Để tạo bài viết mới, bạn tạo 1 file `.mdx` trong thư mục `posts/` (ví dụ: `posts/bai-viet-moi.mdx`).

### Cấu trúc bài viết chuẩn (MDX Frontmatter):

```mdx
---
title: "Tiêu đề bài viết của bạn"
description: "Mô tả ngắn gọn nội dung bài viết"
date: "2026-07-28"
tags: ["Nextjs", "Tailwind", "MDX"]
---

## Nội dung chính bài viết

Bạn có thể sử dụng cú pháp **Markdown** thông thường và chèn các thẻ HTML / React Component trực tiếp ở đây.

```tsx
const hello = "World"
console.log(hello)
```
```

Mọi bài viết thêm vào thư mục `posts/` sẽ tự động hiển thị trên Trang chủ và tạo đường dẫn tĩnh tại `/posts/slug-ten-file`.

---

## 🛠️ Cấu Trúc Dự Án

```text
├── app/                  # App Router Next.js (pages, layouts, globals.css)
│   ├── posts/[slug]/     # Trang hiển thị chi tiết bài viết MDX
│   └── page.tsx          # Trang chủ danh sách bài viết
├── lib/                  # Helper đọc file MDX (fs + gray-matter)
├── posts/                # Thư mục chứa các bài viết dạng .mdx
├── components/           # UI Components (shadcn/ui, custom components)
├── mdx-components.tsx    # Cấu hình thẻ HTML/Component cho MDX
└── next.config.mjs       # Cấu hình Next.js với @next/mdx
```

---

## 🌐 Triển Khai Lên Vercel (Deployment)

1. Push mã nguồn lên repository **GitHub** của bạn:
   ```bash
   git add .
   git commit -m "Add new blog post"
   git push origin main
   ```
2. Kết nối repo GitHub với [Vercel.com](https://vercel.com).
3. Vercel sẽ tự động phát hiện Next.js và deploy mỗi khi bạn `git push`.
