import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Portable: `next start` works on Vercel AND on a Raspberry Pi behind
  // Cloudflare Tunnel (`docker build` + `docker run -p 3000:3000`).
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
