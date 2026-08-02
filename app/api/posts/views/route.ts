// ponytail: API route for fetching all post view counts
import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const VIEWS_FILE = path.join(process.cwd(), 'data', 'post-views.json')

const BASELINE_VIEWS: Record<string, number> = {
  'architecting-modern-web-apps-with-nextjs-app-router': 1342,
  'welcome-to-the-developer-desktop-blog': 2762,
}

export async function GET() {
  try {
    const content = await fs.readFile(VIEWS_FILE, 'utf-8')
    const parsed = JSON.parse(content)
    const combined = { ...BASELINE_VIEWS, ...(parsed || {}) }
    return NextResponse.json(combined)
  } catch {
    return NextResponse.json(BASELINE_VIEWS)
  }
}
