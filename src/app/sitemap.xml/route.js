// Dynamic XML sitemap generation
export async function GET() {
  const baseUrl = 'https://caminocode.com';
  const currentDate = new Date().toISOString();

  const urls = [
    {
      loc: baseUrl,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0',
      images: [
        {
          loc: `${baseUrl}/og-image.jpg`,
          title: 'Camino Code - Code the Future',
          caption: 'Transform your business with data science and web development'
        }
      ]
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.9',
      images: [
        {
          loc: `${baseUrl}/og-images/about.jpg`,
          title: 'About Camino Code',
          caption: 'Learn about our mission and team'
        }
      ]
    },
    {
      loc: `${baseUrl}/services`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.9',
      images: [
        {
          loc: `${baseUrl}/og-images/services.jpg`,
          title: 'Our Services',
          caption: 'Data science and web development solutions'
        }
      ]
    },
    {
      loc: `${baseUrl}/case-studies`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8',
      images: [
        {
          loc: `${baseUrl}/og-images/case-studies.jpg`,
          title: 'Case Studies',
          caption: 'Success stories and client projects'
        }
      ]
    },
    {
      loc: `${baseUrl}/case-study-detailed`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7',
      images: [
        {
          loc: `${baseUrl}/og-images/case-study-detail.jpg`,
          title: 'E-commerce Analytics Platform',
          caption: 'Detailed case study analysis'
        }
      ]
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: '0.8',
      images: [
        {
          loc: `${baseUrl}/og-images/contact.jpg`,
          title: 'Contact Us',
          caption: 'Get in touch with Camino Code'
        }
      ]
    },
    {
      loc: `${baseUrl}/all-models`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.5',
      images: [
        {
          loc: `${baseUrl}/og-images/models.jpg`,
          title: '3D Models Showcase',
          caption: 'Interactive 3D visualizations'
        }
      ]
    }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${url.images ? url.images.map(img => `
    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${img.title}</image:title>
      <image:caption>${img.caption}</image:caption>
    </image:image>`).join('') : ''}
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}