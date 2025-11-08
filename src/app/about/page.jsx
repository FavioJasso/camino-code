"use client";

import { motion } from "framer-motion";
import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import PageHeader from "@/components/common/Headers";
import AboutUsFounder from "@/components/AboutUsFounder";
import AboutUsHero from "@/components/AboutUsHero";
import AboutUsOffers from "@/components/AboutUsOffers";
import AboutUsPartners from "@/components/AboutUsPartners";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";

const AboutUsHeader = () => {
  const items = [];
  const description = (
    <>
      At Camino Code, we specialize in delivering{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        Applied AI
      </motion.span>{" "}
      and{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        Intelligent automation
      </motion.span>{" "}
      solutions. Our goal is to empower businesses with{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        AI-powered
      </motion.span>
      ,{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        Scalable
      </motion.span>
      , and{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        Intelligent platforms
      </motion.span>{" "}
      that drive growth and efficiency.
    </>
  );

  return (
    <PageHeader
      sectionId="about-header"
      titleWords={["ABOUT", "US"]}
      description={description}
      items={items}
      ctaLabel="Discover Our Story"
      ctaLink="#about-hero"
      gradientWordIndex={0}
    />
  );
};

export default function AboutPage() {
  return (
    <ClientProviders>
      <StructuredData page="about" />
      <main className="h-max w-full gap-4 overflow-hidden">
        <NavigationBar />
        <AboutUsHeader />
        <AboutUsHero />
        <AboutUsFounder />
        <AboutUsOffers />
        <AboutUsPartners />
        <ContactForm />
        <Footer />
      </main>
    </ClientProviders>
  );
}
