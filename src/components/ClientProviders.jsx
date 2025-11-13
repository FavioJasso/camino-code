"use client";

import { AnimatePresence } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import CustomCursor from "@/components/CustomCursor";

export default function ClientProviders({ children }) {
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
