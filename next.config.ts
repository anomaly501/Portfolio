import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",       // Static HTML export for GitHub Pages
  trailingSlash: true,    // Ensures paths work on GH Pages
  images: {
    unoptimized: true,    // GH Pages can't run Next.js Image Optimization
  },
};

export default nextConfig;
