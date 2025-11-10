// Preload critical resources for better LCP
export default function PreloadResources() {
  return (
    <>
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="https://vercel.live" />
      <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
    </>
  );
}

