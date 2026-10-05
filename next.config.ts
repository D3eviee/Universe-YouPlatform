import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.3'],
  images:{
    remotePatterns: [{
        protocol: 'https',
        hostname: 'universeandyou.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**',
    }]
  }
};

export default nextConfig;
