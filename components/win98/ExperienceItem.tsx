'use client'

import React, { useState } from 'react'

interface ExperienceItemProps {
  title: string
  companyLocation: string
  dateRange: string
  bullets?: string[]
  details?: string
  toggleShowText?: string
  toggleHideText?: string
}

// ponytail: experience item component with default open details and optional collapse toggle
export function ExperienceItem({
  title,
  companyLocation,
  dateRange,
  bullets,
  details,
  toggleShowText = '[ + SHOW_DETAILS ]',
  toggleHideText = '[ - HIDE_DETAILS ]',
}: ExperienceItemProps) {
  // Show details by default
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="bg-[var(--bg-surface-card)] border-2 border-gray-700 p-4 sm:p-5 shadow-sm space-y-3 font-mono">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-gray-300 dark:border-gray-700 pb-2.5">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-[var(--text-main)]">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--accent-primary)] font-semibold mt-0.5">
            {companyLocation}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-xs font-bold text-[var(--text-muted)] bg-[var(--bg-surface-subtle)] px-2 py-0.5 border border-gray-500">
            {dateRange}
          </span>
          {(bullets || details) && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-mono font-bold px-2 py-1 border-2 border-t-white border-l-white border-b-black border-r-black bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-subtle)] active:border-black text-[var(--accent-primary)] cursor-pointer select-none transition-colors"
            >
              {isExpanded ? toggleHideText : toggleShowText}
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="pt-1 font-sans text-xs sm:text-sm text-[var(--text-main)] leading-relaxed space-y-2">
          {bullets && bullets.length > 0 ? (
            <ul className="space-y-1.5 list-none pl-1">
              {bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[var(--accent-primary)] font-mono font-bold select-none shrink-0">
                    •
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>{details}</p>
          )}
        </div>
      )}
    </div>
  )
}
