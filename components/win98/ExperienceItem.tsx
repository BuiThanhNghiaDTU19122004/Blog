'use client'

import { useState } from 'react'

interface ExperienceItemProps {
  title: string
  companyLocation: string
  dateRange: string
  details: string
}

export function ExperienceItem({
  title,
  companyLocation,
  dateRange,
  details,
}: ExperienceItemProps) {
  // ponytail: simple state toggle for experience detail expansion
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-[var(--bg-surface-card)] border-2 border-gray-700 p-4 shadow-sm space-y-2 font-mono">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-gray-300 dark:border-gray-700 pb-2">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-[var(--text-main)]">
            {title}
          </h3>
          <p className="text-xs text-[var(--accent-primary)] font-semibold mt-0.5">
            {companyLocation}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-surface-subtle)] px-2 py-0.5 border border-gray-500">
            {dateRange}
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-mono font-bold px-2 py-1 border-2 border-t-white border-l-white border-b-black border-r-black bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-subtle)] active:border-black text-[var(--accent-primary)] cursor-pointer select-none"
          >
            {isExpanded ? '[ HIDE_DETAILS ]' : '[ SHOW_DETAILS ]'}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="pt-2 font-sans text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
          {details}
        </div>
      )}
    </div>
  )
}
