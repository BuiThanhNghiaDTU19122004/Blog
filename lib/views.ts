// ponytail: centralized in-memory views store with lazy load-once cold start & serialized disk persistence
import fs from 'fs/promises'
import path from 'path'

const VIEWS_FILE = path.join(process.cwd(), 'data', 'post-views.json')

// Baseline post view counts fallback
const BASELINE_VIEWS: Record<string, number> = {
  'architecting-modern-web-apps-with-nextjs-app-router': 1342,
  'welcome-to-the-developer-desktop-blog': 2762,
}

let inMemoryViews: Record<string, number> = { ...BASELINE_VIEWS }
let initPromise: Promise<Record<string, number>> | null = null
let writeQueue: Promise<void> = Promise.resolve()

/**
 * Lazy load-once initialization pattern.
 * Guarantees data/post-views.json is read from disk at most once on cold start,
 * preventing redundant file reads when concurrent requests arrive simultaneously.
 */
async function ensureViewsLoaded(): Promise<Record<string, number>> {
  if (!initPromise) {
    initPromise = (async () => {
      try {
        const content = await fs.readFile(VIEWS_FILE, 'utf-8')
        const parsed = JSON.parse(content)
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          inMemoryViews = { ...BASELINE_VIEWS, ...parsed }
        }
      } catch {
        // Use baseline values if file does not exist or fails to parse
        inMemoryViews = { ...BASELINE_VIEWS }
      }
      return inMemoryViews
    })()
  }
  return initPromise
}

/**
 * Get view count for a specific post slug from RAM cache (O(1)).
 */
export async function getPostViews(slug: string): Promise<number> {
  const viewsMap = await ensureViewsLoaded()
  return viewsMap[slug] ?? 0
}

/**
 * Get view counts for all posts from RAM cache.
 */
export async function getAllPostViews(): Promise<Record<string, number>> {
  const viewsMap = await ensureViewsLoaded()
  return { ...viewsMap }
}

/**
 * Increment view count for a slug in RAM cache safely.
 * Enqueues a non-blocking serialized async file write to prevent write race conditions and JSON corruption.
 */
export async function incrementPostViews(slug: string): Promise<number> {
  await ensureViewsLoaded()

  // Safe RAM update due to Node's single-threaded event loop execution model
  const current = inMemoryViews[slug] ?? 0
  const updated = current + 1
  inMemoryViews[slug] = updated

  // Serialize file writes to prevent overlapping/corrupted JSON file saves
  writeQueue = writeQueue.then(async () => {
    try {
      const dir = path.dirname(VIEWS_FILE)
      await fs.mkdir(dir, { recursive: true })
      await fs.writeFile(VIEWS_FILE, JSON.stringify(inMemoryViews, null, 2), 'utf-8')
    } catch {
      // Catch read-only / serverless filesystem errors silently without failing HTTP response
    }
  })

  return updated
}
