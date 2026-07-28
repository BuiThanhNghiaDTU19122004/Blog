// ponytail: static nostalgic visitor counter component
import React from 'react'

export function VisitorCounter({ count = 4289 }: { count?: number }) {
  const formattedCount = String(count).padStart(6, '0')

  return (
    <div className="inline-flex items-center gap-1 bg-black px-2 py-0.5 border border-gray-600 rounded-xs select-none">
      <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider hidden sm:inline">VISITORS:</span>
      <div className="flex gap-[2px]">
        {formattedCount.split('').map((digit, index) => (
          <span
            key={index}
            className="bg-[#111111] text-[#00ff66] font-mono text-xs font-bold px-1 py-[1px] border border-[#005500]"
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  )
}
