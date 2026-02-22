import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["http://127.0.0.1:60353", "http://127.0.0.1", "http://localhost:3000", "127.0.0.1"],
};

export default nextConfig;
