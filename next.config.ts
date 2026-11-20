import type { NextConfig } from "next";

const permanent = (source: string, destination: string) => ({ source, destination, permanent: true });

const isDev = process.env.NODE_ENV === "development";
// Vercel sets VERCEL_ENV at build time; only preview deployments carry the comment toolbar
const isPreview = process.env.VERCEL_ENV === "preview";

/*
 * Content-Security-Policy. The pages are prerendered, so there are no per-request nonces:
 * inline scripts (Next's bootstrap and flight data) and inline styles are allowed, and every
 * source is limited to this origin plus exactly what each environment loads.
 *
 * - Production: everything is same-origin. Vercel Web Analytics and Speed Insights load their
 *   scripts from /_vercel/... on this origin and post to it.
 * - Development: React needs eval, hot reload needs a websocket, and the two Vercel packages
 *   load their debug scripts from va.vercel-scripts.com.
 * - Preview deployments: the Vercel toolbar (vercel.live and the origins Vercel documents for it).
 *
 * The live scene (three.js) draws to a canvas with WebGL and starts no worker and loads no
 * blob: or data: resource, so worker-src stays at 'self'.
 * tests/e2e/csp.spec.ts fails on any violation; keep it green when this list changes.
 */
const sources = (...lists: Array<string | false>) => lists.filter(Boolean).join(" ");

const csp = [
  "default-src 'self'",
  `script-src ${sources("'self' 'unsafe-inline'", isDev && "'unsafe-eval' https://va.vercel-scripts.com", isPreview && "https://vercel.live")}`,
  `style-src ${sources("'self' 'unsafe-inline'", isPreview && "https://vercel.live")}`,
  `img-src ${sources("'self'", isDev && "data: blob:", isPreview && "data: blob: https://vercel.live https://vercel.com")}`,
  `font-src ${sources("'self'", isPreview && "https://vercel.live https://assets.vercel.com")}`,
  `connect-src ${sources("'self'", isDev && "ws: wss:", isPreview && "https://vercel.live wss://ws-us3.pusher.com")}`,
  `frame-src ${isPreview ? "https://vercel.live" : "'none'"}`,
  "worker-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

/* Browser features the site never asks for, switched off for this origin and any frame. */
const permissionsPolicy = [
  "accelerometer",
  "camera",
  "display-capture",
  "geolocation",
  "gyroscope",
  "magnetometer",
  "microphone",
  "midi",
  "payment",
  "usb",
]
  .map((feature) => `${feature}=()`)
  .join(", ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      permanent("/case-studies", "/work"),
      permanent("/case-study/transparent-energy", "/work/transparent-energy"),
      permanent("/case-study/victorias-painting", "/work/victorias-painting"),
      permanent("/case-study/daniel-avila", "/work/daniel-avila"),
      permanent("/case-study/daniel-avila-64", "/work/daniel-avila-64"),
      // last of the case-study rows (the first match wins): retired template pages, typos and the bare path
      permanent("/case-study/:slug*", "/work"),
      permanent("/contact", "/discovery"),
      // files the old site served: installed shortcuts and cached share cards may still ask for them
      permanent("/manifest.json", "/manifest.webmanifest"),
      permanent("/og-images/og-image.png", "/og.png"),
      permanent("/assets/icon.png", "/icon-512.png"),
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
          { key: "Content-Security-Policy", value: csp },
          { key: "Permissions-Policy", value: permissionsPolicy },
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
