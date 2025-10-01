import { pageMetadata } from '@/config/seo';

export const metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
  keywords: pageMetadata.about.keywords,
  openGraph: {
    title: pageMetadata.about.title,
    description: pageMetadata.about.description,
    images: [pageMetadata.about.ogImage],
  },
  twitter: {
    title: pageMetadata.about.title,
    description: pageMetadata.about.description,
    images: [pageMetadata.about.ogImage],
  },
  alternates: {
    canonical: 'https://caminocode.com/about',
  },
};