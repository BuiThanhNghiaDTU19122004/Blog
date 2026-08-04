import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { slugify } from '@/lib/mdx-components'
import { defaultLocale } from '@/lib/i18n/dictionary'

const postsDirectory = path.join(process.cwd(), 'posts')

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  tags?: string[]
  hasTranslation?: boolean
  resolvedLocale?: string
  resolvedFile?: string
}

export type HeadingItem = {
  id: string
  text: string
  level: number
}

// Extract base slugs by stripping .en.mdx, .vi.mdx, or .mdx extensions
export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return []
  const files = fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'))
  const slugSet = new Set<string>()

  files.forEach((file) => {
    const cleanSlug = file
      .replace(/\.(en|vi)\.mdx$/, '')
      .replace(/\.mdx$/, '')
    slugSet.add(cleanSlug)
  })

  return Array.from(slugSet)
}

// Helper to resolve the best matching file path for a slug and requested locale
export function resolvePostFile(
  slug: string,
  locale: string = defaultLocale
): { filePath: string; hasTranslation: boolean; resolvedLocale: string; importPath: string } | null {
  const targetFile = path.join(postsDirectory, `${slug}.${locale}.mdx`)
  if (fs.existsSync(targetFile)) {
    return {
      filePath: targetFile,
      hasTranslation: true,
      resolvedLocale: locale,
      importPath: `${slug}.${locale}.mdx`,
    }
  }

  const fallbackEn = path.join(postsDirectory, `${slug}.${defaultLocale}.mdx`)
  if (fs.existsSync(fallbackEn)) {
    return {
      filePath: fallbackEn,
      hasTranslation: false,
      resolvedLocale: defaultLocale,
      importPath: `${slug}.${defaultLocale}.mdx`,
    }
  }

  const plainFile = path.join(postsDirectory, `${slug}.mdx`)
  if (fs.existsSync(plainFile)) {
    return {
      filePath: plainFile,
      hasTranslation: locale === defaultLocale,
      resolvedLocale: defaultLocale,
      importPath: `${slug}.mdx`,
    }
  }

  return null
}

export function getAllPosts(locale: string = defaultLocale): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostMeta(slug, locale))
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
}

export function getPostMeta(slug: string, locale: string = defaultLocale): PostMeta | null {
  const resolved = resolvePostFile(slug, locale)
  if (!resolved) {
    return null
  }

  const source = fs.readFileSync(resolved.filePath, 'utf8')
  const { data } = matter(source)

  return {
    slug,
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    tags: data.tags as string[] | undefined,
    hasTranslation: resolved.hasTranslation,
    resolvedLocale: resolved.resolvedLocale,
    resolvedFile: resolved.importPath,
  }
}

// Parse raw MDX file for H2 and H3 headings to populate TOC
export function getPostHeadings(slug: string, locale: string = defaultLocale): HeadingItem[] {
  const resolved = resolvePostFile(slug, locale)
  if (!resolved) {
    return []
  }

  const source = fs.readFileSync(resolved.filePath, 'utf8')
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
