"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Block body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);
  
  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Works", href: "/case-studies" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    // {
    //   icon: <Instagram className="h-7 w-7" />,
    //   href: "https://instagram.com",
    //   label: "Instagram",
    // },
    {
      icon: <Linkedin className="h-7 w-7" />,
      href: "https://www.linkedin.com/company/caminocode",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="relative flex flex-col items-center gap-6 px-6 py-12 text-center sm:gap-8 sm:px-8 md:px-10">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/footer-bg.webp"
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
        className="flex w-full max-w-6xl flex-col items-center gap-8 py-8"
      >
        {/* Logo */}
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
            className="relative h-20 w-40"
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
              alt="Camino Code Logo"
              fill
              sizes="160px"
              priority
              className="relative object-contain"
            />
          </motion.div>
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
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="text-white/80 transition-colors hover:text-amber-400 hover:underline"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              </motion.li>
            ))}
            {/* Terms and Privacy Link */}
            <motion.li
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: footerLinks.length * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-white/80 transition-colors hover:text-amber-400 hover:underline"
                >
                  Terms and Privacy
                </button>
              </motion.div>
            </motion.li>
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

      {/* Terms and Privacy Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 z-[101] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Modal Header */}
              <div className="mb-8 pr-10">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 bg-clip-text text-transparent mb-2">
                  Terms of Service & Privacy Policy
                </h2>
                <p className="text-sm text-gray-500">Last updated: {currentYear}</p>
              </div>

              {/* Modal Body */}
              <div className="space-y-8 text-gray-700">
                {/* Terms of Service Section */}
                <section>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    Terms of Service
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 text-lg font-semibold text-gray-800">
                        1. Acceptance of Terms
                      </h4>
                      <p className="leading-relaxed">
                        By accessing and using Camino Code's services, you agree to be bound by these Terms of Service. 
                        If you do not agree to these terms, please do not use our services. We reserve the right to 
                        modify these terms at any time, and such modifications shall be effective immediately upon posting.
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-2 text-lg font-semibold text-gray-800">
                        2. Services Description
                      </h4>
                      <p className="leading-relaxed">
                        Camino Code provides Applied AI and intelligent automation solutions, including but not limited to 
                        custom software development, AI integration, web applications, and consulting services. All services 
                        are provided "as is" and subject to availability.
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-2 text-lg font-semibold text-gray-800">
                        3. Intellectual Property
                      </h4>
                      <p className="leading-relaxed">
                        All content, designs, code, and materials created by Camino Code remain our intellectual property 
                        unless otherwise specified in a written agreement. Upon full payment, clients receive the agreed-upon 
                        usage rights as defined in their service contract.
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-2 text-lg font-semibold text-gray-800">
                        4. Limitation of Liability
                      </h4>
                      <p className="leading-relaxed">
                        Camino Code shall not be liable for any indirect, incidental, special, consequential, or punitive 
                        damages resulting from your use or inability to use our services. Our total liability shall not 
                        exceed the amount paid for the specific service in question.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Privacy Policy Section */}
                <section className="border-t border-gray-200 pt-8">
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    Privacy Policy
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 text-lg font-semibold text-gray-800">
                        1. Information We Collect
                      </h4>
                      <p className="leading-relaxed">
                        We collect information that you provide directly to us, including name, email address, phone number, 
                        company information, and project details when you contact us or request our services. We also collect 
                        analytics data about website usage through standard web technologies.
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-2 text-lg font-semibold text-gray-800">
                        2. How We Use Your Information
                      </h4>
                      <p className="leading-relaxed">
                        We use collected information to provide, maintain, and improve our services, communicate with you about 
                        projects and updates, respond to your inquiries, and analyze usage patterns to enhance user experience. 
                        We will never sell your personal information to third parties.
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-2 text-lg font-semibold text-gray-800">
                        3. Data Security
                      </h4>
                      <p className="leading-relaxed">
                        We implement appropriate technical and organizational measures to protect your personal information 
                        against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                        over the Internet is 100% secure, and we cannot guarantee absolute security.
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-2 text-lg font-semibold text-gray-800">
                        4. Your Rights
                      </h4>
                      <p className="leading-relaxed">
                        You have the right to access, correct, or delete your personal information. You may also object to 
                        processing, request data portability, and withdraw consent at any time. To exercise these rights, 
                        please contact us at faviojasso@gmail.com.
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-2 text-lg font-semibold text-gray-800">
                        5. Cookies and Tracking
                      </h4>
                      <p className="leading-relaxed">
                        Our website uses cookies and similar tracking technologies to enhance user experience and analyze site 
                        traffic. You can control cookie settings through your browser preferences. Disabling cookies may limit 
                        some functionality of our website.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Contact Information */}
                <section className="border-t border-gray-200 pt-8">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">
                    Contact Us
                  </h3>
                  <p className="leading-relaxed">
                    If you have any questions about these Terms of Service or Privacy Policy, please contact us at:
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="font-semibold text-amber-600">Camino Code</p>
                    <p>Email: <a href="mailto:faviojasso@gmail.com" className="text-amber-600 hover:underline">faviojasso@gmail.com</a></p>
                  </div>
                </section>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 flex justify-end border-t border-gray-200 pt-6">
                <motion.button
                  onClick={() => setIsModalOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 px-8 py-3 font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
                >
                  I Understand
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </footer>
  );
}
