import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { slugify } from '@/lib/mdx-components'

const postsDirectory = path.join(process.cwd(), 'posts')

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  tags?: string[]
}

export type HeadingItem = {
  id: string
  text: string
  level: number
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

// ponytail: parse raw MDX file for H2 and H3 headings to populate TOC
export function getPostHeadings(slug: string): HeadingItem[] {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) {
    return []
  }

  const source = fs.readFileSync(fullPath, 'utf8')
  const lines = source.split('\n')
  const headings: HeadingItem[] = []

  lines.forEach((line) => {
    const trimmed = line.trim()
    const h2Match = trimmed.match(/^##\s+(.+)$/)
    const h3Match = trimmed.match(/^###\s+(.+)$/)

    if (h2Match) {
      const text = h2Match[1].trim().replace(/\*\*/g, '').replace(/`/g, '')
      headings.push({ id: slugify(text), text, level: 2 })
    } else if (h3Match) {
      const text = h3Match[1].trim().replace(/\*\*/g, '').replace(/`/g, '')
      headings.push({ id: slugify(text), text, level: 3 })
    }
  })

  return headings
}
