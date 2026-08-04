import { getAllPosts } from '@/lib/posts'
import { getDictionary } from '@/lib/i18n/dictionary'
import { Window } from '@/components/win98/Window'
import { PostExplorer } from '@/components/win98/PostExplorer'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const posts = getAllPosts(locale)

  return (
    <Window
      title={`My Computer - [C:\\BuiThanhNghiaDev\\Home]`}
      icon="🖥️"
      address={`C:\\BuiThanhNghiaDev\\Home`}
      statusText={`${dict.systemStatus} | ${posts.length} ${dict.articlesIndexed}`}
    >
      <div className="space-y-6">
        {/* Hero Title Banner */}
        <div className="bg-[var(--bg-surface-subtle)] text-[var(--text-main)] p-4 sm:p-5 border-2 border-gray-700 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold font-hero text-[var(--accent-primary)] tracking-tight leading-normal">
              {dict.blogTitle}
            </h1>
            <p className="text-xs font-sans text-[var(--text-muted)] mt-2">
              {dict.blogSubtitle}
            </p>
          </div>
          <div className="bg-[var(--accent-primary)] text-white px-3 py-1 text-xs border border-black font-mono font-bold select-none">
            CYBER-BLUE / WIN98
          </div>
        </div>

        {/* Post Explorer Component */}
        <PostExplorer posts={posts} showMostRead={true} locale={locale} />
      </div>
    </Window>
  )
}
