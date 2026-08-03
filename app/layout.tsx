import type { Metadata } from 'next'
import {
  Plus_Jakarta_Sans,
  Space_Grotesk,
  Fira_Code,
  Pixelify_Sans,
  Press_Start_2P,
} from 'next/font/google'
import './globals.css'
import { DesktopLayout } from '@/components/win98/DesktopLayout'
import { ThemeProvider } from '@/components/ThemeProvider'

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  variable: '--font-win98',
  display: 'swap',
})

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-hero',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'C:\\BuiThanhNghiaDev\\Explorer - Retro Dev Desktop',
  description: 'BuiThanhNghiaDev - Windows 98 Retro Technical Developer Workstation',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakartaSans.variable} ${spaceGrotesk.variable} ${firaCode.variable} ${pixelify.variable} ${pressStart2P.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ThemeProvider>
          <DesktopLayout>{children}</DesktopLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
