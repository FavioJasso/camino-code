export async function GET() {
  const baseUrl = 'https://caminocode.com';
  const currentDate = new Date().toISOString();

  const feedItems = [
    {
      title: 'Welcome to Camino Code',
      description: 'Discover how we build AI-powered platforms and deliver Applied AI services',
      link: baseUrl,
      pubDate: new Date('2024-01-01').toUTCString(),
      guid: `${baseUrl}/post-1`
    },
    {
      title: 'Our Applied AI Services',
      description: 'Explore our comprehensive Applied AI, intelligent automation, and machine learning solutions',
      link: `${baseUrl}/services`,
      pubDate: new Date('2024-01-15').toUTCString(),
      guid: `${baseUrl}/post-2`
    },
    {
      title: 'Case Study: E-commerce Analytics Platform',
      description: 'Learn how we increased customer retention by 30% through predictive analytics',
      link: `${baseUrl}/case-study-detailed`,
      pubDate: new Date('2024-02-01').toUTCString(),
      guid: `${baseUrl}/post-3`
    }
  ];

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Camino Code Blog</title>
    <description>Latest updates from Camino Code - Applied AI Services</description>
    <link>${baseUrl}</link>
    <language>en</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <copyright>Copyright ${new Date().getFullYear()} Camino Code</copyright>
    <managingEditor>contact@caminocode.com (Camino Code Team)</managingEditor>
    <webMaster>tech@caminocode.com (Camino Code Tech Team)</webMaster>
    <category>Technology</category>
    <category>Applied AI</category>
    <category>Artificial Intelligence</category>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/assets/logo.svg</url>
      <title>Camino Code</title>
      <link>${baseUrl}</link>
    </image>
    ${feedItems.map(item => `
    <item>
      <title>${item.title}</title>
      <description><![CDATA[${item.description}]]></description>
      <link>${item.link}</link>
      <guid isPermaLink="false">${item.guid}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <dc:creator>Camino Code Team</dc:creator>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}