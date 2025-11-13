"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Smooth scroll to top on route change
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname]);

  // Add smooth scroll behavior to all anchor links
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const id = target.getAttribute("href");
        const element = document.querySelector(id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  // Add smooth scrollbar styles and scrolling state
  useEffect(() => {
    if (typeof window === "undefined") return;

    let isScrolling;
    const handleScroll = () => {
      document.body.classList.add("is-scrolling");

      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        document.body.classList.remove("is-scrolling");
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={scrollContainerRef} className="smooth-scroll-container">
      {children}

      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 z-50 h-1 w-full bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-red-600 transition-all duration-300"
          style={{
            width: "0%",
            transition: "none",
          }}
          ref={(el) => {
            if (el && typeof window !== "undefined") {
              let ticking = false;
              
              const updateProgress = () => {
                const scrollTop =
                  window.pageYOffset || document.documentElement.scrollTop;
                const scrollHeight =
                  document.documentElement.scrollHeight - window.innerHeight;
                const progress = (scrollTop / scrollHeight) * 100;
                el.style.width = `${progress}%`;
                ticking = false;
              };

              const requestTick = () => {
                if (!ticking) {
                  requestAnimationFrame(updateProgress);
                  ticking = true;
                }
              };

              window.addEventListener("scroll", requestTick, {
                passive: true,
              });
              updateProgress();
            }
          }}
        />
      </div>
    </div>
  );
}
