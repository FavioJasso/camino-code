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
      At Camino Code, we build{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        AI-powered platforms
      </motion.span>{" "}
      and use them to deliver{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        Applied AI services
      </motion.span>
      . Our clients benefit from{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        proprietary technology
      </motion.span>{" "}
      that's{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        continuously improving
      </motion.span>{" "}
      through real-world application. We're not reselling tools—we're{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        creating them
      </motion.span>
      .
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
