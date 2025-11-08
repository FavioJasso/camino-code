"use client";

import { motion } from "framer-motion";
import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import PageHeader from "@/components/common/Headers";
import { Briefcase, Award, Users } from "lucide-react";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";

const CaseStudiesHeader = () => {
  const items = [
    { icon: <Briefcase className="h-8 w-8" />, label: "50+ Projects Completed" },
    { icon: <Award className="h-8 w-8" />, label: "98% Client Satisfaction" },
    { icon: <Users className="h-8 w-8" />, label: "30+ Happy Clients" },
  ];

  const description = (
    <>
      At Camino Code, we take pride in delivering{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        High-quality
      </motion.span>
      ,{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        Innovative solutions
      </motion.span>{" "}
      in{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        Data Science
      </motion.span>{" "}
      and{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        Web Development
      </motion.span>
      . Our portfolio showcases transformative projects that enhance business efficiency and performance.
    </>
  );

  return (
    <PageHeader
      sectionId="case-studies"
      titleWords={["CASE", "STUDIES"]}
      description={description}
      items={items}
      ctaLabel="Explore Our Work"
      ctaLink="#work"
      gradientWordIndex={0}
    />
  );
};

export default function CaseStudiesPage() {
  return (
    <ClientProviders>
      <StructuredData page="case-studies" />
      <main className="h-max w-full gap-4 overflow-hidden">
        <NavigationBar />
        <CaseStudiesHeader />
        <Work />
        <Testimonials />
        <ContactForm />
        <Footer />
      </main>
    </ClientProviders>
  );
}
