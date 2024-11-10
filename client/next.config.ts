import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_SERVER_HOST}/:path*`,
      },
    ]
  },
  images: {
    domains: ['i.scdn.co'],
  },
};


export default nextConfig;
