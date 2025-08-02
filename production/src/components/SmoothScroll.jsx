// components/SmoothScroll.jsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      // Simple smooth scroll to top on route change
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };
      scrollToTop();

      // Add smooth scroll behavior to all anchor links
      const handleAnchorClick = (e) => {
        const target = e.target.closest('a[href^="#"]');
        if (target) {
          e.preventDefault();
          const id = target.getAttribute("href");
          const element = document.querySelector(id);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
            });
          }
        }
      };

      document.addEventListener("click", handleAnchorClick);
      return () => document.removeEventListener("click", handleAnchorClick);
    }
  }, [pathname]);

  return children;
}
