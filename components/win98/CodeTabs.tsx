'use client'

import React, { useState, type ReactNode, type ReactElement } from 'react'

export interface TabProps {
  label: string
  children: ReactNode
}

export function Tab({ children }: TabProps) {
  return <div className="win98-tab-pane">{children}</div>
}

export interface TabsProps {
  children: ReactNode
}

export function Tabs({ children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0)

  // Filter valid Tab child components
  const tabList = React.Children.toArray(children).filter(
    (child): child is ReactElement<TabProps> =>
      React.isValidElement(child)
  )

  if (tabList.length === 0) {
    return null
  }

  return (
    <div className="my-6 border-2 border-[var(--border-dark)] bg-[var(--bg-surface-subtle)] shadow-md font-sans">
      {/* Win98 Styled Tab Navigation Bar */}
      <div className="flex border-b-2 border-[var(--border-dark)] bg-[var(--bg-surface-subtle)] p-1 gap-1 overflow-x-auto select-none">
        {tabList.map((tab, index) => {
          const isActive = index === activeTab
          const label = tab.props.label || `Option ${index + 1}`

          return (
            <button
              key={index}
              type="button"
              onClick={() => setActiveTab(index)}
              className={`px-3 py-1.5 text-xs font-win98 font-bold border-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'border-t-white border-l-white border-b-transparent border-r-black bg-[var(--bg-surface-inset)] text-[var(--accent-primary)] shadow-sm -mb-[3px] z-10'
                  : 'border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0] dark:bg-[#3c3836] text-[var(--text-main)] hover:bg-[#d4d4d4] dark:hover:bg-[#504945]'
              }`}
            >
              <span>{isActive ? '💻' : '📄'}</span>
              <span>{label}</span>
            </button>
          )
        })}
      </div>

      {/* Active Tab Panel Content */}
      <div className="p-4 bg-[var(--bg-surface-inset)] text-[var(--text-main)] font-sans leading-relaxed">
        {tabList[activeTab]}
      </div>
    </div>
  )
}
