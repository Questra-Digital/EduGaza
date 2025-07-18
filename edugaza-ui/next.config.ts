import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Internationalization (if needed)
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development'
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  // Output build tracing
  output: 'standalone',
};

export default withPWA({
  dest: 'public',
  disable: isDev,
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 },
      },
    },
    {
      urlPattern: /^https:\/\/edugaza.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'edugaza',
        expiration: { maxEntries: 50, maxAgeSeconds: 7 * 24 * 60 * 60 },
      },
    },
    {
      urlPattern: /^\/_next\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'next-static',
        expiration: { maxEntries: 100, maxAgeSeconds: 7 * 24 * 60 * 60 },
      },
    },
    {
      urlPattern: /^\/(?!api\/).*$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'html-pages',
        expiration: { maxEntries: 20, maxAgeSeconds: 24 * 60 * 60 },
      },
    },
  ],
})(nextConfig);
