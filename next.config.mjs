const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    allowedHosts: true,
  },
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "*.replit.dev",
    "*.replit.com"
  ],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  },
}

export default nextConfig;