import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Naikkan limit body untuk upload foto (default 1MB)
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
