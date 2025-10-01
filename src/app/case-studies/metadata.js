import { pageMetadata } from '@/config/seo';

export const metadata = {
  title: pageMetadata.caseStudies.title,
  description: pageMetadata.caseStudies.description,
  keywords: pageMetadata.caseStudies.keywords,
  openGraph: {
    title: pageMetadata.caseStudies.title,
    description: pageMetadata.caseStudies.description,
    images: [pageMetadata.caseStudies.ogImage],
  },
  twitter: {
    title: pageMetadata.caseStudies.title,
    description: pageMetadata.caseStudies.description,
    images: [pageMetadata.caseStudies.ogImage],
  },
  alternates: {
    canonical: 'https://caminocode.com/case-studies',
  },
};