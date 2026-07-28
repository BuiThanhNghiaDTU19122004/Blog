import React from 'react'
import Link from 'next/link'
import { Taskbar } from './Taskbar'

interface DesktopLayoutProps {
  children: React.ReactNode
}

export function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div className="min-h-screen bg-[#008080] text-black relative pb-14 font-win98 selection:bg-[#000080] selection:text-white">
      {/* Subtle CRT Scanline & Vignette Effect */}
      <div className="crt-overlay" />

      {/* Main Desktop Container */}
      <div className="p-3 sm:p-6 md:p-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-start relative z-10">

        {/* Desktop Left Icon Column */}
        <aside className="w-full lg:w-44 flex lg:flex-col flex-wrap gap-4 select-none shrink-0 border-b lg:border-b-0 border-teal-700 pb-4 lg:pb-0">
          <Link
            href="/"
            className="flex lg:flex-col items-center gap-2 p-2 hover:bg-white/20 rounded text-white text-center focus:bg-[#000080] focus:border focus:border-dashed focus:border-white group cursor-pointer"
          >
            <span className="text-3xl sm:text-4xl filter drop-shadow">🖥️</span>
            <span className="text-xs font-semibold drop-shadow-md text-white group-hover:underline">
              My Computer
            </span>
          </Link>

          <Link
            href="/"
            className="flex lg:flex-col items-center gap-2 p-2 hover:bg-white/20 rounded text-white text-center focus:bg-[#000080] focus:border focus:border-dashed focus:border-white group cursor-pointer"
          >
            <span className="text-3xl sm:text-4xl filter drop-shadow">📁</span>
            <span className="text-xs font-semibold drop-shadow-md text-white group-hover:underline">
              Blog Posts
            </span>
          </Link>

          <a
            href="https://github.com/BuiThanhNghiaDTU19122004"
            target="_blank"
            rel="noreferrer"
            className="flex lg:flex-col items-center gap-2 p-2 hover:bg-white/20 rounded text-white text-center focus:bg-[#000080] focus:border focus:border-dashed focus:border-white group cursor-pointer"
          >
            <span className="text-3xl sm:text-4xl filter drop-shadow">🌐</span>
            <span className="text-xs font-semibold drop-shadow-md text-white group-hover:underline">
              GitHub.exe
            </span>
          </a>

          <div className="flex lg:flex-col items-center gap-2 p-2 hover:bg-white/20 rounded text-white text-center focus:bg-[#000080] focus:border focus:border-dashed focus:border-white group cursor-pointer opacity-75">
            <span className="text-3xl sm:text-4xl filter drop-shadow">🗑️</span>
            <span className="text-xs font-semibold drop-shadow-md text-white group-hover:underline">
              Recycle Bin
            </span>
          </div>
        </aside>

        {/* Main Work Area Window */}
        <main className="flex-1 w-full min-w-0">
          {children}
        </main>
      </div>

      {/* Retro Win98 Taskbar */}
      <Taskbar />
    </div>
  )
}
