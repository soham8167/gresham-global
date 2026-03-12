import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local Payload CMS (development)
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/media-news/**",
      },

      // Render Payload CMS (production)
      {
        protocol: "https",
        hostname: "gresham-global-cms.onrender.com",
        pathname: "/media-news/**",
      },
    ],

    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;