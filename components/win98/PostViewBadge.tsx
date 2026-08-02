'use client'

// ponytail: client component for post view tracking with sessionStorage anti-F5 refresh deduplication
import React, { useEffect, useState } from 'react'

export function PostViewBadge({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    let isMounted = true
    const sessionKey = `viewed_post_${slug}`
    const alreadyViewed = typeof window !== 'undefined' && sessionStorage.getItem(sessionKey)

    const method = alreadyViewed ? 'GET' : 'POST'

    fetch(`/api/posts/${slug}/views`, { method })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && typeof data.views === 'number') {
          setViews(data.views)
          if (!alreadyViewed && typeof window !== 'undefined') {
            sessionStorage.setItem(sessionKey, '1')
          }
        }
      })
      .catch((err) => {
        console.error('Error fetching post views:', err)
      })

    return () => {
      isMounted = false
    }
  }, [slug])

  return (
    <span className="inline-flex items-center gap-1 text-xs font-mono bg-[var(--bg-surface-subtle)] text-[var(--text-main)] border border-[var(--border-dark)] px-2 py-0.5 shadow-inner">
      <span>👁️</span>
      <span>{views !== null ? `${views.toLocaleString()} views` : 'Loading...'}</span>
    </span>
  )
}
