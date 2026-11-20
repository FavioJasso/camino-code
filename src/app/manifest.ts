import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Served at /manifest.webmanifest (Next adds the <link rel="manifest">). It gives a home-screen shortcut and
// the browser's own chrome the site's name, colours and icons.
// display "browser": this is a brochure site, not an app. A shortcut opens it in a normal tab, with the
// address bar and back button its outbound links need.
// The icons are written by scripts/render-icons.mjs. Each is a full-bleed Midnight tile with the mark inside
// the safe zone, so the same file serves as it is ("any") and cut to a circle or squircle ("maskable").
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    start_url: "/",
    display: "browser",
    lang: "en",
    theme_color: "#0e1320",
    background_color: "#0e1320",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
