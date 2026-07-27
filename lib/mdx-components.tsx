import { type ComponentPropsWithoutRef } from 'react'

export const MDXComponents = {
  a: ({ className, ...props }: ComponentPropsWithoutRef<'a'>) => (
    <a className={`text-sky-400 hover:text-sky-300 ${className ?? ''}`} {...props} />
  ),
  h1: ({ className, ...props }: ComponentPropsWithoutRef<'h1'>) => (
    <h1 className={`text-4xl font-bold tracking-tight text-white ${className ?? ''}`} {...props} />
  ),
  h2: ({ className, ...props }: ComponentPropsWithoutRef<'h2'>) => (
    <h2 className={`mt-10 text-3xl font-semibold text-white ${className ?? ''}`} {...props} />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<'p'>) => (
    <p className={`leading-8 text-slate-200 ${className ?? ''}`} {...props} />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<'code'>) => (
    <code className={`rounded bg-slate-800 px-1 py-0.5 font-mono text-sm text-sky-300 ${className ?? ''}`} {...props} />
  ),
  pre: ({ className, ...props }: ComponentPropsWithoutRef<'pre'>) => (
    <pre className={`rounded-xl bg-slate-900 p-4 overflow-x-auto ${className ?? ''}`} {...props} />
  ),
}
