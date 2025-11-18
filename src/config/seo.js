// SEO Configuration for Camino Code
export const seoConfig = {
  defaultTitle: 'Camino Code - Code the Future | AI-Powered Platforms & Applied AI',
  titleTemplate: '%s | Camino Code',
  defaultDescription: 'At Camino Code, we build AI-powered platforms and use them to deliver Applied AI services. Our clients benefit from proprietary technology that\'s continuously improving through real-world application. We\'re not reselling tools—we\'re creating them.',
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
    logo: 'https://caminocode.com/favicon.ico',
    sameAs: [
      'https://www.linkedin.com/company/caminocode',

    ],
    contactPoint: {
      telephone: '+1-XXX-XXX-XXXX',
      contactType: 'customer service',
      email: 'info@caminocode.com',
      areaServed: 'Worldwide',
      availableLanguage: ['English']
    },
    address: {
      addressCountry: 'US',
      addressLocality: 'Newark',
      addressRegion: 'NJ',
      postalCode: '07102',
      streetAddress: 'Newark, New Jersey'
    }
  },

  // Default Open Graph images
  defaultOgImage: 'https://caminocode.com/og-images/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,

  // Keywords for different sections
  keywords: {
    default: [
      'AI-powered platforms',
      'applied AI',
      'proprietary technology',
      'intelligent automation',
      'artificial intelligence',
      'machine learning',
      'continuously improving AI',
      'AI platforms',
      'data intelligence',
      'intelligent systems'
    ],
    services: [
      'applied AI services',
      'advanced AI',
      'intelligent automation',
      'AI-powered platforms',
      'data intelligence',
      'product engineering',
      'machine learning',
      'AI integration',
      'intelligent systems',
      'scalable AI solutions'
    ],
    about: [
      'AI company',
      'applied AI',
      'intelligent automation',
      'AI-powered platforms',
      'scalable solutions',
      'intelligent platforms',
      'technology innovation',
      'AI engineers',
      'data scientists',
      'proprietary technology'
    ],
    contact: [
      'AI consultation',
      'applied AI services',
      'contact',
      'get quote',
      'project inquiry',
      'partnership',
      'collaboration',
      'transform ideas'
    ]
  }
};

// Individual page metadata
export const pageMetadata = {
  home: {
    title: 'Camino Code - Code the Future | AI-Powered Platforms & Applied AI',
    description: 'At Camino Code, we build AI-powered platforms and use them to deliver Applied AI services. Our clients benefit from proprietary technology that\'s continuously improving through real-world application. We\'re not reselling tools—we\'re creating them.',
    keywords: seoConfig.keywords.default,
    ogImage: '/og-images/home.jpg'
  },
  about: {
    title: 'About Us - Applied AI & Intelligent Automation',
    description: 'At Camino Code, we specialize in delivering Applied AI and Intelligent automation solutions. Our goal is to empower businesses with AI-powered, Scalable, and Intelligent platforms that drive growth and efficiency.',
    keywords: seoConfig.keywords.about,
    ogImage: '/og-images/about.jpg'
  },
  services: {
    title: 'Our Services - Advanced AI, Data Intelligence & Product Engineering',
    description: 'Empowering businesses with Advanced AI, Data intelligence and Product engineering. We transform your vision into reality with cutting-edge solutions that scale.',
    keywords: seoConfig.keywords.services,
    ogImage: '/og-images/services.jpg'
  },
  caseStudies: {
    title: 'Case Studies - High-Quality, Innovative AI Solutions',
    description: 'At Camino Code, we take pride in delivering High-quality, Innovative solutions in Data Science and Web Development. Our portfolio showcases transformative projects that enhance business efficiency and performance.',
    keywords: [...seoConfig.keywords.default, 'portfolio', 'case studies', 'success stories', 'client projects', 'data science', 'web development'],
    ogImage: '/og-images/case-studies.jpg'
  },
  caseStudyDetailed: {
    title: 'E-commerce Analytics Platform Case Study',
    description: 'Deep dive into how we increased customer retention by 30% through predictive analytics and AI-powered solutions for a leading e-commerce platform.',
    keywords: ['case study', 'e-commerce', 'predictive analytics', 'customer retention', 'data visualization', 'AI-powered platforms'],
    ogImage: '/og-images/case-study-detail.jpg'
  },
  contact: {
    title: 'Contact Us - Transform Your Ideas Into Reality',
    description: 'We\'d love to hear from you! Whether you have questions about our services or want to discuss your next big project, our team is ready to help transform your ideas into reality with Applied AI and intelligent automation.',
    keywords: seoConfig.keywords.contact,
    ogImage: '/og-images/contact.jpg'
  },
  allModels: {
    title: '3D Models Showcase - Interactive AI-Powered Visualizations',
    description: 'Explore our collection of interactive 3D models and visualizations showcasing our technical capabilities in AI-powered interactive experiences and intelligent systems.',
    keywords: ['3D models', 'WebGL', 'Three.js', 'interactive', 'visualization', '3D rendering', 'AI-powered'],
    ogImage: '/og-images/models.jpg'
  }
};