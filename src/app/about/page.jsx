"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import AboutUsHeader from "@/components/AboutUsHeader";
import AboutUsFounder from "@/components/AboutUsFounder";
import AboutUsHero from "@/components/AboutUsHero";
import AboutUsOffers from "@/components/AboutUsOffers";
import AboutUsPartners from "@/components/AboutUsPartners";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";

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
