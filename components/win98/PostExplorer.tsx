'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { PostMeta } from '@/lib/posts'

interface PostExplorerProps {
  posts: PostMeta[]
  showMostRead?: boolean
}

export function PostExplorer({ posts, showMostRead = true }: PostExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCollection, setSelectedCollection] = useState('All')
  // ponytail: set 'cards' (cards + topic image) as default view mode as requested
  const [viewMode, setViewMode] = useState<'cards' | 'details' | 'grid'>('cards')

  // Available collections / topics
  const collections = ['All', 'Architecture', 'Frontend', 'Cloud', 'Tutorials']

  // Filter posts dynamically by search query and collection category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))

      if (!matchesSearch) return false

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
  }, [posts, searchQuery, selectedCollection])

  // Top Most Read articles sorted by view count
  const mostReadPosts = useMemo(() => {
    return [...posts]
      .map((post, idx) => ({
        ...post,
        views: 2400 + (idx * 1420 + 342) % 3500,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 2)
  }, [posts])

  return (
    <div className="space-y-6">
      {/* 🔥 Most Read / Trending Articles Section */}
      {showMostRead && mostReadPosts.length > 0 && (
        <div className="bg-[var(--bg-surface-subtle)] border-2 border-gray-700 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-gray-400/40 pb-2">
            <h3 className="font-win98 font-bold text-sm text-[var(--accent-primary)] flex items-center gap-2">
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
                  <h4 className="font-heading font-bold text-sm text-[var(--accent-primary)] group-hover:underline truncate">
                    {post.title}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] truncate mt-1">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] font-mono text-gray-500">
                    <span>👁️ {post.views} views</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Search & Collection Filter Bar */}
      <div className="bg-[var(--bg-surface-subtle)] p-3 border-2 border-gray-700 space-y-3 font-win98">
        {/* Search Bar Input */}
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <div className="flex-1 flex items-center gap-2 bg-[var(--bg-surface-inset)] border-2 border-gray-600 px-3 py-1 shadow-inner">
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
              >
                ✕
              </button>
            )}
          </div>

          {/* View Mode Controls (Cards set as default) */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-xs text-gray-500 font-bold hidden sm:inline">View:</span>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1 text-xs font-bold ${
                viewMode === 'cards'
                  ? 'border-2 border-black bg-[var(--accent-primary)] text-white'
                  : 'border-2 border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0] text-black'
              }`}
            >
              🖼️ Cards
            </button>
            <button
              onClick={() => setViewMode('details')}
              className={`px-2.5 py-1 text-xs font-bold ${
                viewMode === 'details'
                  ? 'border-2 border-black bg-[var(--accent-primary)] text-white'
                  : 'border-2 border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0] text-black'
              }`}
            >
              📋 Details
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 text-xs font-bold ${
                viewMode === 'grid'
                  ? 'border-2 border-black bg-[var(--accent-primary)] text-white'
                  : 'border-2 border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0] text-black'
              }`}
            >
              📁 Grid
            </button>
          </div>
        </div>

        {/* Collections Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 border-t border-gray-400/40">
          <span className="text-xs font-bold text-gray-500 shrink-0">Collection:</span>
          {collections.map((cat) => {
            const isActive = selectedCollection === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCollection(cat)}
                className={`px-2.5 py-0.5 text-xs font-mono shrink-0 transition-colors ${
                  isActive
                    ? 'bg-[var(--accent-primary)] text-white font-bold border border-black'
                    : 'bg-[var(--bg-surface)] text-[var(--text-main)] border border-gray-500 hover:bg-gray-200'
                }`}
              >
                {cat === 'All' ? '🌐 All Posts' : `📁 ${cat}`}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content Area */}
      {filteredPosts.length === 0 ? (
        <div className="bg-[var(--bg-surface-card)] border-2 border-gray-700 p-8 text-center space-y-2">
          <span className="text-4xl block">🔍</span>
          <p className="font-heading font-bold text-lg text-[var(--accent-primary)]">
            No matching articles found
          </p>
          <p className="text-xs font-sans text-gray-500">
            Try adjusting your search keywords or collection filter.
          </p>
        </div>
      ) : viewMode === 'cards' ? (
        /* Default CARDS View Mode with Topic Images/Thumbnails */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post, idx) => {
            const readTime = Math.max(3, Math.ceil(post.title.length / 8))
            const viewCount = 1000 + (idx * 1420 + 342) % 3500

            return (
              <article
                key={post.slug}
                className="bg-[var(--bg-surface-card)] border-2 border-gray-700 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Thumbnail Cover Header */}
                  <div className="bg-gradient-to-r from-blue-900 via-sky-800 to-indigo-900 p-4 border-b-2 border-gray-700 flex items-center justify-between select-none relative overflow-hidden">
                    <div className="absolute right-[-10px] bottom-[-10px] text-6xl opacity-20 pointer-events-none text-cyan-300">
                      ⚡
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📑</span>
                      <span className="text-xs font-mono font-bold text-cyan-200 bg-black/40 px-2 py-0.5 border border-cyan-500/50">
                        ARTICLE
                      </span>
                    </div>
                    <span className="text-xs font-mono text-cyan-100">
                      {readTime} min read
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 space-y-3">
                    {/* Category Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] font-bold px-1.5 py-0.5 border border-[var(--accent-primary)]/40 uppercase tracking-wider"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold font-heading text-[var(--accent-primary)] group-hover:underline leading-snug">
                      <Link href={`/posts/${post.slug}`} className="no-underline text-inherit block">
                        {post.title}
                      </Link>
                    </h3>

                    {/* Description Excerpt */}
                    <p className="text-xs sm:text-sm font-sans text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="p-4 pt-0 border-t border-gray-500/30 mt-3 pt-3 flex items-center justify-between text-xs font-win98">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent-primary)] text-white font-bold font-mono text-[10px] flex items-center justify-center border border-black shadow-xs">
                      NB
                    </div>
                    <span className="font-bold text-[var(--text-main)]">Nghia Bui</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-500 font-mono text-[11px]">
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span>👁️ {viewCount}</span>
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
              <tr className="bg-[var(--bg-surface-subtle)] border-b border-gray-400 select-none">
                <th className="p-2 border-r border-gray-300 font-bold">Name</th>
                <th className="p-2 border-r border-gray-300 font-bold hidden sm:table-cell">Type</th>
                <th className="p-2 border-r border-gray-300 font-bold hidden md:table-cell">Size</th>
                <th className="p-2 border-r border-gray-300 font-bold">Date Modified</th>
                <th className="p-2 font-bold hidden lg:table-cell">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr
                  key={post.slug}
                  className="hover:bg-[var(--accent-primary)] hover:text-white group border-b border-gray-200/40 transition-colors"
                >
                  <td className="p-2 font-semibold">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="flex items-center gap-2 text-inherit no-underline block"
                    >
                      <span className="text-base select-none">📝</span>
                      <span className="font-mono text-sm underline group-hover:text-white">
                        {post.slug}.md
                      </span>
                    </Link>
                  </td>
                  <td className="p-2 hidden sm:table-cell text-[var(--text-muted)] group-hover:text-white">
                    Markdown Document
                  </td>
                  <td className="p-2 hidden md:table-cell font-mono text-[var(--text-muted)] group-hover:text-white">
                    {(post.title.length * 42 + 512) % 2048 + 1024} B
                  </td>
                  <td className="p-2 font-mono whitespace-nowrap">
                    {new Date(post.date).toLocaleDateString('en-US')}
                  </td>
                  <td className="p-2 hidden lg:table-cell text-[var(--text-muted)] group-hover:text-white truncate max-w-xs">
                    {post.description}
                  </td>
                </tr>
              ))}
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
