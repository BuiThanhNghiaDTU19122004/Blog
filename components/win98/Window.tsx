import React from 'react'
import { TitleBar } from './TitleBar'
import { StatusBar } from './StatusBar'

interface WindowProps {
  title: string
  icon?: string
  address?: string
  children: React.ReactNode
  statusText?: string
  className?: string
}

export function Window({
  title,
  icon = '💻',
  address,
  children,
  statusText = 'Ready',
  className = '',
}: WindowProps) {
  return (
    <div className={`window window-responsive shadow-2xl ${className}`}>
      <TitleBar title={title} icon={icon} />

      {/* Optional Explorer Menu & Address Bar */}
      {address && (
        <div className="bg-[#c0c0c0] px-2 py-1 border-b border-gray-400 text-xs font-win98 select-none flex flex-wrap items-center gap-2">
          <div className="flex gap-3 text-gray-800 pr-2 border-r border-gray-400">
            <span className="hover:bg-blue-900 hover:text-white px-1">File</span>
            <span className="hover:bg-blue-900 hover:text-white px-1">Edit</span>
            <span className="hover:bg-blue-900 hover:text-white px-1">View</span>
            <span className="hover:bg-blue-900 hover:text-white px-1">Help</span>
          </div>
          <div className="flex-1 flex items-center gap-1 min-w-[200px]">
            <span className="text-gray-600 font-bold">Address:</span>
            <div className="flex-1 bg-white border-2 border-gray-600 px-2 py-0.5 text-black font-mono text-xs truncate shadow-inner">
              {address}
            </div>
          </div>
        </div>
      )}

      {/* Main Window Content */}
      <div className="window-body p-3 sm:p-5 overflow-x-auto bg-[#c0c0c0]">
        {children}
      </div>

      <StatusBar statusText={statusText} />
    </div>
  )
}
