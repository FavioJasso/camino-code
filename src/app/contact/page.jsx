"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactUsHeader from "@/components/ContactUsHeader";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";

const ContactUsPage = () => {
  return (
    <ClientProviders>
      <StructuredData page="contact" />
      <main className="h-max w-full gap-4 overflow-hidden">
        <NavigationBar />
        <ContactUsHeader />
        <ContactForm />
        <Footer />
      </main>
    </ClientProviders>
  );
};

export default ContactUsPage;
