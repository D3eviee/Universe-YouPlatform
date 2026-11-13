import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.3'],
  images:{
    qualities: [30, 75, 90],
    remotePatterns: [{
        protocol: 'https',
        hostname: 'universeandyou.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**',
    }]
  }
};

export default nextConfig;
