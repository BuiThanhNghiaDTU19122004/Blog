import { getAllPosts } from '@/lib/posts'
import { Window } from '@/components/win98/Window'
import { PostExplorer } from '@/components/win98/PostExplorer'

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <Window
      title="My Computer - [C:\Blog\Home]"
      icon="🖥️"
      address="C:\Blog\Home"
      statusText={`System status: Online | ${posts.length} article(s) indexed`}
    >
      <div className="space-y-6">
        {/* Hero Title Banner */}
        <div className="bg-[var(--bg-surface-subtle)] text-[var(--text-main)] p-4 sm:p-5 border-2 border-gray-700 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-hero text-[var(--accent-primary)] tracking-tight leading-normal">
              RETRO DEVELOPER BLOG [WIN98 EDITION]
            </h1>
            <p className="text-xs font-sans text-[var(--text-muted)] mt-2">
              Technical articles on Next.js App Router, React Server Components, and Cloud Systems.
            </p>
          </div>
          <div className="bg-[var(--accent-primary)] text-white px-3 py-1 text-xs border border-black font-mono font-bold select-none">
            CYBER-BLUE / WIN98
          </div>
        </div>

        {/* Post Explorer Component (Search, Collections, Most Read, Cards View Default) */}
        <PostExplorer posts={posts} showMostRead={true} />
      </div>
    </Window>
  )
}
