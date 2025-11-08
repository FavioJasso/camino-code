"use client";

import Script from 'next/script';
import { seoConfig } from '@/config/seo';

export default function StructuredData({ page = 'home', customData = null }) {
  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoConfig.organization.name,
    url: seoConfig.organization.url,
    logo: seoConfig.organization.logo,
    sameAs: seoConfig.organization.sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: seoConfig.organization.contactPoint.telephone,
      contactType: seoConfig.organization.contactPoint.contactType,
      email: seoConfig.organization.contactPoint.email,
      areaServed: seoConfig.organization.contactPoint.areaServed,
      availableLanguage: seoConfig.organization.contactPoint.availableLanguage,
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: seoConfig.organization.address.addressCountry,
      addressLocality: seoConfig.organization.address.addressLocality,
      addressRegion: seoConfig.organization.address.addressRegion,
      postalCode: seoConfig.organization.address.postalCode,
      streetAddress: seoConfig.organization.address.streetAddress,
    },
  };

  // WebSite Schema with Search
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${seoConfig.siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // Local Business Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': seoConfig.siteUrl,
    name: seoConfig.organization.name,
    url: seoConfig.siteUrl,
    logo: seoConfig.organization.logo,
    image: seoConfig.defaultOgImage,
    description: seoConfig.defaultDescription,
    address: {
      '@type': 'PostalAddress',
      ...seoConfig.organization.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.7128', // Update with actual coordinates
      longitude: '-74.0060', // Update with actual coordinates
    },
    telephone: seoConfig.organization.contactPoint.telephone,
    email: seoConfig.organization.contactPoint.email,
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Technology Consulting',
    provider: {
      '@type': 'Organization',
      name: seoConfig.organization.name,
      url: seoConfig.siteUrl,
    },
    areaServed: {
      '@type': 'Text',
      name: 'Worldwide',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Technology Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Applied AI Systems',
            description:
              'AI-powered solutions including natural language processing, computer vision, generative AI, and intelligent automation for business workflows.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Data Intelligence & Engineering',
            description:
              'Data pipeline design, predictive analytics, visualization dashboards, and scalable database architecture to transform raw data into actionable intelligence.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Product Engineering',
            description:
              'End-to-end product development including web and mobile apps, AI-integrated platforms, UI/UX design, and performance engineering for scalable digital products.',
          },
        },
      ],
    },
  };


  // BreadcrumbList Schema
  const getBreadcrumbSchema = () => {
    const breadcrumbItems = [];

    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: seoConfig.siteUrl,
    });

    if (page !== 'home') {
      const pageNames = {
        about: 'About Us',
        services: 'Services',
        'case-studies': 'Case Studies',
        'case-study-detailed': 'Case Study Detail',
        contact: 'Contact',
        'all-models': '3D Models',
      };

      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: pageNames[page] || page,
        item: `${seoConfig.siteUrl}/${page}`,
      });
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    };
  };

  // FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What services does Camino Code offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Camino Code offers comprehensive Applied AI services, intelligent automation, machine learning, data engineering, and AI-powered platform development to help businesses innovate and grow.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does a typical project take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Project timelines vary based on scope and complexity. Simple AI integrations can be delivered in 4-8 weeks, while complex AI platform projects may take 3-6 months.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you work with startups and enterprises?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we work with businesses of all sizes, from innovative startups to large enterprises, tailoring our solutions to meet specific needs and budgets.',
        },
      },
      {
        '@type': 'Question',
        name: 'What technologies do you specialize in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We specialize in Python for AI development, machine learning frameworks (TensorFlow, PyTorch), cloud platforms (AWS, GCP, Azure), and modern AI platforms including LangChain, OpenAI, and custom model deployment.',
        },
      },
    ],
  };

  // Combine schemas based on page
  const getSchemas = () => {
    const schemas = [];

    // Always include organization and website schemas
    schemas.push(organizationSchema);
    schemas.push(websiteSchema);
    schemas.push(getBreadcrumbSchema());

    // Add page-specific schemas
    switch (page) {
      case 'home':
        schemas.push(localBusinessSchema);
        schemas.push(faqSchema);
        break;
      case 'services':
        schemas.push(serviceSchema);
        break;
      case 'about':
        schemas.push(localBusinessSchema);
        break;
      case 'contact':
        schemas.push(localBusinessSchema);
        break;
      case 'case-studies':
        // Add portfolio/work schema if needed
        break;
      default:
        break;
    }

    // Add custom schema if provided
    if (customData) {
      schemas.push(customData);
    }

    return schemas;
  };

  const schemas = getSchemas();

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`structured-data-${index}`}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
          strategy="afterInteractive"
        />
      ))}
    </>
  );
}