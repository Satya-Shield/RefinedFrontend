/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  trailingSlash: false,

  experimental: {
    runtime: 'nodejs',
  },
};

export default nextConfig;
