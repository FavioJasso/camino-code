import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { seoConfig } from "@/config/seo";

export const metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.defaultDescription,
  keywords: seoConfig.keywords.default,
  authors: [{ name: "Camino Code Team" }],
  creator: "Camino Code",
  publisher: "Camino Code",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    images: [
      {
        url: seoConfig.defaultOgImage,
        width: seoConfig.ogImageWidth,
        height: seoConfig.ogImageHeight,
        alt: "Camino Code - Data Science & Web Development",
      },
    ],
    locale: seoConfig.siteLocale,
    type: "website",
  },
  twitter: {
    card: seoConfig.twitterCardType,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    site: seoConfig.twitterHandle,
    creator: seoConfig.twitterHandle,
    images: [seoConfig.defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: seoConfig.siteUrl,
  },
  verification: {
    google: seoConfig.googleSiteVerification,
    other: {
      me: ["contact@caminocode.com"],
      "msvalidate.01": seoConfig.bingSiteVerification,
    },
  },
  category: "technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang={seoConfig.siteLanguage}>
      <body className="cursor-none">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
