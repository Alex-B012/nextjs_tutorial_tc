import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year in seconds
    contentDispositionType: "inline",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 512],
    // localPatterns: [{ pathname: "assets/avatars/**" }],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**.kinopoisk.ru",
        port: "",
      },
    ],
  },
  cacheComponents: true,
};

export default nextConfig;
