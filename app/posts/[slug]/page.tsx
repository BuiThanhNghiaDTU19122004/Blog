import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXComponents } from '@/lib/mdx-components'
import { getPostSlugs, getPostMeta, getPostHeadings } from '@/lib/posts'
import { Window } from '@/components/win98/Window'
import { TableOfContents } from '@/components/win98/TableOfContents'
import { PostViewBadge } from '@/components/win98/PostViewBadge'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

// ponytail: Next.js async params handling preserved for static post rendering
export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostMeta(slug)
  if (!post) {
    notFound()
  }

  const headings = getPostHeadings(slug)
  const postModule = await import(`../../../posts/${slug}.mdx`)
  const Content = postModule.default

  return (
    <Window
      title={`Notepad - [${slug}.md]`}
      icon="📄"
      address={`C:\\Blog\\Posts\\${slug}.md`}
      statusText={`Document: ${post.title} | Modified: ${post.date}`}
    >
      <div className="space-y-6">
        {/* Navigation & Document Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-400 pb-3 font-win98">
          <Link
            href="/"
            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold border-2 border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0] active:border-black hover:bg-[#d4d4d4] no-underline text-black"
          >
            <span>⬅️</span>
            <span>Back to Explorer</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
            <PostViewBadge slug={slug} />
            <span className="bg-[var(--bg-surface-subtle)] text-[var(--text-main)] border border-[var(--border-dark)] px-2 py-0.5 shadow-inner">
              UTF-8
            </span>
            <span className="bg-[var(--bg-surface-subtle)] text-[var(--text-main)] border border-[var(--border-dark)] px-2 py-0.5 shadow-inner">
              Markdown
            </span>
          </div>
        </div>

        {/* 2-Column Content Layout: Article Body + Sticky TOC Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Main Article Body Column - ponytail: theme-aware surface & text colors for dark mode contrast */}
          <article className="flex-1 w-full min-w-0 bg-[var(--bg-surface-inset)] text-[var(--text-main)] border-2 border-[var(--border-dark)] p-4 sm:p-6 shadow-inner">
            <header className="border-b-2 border-[var(--border-shadow)] pb-4 mb-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-2">
                <span className="bg-[var(--accent-primary)] text-white px-2 py-0.5 font-bold">
                  TECHNICAL POST
                </span>
                <span>•</span>
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              {/* ponytail: compact title size to prevent oversized post headings */}
              <h1 className="text-xl sm:text-2xl font-bold font-crt text-[var(--accent-primary)] leading-snug">
                {post.title}
              </h1>

              {post.description && (
                <p className="mt-3 text-base sm:text-lg font-body text-[var(--text-muted)] italic border-l-2 border-[var(--accent-primary)] pl-3">
                  {post.description}
                </p>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono bg-[var(--bg-surface-subtle)] text-[var(--text-main)] border border-[var(--border-dark)] px-2 py-0.5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* MDX Content using JetBrains Mono body & VT323 headings */}
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
