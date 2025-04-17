/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['dtkyyprfsrfuulcjzxw.supabase.co', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dtkyyprfsrfuulcjzxw.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
