import React from 'react'

interface ProfileHeaderProps {
  name: string
  nickname: string
  role: string
  status: string
}

// ponytail: lightweight, CSS-powered profile header with ambient glow & shimmer
export function ProfileHeader({
  name,
  nickname,
  role,
  status,
}: ProfileHeaderProps) {
  return (
    <div className="profile-card-premium flex flex-wrap items-center justify-between gap-4 border-2 border-gray-400 dark:border-gray-700 bg-[var(--bg-surface-subtle)] p-4 sm:p-5 shadow-sm rounded-xs">
      <div className="flex items-center gap-3.5 sm:gap-4">
        {/* Avatar with subtle radial pulse glow behind it */}
        <div className="relative flex items-center justify-center select-none w-10 h-10 sm:w-11 sm:h-11">
          <div className="avatar-glow" aria-hidden="true" />
          <span className="relative z-10 text-3xl sm:text-4xl">💻</span>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight flex items-baseline gap-2 flex-wrap">
            <span className="profile-shimmer-text">{name}</span>
            <span className="text-sm sm:text-base text-[var(--accent-secondary)] font-normal">
              {nickname}
            </span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-[var(--text-muted)] mt-0.5">
            {role}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 font-mono text-xs">
        <span className="bg-[var(--bg-surface)] border border-gray-500 px-2.5 py-1 shadow-inner text-[var(--text-main)] font-bold tracking-wider">
          {status}
        </span>
      </div>
    </div>
  )
}
