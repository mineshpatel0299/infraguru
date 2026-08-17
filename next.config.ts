import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "infraguru.in" },
    ],
  },
  experimental: {
    serverActions: {
      // Default is 1MB — the gallery's video upload action needs headroom
      // for real video files (uploaded straight through to Cloudinary).
      bodySizeLimit: "100mb",
    },
  },
};

export default nextConfig;
