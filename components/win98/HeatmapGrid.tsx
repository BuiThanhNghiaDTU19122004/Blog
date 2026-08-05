'use client'

// REDESIGN: Animated heatmap grid — client component for CSS animations.
// ponytail: one file, no extra deps, all animation via CSS classes.

import React from 'react'
import type { ContributionLevel, ContributionWeek } from '@/lib/github'
import './HeatmapAnimations.css'

interface HeatmapGridProps {
  weeks: ContributionWeek[]
  totalContributions: number
  isMock: boolean
}

/* ponytail: REDESIGN item 5 — cyber-blue color ramp replacing GitHub green.
   Maps contribution level → CSS class with the blue palette. */
function getCellClass(level: ContributionLevel): string {
  switch (level) {
    case 'NONE':             return 'hm-cell hm-none'
    case 'FIRST_QUARTILE':   return 'hm-cell hm-q1'
    case 'SECOND_QUARTILE':  return 'hm-cell hm-q2'
    case 'THIRD_QUARTILE':   return 'hm-cell hm-q3'
    case 'FOURTH_QUARTILE':  return 'hm-cell hm-q4'  // hot — gets glow pulse
    default:                 return 'hm-cell hm-none'
  }
}

export function HeatmapGrid({ weeks, totalContributions, isMock }: HeatmapGridProps) {
  // Flatten to get total cell count for stagger calculation
  let cellIndex = 0

  return (
    <div className="w-full space-y-2">
      {isMock && (
        <div className="text-xs text-red-600 dark:text-red-400 font-bold mb-2 text-center bg-red-100 dark:bg-red-900/30 p-2 border border-red-300">
          ⚠️ GITHUB_TOKEN not found in .env.local - Showing Mock Data
        </div>
      )}

      <div className="flex justify-between items-end mb-2 text-xs font-mono text-[var(--text-muted)] px-1">
        <span>{totalContributions.toLocaleString()} contributions in the last year</span>
      </div>

      {/* REDESIGN item 2: scanline sweep overlay via ::after pseudo on this container */}
      <div className="hm-grid-wrap bg-[var(--bg-surface-inset)] p-4 border border-[var(--border-shadow)] rounded-sm overflow-x-auto relative">
        <div className="flex gap-[3px] min-w-max">
          {weeks.map((week, wIndex) => (
            <div key={wIndex} className="flex flex-col gap-[3px]">
              {week.contributionDays.map((day, dIndex) => {
                const idx = cellIndex++
                return (
                  <div
                    key={dIndex}
                    className={getCellClass(day.contributionLevel)}
                    /* REDESIGN item 1: stagger delay — each cell fades in left→right */
                    style={{ animationDelay: `${idx * 4}ms` }}
                    data-count={day.contributionCount}
                    data-date={day.date}
                    title={`${day.contributionCount} contributions on ${day.date}`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* REDESIGN item 5: legend with cyber-blue ramp */}
      <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-[var(--text-muted)] mt-2 pr-1">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="hm-legend hm-none" />
          <div className="hm-legend hm-q1" />
          <div className="hm-legend hm-q2" />
          <div className="hm-legend hm-q3" />
          <div className="hm-legend hm-q4" />
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
