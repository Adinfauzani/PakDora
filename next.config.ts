import type { NextConfig } from 'next'
import { withContentlayer } from 'next-contentlayer2'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
    ],
  },
  turbopack: {},
}

export default withContentlayer(nextConfig)
