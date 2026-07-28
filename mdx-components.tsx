import type { MDXComponents } from 'mdx/types'
import { MDXComponents as customComponents } from '@/lib/mdx-components'

// ponytail: required by Next.js App Router @next/mdx integration
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...customComponents,
    ...components,
  }
}
