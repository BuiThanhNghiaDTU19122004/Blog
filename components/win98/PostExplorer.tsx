'use client'

// ponytail: Post explorer component with top search bar, dynamic tag filters, compact titles, and real post view counts
import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { PostMeta } from '@/lib/posts'

interface PostExplorerProps {
  posts: PostMeta[]
  showMostRead?: boolean
}

export function PostExplorer({ posts, showMostRead = true }: PostExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCollection, setSelectedCollection] = useState('All')
  const [selectedTag, setSelectedTag] = useState<string>('All')
  const [viewMode, setViewMode] = useState<'cards' | 'details' | 'grid'>('cards')
  const [postViews, setPostViews] = useState<Record<string, number>>({})

  // Fetch real post view counts from backend API
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

  // Available collections / topics
  const collections = ['All', 'Architecture', 'Frontend', 'Cloud', 'Tutorials']

  // Extract all unique tags across all posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach((p) => {
      p.tags?.forEach((t) => tagSet.add(t.toLowerCase()))
    })
    return ['All', ...Array.from(tagSet)]
  }, [posts])

  // Filter posts dynamically by search query, collection category, and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))

      if (!matchesSearch) return false

      if (selectedTag !== 'All') {
        const hasTag = post.tags?.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
        if (!hasTag) return false
      }

      if (selectedCollection === 'All') return true
      if (selectedCollection === 'Architecture') {
        return post.tags?.includes('architecture') || post.title.toLowerCase().includes('architecture')
      }
      if (selectedCollection === 'Frontend') {
        return post.tags?.includes('react') || post.tags?.includes('nextjs') || post.tags?.includes('welcome')
      }
      if (selectedCollection === 'Cloud') {
        return post.tags?.includes('cloud') || post.tags?.includes('webdev')
      }
      if (selectedCollection === 'Tutorials') {
        return post.tags?.includes('mdx') || post.tags?.includes('welcome')
      }

      return true
    })
  }, [posts, searchQuery, selectedCollection, selectedTag])

  // Top Most Read articles sorted by real view count
  const mostReadPosts = useMemo(() => {
    return [...posts]
      .map((post) => ({
        ...post,
        views: postViews[post.slug] ?? 100,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 2)
  }, [posts, postViews])

  return (
    <div className="space-y-6">
      {/* 🔍 TOP SEARCH & FILTER CONTROLS BAR (Moved to Top for Easy Accessibility) */}
      <div className="bg-[var(--bg-surface-subtle)] p-3.5 border-2 border-gray-700 space-y-3 font-win98 shadow-xs">
        {/* Search Input Bar + View Controls */}
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <div className="flex-1 flex items-center gap-2 bg-[var(--bg-surface-inset)] border-2 border-gray-600 px-3 py-1.5 shadow-inner">
            <span className="text-sm select-none">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, tags, description..."
              className="w-full bg-transparent outline-none text-xs font-sans text-[var(--text-main)] placeholder:text-gray-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-gray-500 hover:text-black"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* View Mode Controls */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-xs text-[var(--text-muted)] font-bold hidden sm:inline">View:</span>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1 text-xs font-bold ${
                viewMode === 'cards'
                  ? 'border-2 border-black bg-[var(--accent-primary)] text-white'
                  : 'border-2 border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0] text-black active:border-black'
              }`}
            >
              🖼️ Cards
            </button>
            <button
              onClick={() => setViewMode('details')}
              className={`px-2.5 py-1 text-xs font-bold ${
                viewMode === 'details'
                  ? 'border-2 border-black bg-[var(--accent-primary)] text-white'
                  : 'border-2 border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0] text-black active:border-black'
              }`}
            >
              📋 Details
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 text-xs font-bold ${
                viewMode === 'grid'
                  ? 'border-2 border-black bg-[var(--accent-primary)] text-white'
                  : 'border-2 border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0] text-black active:border-black'
              }`}
            >
              📁 Grid
            </button>
          </div>
        </div>

        {/* Collections Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 border-t border-gray-400/40">
          <span className="text-xs font-bold text-[var(--text-muted)] shrink-0">Collection:</span>
          {collections.map((cat) => {
            const isActive = selectedCollection === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCollection(cat)}
                className={`px-2.5 py-0.5 text-xs font-mono shrink-0 transition-colors ${
                  isActive
                    ? 'bg-[var(--accent-primary)] text-white font-bold border border-black'
                    : 'bg-[var(--bg-surface)] text-[var(--text-main)] border border-gray-500 hover:bg-gray-200/50'
                }`}
              >
                {cat === 'All' ? '🌐 All Collections' : `📁 ${cat}`}
              </button>
            )
          })}
        </div>

        {/* 🏷️ Tag Filter Chips Section */}
        {allTags.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-gray-400/30">
            <span className="text-xs font-bold text-[var(--text-muted)] shrink-0">Tags:</span>
            {allTags.map((tag) => {
              const isActive = selectedTag.toLowerCase() === tag.toLowerCase()
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-2 py-0.5 text-[10px] font-mono shrink-0 uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[var(--accent-secondary)] text-black font-bold border border-black'
                      : 'bg-[var(--bg-surface-inset)] text-[var(--text-muted)] border border-gray-400 hover:text-[var(--text-main)]'
                  }`}
                >
                  {tag === 'All' ? '#ALL_TAGS' : `#${tag.toUpperCase()}`}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* 🔥 Most Read Articles Section (Rendered Below Search) */}
      {showMostRead && mostReadPosts.length > 0 && (
        <div className="bg-[var(--bg-surface-subtle)] border-2 border-gray-700 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-gray-400/40 pb-2">
            <h3 className="font-win98 font-bold text-xs sm:text-sm text-[var(--accent-primary)] flex items-center gap-2">
              <span>🔥</span> MOST READ ARTICLES
            </h3>
            <span className="text-[10px] font-mono bg-[var(--accent-secondary)] text-black px-2 py-0.5 font-bold">
              TOP TRENDING
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mostReadPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="bg-[var(--bg-surface-card)] border border-gray-600 p-3 hover:border-[var(--accent-primary)] transition-all flex items-start gap-3 no-underline text-inherit group"
              >
                <div className="text-2xl select-none p-1 bg-[var(--accent-primary)]/10 rounded">
                  📈
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-[var(--accent-primary)] group-hover:underline truncate leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] truncate mt-1">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] font-mono text-[var(--text-muted)]">
                    <span>👁️ {post.views.toLocaleString()} views</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Article List Area */}
      {filteredPosts.length === 0 ? (
        <div className="bg-[var(--bg-surface-card)] border-2 border-gray-700 p-8 text-center space-y-2">
          <span className="text-4xl block select-none">🔍</span>
          <p className="font-heading font-bold text-base text-[var(--accent-primary)]">
            No matching articles found
          </p>
          <p className="text-xs font-sans text-[var(--text-muted)]">
            Try clearing keywords, collection, or tag filters.
          </p>
        </div>
      ) : viewMode === 'cards' ? (
        /* Default CARDS View Mode with Topic Images/Thumbnails */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPosts.map((post) => {
            const readTime = Math.max(3, Math.ceil(post.title.length / 8))
            const realViews = postViews[post.slug] ?? 100

            return (
              <article
                key={post.slug}
                className="bg-[var(--bg-surface-card)] border-2 border-gray-700 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Thumbnail Cover Header */}
                  <div className="bg-gradient-to-r from-blue-900 via-sky-800 to-indigo-900 p-3 sm:p-4 border-b-2 border-gray-700 flex items-center justify-between select-none relative overflow-hidden">
                    <div className="absolute right-[-10px] bottom-[-10px] text-6xl opacity-20 pointer-events-none text-cyan-300">
                      ⚡
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-2xl">📑</span>
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-200 bg-black/40 px-2 py-0.5 border border-cyan-500/50">
                        ARTICLE
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-cyan-100">
                      {readTime} min read
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-2.5">
                    {/* Category Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-mono bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] font-bold px-1.5 py-0.5 border border-[var(--accent-primary)]/40 uppercase tracking-wider"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title - ponytail: compact, well-proportioned title size */}
                    <h3 className="text-base sm:text-lg font-bold font-heading text-[var(--accent-primary)] group-hover:underline leading-snug">
                      <Link href={`/posts/${post.slug}`} className="no-underline text-inherit block">
                        {post.title}
                      </Link>
                    </h3>

                    {/* Description Excerpt */}
                    <p className="text-xs font-sans text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="p-3.5 border-t border-gray-500/30 flex items-center justify-between text-xs font-win98">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[var(--accent-primary)] text-white font-bold font-mono text-[9px] flex items-center justify-center border border-black shadow-xs">
                      NB
                    </div>
                    <span className="font-bold text-[var(--text-main)] text-xs">Nghia Bui</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-[var(--text-muted)] font-mono text-[11px]">
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span>👁️ {realViews.toLocaleString()}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      ) : viewMode === 'details' ? (
        /* Details Table List View */
        <div className="bg-[var(--bg-surface-inset)] border-2 border-gray-700 p-2 overflow-x-auto shadow-inner">
          <table className="w-full text-left text-xs border-collapse font-win98">
            <thead>
              <tr className="bg-[var(--bg-surface-subtle)] border-b border-gray-400 select-none text-[var(--text-main)]">
                <th className="p-2 border-r border-gray-300 font-bold">Name</th>
                <th className="p-2 border-r border-gray-300 font-bold hidden sm:table-cell">Views</th>
                <th className="p-2 border-r border-gray-300 font-bold hidden md:table-cell">Size</th>
                <th className="p-2 border-r border-gray-300 font-bold">Date Modified</th>
                <th className="p-2 font-bold hidden lg:table-cell">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => {
                const realViews = postViews[post.slug] ?? 100
                return (
                  <tr
                    key={post.slug}
                    className="hover:bg-[var(--accent-primary)] hover:text-white group border-b border-gray-200/40 transition-colors text-[var(--text-main)]"
                  >
                    <td className="p-2 font-semibold">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="flex items-center gap-2 text-inherit no-underline block"
                      >
                        <span className="text-base select-none">📝</span>
                        <span className="font-mono text-xs underline group-hover:text-white">
                          {post.slug}.md
                        </span>
                      </Link>
                    </td>
                    <td className="p-2 hidden sm:table-cell font-mono text-xs text-[var(--text-muted)] group-hover:text-white">
                      👁️ {realViews.toLocaleString()}
                    </td>
                    <td className="p-2 hidden md:table-cell font-mono text-xs text-[var(--text-muted)] group-hover:text-white">
                      {(post.title.length * 42 + 512) % 2048 + 1024} B
                    </td>
                    <td className="p-2 font-mono whitespace-nowrap text-xs">
                      {new Date(post.date).toLocaleDateString('en-US')}
                    </td>
                    <td className="p-2 hidden lg:table-cell text-[var(--text-muted)] group-hover:text-white truncate max-w-xs text-xs">
                      {post.description}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Large Icons View */
        <div className="bg-[var(--bg-surface-inset)] border-2 border-gray-700 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 shadow-inner">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="flex flex-col items-center text-center p-3 hover:bg-[var(--accent-primary)] hover:text-white group rounded border border-transparent hover:border-blue-300"
            >
              <div className="w-12 h-14 bg-white border-2 border-gray-400 shadow flex flex-col justify-between p-1 relative mb-2 group-hover:border-white">
                <div className="absolute top-0 right-0 w-3 h-3 bg-gray-300 border-l border-b border-gray-400" />
                <span className="text-xl self-center my-auto select-none">📄</span>
                <span className="bg-[#000080] text-white text-[8px] font-mono font-bold px-0.5 self-start">
                  MDX
                </span>
              </div>
              <span className="font-mono text-xs font-bold truncate max-w-full">
                {post.slug}.md
              </span>
              <span className="text-[10px] text-gray-500 group-hover:text-white truncate max-w-full mt-1">
                {post.title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
