'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function DesktopSidebar() {
  const pathname = usePathname()
  const locale = pathname.startsWith('/vi') ? 'vi' : 'en'

  const homePath = `/${locale}`
  const postsPath = `/${locale}`
  const aboutPath = `/${locale}/about`
  const githubPath = `/${locale}/github`

  const getLinkClass = (targetPath: string) => {
    const isActive =
      targetPath === homePath
        ? pathname === homePath || pathname === `/${locale}/`
        : pathname.startsWith(targetPath)

    return `flex flex-col items-center justify-center p-1.5 rounded text-white text-center group cursor-pointer w-12 transition-colors focus:bg-[var(--accent-primary)] focus:border focus:border-dashed focus:border-white ${
      isActive
        ? 'bg-[var(--accent-primary)] border border-dashed border-white shadow-inner font-bold'
        : 'hover:bg-white/20 border border-transparent'
    }`
  }

  const getLabelClass = (targetPath: string) => {
    const isActive =
      targetPath === homePath
        ? pathname === homePath || pathname === `/${locale}/`
        : pathname.startsWith(targetPath)

    return `text-[10px] font-semibold lg:text-white truncate max-w-full ${
      isActive ? 'text-white underline' : 'text-[var(--text-main)] group-hover:underline'
    }`
  }

  return (
    <aside className="w-full lg:w-16 flex lg:flex-col flex-row flex-wrap justify-around lg:justify-start gap-2 select-none shrink-0 bg-[var(--bg-surface-subtle)] lg:bg-transparent p-1.5 lg:p-0 border-b lg:border-b-0 border-gray-600 rounded-sm">
      <Link href={homePath} title="My Computer (Home Grid)" className={getLinkClass(homePath)}>
        <span className="text-2xl sm:text-3xl filter drop-shadow">🖥️</span>
        <span className={getLabelClass(homePath)}>{locale === 'vi' ? 'Trang chủ' : 'Home'}</span>
      </Link>

      <Link href={postsPath} title="Blog Posts File Explorer" className={getLinkClass(postsPath)}>
        <span className="text-2xl sm:text-3xl filter drop-shadow">📁</span>
        <span className={getLabelClass(postsPath)}>{locale === 'vi' ? 'Bài viết' : 'Posts'}</span>
      </Link>

      <Link href={aboutPath} title="About Me (profile.exe)" className={getLinkClass(aboutPath)}>
        <span className="text-2xl sm:text-3xl filter drop-shadow">👤</span>
        <span className={getLabelClass(aboutPath)}>{locale === 'vi' ? 'Giới thiệu' : 'About'}</span>
      </Link>

      <Link href={githubPath} title="GitHub Activity" className={getLinkClass(githubPath)}>
        <span className="text-2xl sm:text-3xl filter drop-shadow">🌐</span>
        <span className={getLabelClass(githubPath)}>GitHub</span>
      </Link>

      <div title="Recycle Bin" className="hidden lg:flex flex-col items-center justify-center p-1.5 hover:bg-white/20 rounded text-white text-center focus:bg-[var(--accent-primary)] focus:border focus:border-dashed focus:border-white group cursor-pointer opacity-75 w-12 border border-transparent">
        <span className="text-2xl sm:text-3xl filter drop-shadow">🗑️</span>
        <span className="text-[10px] font-semibold lg:text-white group-hover:underline truncate max-w-full">{locale === 'vi' ? 'Thùng rác' : 'Trash'}</span>
      </div>
    </aside>
  )
}
