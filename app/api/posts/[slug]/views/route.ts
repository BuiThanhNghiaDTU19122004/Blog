// ponytail: API route for managing real individual post view counts
import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const VIEWS_FILE = path.join(process.cwd(), 'data', 'post-views.json')

// Initial baseline post views map
const BASELINE_VIEWS: Record<string, number> = {
  'architecting-modern-web-apps-with-nextjs-app-router': 1342,
  'welcome-to-the-developer-desktop-blog': 2762,
}

let inMemoryViews: Record<string, number> = { ...BASELINE_VIEWS }

async function readAllViews(): Promise<Record<string, number>> {
  try {
    const content = await fs.readFile(VIEWS_FILE, 'utf-8')
    const parsed = JSON.parse(content)
    if (parsed && typeof parsed === 'object') {
      inMemoryViews = { ...BASELINE_VIEWS, ...parsed }
    }
  } catch {
    await saveAllViews(inMemoryViews)
  }
  return inMemoryViews
}

async function saveAllViews(views: Record<string, number>): Promise<void> {
  try {
    const dir = path.dirname(VIEWS_FILE)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(VIEWS_FILE, JSON.stringify(views, null, 2), 'utf-8')
  } catch {
    // Fallback if filesystem is read-only
  }
}

interface RouteParams {
  params: Promise<{
    slug: string
  }>
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params
  const viewsMap = await readAllViews()
  const count = viewsMap[slug] ?? 100

  return NextResponse.json({ slug, views: count })
}

export async function POST(_request: Request, { params }: RouteParams) {
  const { slug } = await params
  const viewsMap = await readAllViews()
  const current = viewsMap[slug] ?? 100
  const updated = current + 1

  viewsMap[slug] = updated
  inMemoryViews = viewsMap
  await saveAllViews(viewsMap)

  return NextResponse.json({ slug, views: updated })
}
