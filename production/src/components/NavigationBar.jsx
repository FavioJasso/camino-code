"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  Menu,
  X,
  Code2,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home", gradient: "from-cyan-400 to-blue-500" },
  { href: "/about", label: "About", gradient: "from-purple-400 to-pink-500" },
  {
    href: "/services",
    label: "Services",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    href: "/case-studies",
    label: "Case Studies",
    gradient: "from-green-400 to-emerald-500",
  },
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
        className={`main-head fixed top-0 right-0 left-0 z-100 flex h-20 w-full items-center justify-between transition-all duration-500 ease-in-out ${
          scrolled || !iswhite
            ? "border-b border-gray-200 bg-white shadow-lg backdrop-blur-xl"
            : "border-b border-gray-100 bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between p-4">
            {/* Logo with animation */}
            <Link href="/" className="group relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-amber-400 to-red-600 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-50"></div>
              <Image
                src="/assets/logo.svg"
                alt="Company Logo"
                className="relative h-14 w-28 rounded-lg object-cover transition-all duration-300 group-hover:scale-105"
                priority
                width={112}
                height={56}
              />
              <Sparkles className="absolute -top-2 -right-2 h-4 w-4 animate-pulse text-orange-500 opacity-0 transition-all duration-300 group-hover:opacity-100" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:gap-2 lg:gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 lg:text-base ${
                    isActive(link.href)
                      ? "text-orange-600"
                      : scrolled || !iswhite
                        ? "text-gray-700 hover:text-orange-600"
                        : "text-gray-600 hover:text-orange-600"
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
                    <span
                      className={`absolute right-0 bottom-0 left-0 h-0.5 bg-gradient-to-r ${link.gradient} animate-pulse`}
                    />
                  )}

                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}

              {/* CTA Button */}
              <Link
                href="/contact"
                className="group hover:shadow-neon relative ml-4 flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 font-semibold text-white shadow-lg transition-all duration-500 hover:scale-105"
              >
                {/* Animated background */}
                <div className="animate-gradient-x absolute inset-0 bg-gradient-to-t from-amber-400 to-red-600"></div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500 to-red-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                {/* Content */}
                <span className="relative z-10">Contact</span>
                <ArrowRightIcon className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`relative rounded-lg border p-2 transition-all duration-300 md:hidden ${
                scrolled || !iswhite
                  ? "border-gray-300 text-gray-700 hover:border-orange-400"
                  : "border-gray-200 text-gray-600 hover:border-orange-300"
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
        className={`fixed inset-0 z-[100] bg-white transition-all duration-500 md:hidden ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50">
          <div className="bg-grid-pattern absolute inset-0 opacity-10"></div>
        </div>

        {/* Animated gradient orbs */}
        <div className="animate-float absolute top-20 -left-20 h-96 w-96 rounded-full bg-gradient-to-t from-amber-400 to-red-600 opacity-20 blur-3xl"></div>
        <div className="animate-float-delayed absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-gradient-to-t from-amber-300 to-orange-500 opacity-20 blur-3xl"></div>

        {/* Close button */}
        <button
          className="absolute top-8 right-8 rounded-full border border-gray-300 p-2 text-gray-600 transition-all duration-300 hover:rotate-90 hover:border-orange-400 hover:text-orange-600"
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
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-gradient-to-t from-amber-50 to-orange-50 px-4 py-2 backdrop-blur-sm">
              <Code2 className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-700">
                Navigate
              </span>
            </div>

            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative flex items-center gap-3 text-2xl font-medium transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-orange-600"
                    : "text-gray-600 hover:text-orange-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span
                  className={`absolute -left-8 h-0.5 w-6 bg-gradient-to-r ${link.gradient} transition-all duration-300 ${
                    isActive(link.href)
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />
                <span className="relative">
                  {link.label}
                  {isActive(link.href) && (
                    <span
                      className={`absolute right-0 -bottom-1 left-0 h-0.5 bg-gradient-to-r ${link.gradient}`}
                    />
                  )}
                </span>
                <ChevronRight className="h-5 w-5 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            ))}

            {/* Mobile CTA Button */}
            <Link
              href="/contact"
              className="group hover:shadow-neon relative mt-8 flex items-center gap-2 overflow-hidden rounded-full px-8 py-4 font-semibold text-white shadow-2xl transition-all duration-500 hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              {/* Animated background */}
              <div className="animate-gradient-x absolute inset-0 bg-gradient-to-t from-amber-400 to-red-600"></div>

              {/* Content */}
              <span className="relative z-10">Get Started</span>
              <ArrowRightIcon className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>

            {/* Social links or additional info */}
            <div className="mt-12 flex gap-4 text-sm text-gray-500">
              <span className="cursor-pointer transition-colors hover:text-orange-600">
                LinkedIn
              </span>
              <span className="text-gray-400">•</span>
              <span className="cursor-pointer transition-colors hover:text-orange-600">
                Twitter
              </span>
              <span className="text-gray-400">•</span>
              <span className="cursor-pointer transition-colors hover:text-orange-600">
                GitHub
              </span>
            </div>
          </div>
        </div>

        {/* Particle effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
        </div>
      </div>
    </>
  );
}
