import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [70, 72, 75, 80],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  ...(isDev && { allowedDevOrigins: ["127.0.0.1", "localhost"] }),
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
