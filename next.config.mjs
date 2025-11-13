/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
    return [
      {
        source: '/api_bk/:path*',
        destination: 'http://34.93.122.16:8000/api/:path*',
      },
    ]
  },
};

export default nextConfig;
