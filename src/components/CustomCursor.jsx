"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isLink =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']");
      setIsPointer(!!isLink);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="h-full w-full rounded-full border-2 border-amber-400"
          animate={{
            scale: isPointer ? 1.5 : 1,
            backgroundColor: isPointer
              ? "rgba(245, 158, 11, 0.1)"
              : "transparent",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1 w-1 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "14px",
          translateY: "14px",
        }}
      >
        <div className="h-full w-full rounded-full bg-amber-400" />
      </motion.div>
    </>
  );
}
