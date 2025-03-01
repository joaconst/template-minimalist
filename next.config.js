/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["unsplash.com", "images.unsplash.com", "drive.google.com"]
  },
};

module.exports = nextConfig;
