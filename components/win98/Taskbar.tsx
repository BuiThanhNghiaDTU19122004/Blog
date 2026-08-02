'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Taskbar() {
  const pathname = usePathname()
  const [time, setTime] = useState<string>('')
  const [startOpen, setStartOpen] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* Start Menu Popup */}
      {startOpen && (
        <div
          className="fixed bottom-10 left-1 z-[10000] w-64 window shadow-2xl font-win98"
          onClick={() => setStartOpen(false)}
        >
          <div className="flex bg-[var(--bg-surface-subtle)] p-1">
            <div className="bg-[var(--accent-primary)] text-black font-bold p-2 writing-mode-vertical flex items-end justify-center select-none tracking-widest text-sm w-8">
              <span className="rotate-180 inline-block [writing-mode:vertical-lr]">Windows98</span>
            </div>
            <div className="flex-1 py-1 px-2 space-y-1">
              <Link
                href="/"
                className="flex items-center gap-2 p-1.5 hover:bg-[var(--accent-primary)] hover:text-black rounded-none cursor-pointer text-[var(--text-main)] font-semibold"
              >
                <span>🖥️</span>
                <span className="text-sm">Home (Card Grid)</span>
              </Link>
              <Link
                href="/posts"
                className="flex items-center gap-2 p-1.5 hover:bg-[var(--accent-primary)] hover:text-black rounded-none cursor-pointer text-[var(--text-main)] font-semibold"
              >
                <span>📁</span>
                <span className="text-sm">Posts (File Explorer)</span>
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-2 p-1.5 hover:bg-[var(--accent-primary)] hover:text-black rounded-none cursor-pointer text-[var(--text-main)] font-semibold"
              >
                <span>👤</span>
                <span className="text-sm">About Me (profile.exe)</span>
              </Link>
              <div className="border-t border-gray-400 my-1" />
              <a
                href="https://github.com/BuiThanhNghiaDTU19122004"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-1.5 hover:bg-[var(--accent-primary)] hover:text-black rounded-none cursor-pointer text-[var(--text-main)]"
              >
                <span>🐙</span>
                <span className="text-sm">GitHub Profile</span>
              </a>
              <div className="border-t border-gray-400 my-1" />
              <div className="p-1.5 text-xs text-gray-500 font-mono">
                Next.js App Router Blog <br />
                Gruvbox / Win98 Edition v3.0
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Taskbar Bar */}
      <footer className="fixed bottom-0 left-0 right-0 h-10 bg-[var(--bg-surface-subtle)] border-t-2 border-white shadow-md z-[9999] flex items-center justify-between px-1 select-none font-win98">
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          {/* Start Button */}
          <button
            onClick={() => setStartOpen(!startOpen)}
            className={`flex items-center gap-1.5 px-3 py-1 font-bold text-sm h-7 border-2 ${
              startOpen
                ? 'border-gray-800 bg-[#b5b5b5] shadow-inner'
                : 'border-t-white border-l-white border-b-black border-r-black bg-[var(--bg-surface)] text-[var(--text-main)]'
            }`}
          >
            <span className="text-base">🪟</span>
            <span>Start</span>
          </button>

          <div className="h-6 w-[2px] bg-gray-400 border-r border-white my-auto" />

          {/* Active Window Button / Navigation Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto">
            <Link
              href="/"
              className={`flex items-center gap-1.5 px-3 py-0.5 text-xs h-7 max-w-[150px] truncate border-2 ${
                pathname === '/'
                  ? 'border-black bg-[var(--accent-primary)] text-black font-bold'
                  : 'border-t-white border-l-white border-b-black border-r-black bg-[var(--bg-surface)] text-[var(--text-main)]'
              }`}
            >
              <span>🖥️</span>
              <span className="truncate">Home</span>
            </Link>

            <Link
              href="/posts"
              className={`flex items-center gap-1.5 px-3 py-0.5 text-xs h-7 max-w-[150px] truncate border-2 ${
                pathname === '/posts'
                  ? 'border-black bg-[var(--accent-primary)] text-black font-bold'
                  : 'border-t-white border-l-white border-b-black border-r-black bg-[var(--bg-surface)] text-[var(--text-main)]'
              }`}
            >
              <span>📁</span>
              <span className="truncate">Explorer</span>
            </Link>

            {pathname === '/about' && (
              <div className="flex items-center gap-1.5 px-3 py-0.5 text-xs h-7 max-w-[150px] truncate border-2 border-black bg-[var(--accent-primary)] text-black font-bold">
                <span>👤</span>
                <span className="truncate">profile.exe</span>
              </div>
            )}

            {pathname.startsWith('/posts/') && (
              <div className="flex items-center gap-1.5 px-3 py-0.5 text-xs h-7 max-w-[180px] truncate border-2 border-black bg-[var(--accent-primary)] text-black font-bold">
                <span>📄</span>
                <span className="truncate">{pathname.replace('/posts/', '')}.md</span>
              </div>
            )}
          </div>
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-400">
          <div className="border-2 border-gray-600 border-t-gray-800 border-l-gray-800 bg-[var(--bg-surface)] px-2 py-0.5 text-xs font-mono font-semibold shadow-inner text-[var(--text-main)]">
            {time || '12:00 PM'}
          </div>
        </div>
      </footer>
    </>
  )
}
