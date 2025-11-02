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
      cursorX.set(e.clientX - 14);
      cursorY.set(e.clientY - 14);
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
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-7 w-7 mix-blend-difference"
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
        
        {isPointer && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(245, 158, 11, 0.15) 50%, rgba(245, 158, 11, 0) 100%)",
            }}
            animate={{
              scale: [0.3, 1.5, 0.3],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1 w-1 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "12px",
          translateY: "12px",
        }}
      >
        <div className="h-full w-full rounded-full bg-amber-400" />
      </motion.div>
    </>
  );
}
