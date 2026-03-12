import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local Payload CMS (development)
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/api/media/file/**",
      },

      // Render Payload CMS (production)
      {
        protocol: "https",
        hostname: "gresham-global-cms.onrender.com",
        pathname: "/api/media/file/**",
      },
    ],

    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;