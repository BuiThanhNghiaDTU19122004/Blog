'use client'

import React, { useEffect, useState } from 'react'

export interface HeadingItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: HeadingItem[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!headings.length) return

    const handleScroll = () => {
      const headingElements = headings
        .map((h) => document.getElementById(h.id))
        .filter((el): el is HTMLElement => el !== null)

      const scrollPosition = window.scrollY + 100

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i]
        if (el.offsetTop <= scrollPosition) {
          setActiveId(el.id)
          break
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings])

  if (!headings.length) return null

  return (
    <nav aria-label="Table of contents" className="bg-[var(--bg-surface-subtle)] border-2 border-gray-600 p-2 text-xs font-win98 select-none shadow-sm sticky top-4">
      {/* Sidebar Header */}
      <div className="bg-[var(--accent-primary)] text-black px-2 py-1 font-bold flex items-center justify-between mb-2">
        <span className="flex items-center gap-1">
          <span>📌</span> Table of Contents
        </span>
        <span className="text-[10px] opacity-75">TOC.dll</span>
      </div>

      {/* Heading Items List */}
      <div className="bg-[var(--bg-surface-card)] border-2 border-gray-700 p-2 max-h-[70vh] overflow-y-auto shadow-inner space-y-1">
        {headings.map((heading) => {
          const isActive = activeId === heading.id
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                const target = document.getElementById(heading.id)
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className={`block truncate py-0.5 px-1.5 no-underline transition-colors font-body ${
                heading.level === 3 ? 'pl-4 text-[11px]' : 'font-semibold text-xs'
              } ${
                isActive
                  ? 'bg-[var(--accent-primary)] text-black font-extrabold'
                  : 'text-[var(--text-main)] hover:bg-[var(--accent-secondary)] hover:text-black'
              }`}
            >
              <span className="mr-1 opacity-70">{heading.level === 3 ? '└─' : '▸'}</span>
              <span>{heading.text}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
