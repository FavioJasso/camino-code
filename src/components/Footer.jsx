"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Works", href: "/case-studies" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Terms", href: "/terms" },
    { name: "Privacy", href: "/privacy" },
  ];

  const socialLinks = [
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="relative flex flex-col items-center gap-10 px-6 py-16 text-center sm:gap-12 sm:px-8 md:px-10">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/footer-bg.png"
          alt="Footer background"
          fill
          className="object-cover"
          quality={90}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Logo and Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex w-full max-w-6xl flex-col items-center gap-10 py-12"
      >
        {/* Logo */}
        <Link href="/" className="group">
          <div className="relative h-20 w-40 rounded">
            <Image
              src="/assets/icon-extend.svg"
              alt="Camino Code Logo"
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex flex-wrap justify-center gap-4 text-sm sm:gap-6 md:text-base">
            {footerLinks.map((link, index) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={link.href}
                  className="text-white/80 transition-colors hover:text-white hover:underline"
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        {/* Divider */}
        <motion.hr
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-4 w-full border-t border-gray-700"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-between"
        >
          <p className="text-xs text-white/60 sm:text-sm">
            &copy; {currentYear} Camino Code. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="text-white transition-colors hover:text-amber-400"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
