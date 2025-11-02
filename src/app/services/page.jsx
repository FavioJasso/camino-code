"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import GenericPageHeader from "@/components/GenericPageHeader";
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

  const description = "Empowering businesses with Advanced AI, Data intelligence and Product engineering. We transform your vision into reality with cutting-edge solutions that scale.";

  return (
    <GenericPageHeader
      sectionId="services"
      titleWords={["OUR", "SERVICES"]}
      description={description}
      items={items}
      ctaLabel="Explore Our Services"
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
