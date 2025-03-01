/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["unsplash.com", "images.unsplash.com", "drive.google.com"],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      bufferutil: false,
      "utf-8-validate": false,
    };
    return config;
  },
};

module.exports = nextConfig;
