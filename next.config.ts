import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "gresham-global-cms.onrender.com",
        pathname: "/media/**",
      },
    ],
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;