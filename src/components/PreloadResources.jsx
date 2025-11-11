// Preload critical resources for better LCP
export default function PreloadResources() {
  return (
    <>
      {/* Preconnect to external domains - only for resources we actually use */}
      <link rel="preconnect" href="https://prod.spline.design" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="https://vercel.live" />
      <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      
      {/* Preload critical logo for better LCP */}
      <link 
        rel="preload" 
        href="/assets/icon-extend.svg" 
        as="image" 
        type="image/svg+xml"
      />
    </>
  );
}

