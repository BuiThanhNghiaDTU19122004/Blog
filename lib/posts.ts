import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  tags?: string[]
}

export function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

export function getAllPosts() {
  return getPostSlugs()
    .map((slug) => getPostMeta(slug))
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
}

export function getPostMeta(slug: string): PostMeta | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const source = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(source)

  return {
    slug,
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    tags: data.tags as string[] | undefined,
  }
}
