import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL } from "@/content/seo";
import { site } from "@/content/site";
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
  variable: "--font-mono",
  weight: "100 800",
  display: "swap",
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
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Camino Code" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: SITE_URL,
  description: DESCRIPTION,
  email: site.contact.email,
  telephone: site.contact.phone,
  image: `${SITE_URL}/og.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Newark",
    addressRegion: "NJ",
    addressCountry: "US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${martianMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={organization} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
