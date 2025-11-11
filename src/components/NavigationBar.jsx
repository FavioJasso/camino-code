"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowBigRightIcon, ArrowBigRightDashIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useAnimations";

export default function NavigationBar({ iswhite = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY, scrollDirection } = useScrollAnimation();
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

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
      transition: { duration: 0.2 },
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
      className={`main-head fixed top-0 right-0 left-0 z-50 flex h-16 w-full items-center justify-between border-b-[1px] transition-all duration-300 ease-in-out md:h-20 ${
        scrollY > 50
          ? "border-gray-200 bg-white/95 backdrop-blur-md"
          : iswhite
          ? "border-white/20 bg-black/10 backdrop-blur-sm"
          : "border-black/10 bg-white/90 backdrop-blur-sm"
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
                whileHover={{ 
                  scale: 1.08,
                  rotate: [0, -2, 2, -2, 0],
                  transition: {
                    scale: { type: "spring", stiffness: 300, damping: 15 },
                    rotate: { duration: 0.5, ease: "easeInOut" }
                  }
                }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-400/40 to-red-600/40 blur-xl"
                  initial={{ opacity: 0, scale: 1 }}
                  whileHover={{
                    opacity: 0.8,
                    scale: 1.2
                  }}
                  transition={{ duration: 0.4 }}
                />
                <Image
                  src="/assets/icon-extend.svg"
                  alt="Company Logo"
                  className="relative h-16 max-md:h-12 w-full object-cover"
                  priority
                  width={112}
                  height={56}
                />
              </motion.div>
            </Link>
          </motion.div>

          <nav className="hidden text-black md:flex md:items-center md:justify-center lg:gap-6 [&>a]:no-underline">
            {["Home", "About", "Services", "Case Studies"].map(
              (item, index) => (
                <motion.div
                  key={item}
                  variants={linkVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Link
                    href={
                      item === "Home"
                        ? "/"
                        : `/${item.toLowerCase().replace(" ", "-")}`
                    }
                    className="block group"
                  >
                    <motion.div
                      className={`relative flex items-center justify-center px-4 py-2 text-lg font-medium ${
                        scrollY > 50
                          ? "text-gray-800"
                          : iswhite
                          ? "text-white"
                          : "text-gray-800"
                      }`}
                      whileHover={{
                        y: -3
                      }}
                      transition={{ 
                        type: "tween",
                        duration: 0.15,
                        ease: "easeOut"
                      }}
                    >
                      {/* Texto con color naranja al hover */}
                      <span 
                        className="relative z-10 transition-colors duration-500 ease-out group-hover:text-orange-500"
                      >
                        {item}
                      </span>
                      
                      {/* Línea inferior animada */}
                      <motion.span
                        className="absolute bottom-1 left-1/2 h-[2px] bg-orange-500"
                        initial={{ width: 0, x: "-50%" }}
                        whileHover={{ 
                          width: "80%",
                          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
                        }}
                      />
                    </motion.div>
                  </Link>
                </motion.div>
              ),
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <Link href="/contact">
                <motion.button
                  className="group relative flex items-center justify-center gap-1 overflow-hidden rounded-full bg-gradient-to-t from-amber-600 to-red-600 px-6 py-3 text-white"
                  initial="initial"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.05 }
                  }}
                >
                  <span className="relative z-10 font-semibold">Contact</span>
                  <motion.span
                    className="relative z-10 ml-2 inline-block"
                    variants={{
                      initial: { x: 0 },
                      hover: { 
                        x: [0, 5, 0],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {!isHovered ? (
                        <motion.div
                          key="normal"
                          initial={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowBigRightIcon className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="dash"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowBigRightDashIcon className="h-5 w-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-red-600 to-amber-600"
                    variants={{
                      initial: { y: "100%" },
                      hover: { y: 0 }
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.button>
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            id="menu-toggle"
            className={`relative h-8 w-8 focus:outline-none md:hidden z-[60] ${
              isMenuOpen ? "text-gray-800" : iswhite ? "text-white" : "text-black"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="absolute left-0 top-1/2 h-0.5 w-full bg-current -translate-y-1/2"
              animate={isMenuOpen ? { rotate: 45 } : { rotate: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute left-0 top-1/2 h-0.5 w-full bg-current -translate-y-1/2"
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute left-0 top-1/2 h-0.5 w-full bg-current -translate-y-1/2"
              animate={
                isMenuOpen ? { rotate: -45 } : { rotate: 0, y: 8 }
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </motion.button>

          {/* Mobile Menu Below Navbar */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="nav-links"
                className="fixed top-16 md:top-20 right-0 z-50 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] w-full bg-gradient-to-br from-white to-gray-50 md:hidden"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="flex flex-col gap-8 text-center">
                    {[
                      "Home",
                      "About",
                      "Services",
                      "Case Studies",
                      "Contact",
                    ].map((item, i) => (
                      <motion.div
                        key={item}
                        custom={i}
                        variants={menuItemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <Link
                          href={
                            item === "Home"
                              ? "/"
                              : `/${item.toLowerCase().replace(" ", "-")}`
                          }
                          className="block text-3xl font-medium text-gray-800 transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-400 hover:to-red-600 hover:bg-clip-text hover:text-transparent"
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
                  className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-amber-400/10 to-transparent"
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
