import { withContentlayer } from 'next-contentlayer'

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
}

export default withContentlayer(nextConfig)
