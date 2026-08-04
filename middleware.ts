import { NextResponse, type NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n/dictionary'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignore internal Next.js requests, API routes, and public static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if pathname already has a valid locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Determine target locale: cookie preferred, then Accept-Language header, fallback to defaultLocale
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  let targetLocale = defaultLocale

  if (cookieLocale && locales.includes(cookieLocale as any)) {
    targetLocale = cookieLocale as any
  } else {
    const acceptLanguage = request.headers.get('accept-language') || ''
    if (acceptLanguage.toLowerCase().includes('vi')) {
      targetLocale = 'vi'
    }
  }

  // Redirect to locale-prefixed URL
  const redirectUrl = new URL(`/${targetLocale}${pathname}`, request.url)
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
