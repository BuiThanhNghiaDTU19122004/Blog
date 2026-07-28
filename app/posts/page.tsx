import { getAllPosts } from '@/lib/posts'
import { Window } from '@/components/win98/Window'
import { PostExplorer } from '@/components/win98/PostExplorer'

export default function PostsPage() {
  const posts = getAllPosts()

  return (
    <Window
      title="Exploring - C:\Blog\Posts"
      icon="📁"
      address="C:\Blog\Posts"
      statusText={`${posts.length} object(s) in directory`}
    >
      <div className="space-y-6 font-sans">
        {/* Explorer Header Banner */}
        <div className="bg-[var(--bg-surface-subtle)] p-4 border-2 border-gray-700 shadow-sm flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-bold font-heading text-[var(--accent-primary)] flex items-center gap-2">
              <span>📁</span> Article Explorer & Directory Index
            </h1>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Browse, search, and filter published articles across topic collections.
            </p>
          </div>
          <div className="bg-[var(--bg-surface)] text-xs border border-gray-500 px-2 py-0.5 font-mono">
            MS-DOS File System
          </div>
        </div>

        {/* Post Explorer Component */}
        <PostExplorer posts={posts} showMostRead={true} />
      </div>
    </Window>
  )
}
