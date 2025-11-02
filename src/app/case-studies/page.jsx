"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import GenericPageHeader from "@/components/GenericPageHeader";
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

  const description = "At Camino Code, we take pride in delivering high-quality, innovative solutions in Data Science and Web Development. Our portfolio showcases transformative projects that enhance business efficiency and performance.";

  return (
    <GenericPageHeader
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
