import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { getDictionary } from '@/lib/i18n/dictionary'
import { Window } from '@/components/win98/Window'
import { PostCardGrid } from '@/components/win98/PostCardGrid'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const posts = getAllPosts(locale)
  const recentPosts = posts.slice(0, 4)

  return (
    <Window
      title={`My Computer - [C:\\BuiThanhNghiaDev\\Home]`}
      icon="🖥️"
      address={`C:\\BuiThanhNghiaDev\\Home`}
      statusText={`${dict.systemStatus} | ${posts.length} ${dict.articlesIndexed}`}
    >
      <div className="space-y-6 font-win98">
        {/* Hero Title Banner */}
        <div className="bg-[var(--bg-surface-subtle)] text-[var(--text-main)] p-4 sm:p-5 border-2 border-gray-700 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold font-heading text-[var(--accent-primary)] tracking-tight leading-normal">
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

        {/* System Drives & Quick Shortcuts Section */}
        <fieldset className="border-2 border-gray-400 p-4 bg-[var(--bg-surface-subtle)] shadow-sm">
          <legend className="font-win98 font-bold text-xs text-[var(--accent-primary)] px-2 bg-[var(--bg-surface)] border border-gray-600">
            💾 {locale === 'vi' ? 'Lối tắt Hệ thống & Thư mục' : 'System Drives & Folder Shortcuts'}
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
            <Link
              href={`/${locale}/posts`}
              className="bg-[var(--bg-surface-card)] border-2 border-gray-600 p-3 hover:border-[var(--accent-primary)] transition-all flex items-center gap-3 no-underline text-inherit group shadow-xs"
            >
              <span className="text-3xl select-none">📁</span>
              <div>
                <h3 className="font-bold text-xs text-[var(--accent-primary)] group-hover:underline">
                  {locale === 'vi' ? 'Thư mục Bài viết' : 'Posts Explorer'}
                </h3>
                <p className="text-[10px] text-[var(--text-muted)] font-mono">
                  C:\Posts ({posts.length} {locale === 'vi' ? 'tệp' : 'files'})
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/about`}
              className="bg-[var(--bg-surface-card)] border-2 border-gray-600 p-3 hover:border-[var(--accent-primary)] transition-all flex items-center gap-3 no-underline text-inherit group shadow-xs"
            >
              <span className="text-3xl select-none">👤</span>
              <div>
                <h3 className="font-bold text-xs text-[var(--accent-primary)] group-hover:underline">
                  {locale === 'vi' ? 'Hồ sơ Tác giả' : 'About Profile'}
                </h3>
                <p className="text-[10px] text-[var(--text-muted)] font-mono">
                  C:\User\profile.exe
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/github`}
              className="bg-[var(--bg-surface-card)] border-2 border-gray-600 p-3 hover:border-[var(--accent-primary)] transition-all flex items-center gap-3 no-underline text-inherit group shadow-xs"
            >
              <span className="text-3xl select-none">🌐</span>
              <div>
                <h3 className="font-bold text-xs text-[var(--accent-primary)] group-hover:underline">
                  GitHub Activity
                </h3>
                <p className="text-[10px] text-[var(--text-muted)] font-mono">
                  GraphQL Heatmap
                </p>
              </div>
            </Link>
          </div>
        </fieldset>

        {/* Recent Articles Showcase */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b-2 border-gray-400 pb-2">
            <h2 className="font-bold text-xs sm:text-sm text-[var(--accent-primary)] flex items-center gap-2">
              <span>⚡</span> {locale === 'vi' ? 'BÀI VIẾT MỚI XUẤT BẢN' : 'RECENTLY PUBLISHED ARTICLES'}
            </h2>
            <Link
              href={`/${locale}/posts`}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold border-2 border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0] hover:bg-[#d4d4d4] text-black no-underline active:border-black"
            >
              <span>📁</span>
              <span>{locale === 'vi' ? 'Xem tất cả Bài viết ➔' : 'View All Posts ➔'}</span>
            </Link>
          </div>

          <PostCardGrid posts={recentPosts} locale={locale} />
        </div>
      </div>
    </Window>
  )
}
