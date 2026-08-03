'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function DesktopSidebar() {
  const pathname = usePathname()

  const getLinkClass = (path: string) => {
    // Exact match for home, prefix match for others (e.g. /posts, /posts/slug)
    const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path)
    
    return `flex flex-col items-center justify-center p-1.5 rounded text-white text-center group cursor-pointer w-12 transition-colors focus:bg-[var(--accent-primary)] focus:border focus:border-dashed focus:border-white ${
      isActive 
        ? 'bg-[var(--accent-primary)] border border-dashed border-white shadow-inner font-bold' 
        : 'hover:bg-white/20 border border-transparent'
    }`
  }

  const getLabelClass = (path: string) => {
    const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path)
    return `text-[10px] font-semibold lg:text-white truncate max-w-full ${
      isActive ? 'text-white underline' : 'text-[var(--text-main)] group-hover:underline'
    }`
  }

  return (
    <aside className="w-full lg:w-16 flex lg:flex-col flex-row flex-wrap justify-around lg:justify-start gap-2 select-none shrink-0 bg-[var(--bg-surface-subtle)] lg:bg-transparent p-1.5 lg:p-0 border-b lg:border-b-0 border-gray-600 rounded-sm">
      <Link href="/" title="My Computer (Home Grid)" className={getLinkClass('/')}>
        <span className="text-2xl sm:text-3xl filter drop-shadow">🖥️</span>
        <span className={getLabelClass('/')}>Home</span>
      </Link>

      <Link href="/posts" title="Blog Posts File Explorer" className={getLinkClass('/posts')}>
        <span className="text-2xl sm:text-3xl filter drop-shadow">📁</span>
        <span className={getLabelClass('/posts')}>Posts</span>
      </Link>

      <Link href="/about" title="About Me (profile.exe)" className={getLinkClass('/about')}>
        <span className="text-2xl sm:text-3xl filter drop-shadow">👤</span>
        <span className={getLabelClass('/about')}>About</span>
      </Link>

      <Link href="/github" title="GitHub Activity" className={getLinkClass('/github')}>
        <span className="text-2xl sm:text-3xl filter drop-shadow">🌐</span>
        <span className={getLabelClass('/github')}>GitHub</span>
      </Link>

      <div title="Recycle Bin" className="hidden lg:flex flex-col items-center justify-center p-1.5 hover:bg-white/20 rounded text-white text-center focus:bg-[var(--accent-primary)] focus:border focus:border-dashed focus:border-white group cursor-pointer opacity-75 w-12 border border-transparent">
        <span className="text-2xl sm:text-3xl filter drop-shadow">🗑️</span>
        <span className="text-[10px] font-semibold lg:text-white group-hover:underline truncate max-w-full">Trash</span>
      </div>
    </aside>
  )
}
