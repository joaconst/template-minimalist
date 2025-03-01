/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["unsplash.com", "images.unsplash.com"]
  },
};

module.exports = nextConfig;
