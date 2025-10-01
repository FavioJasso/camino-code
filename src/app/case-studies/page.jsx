"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import CaseStudiesHeader from "@/components/CaseStudiesHeader";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";

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
