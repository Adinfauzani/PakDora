import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
