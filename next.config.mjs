/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure images work properly in Replit
  images: {
    unoptimized: true,
  },
  // Allow all hosts and origins for Replit proxy environment
  experimental: {
    allowedHosts: true,
  },
  // Allow cross-origin requests for Replit's proxy
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
