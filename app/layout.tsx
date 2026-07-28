import type { Metadata } from 'next'
import './globals.css'
import { DesktopLayout } from '@/components/win98/DesktopLayout'

export const metadata: Metadata = {
  title: 'C:\\Blog\\Explorer - Retro Dev Desktop',
  description: 'Windows 98 CRT Technical Developer Blog',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <DesktopLayout>{children}</DesktopLayout>
      </body>
    </html>
  )
}
