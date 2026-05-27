import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — Netlify serves the `out/` directory as plain HTML.
  // All routes pre-render at build time; no SSR runtime required.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
