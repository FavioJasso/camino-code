import { pageMetadata } from '@/config/seo';

export const metadata = {
  title: pageMetadata.contact.title,
  description: pageMetadata.contact.description,
  keywords: pageMetadata.contact.keywords,
  openGraph: {
    title: pageMetadata.contact.title,
    description: pageMetadata.contact.description,
    images: [pageMetadata.contact.ogImage],
  },
  twitter: {
    title: pageMetadata.contact.title,
    description: pageMetadata.contact.description,
    images: [pageMetadata.contact.ogImage],
  },
  alternates: {
    canonical: 'https://caminocode.com/contact',
  },
};