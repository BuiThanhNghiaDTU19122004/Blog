import React from 'react'
import Link from 'next/link'
import { Taskbar } from './Taskbar'

interface DesktopLayoutProps {
  children: React.ReactNode
}

export function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-desktop)] text-[var(--text-main)] relative pb-14 font-win98 selection:bg-[var(--accent-primary)] selection:text-black transition-colors duration-200">
      {/* Subtle CRT Scanline & Vignette Effect */}
      <div className="crt-overlay" />

      {/* Main Desktop Container */}
      <div className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-start relative z-10">
        
        {/* Compact Thin Desktop Left Rail */}
        <aside className="w-full lg:w-16 flex lg:flex-col flex-row flex-wrap justify-around lg:justify-start gap-2 select-none shrink-0 bg-[var(--bg-surface-subtle)] lg:bg-transparent p-1.5 lg:p-0 border-b lg:border-b-0 border-gray-600 rounded-sm">
          <Link
            href="/"
            title="My Computer (Home Grid)"
            className="flex flex-col items-center justify-center p-1.5 hover:bg-white/20 rounded text-white text-center focus:bg-[var(--accent-primary)] focus:border focus:border-dashed focus:border-white group cursor-pointer w-12"
          >
            <span className="text-2xl sm:text-3xl filter drop-shadow">🖥️</span>
            <span className="text-[10px] font-semibold text-[var(--text-main)] lg:text-white group-hover:underline truncate max-w-full">
              Home
            </span>
          </Link>

          <Link
            href="/posts"
            title="Blog Posts File Explorer"
            className="flex flex-col items-center justify-center p-1.5 hover:bg-white/20 rounded text-white text-center focus:bg-[var(--accent-primary)] focus:border focus:border-dashed focus:border-white group cursor-pointer w-12"
          >
            <span className="text-2xl sm:text-3xl filter drop-shadow">📁</span>
            <span className="text-[10px] font-semibold text-[var(--text-main)] lg:text-white group-hover:underline truncate max-w-full">
              Posts
            </span>
          </Link>

          <Link
            href="/about"
            title="About Me (profile.exe)"
            className="flex flex-col items-center justify-center p-1.5 hover:bg-white/20 rounded text-white text-center focus:bg-[var(--accent-primary)] focus:border focus:border-dashed focus:border-white group cursor-pointer w-12"
          >
            <span className="text-2xl sm:text-3xl filter drop-shadow">👤</span>
            <span className="text-[10px] font-semibold text-[var(--text-main)] lg:text-white group-hover:underline truncate max-w-full">
              About
            </span>
          </Link>

          <a
            href="https://github.com/BuiThanhNghiaDTU19122004"
            target="_blank"
            rel="noreferrer"
            title="GitHub Repository"
            className="flex flex-col items-center justify-center p-1.5 hover:bg-white/20 rounded text-white text-center focus:bg-[var(--accent-primary)] focus:border focus:border-dashed focus:border-white group cursor-pointer w-12"
          >
            <span className="text-2xl sm:text-3xl filter drop-shadow">🌐</span>
            <span className="text-[10px] font-semibold text-[var(--text-main)] lg:text-white group-hover:underline truncate max-w-full">
              GitHub
            </span>
          </a>

          <div
            title="Recycle Bin"
            className="hidden lg:flex flex-col items-center justify-center p-1.5 hover:bg-white/20 rounded text-white text-center focus:bg-[var(--accent-primary)] focus:border focus:border-dashed focus:border-white group cursor-pointer opacity-75 w-12"
          >
            <span className="text-2xl sm:text-3xl filter drop-shadow">🗑️</span>
            <span className="text-[10px] font-semibold lg:text-white group-hover:underline truncate max-w-full">
              Trash
            </span>
          </div>
        </aside>

        {/* Main Work Area Window */}
        <main className="flex-1 w-full min-w-0">
          {children}
        </main>
      </div>

      {/* Retro Taskbar */}
      <Taskbar />
    </div>
  )
}
