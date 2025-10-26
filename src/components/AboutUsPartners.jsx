"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { useIsMobile, useReducedMotion } from "@/hooks/useIsMobile";
import { ModelViewer } from "@/components/ModelViewer";

// ========== CONSTANTS ==========
const partners = [
  { src: "/assets/images/partner_1.png", alt: "Partner 1" },
  { src: "/assets/images/partner_2.png", alt: "Partner 2" },
  { src: "/assets/images/partner_3.png", alt: "Partner 3" },
  { src: "/assets/images/partner_4.png", alt: "Partner 4" },
  { src: "/assets/images/partner_5.png", alt: "Partner 5" },
];

const SCROLL_DURATION = 25;
const INTERSECTION_THRESHOLD = 0.1;

// ========== MAIN COMPONENT ==========
export default function Partners() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver({
    threshold: INTERSECTION_THRESHOLD,
  });

  // ========== INFINITE SCROLL SETUP ==========
  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;

    const track = trackRef.current;
    const container = containerRef.current;
    const originalContent = track.innerHTML;
    track.innerHTML = originalContent + originalContent;

    const trackWidth = track.scrollWidth / 2;
    container.style.setProperty("--track-width", `${trackWidth}px`);
    container.style.setProperty("--duration", `${SCROLL_DURATION}s`);

    const handleAnimationIteration = () => {
      track.style.transform = "translateX(0)";
      void track.offsetWidth;
      track.style.transform = `translateX(-${trackWidth}px)`;
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
      <div className="absolute inset-0 z-0 opacity-60">
        <ModelViewer
          modelPath="/triangle-1.glb"
          fogColor="#f8f9fa"
          containerClassName="w-full h-full"
        />
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
          <h2 className="text-5xl font-black tracking-tighter text-black uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            Our{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 bg-clip-text text-transparent"
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
          initial={{ opacity: 0, y: 20 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div
            ref={containerRef}
            className="logo-slider relative w-full overflow-hidden py-12 md:py-16"
          >
            <div ref={trackRef} className="logo-track flex w-max items-center">
              <div className="logo-set ml-12 flex items-center gap-12 md:ml-16 md:gap-16 lg:ml-20 lg:gap-20">
                {partners.map((partner, index) => (
                  <motion.div
                    key={`partner-${index}`}
                    className="group flex-shrink-0"
                    whileHover={
                      !isMobile
                        ? {
                            scale: 1.08,
                            transition: {
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            },
                          }
                        : {}
                    }
                  >
                    <div className="relative">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-400/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

                      {/* Logo Container */}
                      <div className="relative h-24 w-24 overflow-hidden rounded-full bg-white shadow-md transition-all duration-300 group-hover:shadow-2xl md:h-32 md:w-32 lg:h-36 lg:w-36">
                        <Image
                          src={partner.src}
                          alt={partner.alt}
                          width={200}
                          height={200}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Accent Line */}
        <motion.div
          className="mx-auto mt-16 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-amber-500 to-transparent"
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
