import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { HistoryRepair } from "@/components/HistoryRepair";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SkipLink } from "@/components/SkipLink";
import { OG_IMAGE, SITE_URL } from "@/content/seo";
import { site } from "@/content/site";
import { ORGANIZATION_ID } from "@/lib/structured-data";
import "./globals.css";

const archivo = localFont({
  src: "../fonts/Archivo-Variable.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

const martianMono = localFont({
  src: "../fonts/MartianMono-Variable.woff2",
  variable: "--font-martian",
  weight: "100 800",
  // preloaded, so it is used whenever it arrives in time (and from the second page on); a slow first
  // visit keeps the fallback instead of re-wrapping the breadcrumb and labels once it lands (layout shift)
  display: "optional",
  declarations: [{ prop: "font-stretch", value: "75% 112.5%" }],
});

const DESCRIPTION = "Software, data and AI consultancy based in Newark, New Jersey.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Camino Code",
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
};

export const viewport: Viewport = { themeColor: "#0e1320" };

const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORGANIZATION_ID,
  name: site.name,
  url: SITE_URL,
  description: DESCRIPTION,
  email: site.contact.email,
  telephone: site.contact.phone,
  image: `${SITE_URL}${OG_IMAGE.url}`,
  logo: `${SITE_URL}/icon-512.png`,
  founder: { "@type": "Person", name: "Favio Jasso" },
  sameAs: [site.social.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Newark",
    addressRegion: "NJ",
    addressCountry: "US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-scroll-behavior: globals.css scrolls smoothly inside a page; this tells Next to jump, not glide, on a route change
    <html lang="en" data-scroll-behavior="smooth" className={`${archivo.variable} ${martianMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        {/* the organization comes first, so it is the first ld+json script on every page; pages add theirs inside main */}
        <JsonLd data={organization} />
        <SkipLink />
        {/* draws nothing: keeps Back and Forward working around jumps within a page */}
        <HistoryRepair />
        <SiteHeader />
        {/* no tabIndex here: the skip link makes main focusable only while it holds focus (SkipLink.tsx) */}
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
