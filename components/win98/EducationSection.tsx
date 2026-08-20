'use client'

import React from 'react'
import type { EducationData } from '@/lib/i18n/dictionary'

interface EducationSectionProps {
  data: EducationData
}

// ponytail: retro terminal dual-card education & certs showcase matching the CRT/Win98 design language
export function EducationSection({ data }: EducationSectionProps) {
  return (
    <div className="space-y-3 font-mono">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Card: Academic Degree & Progress */}
        <div className="bg-[var(--bg-surface-card)] border-2 border-gray-700 p-4 sm:p-5 shadow-md space-y-4">
          <div className="flex items-start gap-3 border-b border-gray-300 dark:border-gray-800 pb-3">
            <div className="w-9 h-9 border border-emerald-600/40 bg-emerald-500/10 flex items-center justify-center text-xl select-none shrink-0">
              🎓
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-emerald-600 dark:text-emerald-400">
                {data.institution}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
                {data.degree}
              </p>
            </div>
          </div>

          {/* Key-Value Matrix */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-dashed border-gray-200 dark:border-gray-800 py-1">
              <span className="text-[var(--text-muted)]">period</span>
              <span className="font-bold text-[var(--text-main)]">{data.period}</span>
            </div>

            <div className="flex items-center justify-between border-b border-dashed border-gray-200 dark:border-gray-800 py-1">
              <span className="text-[var(--text-muted)]">major</span>
              <span className="font-bold text-[var(--text-main)]">{data.major}</span>
            </div>

            <div className="flex items-center justify-between border-b border-dashed border-gray-200 dark:border-gray-800 py-1">
              <span className="text-[var(--text-muted)]">gpa</span>
              <span className="font-bold text-base text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5">
                {data.gpa}
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-[var(--text-muted)]">status</span>
              <span className="font-bold text-[var(--text-main)]">{data.graduating}</span>
            </div>
          </div>

          {/* Academic Progress Bar */}
          <div className="pt-2 border-t border-gray-300 dark:border-gray-800 space-y-1.5">
            <div className="text-[11px] text-[var(--text-muted)] flex items-center justify-between">
              <span>{data.progressLabel}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{data.progressCurrent}</span>
            </div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-800 border border-gray-400 dark:border-gray-700 overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-emerald-500 via-sky-400 to-[var(--accent-primary)]" />
            </div>
            <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-mono">
              <span>Y1</span>
              <span>Y2</span>
              <span>Y3</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Y4 •</span>
            </div>
          </div>
        </div>

        {/* Right Card: Certifications, Honors & Training */}
        <div className="bg-[var(--bg-surface-card)] border-2 border-gray-700 p-4 sm:p-5 shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-start gap-3 border-b border-gray-300 dark:border-gray-800 pb-3">
              <div className="w-9 h-9 border border-amber-600/40 bg-amber-500/10 flex items-center justify-center text-xl select-none shrink-0">
                🎗️
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-amber-700 dark:text-amber-300">
                  {data.certsTitle}
                </h3>
              </div>
            </div>

            {/* Certs List */}
            <div className="space-y-2 text-xs">
              {data.certs.map((cert, cIdx) => (
                <div
                  key={cIdx}
                  className="flex items-center justify-between border-b border-dashed border-gray-200 dark:border-gray-800 py-1.5 gap-2"
                >
                  <span className="text-[var(--text-main)] flex items-center gap-1.5 font-sans sm:font-mono">
                    <span className="text-amber-500 font-mono">▸</span>
                    <span>{cert.name}</span>
                  </span>
                  <span className="text-[var(--text-muted)] text-right shrink-0 font-mono font-bold">
                    {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cloud Training Note */}
          {data.cloudTrainingNote && (
            <div className="pt-2 border-t border-gray-300 dark:border-gray-800 text-xs font-mono text-amber-700 dark:text-amber-300/90 flex items-center gap-1.5">
              <span>⚡</span>
              <span>{data.cloudTrainingNote}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
