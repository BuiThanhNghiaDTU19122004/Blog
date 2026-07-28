import { getAllPosts } from '@/lib/posts'
import { Window } from '@/components/win98/Window'
import { FileExplorer } from '@/components/win98/FileExplorer'

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <Window
      title="Exploring - C:\Blog\Posts"
      icon="📁"
      address="C:\Blog\Posts"
      statusText={`${posts.length} object(s) in folder`}
    >
      <div className="space-y-4 font-win98">
        {/* Header Banner inside window */}
        <div className="bg-[#000080] text-white p-4 border-2 border-gray-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-crt tracking-wide flex items-center gap-2">
              <span className="text-yellow-300">⚡</span> RETRO DEVELOPER BLOG [WIN98 EDITION]
            </h1>
            <p className="text-xs text-gray-200 mt-1 font-win98">
              Technical notes, Next.js, MDX & software architecture. Select a file below to read.
            </p>
          </div>
          <div className="bg-[#c0c0c0] text-black px-3 py-1 text-xs border border-white font-mono font-bold">
            MS-DOS 6.22 / WIN98
          </div>
        </div>

        {/* File Explorer listing posts as .md files */}
        <FileExplorer posts={posts} />
      </div>
    </Window>
  )
}
