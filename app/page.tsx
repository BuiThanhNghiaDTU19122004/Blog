import { getAllPosts } from '@/lib/posts'
import { Window } from '@/components/win98/Window'
import { PostExplorer } from '@/components/win98/PostExplorer'

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <Window
      title="BuiThanhNghiaDev Workstation - [C:\BuiThanhNghiaDev\Home]"
      icon="🖥️"
      address="C:\BuiThanhNghiaDev\Home"
      statusText={`BuiThanhNghiaDev OS v98.4 | System status: Online | ${posts.length} article(s) indexed`}
    >
      <div className="space-y-6">
        {/* Hero Title Banner - ponytail: compact title size & personalized branding */}
        <div className="bg-[var(--bg-surface-subtle)] text-[var(--text-main)] p-3 sm:p-4 border-2 border-gray-700 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-base sm:text-lg font-bold font-heading text-[var(--accent-primary)] tracking-tight leading-snug">
              BuiThanhNghiaDev.exe // Technical Developer Desktop
            </h1>
            <p className="text-xs font-sans text-[var(--text-muted)] mt-1">
              Technical articles on Next.js App Router, React Server Components, and Cloud Systems.
            </p>
          </div>
          <div className="bg-[var(--accent-primary)] text-white px-2.5 py-0.5 text-xs border border-black font-mono font-bold select-none shrink-0">
            BuiThanhNghiaDev / WIN98 OS
          </div>
        </div>

        {/* Post Explorer Component (Search, Collections, Most Read, Cards View Default) */}
        <PostExplorer posts={posts} showMostRead={true} />
      </div>
    </Window>
  )
}
