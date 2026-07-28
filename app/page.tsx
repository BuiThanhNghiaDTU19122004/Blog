import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-950/60 p-10 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-400/80">Blog cá nhân</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-white">Viết blog với Next.js + MDX</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Blog này sử dụng GitHub Actions để build, MDX để viết bài, và Tailwind v4 cho giao diện nhẹ nhàng.
          </p>
        </div>

        <section className="space-y-4">
          {posts.map((post) => (
            <article key={post.slug} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-sky-500/40 hover:bg-slate-900">
              <Link href={`/posts/${post.slug}`} className="group">
                <h2 className="text-2xl font-semibold text-white transition group-hover:text-sky-300">{post.title}</h2>
                <p className="mt-3 text-sm text-slate-400">{post.description}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.25em] text-slate-500">{new Date(post.date).toLocaleDateString('vi-VN')}</p>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
