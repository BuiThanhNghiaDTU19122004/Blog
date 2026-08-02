import React, { type ComponentPropsWithoutRef } from 'react'

// Helper function to convert heading text to valid URL element ID
export const slugify = (node: React.ReactNode): string => {
  if (typeof node === 'string') {
    return node
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
  if (Array.isArray(node)) {
    return node.map(slugify).join('')
  }
  if (node && typeof node === 'object' && 'props' in node) {
    return slugify((node as { props: { children?: React.ReactNode } }).props.children)
  }
  return ''
}

export const MDXComponents = {
  a: ({ className, ...props }: ComponentPropsWithoutRef<'a'>) => (
    <a
      className={`text-[var(--accent-primary)] font-semibold underline hover:bg-[var(--accent-primary)] hover:text-white px-0.5 ${className ?? ''}`}
      {...props}
    />
  ),
  h1: ({ className, children, ...props }: ComponentPropsWithoutRef<'h1'>) => {
    const id = slugify(children)
    return (
      <h1
        id={id}
        className={`text-3xl sm:text-4xl font-bold font-heading text-[var(--accent-primary)] border-b-2 border-[var(--accent-primary)] pb-2 mt-8 mb-4 scroll-mt-20 ${className ?? ''}`}
        {...props}
      >
        {children}
      </h1>
    )
  },
  h2: ({ className, children, ...props }: ComponentPropsWithoutRef<'h2'>) => {
    const id = slugify(children)
    return (
      <h2
        id={id}
        className={`text-2xl sm:text-3xl font-bold font-heading text-[var(--accent-primary)] border-b border-gray-500/30 pb-1 mt-8 mb-3 scroll-mt-20 ${className ?? ''}`}
        {...props}
      >
        {children}
      </h2>
    )
  },
  h3: ({ className, children, ...props }: ComponentPropsWithoutRef<'h3'>) => {
    const id = slugify(children)
    return (
      <h3
        id={id}
        className={`text-lg sm:text-xl font-bold font-heading text-[var(--accent-secondary)] mt-6 mb-2 scroll-mt-20 ${className ?? ''}`}
        {...props}
      >
        {children}
      </h3>
    )
  },
  p: ({ className, ...props }: ComponentPropsWithoutRef<'p'>) => (
    <p
      className={`font-sans text-[1.05rem] text-[var(--text-main)] leading-[1.75] my-4 ${className ?? ''}`}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<'ul'>) => (
    <ul className={`list-disc list-inside font-sans text-[1.05rem] leading-[1.75] my-4 space-y-1 ${className ?? ''}`} {...props} />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<'ol'>) => (
    <ol className={`list-decimal list-inside font-sans text-[1.05rem] leading-[1.75] my-4 space-y-1 ${className ?? ''}`} {...props} />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<'li'>) => (
    <li className={`text-[var(--text-main)] font-sans ${className ?? ''}`} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className={`border-l-4 border-[var(--accent-primary)] bg-[var(--bg-surface-subtle)] p-4 my-5 font-sans text-[1.02rem] italic shadow-xs text-[var(--text-main)] ${className ?? ''}`}
      {...props}
    />
  ),
  inlineCode: ({ className, ...props }: ComponentPropsWithoutRef<'code'>) => (
    <code
      className={`bg-[var(--terminal-bg)] text-[var(--terminal-text)] border border-gray-700 px-1.5 py-0.5 font-mono text-sm rounded-none ${className ?? ''}`}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<'code'>) => (
    <code
      className={`bg-[var(--terminal-bg)] text-[var(--terminal-text)] font-mono text-sm leading-relaxed ${className ?? ''}`}
      {...props}
    />
  ),
  pre: ({ className, children, ...props }: ComponentPropsWithoutRef<'pre'>) => (
    <div className="my-6 border-2 border-[var(--border-dark)] shadow-md">
      {/* Terminal Title Bar */}
      <div className="bg-[var(--accent-primary)] text-white px-3 py-1 text-xs font-win98 font-bold flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span>📟</span>
          <span>MS-DOS Terminal - [Code Viewer]</span>
        </div>
        <span className="text-[10px] text-white/80">VT100</span>
      </div>
      {/* Code Area */}
      <pre
        className={`terminal-block p-4 overflow-x-auto m-0 rounded-none relative ${className ?? ''}`}
        {...props}
      >
        <div className="text-gray-500 select-none text-xs mb-2 font-mono">C:\PROGRA~1\BLOG&gt; cat code_snippet.txt</div>
        {children}
      </pre>
    </div>
  ),
  // ponytail: theme-aware table components for high contrast MDX tables
  table: ({ className, ...props }: ComponentPropsWithoutRef<'table'>) => (
    <div className="overflow-x-auto my-6 border border-[var(--border-dark)]">
      <table className={`w-full border-collapse text-sm font-sans text-[var(--text-main)] ${className ?? ''}`} {...props} />
    </div>
  ),
  thead: ({ className, ...props }: ComponentPropsWithoutRef<'thead'>) => (
    <thead className={`bg-[var(--bg-surface-subtle)] border-b-2 border-[var(--border-dark)] ${className ?? ''}`} {...props} />
  ),
  tbody: ({ className, ...props }: ComponentPropsWithoutRef<'tbody'>) => (
    <tbody className={`divide-y divide-[var(--border-dark)] ${className ?? ''}`} {...props} />
  ),
  tr: ({ className, ...props }: ComponentPropsWithoutRef<'tr'>) => (
    <tr className={`even:bg-[var(--bg-surface-subtle)]/50 ${className ?? ''}`} {...props} />
  ),
  th: ({ className, ...props }: ComponentPropsWithoutRef<'th'>) => (
    <th className={`px-4 py-2 text-left font-bold text-[var(--accent-primary)] border-r border-[var(--border-dark)] last:border-r-0 ${className ?? ''}`} {...props} />
  ),
  td: ({ className, ...props }: ComponentPropsWithoutRef<'td'>) => (
    <td className={`px-4 py-2 border-r border-[var(--border-dark)] last:border-r-0 ${className ?? ''}`} {...props} />
  ),
}
