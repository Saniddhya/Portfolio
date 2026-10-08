import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,

  images: {
    unoptimized: true,
  },

  // Static generation runs in-process rather than in per-page workers. The
  // default workers inherit a small heap cap on this machine and abort with
  // "JavaScript heap out of memory" partway through page generation.
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;