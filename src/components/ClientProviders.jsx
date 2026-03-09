"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import CustomCursor from "@/components/CustomCursor";

export default function ClientProviders({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {mounted && <CustomCursor />}
      <AnimatePresence mode="wait">
        <PageTransition>
          <SmoothScroll>{children}</SmoothScroll>
        </PageTransition>
      </AnimatePresence>
    </>
  );
}
