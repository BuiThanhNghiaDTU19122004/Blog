import { getAllPosts } from '@/lib/posts'
import { getDictionary } from '@/lib/i18n/dictionary'
import { Window } from '@/components/win98/Window'
import { PostExplorer } from '@/components/win98/PostExplorer'

interface PostsPageProps {
  params: Promise<{ locale: string }>
}

export default async function PostsPage({ params }: PostsPageProps) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const posts = getAllPosts(locale)

  return (
    <Window
      title={`Blog Posts - [C:\\BuiThanhNghiaDev\\Posts]`}
      icon="📁"
      address={`C:\\BuiThanhNghiaDev\\Posts`}
      statusText={`${dict.systemStatus} | ${posts.length} ${dict.articlesIndexed}`}
    >
      <div className="space-y-6">
        {/* Explorer Header Banner */}
        <div className="bg-[var(--bg-surface-subtle)] text-[var(--text-main)] p-4 border-2 border-gray-700 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold font-hero text-[var(--accent-primary)] tracking-tight leading-normal">
              {locale === 'vi' ? 'THƯ MỤC BÀI VIẾT KỸ THUẬT' : 'TECHNICAL ARTICLES FILE EXPLORER'}
            </h1>
            <p className="text-xs font-sans text-[var(--text-muted)] mt-1">
              {locale === 'vi'
                ? 'Duyệt, tìm kiếm và lọc tất cả các bài viết kỹ thuật MDX theo chủ đề và thẻ.'
                : 'Browse, search, and filter all MDX technical articles by collection and tag.'}
            </p>
          </div>
          <div className="bg-[var(--accent-primary)] text-white px-3 py-1 text-xs border border-black font-mono font-bold select-none">
            FILE_EXPLORER.EXE
          </div>
        </div>

        {/* Dedicated Post Explorer Component */}
        <PostExplorer posts={posts} showMostRead={true} locale={locale} />
      </div>
    </Window>
  )
}
