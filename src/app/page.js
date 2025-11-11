"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import NavigationBar from "../components/NavigationBar";
import PageHeader from "../components/common/Headers";
import ClientProviders from "../components/ClientProviders";
import StructuredData from "../components/StructuredData";

// Lazy load ALL components below the fold for better LCP
const AboutUsPartners = dynamic(() => import("../components/AboutUsPartners"), {
  loading: () => <div className="min-h-[200px]" />
});
const HomeAbout = dynamic(() => import("../components/HomeAbout"), {
  loading: () => <div className="min-h-[400px]" />
});
const AboutUsOffers = dynamic(() => import("../components/AboutUsOffers"), {
  loading: () => <div className="min-h-[400px]" />
});
const HomeServices = dynamic(() => import("../components/HomeServices"), {
  loading: () => <div className="min-h-[500px]" />
});
const Work = dynamic(() => import("../components/Work"), {
  loading: () => <div className="min-h-[500px]" />
});
const Testimonials = dynamic(() => import("../components/Testimonials"), {
  loading: () => <div className="min-h-[400px]" />
});
const ContactForm = dynamic(() => import("../components/ContactFormPages"), {
  loading: () => <div className="min-h-[400px]" />
});
const Footer = dynamic(() => import("../components/Footer"), {
  loading: () => <div className="min-h-[200px]" />
});

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
