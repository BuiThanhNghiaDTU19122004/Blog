'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

export function LanguageToggle() {
  const pathname = usePathname()
  const router = useRouter()

  // Extract current locale from pathname segment (/en/... or /vi/...)
  const currentLocale = pathname.startsWith('/vi') ? 'vi' : 'en'
  const nextLocale = currentLocale === 'en' ? 'vi' : 'en'

  const toggleLanguage = () => {
    // Save preference cookie for initial middleware redirects
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`

    // Compute new pathname by replacing the locale prefix
    let newPathname = pathname
    if (pathname.startsWith('/en')) {
      newPathname = pathname.replace(/^\/en/, `/${nextLocale}`)
    } else if (pathname.startsWith('/vi')) {
      newPathname = pathname.replace(/^\/vi/, `/${nextLocale}`)
    } else {
      newPathname = `/${nextLocale}${pathname}`
    }

    router.push(newPathname)
  }

  return (
    <button
      onClick={toggleLanguage}
      title={`Switch language to ${nextLocale.toUpperCase()}`}
      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-win98 font-bold border border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0] hover:bg-[#d4d4d4] text-black active:border-black select-none"
    >
      <span>🌐</span>
      <span>{currentLocale === 'en' ? 'EN' : 'VI'}</span>
    </button>
  )
}
