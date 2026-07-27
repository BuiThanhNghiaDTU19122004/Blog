import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { MDXComponents } from '@/lib/mdx-components'
import { useMDXComponent } from 'next-contentlayer/hooks'

interface PageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }))
}

export default function PostPage({ params }: PageProps) {
  const post = allPosts.find((post) => post.slug === params.slug)
  if (!post) {
    notFound()
  }

  const Body = useMDXComponent(post.body.code)

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
          <Body components={MDXComponents} />
        </div>
      </article>
    </main>
  )
}
