import React from 'react'

interface StatusBarProps {
  statusText?: string
  badgeText?: string
}

export function StatusBar({
  statusText = 'Ready',
  badgeText = 'Best viewed at 1024x768',
}: StatusBarProps) {
  return (
    <div className="status-bar font-win98 text-xs select-none mt-2">
      <p className="status-bar-field truncate flex-1">{statusText}</p>
      <p className="status-bar-field font-semibold text-gray-700 hidden sm:block">{badgeText}</p>
      <p className="status-bar-field hidden md:block">Local Intranet</p>
    </div>
  )
}
