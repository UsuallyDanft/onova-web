const nextConfig = {
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    "*.worf.replit.dev",
    "*.replit.dev",
    "*.replit.com", 
    "127.0.0.1",
    "localhost"
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
        ],
      },
      // Only add no-cache to API routes and dynamic pages in development
      {
        source: '/api/:path*',
        headers: [
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