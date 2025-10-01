import { pageMetadata } from '@/config/seo';

export const metadata = {
  title: pageMetadata.services.title,
  description: pageMetadata.services.description,
  keywords: pageMetadata.services.keywords,
  openGraph: {
    title: pageMetadata.services.title,
    description: pageMetadata.services.description,
    images: [pageMetadata.services.ogImage],
  },
  twitter: {
    title: pageMetadata.services.title,
    description: pageMetadata.services.description,
    images: [pageMetadata.services.ogImage],
  },
  alternates: {
    canonical: 'https://caminocode.com/services',
  },
};