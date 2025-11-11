/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,

  // Remove console logs in production and optimize transforms
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Modern browser target - avoid unnecessary polyfills
  transpilePackages: [],

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental features for performance
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@react-three/fiber',
      '@react-three/drei',
      'gsap',
    ],
  },

  // Headers for performance and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/build/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.{jpg,jpeg,png,gif,webp,avif,ico,svg}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
