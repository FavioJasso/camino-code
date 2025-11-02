"use client";

import NavigationBar from "@/components/NavigationBar";
import GenericPageHeader from "@/components/GenericPageHeader";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";

const ContactUsHeader = () => {
  const items = [
    { icon: <Mail className="h-8 w-8" />, label: "Email: hello@caminocode.com" },
    { icon: <Phone className="h-8 w-8" />, label: "Phone: +1 (555) 123-4567" },
    { icon: <MapPin className="h-8 w-8" />, label: "San Francisco, CA" },
  ];

  const description = "We'd love to hear from you! Whether you have questions about our services or want to discuss your next big project, our team is ready to help transform your ideas into reality.";

  return (
    <GenericPageHeader
      sectionId="contact-header"
      titleWords={["GET IN", "TOUCH"]}
      description={description}
      items={items}
      ctaLabel="Send Us a Message"
      ctaLink="#contact-form"
      gradientWordIndex={1}
    />
  );
};

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
