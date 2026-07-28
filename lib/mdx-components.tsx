import { type ComponentPropsWithoutRef } from 'react'

export const MDXComponents = {
  a: ({ className, ...props }: ComponentPropsWithoutRef<'a'>) => (
    <a
      className={`text-[#0000ff] font-semibold underline hover:bg-[#000080] hover:text-white px-0.5 ${className ?? ''}`}
      {...props}
    />
  ),
  h1: ({ className, ...props }: ComponentPropsWithoutRef<'h1'>) => (
    <h1
      className={`text-3xl sm:text-4xl font-bold font-crt text-[#000080] border-b-2 border-[#000080] pb-2 mt-6 mb-4 ${className ?? ''}`}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className={`text-2xl sm:text-3xl font-bold font-crt text-[#000080] border-b border-gray-400 pb-1 mt-8 mb-3 ${className ?? ''}`}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentPropsWithoutRef<'h3'>) => (
    <h3
      className={`text-xl sm:text-2xl font-bold font-crt text-[#006600] mt-6 mb-2 ${className ?? ''}`}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<'p'>) => (
    <p
      className={`font-crt text-lg sm:text-xl text-[#111111] leading-relaxed my-4 ${className ?? ''}`}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<'ul'>) => (
    <ul className={`list-disc list-inside font-crt text-lg sm:text-xl my-4 space-y-1 ${className ?? ''}`} {...props} />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<'ol'>) => (
    <ol className={`list-decimal list-inside font-crt text-lg sm:text-xl my-4 space-y-1 ${className ?? ''}`} {...props} />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<'li'>) => (
    <li className={`text-[#111111] ${className ?? ''}`} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className={`border-l-4 border-[#000080] bg-[#e4e4e4] p-3 my-4 font-crt text-lg italic shadow-inner ${className ?? ''}`}
      {...props}
    />
  ),
  inlineCode: ({ className, ...props }: ComponentPropsWithoutRef<'code'>) => (
    <code
      className={`bg-[#0a0e0a] text-[#00ff66] border border-[#005500] px-1.5 py-0.5 font-mono text-sm rounded-none ${className ?? ''}`}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<'code'>) => (
    <code
      className={`bg-[#0a0e0a] text-[#00ff66] font-mono text-sm sm:text-base leading-relaxed ${className ?? ''}`}
      {...props}
    />
  ),
  pre: ({ className, children, ...props }: ComponentPropsWithoutRef<'pre'>) => (
    <div className="my-6 border-2 border-gray-800 shadow-md">
      {/* Terminal Title Bar */}
      <div className="bg-[#000080] text-white px-3 py-1 text-xs font-mono font-bold flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span>📟</span>
          <span>MS-DOS Terminal - [Code Viewer]</span>
        </div>
        <span className="text-[10px] text-gray-300">VT100</span>
      </div>
      {/* Code Area with CRT scanlines & WCAG AA Green/Cyan contrast */}
      <pre
        className={`terminal-block p-4 overflow-x-auto m-0 rounded-none relative ${className ?? ''}`}
        {...props}
      >
        <div className="text-gray-500 select-none text-xs mb-2 font-mono">C:\PROGRA~1\BLOG&gt; cat code_snippet.txt</div>
        {children}
      </pre>
    </div>
  ),
}
