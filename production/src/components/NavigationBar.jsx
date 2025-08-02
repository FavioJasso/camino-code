"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, Menu, X, Code2, Sparkles, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home", gradient: "from-cyan-400 to-blue-500" },
  { href: "/about", label: "About", gradient: "from-purple-400 to-pink-500" },
  { href: "/services", label: "Services", gradient: "from-amber-400 to-orange-500" },
  { href: "/case-studies", label: "Case Studies", gradient: "from-green-400 to-emerald-500" },
];

export default function NavigationBar({ iswhite = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle body overflow when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  const isActive = (href) => pathname === href;

  return (
    <>
      <div
        id="main-head"
        className={`main-head fixed top-0 right-0 left-0 z-50 flex h-20 w-full items-center justify-between transition-all duration-500 ease-in-out ${
          scrolled || !iswhite
            ? "bg-black/90 backdrop-blur-xl border-b border-gray-800"
            : "bg-transparent border-b border-white/10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between p-4">
            {/* Logo with animation */}
            <Link href="/" className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg opacity-0 blur-xl group-hover:opacity-50 transition-all duration-500"></div>
              <Image
                src="/assets/logo.svg"
                alt="Company Logo"
                className="relative h-14 w-28 rounded-lg object-cover transition-all duration-300 group-hover:scale-105"
                priority
                width={112}
                height={56}
              />
              <Sparkles className="absolute -top-2 -right-2 h-4 w-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:gap-2 lg:gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300 ${
                    isActive(link.href)
                      ? "text-white"
                      : scrolled || !iswhite
                      ? "text-gray-300 hover:text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {/* Hover effect background */}
                  <span
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r ${link.gradient} opacity-0 transition-all duration-300 ${
                      hoveredLink === link.href ? "opacity-20" : ""
                    }`}
                  />
                  
                  {/* Active indicator */}
                  {isActive(link.href) && (
                    <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${link.gradient} animate-pulse`} />
                  )}
                  
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}

              {/* CTA Button */}
              <Link
                href="#contact"
                className="group relative ml-4 flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 font-semibold text-white shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-neon"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                
                {/* Content */}
                <span className="relative z-10">Contact</span>
                <ArrowRightIcon className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`relative p-2 rounded-lg border transition-all duration-300 md:hidden ${
                scrolled || !iswhite
                  ? "border-gray-700 text-white hover:border-purple-500/50"
                  : "border-white/20 text-white hover:border-white/40"
              }`}
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-black transition-all duration-500 md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute top-20 -left-20 h-96 w-96 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 -right-20 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 opacity-20 blur-3xl animate-float-delayed"></div>

        {/* Close button */}
        <button
          className="absolute top-8 right-8 p-2 rounded-full border border-gray-700 text-gray-400 transition-all duration-300 hover:border-purple-500/50 hover:text-white hover:rotate-90"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Logo */}
        <div className="absolute top-8 left-8">
          <Image
            src="/assets/logo.svg"
            alt="Company Logo"
            className="h-12 w-24 rounded-lg object-cover"
            width={96}
            height={48}
          />
        </div>

        {/* Menu Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-8">
          <div className="flex flex-col items-center gap-6 text-center">
            {/* Menu badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-950/50 px-4 py-2 backdrop-blur-sm">
              <Code2 className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-200">Navigate</span>
            </div>

            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative flex items-center gap-3 text-2xl font-medium transition-all duration-300 ${
                  isActive(link.href) ? "text-white" : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span
                  className={`absolute -left-8 h-0.5 w-6 bg-gradient-to-r ${link.gradient} transition-all duration-300 ${
                    isActive(link.href) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />
                <span className="relative">
                  {link.label}
                  {isActive(link.href) && (
                    <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r ${link.gradient}`} />
                  )}
                </span>
                <ChevronRight className="h-5 w-5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
              </Link>
            ))}

            {/* Mobile CTA Button */}
            <Link
              href="#contact"
              className="group relative mt-8 flex items-center gap-2 overflow-hidden rounded-full px-8 py-4 font-semibold text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-neon"
              onClick={() => setIsMenuOpen(false)}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
              
              {/* Content */}
              <span className="relative z-10">Get Started</span>
              <ArrowRightIcon className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>

            {/* Social links or additional info */}
            <div className="mt-12 flex gap-4 text-sm text-gray-500">
              <span className="hover:text-gray-300 transition-colors cursor-pointer">LinkedIn</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-gray-300 transition-colors cursor-pointer">Twitter</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-gray-300 transition-colors cursor-pointer">GitHub</span>
            </div>
          </div>
        </div>

        {/* Particle effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
        </div>
      </div>
    </>
  );
}