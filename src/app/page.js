"use client";

import { motion } from "framer-motion";
import NavigationBar from "../components/NavigationBar";
import PageHeader from "../components/common/Headers";
import ContactForm from "../components/ContactFormPages";
import Footer from "../components/Footer";
import AboutUsPartners from "../components/AboutUsPartners";
import HomeAbout from "../components/HomeAbout";
import AboutUsOffers from "../components/AboutUsOffers";
import HomeServices from "../components/HomeServices";
import Work from "../components/Work";
import Testimonials from "../components/Testimonials";
import ClientProviders from "../components/ClientProviders";
import StructuredData from "../components/StructuredData";

const Hero = () => {
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
      sectionId="hero"
      titleWords={["CODE", "THE FUTURE"]}
      description={description}
      items={items}
      ctaLabel="Get Started"
      ctaLink="/contact"
      gradientWordIndex={0}
    />
  );
};

export default function Home() {
  return (
    <ClientProviders>
      <StructuredData page="home" />
      <main className="h-max w-full gap-4 overflow-hidden">
        <NavigationBar />
        <Hero />
        <AboutUsPartners />
        <HomeAbout />
        <AboutUsOffers />
        <HomeServices />
        <Work />
        <Testimonials />
        <ContactForm />
        <Footer />
      </main>
    </ClientProviders>
  );
}
