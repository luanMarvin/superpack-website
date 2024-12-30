import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'inapak.com', // <- Esse é o site que guarda as imagens estáticas dos produtos (sample);
        pathname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_USER_TOKEN: process.env.NEXT_PUBLIC_USER_TOKEN, // Adicionado para expor a variável ao cliente
  },
};

export default nextConfig;
