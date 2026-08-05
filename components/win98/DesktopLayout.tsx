import React from 'react'
import { Taskbar } from './Taskbar'
import { DesktopSidebar } from './DesktopSidebar'
import { AmbientRails } from './AmbientRails'

interface DesktopLayoutProps {
  children: React.ReactNode
}

export function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-desktop)] text-[var(--text-main)] relative pb-14 font-win98 selection:bg-[var(--accent-primary)] selection:text-black transition-colors duration-200">
      {/* Ambient decorative side rails — behind all UI */}
      <AmbientRails />

      {/* Subtle CRT Scanline & Vignette Effect */}
      <div className="crt-overlay" />

      {/* Main Desktop Container */}
      <div className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-start relative z-10">
        
        {/* Compact Thin Desktop Left Rail */}
        <DesktopSidebar />

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
