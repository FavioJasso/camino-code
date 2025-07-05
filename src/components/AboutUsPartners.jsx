"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useAnimations";

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

const partners = [
  { src: "/assets/images/partner_1.png", alt: "Partner 1" },
  { src: "/assets/images/partner_2.png", alt: "Partner 2" },
  { src: "/assets/images/partner_3.png", alt: "Partner 3" },
  { src: "/assets/images/partner_4.png", alt: "Partner 4" },
  { src: "/assets/images/partner_5.png", alt: "Partner 5" },
];

export default function Partners() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
  });

  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;

    const track = trackRef.current;
    const container = containerRef.current;
    const duration = 20;

    const originalContent = track.innerHTML;
    track.innerHTML = originalContent + originalContent;

    const trackWidth = track.scrollWidth / 2;
    container.style.setProperty("--track-width", `${trackWidth}px`);
    container.style.setProperty("--duration", `${duration}s`);

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

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      id="partners"
      className="relative container mx-auto flex flex-col items-center justify-center gap-10 overflow-hidden bg-[rgba(248,244,239,1)] px-6 pb-16 text-center sm:px-8 md:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex h-[350px] w-full items-center justify-center overflow-clip"
        initial={{ scale: 0, rotate: -180 }}
        animate={hasIntersected ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <ModelViewer url="/triangle.glb" />
      </motion.div>

      <motion.div
        className="flex w-full flex-col-reverse items-center md:flex-col"
        variants={titleVariants}
        initial="hidden"
        animate={hasIntersected ? "visible" : "hidden"}
      >
        <h2 className="mx-auto text-5xl leading-[60px] font-bold text-black uppercase md:text-[70px] md:leading-[80px] lg:text-[120px] lg:leading-[130px]">
          Our{" "}
          <motion.span
            className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 30px rgba(245, 158, 11, 0.5)",
              transition: { duration: 0.3 },
            }}
          >
            Partners
          </motion.span>
        </h2>
      </motion.div>

      <motion.div
        ref={containerRef}
        className="logo-slider relative mx-auto w-full max-w-[1440px] overflow-hidden py-4"
        initial={{ opacity: 0 }}
        animate={hasIntersected ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div
          ref={trackRef}
          className="logo-track flex w-max items-center [&>div>img]:shadow-md"
        >
          <div className="logo-set ml-8 flex items-center gap-8 sm:ml-12 sm:gap-12 md:ml-16 md:gap-16 lg:ml-20 lg:gap-20">
            {partners.map((partner, index) => (
              <motion.div
                key={`first-${index}`}
                className="flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
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

      {/* CSS Animation */}
      <style jsx global>{`
        .logo-slider {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }
        .logo-track {
          animation: scroll var(--duration) linear infinite;
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
