"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { useIsMobile, useReducedMotion } from "@/hooks/useIsMobile";
import { LazyModelViewer } from "@/components/ModelViewer";

// ========== CONSTANTS ==========
const partners = [
  { src: "/assets/images/partner_01.png", alt: "Transparent Energy" },
  { src: "/assets/images/partner_02.png", alt: "Victoria's Painting" },
  { src: "/assets/images/partner_03.png", alt: "Daniel Avila" },
  { src: "/assets/images/partner_04.png", alt: "Coming soon" },
];

const SCROLL_DURATION = 25;
const INTERSECTION_THRESHOLD = 0.1;

// ========== MAIN COMPONENT ==========
export default function Partners() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver({
    threshold: INTERSECTION_THRESHOLD,
  });
  const { ref: modelRef, hasIntersected: modelIntersected } = useIntersectionObserver({
    threshold: 0.2,
  });

  // ========== MODEL LOAD HANDLER ==========
  useEffect(() => {
    if (modelIntersected) {
      // Esperar a que el modelo se cargue completamente antes de animar
      // Esto evita el lag en Firefox/Zen
      const timer = setTimeout(() => {
        // Usar requestIdleCallback si está disponible (mejor para Firefox)
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
          window.requestIdleCallback(() => {
            setModelLoaded(true);
          });
        } else {
          // Fallback con requestAnimationFrame
          requestAnimationFrame(() => {
            setModelLoaded(true);
          });
        }
      }, 3800); // Aumentado a 3.8s para dar más tiempo de carga

      return () => clearTimeout(timer);
    }
  }, [modelIntersected]);

  // ========== INFINITE SCROLL SETUP ==========
  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;

    const track = trackRef.current;
    const container = containerRef.current;
    const originalContent = track.innerHTML;

    // Calculate original width before duplication to avoid reflow
    const originalWidth = track.getBoundingClientRect().width;

    track.innerHTML = originalContent + originalContent;
    const trackWidth = originalWidth;
    container.style.setProperty("--track-width", `${trackWidth}px`);
    container.style.setProperty("--duration", `${SCROLL_DURATION}s`);

    // Initialize with transform3d for hardware acceleration
    track.style.transform = `translate3d(-${trackWidth}px, 0, 0)`;

    const handleAnimationIteration = () => {
      // Use transform3d to force hardware acceleration and avoid layout recalculation
      track.style.transform = "translate3d(0, 0, 0)";
      requestAnimationFrame(() => {
        track.style.transform = `translate3d(-${trackWidth}px, 0, 0)`;
      });
    };

    track.addEventListener("animationiteration", handleAnimationIteration);
    return () => {
      track.removeEventListener("animationiteration", handleAnimationIteration);
    };
  }, []);

  // ========== RENDER ==========
  return (
    <motion.section
      ref={sectionRef}
      id="partners"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-20 md:py-28 lg:py-36"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* 3D Model Background */}
      <div ref={modelRef} className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        {modelIntersected && (
          <motion.div
            className="w-full h-full will-change-transform"
            initial={{ opacity: 0, y: -200 }}
            animate={
              modelLoaded
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: -200 }
            }
            transition={{
              duration: 1.2,
              ease: [0.34, 1.56, 0.64, 1], // easeOutBack - efecto de rebote suave
              opacity: { duration: 0.8, ease: "easeOut" },
              y: { duration: 1.2 },
            }}
            style={{
              transform: 'translateZ(0)', // Force GPU acceleration
              backfaceVisibility: 'hidden',
              perspective: 1000,
            }}
          >
            <LazyModelViewer
              modelPath="/triangle-1.glb"
              height="90%"
              fogColor="#f8f9fa"
              containerClassName="w-full h-full absolute top-0 left-1/2 transform -translate-x-1/2"
              delay={3000}
            />
          </motion.div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-amber-100/30 to-transparent blur-3xl" />
      <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-gradient-to-tl from-orange-100/30 to-transparent blur-3xl" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        {/* Header Section */}
        <motion.div
          className="mb-16 text-center md:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Main Title */}
          <h2 className="text-5xl font-black tracking-tighter text-black uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            <motion.span
              className="inline-block whitespace-nowrap"
              initial={{ opacity: 0, x: -20 }}
              animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={
                !isMobile
                  ? {
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }
                  : {}
              }
            >
              Our
            </motion.span>
            <motion.span
              className="inline-block bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 bg-clip-text text-transparent whitespace-nowrap px-1"
              initial={{ opacity: 0, x: -20 }}
              animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={
                !isMobile
                  ? {
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }
                  : {}
              }
            >
              Partners
            </motion.span>
          </h2>
        </motion.div>

        {/* Partner Logos Scrolling Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div
            ref={containerRef}
            className="logo-slider relative w-full overflow-hidden py-6 md:py-8"
          >
            <div ref={trackRef} className="logo-track flex w-max items-center">
              <div className="logo-set ml-12 flex items-center gap-12 md:ml-16 md:gap-16 lg:ml-20 lg:gap-20">
                {partners.map((partner, index) => (
                  <div key={`partner-${index}`} className="flex-shrink-0">
                    <Image
                      src={partner.src}
                      alt={partner.alt}
                      width={120}
                      height={120}
                      className="h-20 w-20 object-contain md:h-24 md:w-24 lg:h-28 lg:w-28"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Accent Line */}
        <motion.div
          className="mx-auto mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-amber-500 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={hasIntersected ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        />
      </div>

      {/* CSS for Infinite Scroll Animation */}
      <style jsx global>{`
        .logo-slider {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .logo-track {
          animation: ${prefersReducedMotion
            ? "none"
            : "scroll var(--duration) linear infinite"};
          transform: translateX(0);
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--track-width)));
          }
        }
      `}</style>
    </motion.section>
  );
}
