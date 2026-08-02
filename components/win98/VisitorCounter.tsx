'use client'

import React, { useEffect, useState } from 'react'

export function VisitorCounter({ count: initialCount }: { count?: number }) {
  const [visitorCount, setVisitorCount] = useState<number | null>(initialCount ?? null)
  const [loading, setLoading] = useState<boolean>(initialCount === undefined)

  useEffect(() => {
    let isMounted = true
    fetch('/api/visitors')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch visitor count')
        return res.json()
      })
      .then((data) => {
        if (isMounted && typeof data.count === 'number') {
          setVisitorCount(data.count)
          setLoading(false)
        }
      })
      .catch((err) => {
        console.error('Error fetching visitor counter:', err)
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const displayCount = visitorCount !== null ? String(visitorCount).padStart(6, '0') : '------'

  return (
    <div className="inline-flex items-center gap-1 bg-black px-2 py-0.5 border border-gray-600 rounded-xs select-none">
      <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider hidden sm:inline">
        VISITORS:
      </span>
      <div className="flex gap-[2px]">
        {displayCount.split('').map((digit, index) => (
          <span
            key={index}
            className={`bg-[#111111] font-mono text-xs font-bold px-1 py-[1px] border border-[#005500] ${
              loading && visitorCount === null ? 'text-gray-500 animate-pulse' : 'text-[#00ff66]'
            }`}
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  )
}
