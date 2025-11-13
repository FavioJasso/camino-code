"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ImageSkeleton from "./ImageSkeleton";

export default function OptimizedImage({
  src,
  alt,
  fill = true,
  sizes,
  quality = 85,
  priority = false,
  className = "",
  containerClassName = "",
  showOverlay = false,
  onLoad,
}) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  return (
    <div className={`relative w-full h-full ${containerClassName}`}>
      {/* Skeleton Loader */}
      {isLoading && <ImageSkeleton />}

      {/* Imagen optimizada */}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        quality={quality}
        priority={priority}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-400`}
        onLoad={handleLoad}
        onError={() => setIsLoading(false)}
        loading={priority ? "eager" : "lazy"}
      />
      {showOverlay && !isLoading && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      )}
    </div>
  );
}

