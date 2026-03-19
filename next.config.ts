// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "3002",
//         pathname: "/api/media/file/**",
//       },
//       {
//         protocol: "https",
//         hostname: "gresham-global-cms.onrender.com",
//         pathname: "/api/media/file/**",
//       },
//     ],
//     dangerouslyAllowLocalIP: true,
//   },
// };

// export default nextConfig;






import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // disables Next.js image optimization — fixes all external image loading
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gresham-global-cms.onrender.com",
        pathname: "/**", // allow ALL paths from this host
      },
    ],
  },
};

export default nextConfig;
