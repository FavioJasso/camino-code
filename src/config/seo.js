// SEO Configuration for Camino Code
export const seoConfig = {
  defaultTitle: 'Camino Code - Code the Future | Applied AI Services',
  titleTemplate: '%s | Camino Code',
  defaultDescription: 'Camino Code builds AI-powered platforms and delivers Applied AI services. We create proprietary technology that continuously improves through real-world application for businesses worldwide.',
  siteUrl: 'https://caminocode.com',
  siteName: 'Camino Code',
  siteLanguage: 'en',
  siteLocale: 'en_US',
  twitterHandle: '@caminocode',
  twitterCardType: 'summary_large_image',
  googleSiteVerification: '', // Add your Google verification code
  bingSiteVerification: '', // Add your Bing verification code
  yandexVerification: '', // Add your Yandex verification code

  // Organization details for structured data
  organization: {
    name: 'Camino Code',
    url: 'https://caminocode.com',
    logo: 'https://caminocode.com/assets/logo.svg',
    sameAs: [
      'https://www.linkedin.com/company/caminocode',
      'https://www.instagram.com/caminocode',
      'https://twitter.com/caminocode',
      'https://github.com/caminocode'
    ],
    contactPoint: {
      telephone: '+1-XXX-XXX-XXXX',
      contactType: 'customer service',
      email: 'contact@caminocode.com',
      areaServed: 'Worldwide',
      availableLanguage: ['English']
    },
    address: {
      addressCountry: 'US',
      addressLocality: 'Your City',
      addressRegion: 'Your State',
      postalCode: 'XXXXX',
      streetAddress: 'Your Street Address'
    }
  },

  // Default Open Graph images
  defaultOgImage: 'https://caminocode.com/og-image.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,

  // Keywords for different sections
  keywords: {
    default: [
      'applied AI',
      'artificial intelligence',
      'machine learning',
      'AI automation',
      'data intelligence',
      'intelligent systems',
      'AI platforms',
      'business intelligence',
      'predictive analytics',
      'AI-powered solutions'
    ],
    services: [
      'applied AI services',
      'AI automation',
      'intelligent systems',
      'data engineering',
      'machine learning models',
      'AI integration',
      'predictive analytics',
      'business automation',
      'AI platforms',
      'computer vision'
    ],
    about: [
      'AI company',
      'innovation',
      'AI services',
      'AI consultancy',
      'technology partners',
      'AI engineers',
      'data scientists',
      'product development',
      'AI solutions'
    ],
    contact: [
      'hire developers',
      'contact',
      'get quote',
      'consultation',
      'project inquiry',
      'partnership',
      'collaboration'
    ]
  }
};

// Individual page metadata
export const pageMetadata = {
  home: {
    title: 'Camino Code - Code the Future | Applied AI Services',
    description: 'At Camino Code, we build AI-powered platforms and use them to deliver Applied AI services. Our clients benefit from proprietary technology that\'s continuously improving through real-world application.',
    keywords: seoConfig.keywords.default,
    ogImage: '/og-images/home.jpg'
  },
  about: {
    title: 'About Us - Innovation Through Technology',
    description: 'Learn about Camino Code\'s mission to revolutionize businesses through AI-powered platforms and applied intelligence solutions. Meet our team of AI experts and data scientists.',
    keywords: seoConfig.keywords.about,
    ogImage: '/og-images/about.jpg'
  },
  services: {
    title: 'Our Services - Applied AI & Intelligent Systems',
    description: 'Explore our comprehensive range of Applied AI services including intelligent automation, machine learning, data engineering, and AI-powered platform development.',
    keywords: seoConfig.keywords.services,
    ogImage: '/og-images/services.jpg'
  },
  caseStudies: {
    title: 'Case Studies - Success Stories & Client Projects',
    description: 'Discover how we\'ve helped businesses achieve remarkable results through innovative Applied AI and intelligent automation solutions. Real results, real impact.',
    keywords: [...seoConfig.keywords.default, 'portfolio', 'case studies', 'success stories', 'client projects'],
    ogImage: '/og-images/case-studies.jpg'
  },
  caseStudyDetailed: {
    title: 'E-commerce Analytics Platform Case Study',
    description: 'Deep dive into how we increased customer retention by 30% through predictive analytics and AI-powered solutions for a leading e-commerce platform.',
    keywords: ['case study', 'e-commerce', 'predictive analytics', 'customer retention', 'data visualization'],
    ogImage: '/og-images/case-study-detail.jpg'
  },
  contact: {
    title: 'Contact Us - Get Started with Your Project',
    description: 'Ready to transform your business? Get in touch with our team for a free consultation on Applied AI services and intelligent automation solutions.',
    keywords: seoConfig.keywords.contact,
    ogImage: '/og-images/contact.jpg'
  },
  allModels: {
    title: '3D Models Showcase - Interactive Visualizations',
    description: 'Explore our collection of interactive 3D models and visualizations showcasing our technical capabilities in AI-powered interactive experiences.',
    keywords: ['3D models', 'WebGL', 'Three.js', 'interactive', 'visualization', '3D rendering'],
    ogImage: '/og-images/models.jpg'
  }
};