'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { PostMeta } from '@/lib/posts'

interface PostCardGridProps {
  posts: PostMeta[]
  locale?: string
}

export function PostCardGrid({ posts, locale = 'en' }: PostCardGridProps) {
  const [postViews, setPostViews] = useState<Record<string, number>>({})

  useEffect(() => {
    let isMounted = true
    fetch('/api/posts/views')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && typeof data === 'object') {
          setPostViews(data)
        }
      })
      .catch((err) => console.error('Error fetching post views:', err))

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => {
          const readTime = Math.max(3, Math.ceil(post.title.length / 8))
          const viewCount = postViews[post.slug] ?? 0

          return (
            <article
              key={post.slug}
              className="bg-[var(--bg-surface-card)] border-2 border-gray-700 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Thumbnail Header Area */}
                <div className="bg-gradient-to-r from-amber-700 via-yellow-700 to-amber-900 p-4 border-b-2 border-gray-700 flex items-center justify-between select-none relative overflow-hidden">
                  <div className="absolute right-[-10px] bottom-[-10px] text-6xl opacity-20 pointer-events-none">
                    ⚡
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📄</span>
                    <span className="text-xs font-mono font-bold text-yellow-200 bg-black/40 px-2 py-0.5 border border-yellow-500/50">
                      TECHNICAL NOTE
                    </span>
                  </div>
                  <span className="text-xs font-mono text-yellow-100">
                    {readTime} {locale === 'vi' ? 'phút đọc' : 'min read'}
                  </span>
                </div>

                {/* Card Content Area */}
                <div className="p-4 sm:p-5 space-y-3">
                  {/* Category Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono bg-[#c0c0c0] text-black font-bold px-1.5 py-0.5 border border-gray-600 uppercase tracking-wider"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Post Title */}
                  <h3 className="text-xl font-extrabold font-body text-[var(--accent-primary)] group-hover:underline leading-snug">
                    <Link href={`/${locale}/posts/${post.slug}`} className="no-underline text-inherit block">
                      {post.title}
                    </Link>
                  </h3>

                  {/* Description Excerpt */}
                  <p className="text-xs sm:text-sm font-body text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-4 pt-0 border-t border-gray-400/40 mt-3 pt-3 flex items-center justify-between text-xs font-win98">
                {/* Author Info */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[var(--accent-primary)] text-black font-bold font-mono text-[10px] flex items-center justify-center border border-black shadow-xs">
                    NB
                  </div>
                  <span className="font-bold text-[var(--text-main)]">Nghia Bui</span>
                </div>

                {/* Publish Date & Views */}
                <div className="flex items-center gap-3 text-gray-500 font-mono text-[11px]">
                  <span>
                    {new Date(post.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span>•</span>
                  <span>👁️ {viewCount.toLocaleString()} {locale === 'vi' ? 'lượt xem' : 'views'}</span>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
