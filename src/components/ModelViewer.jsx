"use client";

import { useEffect, useState } from "react";

// Lazy-loaded ModelViewer that defers both 3D library loading and model loading
export function LazyModelViewer({
  modelPath,
  height = "100vh",
  fogColor = "#000",
  containerClassName = "",
  delay = 2000, // Delay loading by 2 seconds
}) {
  const [ModelViewerComponent, setModelViewerComponent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isLoaded) {
      // Dynamic import of the heavy 3D libraries
      import('./ModelViewerCore').then((module) => {
        setModelViewerComponent(() => module.default);
      });
    }
  }, [isLoaded]);

  if (!isLoaded || !ModelViewerComponent) {
    return (
      <div className={containerClassName} style={{ width: "100%", height }}>
        {/* Placeholder or loading state */}
      </div>
    );
  }

  return (
    <ModelViewerComponent
      modelPath={modelPath}
      height={height}
      fogColor={fogColor}
      containerClassName={containerClassName}
    />
  );
}

// Regular ModelViewer for immediate loading (use LazyModelViewer for performance)
export { default as ModelViewer } from './ModelViewerCore';

export default function ModelsShowcase() {
  return <ModelViewer />;
}
