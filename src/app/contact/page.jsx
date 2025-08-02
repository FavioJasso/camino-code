"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactUsHeader from "@/components/ContactUsHeader";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

const ContactUsPage = () => {
  return (
    <ClientProviders>
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
