// Preload critical resources for better LCP
export default function PreloadResources() {
  return (
    <>
      {/* Preconnect to external domains - only for resources we actually use */}
      <link rel="preconnect" href="https://prod.spline.design" />
      <link rel="preconnect" href="https://www.gstatic.com" />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="https://vercel.live" />
      <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
    </>
  );
}

