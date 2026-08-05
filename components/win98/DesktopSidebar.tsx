'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function DesktopSidebar() {
  const pathname = usePathname()
  const locale = pathname.startsWith('/vi') ? 'vi' : 'en'

  const homePath = `/${locale}`
  const postsPath = `/${locale}/posts`
  const aboutPath = `/${locale}/about`
  const githubPath = `/${locale}/github`

  // Distinct active state logic for each item
  const isHomeActive = pathname === `/${locale}` || pathname === `/${locale}/`
  const isPostsActive = pathname.startsWith(`/${locale}/posts`)
  const isAboutActive = pathname.startsWith(`/${locale}/about`)
  const isGithubActive = pathname.startsWith(`/${locale}/github`)

  const getItemClass = (isActive: boolean) => {
    return `flex flex-col items-center justify-center p-1 sm:p-1.5 rounded text-white text-center group cursor-pointer w-14 sm:w-16 transition-colors focus:bg-[var(--accent-primary)] focus:border focus:border-dashed focus:border-white ${isActive
        ? 'bg-[var(--accent-primary)] border border-dashed border-white shadow-inner font-bold'
        : 'hover:bg-white/20 border border-transparent'
      }`
  }

  const getLabelClass = (isActive: boolean) => {
    return `text-[10px] leading-tight font-semibold lg:text-white text-center break-words max-w-full px-0.5 mt-0.5 ${isActive ? 'text-white underline' : 'text-[var(--text-main)] group-hover:underline'
      }`
  }

  return (
    <aside className="w-full lg:w-20 flex lg:flex-col flex-row flex-wrap justify-around lg:justify-start gap-1.5 sm:gap-2 select-none shrink-0 bg-[var(--bg-surface-subtle)] lg:bg-transparent p-1.5 lg:p-0 border-b lg:border-b-0 border-gray-600 rounded-sm">
      <Link href={homePath} title="My Computer (Home Grid)" className={getItemClass(isHomeActive)}>
        <span className="text-2xl sm:text-3xl filter drop-shadow">🖥️</span>
        <span className={getLabelClass(isHomeActive)}>
          {locale === 'vi' ? 'Trang chủ' : 'Home'}
        </span>
      </Link>

      <Link href={postsPath} title="Blog Posts File Explorer" className={getItemClass(isPostsActive)}>
        <span className="text-2xl sm:text-3xl filter drop-shadow">📁</span>
        <span className={getLabelClass(isPostsActive)}>
          {locale === 'vi' ? 'Bài viết' : 'Posts'}
        </span>
      </Link>

      <Link href={aboutPath} title="About Me (profile.exe)" className={getItemClass(isAboutActive)}>
        <span className="text-2xl sm:text-3xl filter drop-shadow">👤</span>
        <span className={getLabelClass(isAboutActive)}>
          {locale === 'vi' ? 'Giới thiệu' : 'About'}
        </span>
      </Link>

      <Link href={githubPath} title="GitHub Activity" className={getItemClass(isGithubActive)}>
        <Image
          src="/images/ambient/github_octocat_8bit.png"
          alt="GitHub"
          width={28}
          height={28}
          className="filter drop-shadow"
          style={{ imageRendering: 'pixelated' }}
          unoptimized
        />
        <span className={getLabelClass(isGithubActive)}>
          GitHub
        </span>
      </Link>

      <div
        title="Recycle Bin"
        className="hidden lg:flex flex-col items-center justify-center p-1 sm:p-1.5 hover:bg-white/20 rounded text-white text-center focus:bg-[var(--accent-primary)] focus:border focus:border-dashed focus:border-white group cursor-pointer opacity-75 w-14 sm:w-16 border border-transparent"
      >
        <span className="text-2xl sm:text-3xl filter drop-shadow">🗑️</span>
        <span className="text-[10px] leading-tight font-semibold lg:text-white group-hover:underline text-center break-words max-w-full px-0.5 mt-0.5">
          {locale === 'vi' ? 'Thùng rác' : 'Trash'}
        </span>
      </div>
    </aside>
  )
}
