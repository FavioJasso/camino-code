"use client";

import { motion } from "framer-motion";

export default function ImageSkeleton({ className = "" }) {
  return (
    <motion.div 
      className={`absolute inset-0 bg-gradient-to-br from-neutral-900 to-black ${className}`}
      animate={{
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

