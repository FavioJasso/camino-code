import type { NextConfig } from "next";

const permanent = (source: string, destination: string) => ({ source, destination, permanent: true });

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      permanent("/case-studies", "/work"),
      permanent("/case-study/transparent-energy", "/work/transparent-energy"),
      permanent("/case-study/victorias-painting", "/work"),
      permanent("/case-study/daniel-avila", "/work"),
      permanent("/case-study/healthtrack", "/work"),
      permanent("/services", "/#services"),
      permanent("/contact", "/discovery"),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
