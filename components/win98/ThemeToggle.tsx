'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="px-2 py-0.5 text-xs font-win98 font-bold border border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0] text-black">
        ⚙️ Theme
      </button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Gruvbox Theme`}
      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-win98 font-bold border border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0] hover:bg-[#d4d4d4] text-black active:border-black"
    >
      <span>{isDark ? '☀️' : '🌙'}</span>
      <span>{isDark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
