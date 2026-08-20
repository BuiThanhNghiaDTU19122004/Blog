'use client'

import React from 'react'
import type { TechCategory } from '@/lib/i18n/dictionary'

interface TechStackGridProps {
  categories: TechCategory[]
}

const themeStyles = {
  cloud: {
    border: 'border-amber-600/40 dark:border-amber-500/30',
    headerText: 'text-amber-700 dark:text-amber-300',
    tagText: 'text-amber-800/80 dark:text-amber-400/80',
    badgeBorder: 'border-amber-600/30 dark:border-amber-500/30 hover:border-amber-500',
    dot: 'bg-amber-500',
  },
  devops: {
    border: 'border-emerald-600/40 dark:border-emerald-500/30',
    headerText: 'text-emerald-700 dark:text-emerald-300',
    tagText: 'text-emerald-800/80 dark:text-emerald-400/80',
    badgeBorder: 'border-emerald-600/30 dark:border-emerald-500/30 hover:border-emerald-500',
    dot: 'bg-emerald-500',
  },
  observability: {
    border: 'border-sky-600/40 dark:border-sky-500/30',
    headerText: 'text-sky-700 dark:text-sky-300',
    tagText: 'text-sky-800/80 dark:text-sky-400/80',
    badgeBorder: 'border-sky-600/30 dark:border-sky-500/30 hover:border-sky-500',
    dot: 'bg-sky-500',
  },
  ai: {
    border: 'border-purple-600/40 dark:border-purple-500/30',
    headerText: 'text-purple-700 dark:text-purple-300',
    tagText: 'text-purple-800/80 dark:text-purple-400/80',
    badgeBorder: 'border-purple-600/30 dark:border-purple-500/30 hover:border-purple-500',
    dot: 'bg-purple-500',
  },
}

// ponytail: clean categorized tech stack grid with WCAG AA compliant muted palette
export function TechStackGrid({ categories }: TechStackGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
      {categories.map((cat) => {
        const theme = themeStyles[cat.theme] || themeStyles.cloud
        const cleanTitle = cat.comment.replace(/^\/\/\s*/, '')

        return (
          <div
            key={cat.id}
            className={`bg-[var(--bg-surface-card)] border-2 ${theme.border} p-4 sm:p-5 shadow-sm space-y-3.5 transition-all duration-200 hover:-translate-y-0.5`}
          >
            {/* Header */}
            <div className="border-b border-gray-300 dark:border-gray-800 pb-2">
              <h3 className={`font-bold text-sm sm:text-base ${theme.headerText}`}>
                {cleanTitle}
              </h3>
            </div>

            {/* Badges container */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className={`inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-1 bg-[var(--bg-surface-subtle)] ${theme.badgeBorder} border text-[var(--text-main)] shadow-2xs transition-colors`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} aria-hidden="true" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
