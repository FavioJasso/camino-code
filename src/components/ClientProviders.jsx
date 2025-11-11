"use client";

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import CustomCursor from "@/components/CustomCursor";

export default function ClientProviders({ children }) {
  useEffect(() => {
    // Initialize GSAP
    if (typeof window !== "undefined") {
      const gsap = require("gsap").default;
      const ScrollTrigger = require("gsap/ScrollTrigger").default;
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        <PageTransition>
          <SmoothScroll>{children}</SmoothScroll>
        </PageTransition>
      </AnimatePresence>
    </>
  );
}
