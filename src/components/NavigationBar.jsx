"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useAnimations";

export default function NavigationBar({ iswhite = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY, scrollDirection } = useScrollAnimation();
  const [isVisible, setIsVisible] = useState(true);

  // Handle navbar visibility based on scroll
  useEffect(() => {
    if (scrollY < 100) {
      setIsVisible(true);
    } else {
      setIsVisible(scrollDirection === "up");
    }
  }, [scrollY, scrollDirection]);

  // Handle body overflow when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  const navVariants = {
    visible: {
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    hidden: {
      y: "-100%",
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const linkVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
  };

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        duration: 0.5,
        ease: [0.74, 0, 0.19, 1.02],
      },
    },
    open: {
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.74, 0, 0.19, 1.02],
      },
    },
  };

  const menuItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      id="main-head"
      className={`main-head z-50 flex items-center justify-between fixed top-0 left-0 right-0 w-full h-16 md:h-20 
      transition-all duration-300 ease-in-out border-b-[1px] ${
        scrollY > 50 ? "backdrop-blur-md bg-white/80 border-gray-200" : "border-black/10"
      }`}
      variants={navVariants}
      animate={isVisible ? "visible" : "hidden"}
      initial="visible"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Image
                  src="/assets/logo.svg"
                  alt="Company Logo"
                  className="h-14 w-28 rounded-md object-cover"
                  priority
                  width={112}
                  height={56}
                />
              </motion.div>
            </Link>
          </motion.div>

          <nav className="hidden md:flex md:items-center md:justify-center md:gap-6 [&>a]:no-underline text-black">
            {["Home", "About", "Services", "Case Studies"].map((item, index) => (
              <motion.div
                key={item}
                variants={linkVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                  className={`${
                    iswhite ? "text-white" : "text-black"
                  } relative group`}
                >
                  <span className="relative z-10">{item}</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-red-600"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <Link href="/contact">
                <motion.button
                  className="relative overflow-hidden rounded-full bg-gradient-to-t from-amber-400 to-red-600 px-6 py-3 text-white flex items-center justify-center gap-1 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="relative z-10">Contact</span>
                  <motion.span
                    className="ml-2 relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-red-600 to-amber-400"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.button>
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            id="menu-toggle"
            className={`md:hidden relative w-8 h-8 focus:outline-none ${
              iswhite ? "text-white" : "text-black"
            }`}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="absolute left-0 w-full h-0.5 bg-current"
              style={{ top: "25%" }}
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="absolute left-0 w-full h-0.5 bg-current"
              style={{ top: "50%" }}
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="absolute left-0 w-full h-0.5 bg-current"
              style={{ top: "75%" }}
              animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            />
          </motion.button>

          {/* Mobile Fullscreen Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="nav-links"
                className="fixed top-0 right-0 z-50 h-screen w-full bg-gradient-to-br from-white to-gray-50 md:hidden"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <motion.button
                  id="menu-close"
                  className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-gray-600 focus:outline-none"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
                
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="flex flex-col gap-8 text-center">
                    {["Home", "About", "Services", "Case Studies", "Contact"].map((item, i) => (
                      <motion.div
                        key={item}
                        custom={i}
                        variants={menuItemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <Link
                          href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                          className="block text-3xl font-medium text-gray-800 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-amber-400 hover:to-red-600 transition-all duration-300"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Background decoration */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-amber-400/10 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
