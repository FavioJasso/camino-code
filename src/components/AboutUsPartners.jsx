"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { useIsMobile, useReducedMotion } from "@/hooks/useIsMobile";
import { ModelViewer } from "@/components/ModelViewer";

// ========== CONSTANTS ==========
// Partner logos data
const partners = [
  { src: "/assets/images/partner_1.png", alt: "Partner 1" },
  { src: "/assets/images/partner_2.png", alt: "Partner 2" },
  { src: "/assets/images/partner_3.png", alt: "Partner 3" },
  { src: "/assets/images/partner_4.png", alt: "Partner 4" },
  { src: "/assets/images/partner_5.png", alt: "Partner 5" },
];

// Animation settings
const SCROLL_DURATION = 20; // seconds
const INTERSECTION_THRESHOLD = 0.1;
const FADE_DURATION = 0.8;

// Animation configuration for title
const titleAnimationConfig = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: FADE_DURATION,
      ease: "easeOut",
    },
  },
};

// ========== MAIN COMPONENT ==========
export default function Partners() {
  // References to DOM elements
  const containerRef = useRef(null); // Container for the scrolling logos
  const trackRef = useRef(null); // The track that holds the logos

  // Custom hooks for responsive behavior
  const isMobile = useIsMobile(); // Detects if user is on mobile
  const prefersReducedMotion = useReducedMotion(); // Checks if user prefers reduced motion

  // Hook to detect when section comes into view
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver({
    threshold: INTERSECTION_THRESHOLD,
  });

  // ========== INFINITE SCROLL SETUP ==========
  useEffect(() => {
    // Exit if elements aren't ready
    if (!trackRef.current || !containerRef.current) return;

    const track = trackRef.current;
    const container = containerRef.current;

    // Duplicate the logos for seamless scrolling
    const originalContent = track.innerHTML;
    track.innerHTML = originalContent + originalContent;

    // Calculate width for animation
    const trackWidth = track.scrollWidth / 2;

    // Set CSS variables for animation
    container.style.setProperty("--track-width", `${trackWidth}px`);
    container.style.setProperty("--duration", `${SCROLL_DURATION}s`);

    // Reset animation when it completes for infinite loop
    const handleAnimationIteration = () => {
      track.style.transform = "translateX(0)";
      void track.offsetWidth; // Force browser reflow
      track.style.transform = `translateX(-${trackWidth}px)`;
    };

    // Add event listener
    track.addEventListener("animationiteration", handleAnimationIteration);

    // Cleanup function
    return () => {
      track.removeEventListener("animationiteration", handleAnimationIteration);
    };
  }, []);

  // ========== RENDER ==========
  return (
    <motion.section
      ref={sectionRef}
      id="partners"
      className="mt-6 flex flex-col items-center justify-center overflow-hidden bg-[rgba(248,244,239,1)] text-center sm:mt-8 md:mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 3D Model Section */}
      <ModelViewer
        modelPath="/triangle-1.glb"
        fogColor="#f8f4ef"
        containerClassName="w-full pt-10 md:pt-0 lg:pt-0"
      />

      {/* Title Section */}
      <motion.div
        className="flex w-full flex-col-reverse items-center md:flex-col"
        variants={titleAnimationConfig}
        initial="hidden"
        animate={hasIntersected ? "visible" : "hidden"}
      >
        <h2 className="mx-auto text-5xl leading-[60px] font-bold text-black uppercase md:text-[70px] md:leading-[80px] lg:text-[120px] lg:leading-[130px]">
          Our{" "}
          <motion.span
            className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent"
            whileHover={
              !isMobile
                ? {
                    scale: 1.05,
                    textShadow: "0 0 30px rgba(245, 158, 11, 0.5)",
                    transition: { duration: 0.3 },
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
        ref={containerRef}
        className="logo-slider relative container mx-auto w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={hasIntersected ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div
          ref={trackRef}
          className="logo-track flex w-max items-center [&>div>img]:shadow-md"
        >
          {/* Logo Container */}
          <div className="logo-set ml-8 flex items-center gap-8 sm:ml-12 sm:gap-12 md:ml-16 md:gap-16 lg:ml-20 lg:gap-20">
            {partners.map((partner, index) => (
              <motion.div
                key={`partner-${index}`}
                className="flex-shrink-0"
                whileHover={!isMobile ? { scale: 1.1, rotate: 5 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={160}
                  height={160}
                  className="h-32 w-32 rounded-full border-[1px] border-black object-contain transition-all duration-300 hover:border-amber-400 md:h-[200px] md:w-[200px]"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CSS for Infinite Scroll Animation */}
      <style jsx global>{`
        /* Fade edges for smooth visual */
        .logo-slider {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        /* Scrolling animation */
        .logo-track {
          animation: ${prefersReducedMotion
            ? "none"
            : "scroll var(--duration) linear infinite"};
          transform: translateX(0);
        }

        /* Keyframes for scroll */
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
