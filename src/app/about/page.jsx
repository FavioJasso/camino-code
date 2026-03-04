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
      We're a{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        Technology & Product Development Studio
      </motion.span>
      . Rather than just building on request, we help early ideas get enough{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        technical attention
      </motion.span>{" "}
      to be properly tested. We focus on feasibility, prototypes, and discovery so that the{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        ideas that deserve to exist
      </motion.span>{" "}
      can prove it.
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
