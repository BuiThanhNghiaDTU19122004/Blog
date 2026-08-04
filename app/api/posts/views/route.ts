// ponytail: API route for fetching all post view counts using in-memory store
import { NextResponse } from 'next/server'
import { getAllPostViews } from '@/lib/views'

export async function GET() {
  const views = await getAllPostViews()
  return NextResponse.json(views)
}
