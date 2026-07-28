import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { MDXComponents } from '@/lib/mdx-components'
import { getPostSlugs, getPostMeta } from '@/lib/posts'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

// ponytail: Next.js 15+ async params handling for static post rendering
export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostMeta(slug)
  if (!post) {
    notFound()
  }

  const postModule = await import(`../../../posts/${slug}.mdx`)
  const Content = postModule.default

  return (
    <main className="min-h-screen px-6 py-10 sm:px-10">
      <article className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-950/60 p-10 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-400/80">Bài viết</p>
          <h1 className="mt-4 text-4xl font-bold text-white">{post.title}</h1>
          <p className="mt-4 text-slate-300">{post.description}</p>
          <p className="mt-3 text-sm text-slate-500">{new Date(post.date).toLocaleDateString('vi-VN')}</p>
        </header>
        <div className="prose prose-invert max-w-none space-y-6 text-slate-200">
          <Content components={MDXComponents} />
        </div>
      </article>
    </main>
  )
}
