import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Blog cá nhân',
  description: 'Blog dùng Next.js, MDX, Tailwind và Vercel',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
