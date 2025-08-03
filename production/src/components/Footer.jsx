"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  Github,
  ChevronRight,
  Sparkles,
  Code2,
  Globe,
  Cpu,
  Binary,
  Network,
  Terminal,
  Zap,
  ArrowUp
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Navigation",
      icon: <Network className="h-4 w-4" />,
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Case Studies", href: "/case-studies" },
      ],
    },
    {
      title: "Legal",
      icon: <Terminal className="h-4 w-4" />,
      links: [
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookie Policy", href: "/cookies" },
      ],
    },
    {
      title: "Contact",
      icon: <Cpu className="h-4 w-4" />,
      links: [
        {
          name: "hello@caminocode.com",
          href: "mailto:hello@caminocode.com",
          icon: Mail,
        },
        {
          name: "+1 (555) 123-4567",
          href: "tel:+15551234567",
          icon: Phone,
        },
        {
          name: "San Francisco, CA",
          href: "#",
          icon: MapPin,
        },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: Github,
      href: "https://github.com",
      label: "GitHub",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Background Design Elements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        
        {/* Gradient Orbs */}
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-gradient-to-t from-amber-400/10 to-red-600/10 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-gradient-to-t from-orange-500/10 to-red-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-400/5 to-red-600/5 blur-3xl" />
      </div>

      {/* Tech Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <div className="group relative overflow-hidden rounded-2xl border border-gray-800/50 bg-gradient-to-br from-gray-900/90 to-black/90 p-6 backdrop-blur-xl transition-all duration-300 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10">
                <div className="absolute inset-0 bg-gradient-to-t from-amber-400/0 to-red-600/0 transition-all duration-300 group-hover:from-amber-400/10 group-hover:to-red-600/10" />
                <Image
                  src="/assets/logo.svg"
                  alt="Camino Code Logo"
                  width={140}
                  height={70}
                  className="relative z-10 h-16 w-32 object-contain"
                />
              </div>
            </Link>

            <p className="mt-6 text-gray-300 leading-relaxed">
              Innovating the future through cutting-edge{" "}
              <span className="bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text font-semibold text-transparent">
                data science
              </span>{" "}
              and{" "}
              <span className="bg-gradient-to-t from-orange-400 to-red-500 bg-clip-text font-semibold text-transparent">
                web development
              </span>{" "}
              solutions.
            </p>

            {/* Social Links */}
            <div className="mt-8 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/50 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-700/50 hover:bg-gray-800/50 hover:shadow-lg hover:shadow-orange-500/10"
                  aria-label={social.label}
                >
                  <social.icon className="relative z-10 h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg border border-gray-800/50 bg-gradient-to-br from-gray-800/50 to-black/50 p-2.5 backdrop-blur-sm">
                  <div className="text-orange-500">{section.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-100">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-gray-400 transition-all duration-300 hover:translate-x-1 hover:text-white"
                    >
                      {link.icon && (
                        <link.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      )}
                      <span className="relative">
                        {link.name}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-t from-amber-400 to-red-600 transition-all duration-300 group-hover:w-full" />
                      </span>
                      {!link.icon && (
                        <ChevronRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="relative mt-16 overflow-hidden rounded-3xl border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-black/50 p-8 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-transparent to-red-600/5" />
          
          {/* Decorative Elements */}
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-t from-amber-400/20 to-red-600/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-t from-orange-400/20 to-red-500/20 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-2xl font-bold text-gray-100">
                Stay Updated
                <Sparkles className="h-5 w-5 text-orange-500" />
              </h3>
              <p className="text-gray-400">
                Get the latest insights and updates from Camino Code
              </p>
            </div>
            <form className="flex w-full max-w-md gap-3 lg:w-auto">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-700/50 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  required
                />
              </div>
              <button
                type="submit"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-t from-amber-400 to-red-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20"
              >
                <span className="relative z-10">Subscribe</span>
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500 to-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800/50"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-black px-4">
              <Code2 className="h-5 w-5 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="flex items-center gap-2 text-sm text-gray-400">
            <Binary className="h-4 w-4 text-orange-500" />
            &copy; {currentYear}{" "}
            <span className="bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text font-semibold text-transparent">
              Camino Code
            </span>
            . All Rights Reserved.
          </p>

          {/* Back to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group relative overflow-hidden rounded-full border border-gray-700/50 bg-gray-900/50 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:bg-gray-800/50 hover:shadow-lg hover:shadow-orange-500/10"
            aria-label="Back to top"
          >
            <ArrowUp className="relative z-10 h-5 w-5 text-gray-400 transition-all duration-300 group-hover:text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
}