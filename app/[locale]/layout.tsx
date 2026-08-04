import React from 'react'
import { locales } from '@/lib/i18n/dictionary'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <div data-locale={locale}>{children}</div>
}
