import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development'
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  // Output build tracing
  output: 'standalone',
};

export default nextConfig
