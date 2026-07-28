'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { PostMeta } from '@/lib/posts'

interface FileExplorerProps {
  posts: PostMeta[]
}

export function FileExplorer({ posts }: FileExplorerProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'details'>('details')

  return (
    <div className="space-y-4 font-win98">
      {/* Explorer Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#c0c0c0] p-1 border-b border-gray-400 text-xs">
        <div className="flex items-center gap-1">
          <span className="text-gray-700 font-bold">View:</span>
          <button
            onClick={() => setViewMode('details')}
            className={`px-2 py-0.5 text-xs font-semibold ${
              viewMode === 'details'
                ? 'border-2 border-black bg-[#e0e0e0] font-bold'
                : 'border-2 border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0]'
            }`}
          >
            📋 Details
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-2 py-0.5 text-xs font-semibold ${
              viewMode === 'grid'
                ? 'border-2 border-black bg-[#e0e0e0] font-bold'
                : 'border-2 border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0]'
            }`}
          >
            🖼️ Large Icons
          </button>
        </div>
        <div className="text-xs text-gray-700 font-mono">
          {posts.length} file(s) found
        </div>
      </div>

      {/* Main Content Area - Inset Bevel Box */}
      <div className="bg-white border-2 border-gray-800 border-t-gray-900 border-l-gray-900 p-2 min-h-[300px] shadow-inner overflow-x-auto">
        {viewMode === 'details' ? (
          <table className="w-full text-left text-xs border-collapse font-win98">
            <thead>
              <tr className="bg-[#c0c0c0] border-b border-gray-400 select-none">
                <th className="p-1.5 border-r border-gray-300 font-bold">Name</th>
                <th className="p-1.5 border-r border-gray-300 font-bold hidden sm:table-cell">Type</th>
                <th className="p-1.5 border-r border-gray-300 font-bold hidden md:table-cell">Size</th>
                <th className="p-1.5 border-r border-gray-300 font-bold">Date Modified</th>
                <th className="p-1.5 font-bold hidden lg:table-cell">Description</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.slug}
                  className="hover:bg-[#000080] hover:text-white group border-b border-gray-100 transition-colors"
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
                  <td className="p-2 hidden sm:table-cell text-gray-600 group-hover:text-gray-200">
                    Markdown Document
                  </td>
                  <td className="p-2 hidden md:table-cell font-mono text-gray-600 group-hover:text-gray-200">
                    {(post.title.length * 42 + 512) % 2048 + 1024} B
                  </td>
                  <td className="p-2 font-mono whitespace-nowrap">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </td>
                  <td className="p-2 hidden lg:table-cell text-gray-700 group-hover:text-gray-200 truncate max-w-xs">
                    {post.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="flex flex-col items-center text-center p-3 hover:bg-[#000080] hover:text-white group rounded border border-transparent hover:border-blue-300"
              >
                <div className="w-12 h-14 bg-white border-2 border-gray-400 shadow flex flex-col justify-between p-1 relative mb-2 group-hover:border-white">
                  <div className="absolute top-0 right-0 w-3 h-3 bg-[#c0c0c0] border-l border-b border-gray-400" />
                  <span className="text-xl self-center my-auto select-none">📄</span>
                  <span className="bg-[#000080] text-white text-[8px] font-mono font-bold px-0.5 self-start">
                    MDX
                  </span>
                </div>
                <span className="font-mono text-xs font-bold truncate max-w-full">
                  {post.slug}.md
                </span>
                <span className="text-[10px] text-gray-600 group-hover:text-gray-200 truncate max-w-full mt-1">
                  {post.title}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
