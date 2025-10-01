import { pageMetadata } from '@/config/seo';

export const metadata = {
  title: pageMetadata.caseStudyDetailed.title,
  description: pageMetadata.caseStudyDetailed.description,
  keywords: pageMetadata.caseStudyDetailed.keywords,
  openGraph: {
    title: pageMetadata.caseStudyDetailed.title,
    description: pageMetadata.caseStudyDetailed.description,
    images: [pageMetadata.caseStudyDetailed.ogImage],
  },
  twitter: {
    title: pageMetadata.caseStudyDetailed.title,
    description: pageMetadata.caseStudyDetailed.description,
    images: [pageMetadata.caseStudyDetailed.ogImage],
  },
  alternates: {
    canonical: 'https://caminocode.com/case-study-detailed',
  },
};