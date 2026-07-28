import createMDX from '@next/mdx'

// ponytail: minimal Next.js config with MDX support
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({})

export default withMDX(nextConfig)

