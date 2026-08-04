import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXComponents } from '@/lib/mdx-components'
import { getPostSlugs, getPostMeta, getPostHeadings } from '@/lib/posts'
import { getDictionary, locales } from '@/lib/i18n/dictionary'
import { Window } from '@/components/win98/Window'
import { TableOfContents } from '@/components/win98/TableOfContents'
import { PostViewBadge } from '@/components/win98/PostViewBadge'

interface PageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  const params: { locale: string; slug: string }[] = []

  locales.forEach((locale) => {
    slugs.forEach((slug) => {
      params.push({ locale, slug })
    })
  })

  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getPostMeta(slug, locale)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/${locale}/posts/${slug}`,
      languages: {
        en: `/en/posts/${slug}`,
        vi: `/vi/posts/${slug}`,
      },
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { locale, slug } = await params
  const dict = getDictionary(locale)
  const post = getPostMeta(slug, locale)

  if (!post || !post.resolvedFile) {
    notFound()
  }

  const headings = getPostHeadings(slug, locale)
  const postModule = await import(`../../../../posts/${post.resolvedFile}`)
  const Content = postModule.default

  return (
    <Window
      title={`${dict.notepadTitle} - [${slug}.md]`}
      icon="📄"
      address={`C:\\BuiThanhNghiaDev\\Posts\\${slug}.md`}
      statusText={`Document: ${post.title} | Modified: ${post.date}`}
    >
      <div className="space-y-6">
        {/* Navigation & Document Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-400 pb-3 font-win98">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold border-2 border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0] active:border-black hover:bg-[#d4d4d4] no-underline text-black"
          >
            <span>⬅️</span>
            <span>{dict.backToExplorer}</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
            <PostViewBadge slug={slug} />
            <span className="bg-[var(--bg-surface-subtle)] text-[var(--text-main)] border border-[var(--border-dark)] px-2 py-0.5 shadow-inner">
              {dict.utf8Label}
            </span>
            <span className="bg-[var(--bg-surface-subtle)] text-[var(--text-main)] border border-[var(--border-dark)] px-2 py-0.5 shadow-inner">
              {dict.markdownLabel}
            </span>
          </div>
        </div>

        {/* Translation Fallback Notice */}
        {post.hasTranslation === false && (
          <div className="bg-[#fff9c4] dark:bg-[#3c3836] text-[#856404] dark:text-[#fabd2f] border-2 border-[#ffeeba] dark:border-[#d79921] p-3 text-xs font-win98 font-bold flex items-center gap-2 shadow-xs select-none">
            <span>⚠️</span>
            <span>{dict.notTranslatedNotice}</span>
          </div>
        )}

        {/* 2-Column Content Layout: Article Body + Sticky TOC Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Main Article Body Column */}
          <article className="flex-1 w-full min-w-0 bg-[var(--bg-surface-inset)] text-[var(--text-main)] border-2 border-[var(--border-dark)] p-4 sm:p-6 shadow-inner">
            <header className="border-b border-[var(--border-shadow)] pb-5 mb-6 space-y-3">
              {/* Breadcrumb Navigation Path */}
              <div className="flex items-center gap-1.5 text-xs font-sans text-[var(--text-muted)] truncate">
                <Link href={`/${locale}`} className="hover:underline text-[var(--text-muted)] no-underline">
                  Blog
                </Link>
                <span>&gt;</span>
                <span className="truncate text-[var(--text-main)] font-medium">{post.title}</span>
              </div>

              {/* Tag Pill Badges */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 uppercase tracking-wide"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold font-heading text-[var(--text-main)] leading-tight tracking-tight pt-1">
                {post.title}
              </h1>

              {post.description && (
                <p className="text-xs sm:text-sm font-sans text-[var(--text-muted)] italic border-l-2 border-[var(--accent-primary)] pl-3 py-0.5">
                  {post.description}
                </p>
              )}

              {/* Author & Post Metadata Bar */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-[var(--text-muted)] pt-2 border-t border-[var(--border-shadow)]/40 mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[var(--accent-primary)] text-white font-bold text-[10px] flex items-center justify-center border border-black shadow-xs">
                    NB
                  </div>
                  <span className="font-bold text-[var(--text-main)]">Nghia Bui</span>
                </div>
                <span>•</span>
                <span>
                  {new Date(post.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span>•</span>
                <span>
                  {Math.max(3, Math.ceil(post.title.length / 8))} {dict.readTimeSuffix}
                </span>
                <span>•</span>
                <PostViewBadge slug={slug} />
              </div>
            </header>

            {/* MDX Content */}
            <div className="win98-prose space-y-4">
              <Content components={MDXComponents} />
            </div>
          </article>

          {/* Right-Hand Sticky Table of Contents Sidebar */}
          {headings.length > 0 && (
            <aside className="w-full lg:w-64 shrink-0">
              <TableOfContents headings={headings} />
            </aside>
          )}
        </div>
      </div>
    </Window>
  )
}
