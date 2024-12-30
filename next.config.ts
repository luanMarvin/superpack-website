import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'inapak.com', // <- Esse é o site que guarda as imagens estáticas dso produtos (sample);
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
