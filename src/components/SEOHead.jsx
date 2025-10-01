"use client";

import Head from 'next/head';

export default function SEOHead({
  title,
  description,
  keywords = [],
  ogImage,
  canonicalUrl,
  noindex = false,
  nofollow = false,
  author = 'Camino Code Team',
  publishedDate,
  modifiedDate
}) {
  // Ensure title and description are within recommended lengths
  const processedTitle = title?.substring(0, 60);
  const processedDescription = description?.substring(0, 160);

  return (
    <Head>
      {/* Primary Meta Tags */}
      {title && <title>{processedTitle}</title>}
      {description && <meta name="description" content={processedDescription} />}
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {author && <meta name="author" content={author} />}

      {/* Robots Meta Tag */}
      <meta
        name="robots"
        content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}, max-snippet:-1, max-image-preview:large, max-video-preview:-1`}
      />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph Meta Tags */}
      {title && <meta property="og:title" content={processedTitle} />}
      {description && <meta property="og:description" content={processedDescription} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Camino Code" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={processedTitle} />}
      {description && <meta name="twitter:description" content={processedDescription} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      <meta name="twitter:site" content="@caminocode" />

      {/* Article Meta Tags (for blog posts/case studies) */}
      {publishedDate && <meta property="article:published_time" content={publishedDate} />}
      {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
      {author && <meta property="article:author" content={author} />}

      {/* Additional SEO Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* RSS Feed */}
      <link rel="alternate" type="application/rss+xml" title="Camino Code RSS Feed" href="/rss.xml" />
    </Head>
  );
}