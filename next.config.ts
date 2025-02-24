import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
      },
      {
        hostname: "m.media-amazon.com",
      },
      {
      
        hostname: 'img.freepik.com',
      },
    
    ],
  },
};

export default nextConfig;
