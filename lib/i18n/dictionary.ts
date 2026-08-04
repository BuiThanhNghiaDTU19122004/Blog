export type Locale = 'en' | 'vi'

export const locales: Locale[] = ['en', 'vi']
export const defaultLocale: Locale = 'en'

export const dictionaries = {
  en: {
    blogTitle: 'RETRO DEVELOPER BLOG [WIN98 EDITION]',
    blogSubtitle: 'Technical articles on Next.js App Router, React Server Components, and Cloud Systems.',
    backToExplorer: 'Back to Explorer',
    searchPlaceholder: 'Search articles, tags, descriptions...',
    allCollections: 'All',
    allTags: 'All',
    systemStatus: 'System status: Online',
    articlesIndexed: 'article(s) indexed',
    readTimeSuffix: 'min read',
    notepadTitle: 'Notepad',
    utf8Label: 'UTF-8',
    markdownLabel: 'Markdown',
    tableOfContents: 'Table of Contents',
    notTranslatedNotice: '⚠️ Article is not yet translated into Vietnamese. Showing English version below.',
    navHome: 'Home',
    navAbout: 'About',
    navGithub: 'GitHub',
    views: 'views',
  },
  vi: {
    blogTitle: 'RETRO DEVELOPER BLOG [PHIÊN BẢN WIN98]',
    blogSubtitle: 'Bài viết kỹ thuật về Next.js App Router, React Server Components và Cloud Systems.',
    backToExplorer: 'Quay lại Explorer',
    searchPlaceholder: 'Tìm kiếm bài viết, thẻ, mô tả...',
    allCollections: 'Tất cả',
    allTags: 'Tất cả',
    systemStatus: 'Trạng thái hệ thống: Trực tuyến',
    articlesIndexed: 'bài viết đã chỉ mục',
    readTimeSuffix: 'phút đọc',
    notepadTitle: 'Notepad',
    utf8Label: 'UTF-8',
    markdownLabel: 'Markdown',
    tableOfContents: 'Mục mục bài viết',
    notTranslatedNotice: '⚠️ Bài viết chưa có bản dịch tiếng Việt. Đang hiển thị bản gốc tiếng Anh bên dưới.',
    navHome: 'Trang chủ',
    navAbout: 'Giới thiệu',
    navGithub: 'GitHub',
    views: 'lượt xem',
  },
}

export function getDictionary(locale: string) {
  return dictionaries[(locale as Locale) || defaultLocale] ?? dictionaries.en
}
