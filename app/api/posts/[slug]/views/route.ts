// ponytail: API route for managing post view counts using in-memory store
import { NextResponse } from 'next/server'
import { getPostViews, incrementPostViews } from '@/lib/views'

interface RouteParams {
  params: Promise<{
    slug: string
  }>
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params
  const views = await getPostViews(slug)
  return NextResponse.json({ slug, views })
}

export async function POST(_request: Request, { params }: RouteParams) {
  const { slug } = await params
  const views = await incrementPostViews(slug)
  return NextResponse.json({ slug, views })
}
