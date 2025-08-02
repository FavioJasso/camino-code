"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import CaseStudyDetails from "@/components/CaseStudyDetails";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

const CaseStudyDetailedPage = () => {
  return (
    <ClientProviders>
      <main className="h-max w-full gap-4 overflow-hidden">
        <NavigationBar />
        <CaseStudyDetails />
        <ContactForm />
        <Footer />
      </main>
    </ClientProviders>
  );
};

export default CaseStudyDetailedPage;
