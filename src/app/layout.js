import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { seoConfig } from "@/config/seo";
import { poppins } from "./fonts";
import NonCriticalStyles from "@/components/NonCriticalStyles";
import StructuredData from "@/components/StructuredData";
import PreloadResources from "@/components/PreloadResources";

export const metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.defaultDescription,
  keywords: seoConfig.keywords.default,
  authors: [{ name: "Camino Code Team", url: "https://caminocode.com" }],
  creator: "Camino Code",
  publisher: "Camino Code",
  applicationName: "Camino Code",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
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
        alt: "Camino Code - AI-Powered Platforms & Applied AI Services",
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
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: seoConfig.siteUrl,
    languages: {
      "en-US": seoConfig.siteUrl,
    },
  },
  appleWebApp: {
    capable: true,
    title: "Camino Code",
    statusBarStyle: "black-translucent",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Camino Code",
    "theme-color": "#000000",
    "color-scheme": "dark light",
  },
  verification: {
    google: seoConfig.googleSiteVerification,
    yandex: seoConfig.yandexVerification,
    other: {
      me: ["contact@caminocode.com"],
      "msvalidate.01": seoConfig.bingSiteVerification,
    },
  },
  category: "technology",
  classification: "Business",
};

export default function RootLayout({ children }) {
  return (
    <html lang={seoConfig.siteLanguage} className={poppins.variable}>
      <head>
        <PreloadResources />
        <StructuredData />
      </head>
      <body className="cursor-none font-sans">
        {children}
        <NonCriticalStyles />
        <Analytics />
      </body>
    </html>
  );
}
