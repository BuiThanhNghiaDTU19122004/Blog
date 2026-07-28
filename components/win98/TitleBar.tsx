import React from 'react'
import { ThemeToggle } from './ThemeToggle'

interface TitleBarProps {
  title: string
  icon?: string
  active?: boolean
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
}

export function TitleBar({ title, icon = '💻', active = true }: TitleBarProps) {
  return (
    <div className={`title-bar ${!active ? 'inactive' : ''}`}>
      <div className="title-bar-text flex items-center gap-2 truncate font-bold text-sm">
        <span className="text-base select-none">{icon}</span>
        <span className="truncate">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <div className="title-bar-controls select-none">
          <button aria-label="Minimize" title="Minimize" />
          <button aria-label="Maximize" title="Maximize" />
          <button aria-label="Close" title="Close" />
        </div>
      </div>
    </div>
  )
}
