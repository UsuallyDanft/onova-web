const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    allowedHosts: true,
  },
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
    ]
  },
}

export default nextConfig;