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
    { icon: <Briefcase className="h-8 w-8" />, label: "Early-Stage Focus" },
    { icon: <Award className="h-8 w-8" />, label: "Prototypes & Discovery" },
    { icon: <Users className="h-8 w-8" />, label: "Ideas in the Pipeline" },
  ];

  const description = (
    <>
      Ideas we've helped take from concept to testable reality. Early-stage work,{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        I-Corps collaborations
      </motion.span>{" "}
      and{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        proof-of-concepts
      </motion.span>{" "}
      where{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        technical execution
      </motion.span>{" "}
      made the difference before traditional funding.
    </>
  );

  return (
    <PageHeader
      sectionId="case-studies"
      titleWords={["CASE", "STUDIES"]}
      description={description}
      items={items}
      ctaLabel="See the Work"
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
