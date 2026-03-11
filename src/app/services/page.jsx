"use client";

import { motion } from "framer-motion";
import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import PageHeader from "@/components/common/Headers";
import { Brain, Database, Code } from "lucide-react";
import ServicesList from "@/components/ServicesList";
import ServicesDetails from "@/components/ServicesDetails";
import Footer from "@/components/Footer";
import Work from "@/components/Work";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";

const ServicesHeader = () => {
  const items = [
    { icon: <Brain className="h-8 w-8" />, label: "Applied AI Systems" },
    { icon: <Database className="h-8 w-8" />, label: "Data Intelligence & Engineering" },
    { icon: <Code className="h-8 w-8" />, label: "Product Engineering" },
  ];

  const description = (
    <>
      We collaborate on{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        technical feasibility
      </motion.span>
      ,{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        proof-of-concept builds
      </motion.span>{" "}
      and{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        product discovery
      </motion.span>
      . So your idea gets far enough to be meaningfully evaluated.
    </>
  );

  return (
    <PageHeader
      sectionId="services"
      titleWords={["OUR", "SERVICES"]}
      description={description}
      items={items}
      ctaLabel="How We Can Help"
      ctaLink="#services-list"
      gradientWordIndex={1}
    />
  );
};

export default function ServicesPage() {
  return (
    <ClientProviders>
      <StructuredData page="services" />
      <main className="h-max w-full gap-4 overflow-hidden">
        <NavigationBar />
        <ServicesHeader />
        <ServicesList />
        <ServicesDetails />
        <Work />
        <ContactForm />
        <Footer />
      </main>
    </ClientProviders>
  );
}
