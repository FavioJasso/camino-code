import { pageMetadata } from '@/config/seo';

export const metadata = {
  title: pageMetadata.allModels.title,
  description: pageMetadata.allModels.description,
  keywords: pageMetadata.allModels.keywords,
  openGraph: {
    title: pageMetadata.allModels.title,
    description: pageMetadata.allModels.description,
    images: [pageMetadata.allModels.ogImage],
  },
  twitter: {
    title: pageMetadata.allModels.title,
    description: pageMetadata.allModels.description,
    images: [pageMetadata.allModels.ogImage],
  },
  alternates: {
    canonical: 'https://caminocode.com/all-models',
  },
};