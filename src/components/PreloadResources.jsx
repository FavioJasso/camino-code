// Preload critical resources for better LCP
export default function PreloadResources() {
  return (
    <>
      {/* Preconnect to Spline only - loaded later in desktop, not in mobile */}
      <link rel="dns-prefetch" href="https://prod.spline.design" />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="https://vercel.live" />
      <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      
      {/* Preload critical logo for better LCP */}
      <link 
        rel="preload" 
        href="/assets/icon-extend.svg" 
        as="image" 
        type="image/svg+xml"
        fetchPriority="high"
      />
    </>
  );
}

