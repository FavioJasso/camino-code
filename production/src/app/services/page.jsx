"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import ServicesHeader from "@/components/ServicesHeader";
import ServicesList from "@/components/ServicesList";
import ServicesDetails from "@/components/ServicesDetails";
import Footer from "@/components/Footer";
import Work from "@/components/Work";
import ClientProviders from "@/components/ClientProviders";

export default function ServicesPage() {
  return (
    <ClientProviders>
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
