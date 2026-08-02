// ponytail: lightweight Next.js API route for persisting page visitor counts
import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'visitors.json')
let inMemoryCount = 4289

async function readPersistedCount(): Promise<number> {
  try {
    const fileData = await fs.readFile(DATA_FILE, 'utf-8')
    const parsed = JSON.parse(fileData)
    if (typeof parsed.count === 'number' && !isNaN(parsed.count)) {
      inMemoryCount = parsed.count
    }
  } catch {
    // If file doesn't exist yet, save the initial baseline count
    await writePersistedCount(inMemoryCount)
  }
  return inMemoryCount
}

async function writePersistedCount(count: number): Promise<void> {
  try {
    const dirPath = path.dirname(DATA_FILE)
    await fs.mkdir(dirPath, { recursive: true })
    await fs.writeFile(
      DATA_FILE,
      JSON.stringify({ count, lastUpdated: new Date().toISOString() }, null, 2),
      'utf-8'
    )
  } catch {
    // Graceful fallback if filesystem is read-only
  }
}

export async function GET() {
  const current = await readPersistedCount()
  const updated = current + 1
  inMemoryCount = updated
  await writePersistedCount(updated)

  return NextResponse.json({ count: updated })
}

export async function POST() {
  const current = await readPersistedCount()
  const updated = current + 1
  inMemoryCount = updated
  await writePersistedCount(updated)

  return NextResponse.json({ count: updated })
}
