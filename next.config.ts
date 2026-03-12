import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/api/media/**",
      },
    ],

    dangerouslyAllowLocalIP: true, // ✅ allow localhost images
  },
};

export default nextConfig;