import matter from 'gray-matter'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXComponents } from '@/lib/mdx-components'
import { getPostSlugs, getPostMeta, getPostHeadings } from '@/lib/posts'
import { Window } from '@/components/win98/Window'
import { TableOfContents } from '@/components/win98/TableOfContents'

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

          <div className="flex items-center gap-2 text-xs font-mono text-gray-700">
            <span className="bg-white border border-gray-500 px-2 py-0.5 shadow-inner">
              UTF-8
            </span>
            <span className="bg-white border border-gray-500 px-2 py-0.5 shadow-inner">
              Markdown
            </span>
          </div>
        </div>

        {/* 2-Column Content Layout: Article Body + Sticky TOC Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Main Article Body Column */}
          <article className="flex-1 w-full min-w-0 bg-white border-2 border-gray-800 border-t-gray-900 border-l-gray-900 p-4 sm:p-6 shadow-inner">
            <header className="border-b-2 border-gray-200 pb-4 mb-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-600 mb-2">
                <span className="bg-[#000080] text-white px-2 py-0.5 font-bold">
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

              <h1 className="text-3xl sm:text-4xl font-bold font-crt text-[#000080] leading-tight">
                {post.title}
              </h1>

              {post.description && (
                <p className="mt-3 text-base sm:text-lg font-body text-gray-700 italic border-l-2 border-gray-400 pl-3">
                  {post.description}
                </p>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono bg-[#c0c0c0] text-black border border-gray-600 px-2 py-0.5"
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
