"use client";

import { motion } from "framer-motion";
import NavigationBar from "@/components/NavigationBar";
import PageHeader from "@/components/common/Headers";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";

const ContactUsHeader = () => {
  const items = [
    { icon: <Mail className="h-8 w-8" />, label: "faviojasso@gmail.com" },
    { icon: <Phone className="h-8 w-8" />, label: "+1 973-234-2073" },
    { icon: <MapPin className="h-8 w-8" />, label: "Newark, NJ" },
  ];

  const description = (
    <>
      We'd love to hear from you! Whether you have questions about our services
      or want to discuss your next big project, our team is ready to help{" "}
      <motion.span
        className="font-semibold text-amber-400 whitespace-nowrap"
        whileHover={{
          textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
          scale: 1.05,
        }}
      >
        transform your ideas into reality
      </motion.span>
      .
    </>
  );

  return (
    <PageHeader
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
