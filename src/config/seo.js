// SEO Configuration for Camino Code
export const seoConfig = {
  defaultTitle: 'Camino Code - Code the Future | Data Science & Web Development',
  titleTemplate: '%s | Camino Code',
  defaultDescription: 'Camino Code combines cutting-edge data science and web development to create innovative, future-ready digital solutions for businesses worldwide.',
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
      'data science',
      'web development',
      'machine learning',
      'artificial intelligence',
      'custom software',
      'digital transformation',
      'analytics',
      'business intelligence',
      'full stack development',
      'cloud solutions'
    ],
    services: [
      'data analytics services',
      'web application development',
      'API development',
      'database design',
      'cloud migration',
      'AI solutions',
      'predictive analytics',
      'business automation',
      'custom CRM',
      'e-commerce development'
    ],
    about: [
      'tech company',
      'innovation',
      'digital agency',
      'software consultancy',
      'technology partners',
      'expert developers',
      'data scientists',
      'agile development',
      'tech solutions'
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
    title: 'Camino Code - Code the Future | Data Science & Web Development',
    description: 'Transform your business with cutting-edge data science and web development solutions. We create innovative, scalable, and future-ready digital products.',
    keywords: seoConfig.keywords.default,
    ogImage: '/og-images/home.jpg'
  },
  about: {
    title: 'About Us - Innovation Through Technology',
    description: 'Learn about Camino Code\'s mission to revolutionize businesses through data-driven insights and exceptional web development. Meet our team of experts.',
    keywords: seoConfig.keywords.about,
    ogImage: '/og-images/about.jpg'
  },
  services: {
    title: 'Our Services - Data Science & Web Development Solutions',
    description: 'Explore our comprehensive range of services including data analytics, machine learning, custom web development, and digital transformation solutions.',
    keywords: seoConfig.keywords.services,
    ogImage: '/og-images/services.jpg'
  },
  caseStudies: {
    title: 'Case Studies - Success Stories & Client Projects',
    description: 'Discover how we\'ve helped businesses achieve remarkable results through innovative data science and web development solutions. Real results, real impact.',
    keywords: [...seoConfig.keywords.default, 'portfolio', 'case studies', 'success stories', 'client projects'],
    ogImage: '/og-images/case-studies.jpg'
  },
  caseStudyDetailed: {
    title: 'E-commerce Analytics Platform Case Study',
    description: 'Deep dive into how we increased customer retention by 30% through predictive analytics and custom web solutions for a leading e-commerce platform.',
    keywords: ['case study', 'e-commerce', 'predictive analytics', 'customer retention', 'data visualization'],
    ogImage: '/og-images/case-study-detail.jpg'
  },
  contact: {
    title: 'Contact Us - Get Started with Your Project',
    description: 'Ready to transform your business? Get in touch with our team for a free consultation on data science and web development solutions.',
    keywords: seoConfig.keywords.contact,
    ogImage: '/og-images/contact.jpg'
  },
  allModels: {
    title: '3D Models Showcase - Interactive Visualizations',
    description: 'Explore our collection of interactive 3D models and visualizations showcasing our technical capabilities in web-based 3D rendering.',
    keywords: ['3D models', 'WebGL', 'Three.js', 'interactive', 'visualization', '3D rendering'],
    ogImage: '/og-images/models.jpg'
  }
};