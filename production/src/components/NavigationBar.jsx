"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export default function NavigationBar({ iswhite = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle body overflow when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  return (
    <div
      id="main-head"
      className="main-head absolute top-0 right-0 left-0 z-10 flex h-16 w-full items-center justify-between border-b-[1px] border-black transition-all duration-300 ease-in-out md:h-20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between p-4">
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              alt="Company Logo"
              className="h-14 w-28 rounded-md object-cover"
              priority
              width={112}
              height={56}
            />
          </Link>

          <nav className="hidden text-black md:flex md:items-center md:justify-center md:gap-4 [&>a]:no-underline">
            <Link
              href="/"
              className={`${
                iswhite ? "text-white" : "text-black"
              } hover:font-bold`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`${
                iswhite ? "text-white" : "text-black"
              } hover:font-bold`}
            >
              About
            </Link>
            <Link
              href="/services"
              className={`${
                iswhite ? "text-white" : "text-black"
              } hover:font-bold`}
            >
              Services
            </Link>
            <Link
              href="/case-studies"
              className={`${
                iswhite ? "text-white" : "text-black"
              } hover:font-bold`}
            >
              Case Studies
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-1 rounded-full bg-gradient-to-t from-amber-400 to-red-600 px-6 py-3 text-white hover:opacity-90"
            >
              Contact
              <span className="ml-2">
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            id="menu-toggle"
            className={`text-gray-600 focus:outline-none md:hidden ${
              iswhite ? "text-white" : "text-black"
            }`}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Mobile Fullscreen Menu */}
          {isMenuOpen && (
            <div
              id="nav-links"
              className="fixed top-0 left-0 z-50 h-screen w-full bg-white p-4 md:hidden"
            >
              <button
                id="menu-close"
                className="absolute top-4 right-4 text-6xl text-gray-600 focus:outline-none"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                &times;
              </button>
              <div className="flex h-full flex-col items-center justify-center">
                <div className="flex flex-col gap-4 text-center">
                  <Link
                    href="/"
                    className="block text-xl text-gray-600 hover:text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="block text-xl text-gray-600 hover:text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/services"
                    className="block text-xl text-gray-600 hover:text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Services
                  </Link>
                  <Link
                    href="/case-studies"
                    className="block text-xl text-gray-600 hover:text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Case Studies
                  </Link>
                  <Link
                    href="/contact"
                    className="block rounded-full bg-gradient-to-t from-amber-400 to-red-600 px-6 py-3 text-white hover:opacity-90"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                    <span className="ml-2">
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
