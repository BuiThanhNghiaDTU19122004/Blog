import createMDX from '@next/mdx'

// ponytail: minimal Next.js config with MDX support
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      {
        source: '/posts/:slug*',
        destination: '/en/posts/:slug*',
        permanent: true,
      },
    ]
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-frontmatter', 'remark-mdx-frontmatter'],
  },
})

export default withMDX(nextConfig)
