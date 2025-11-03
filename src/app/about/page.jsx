"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import PageHeader from "@/components/common/Headers";
import AboutUsFounder from "@/components/AboutUsFounder";
import AboutUsHero from "@/components/AboutUsHero";
import AboutUsOffers from "@/components/AboutUsOffers";
import AboutUsPartners from "@/components/AboutUsPartners";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";

const AboutUsHeader = () => {
  const items = [];
  const description = "At Camino Code, we specialize in delivering advanced data science and web development solutions. Our goal is to empower businesses with innovative, scalable, and intelligent platforms that drive growth and efficiency.";

  return (
    <PageHeader
      sectionId="about-header"
      titleWords={["ABOUT", "US"]}
      description={description}
      items={items}
      ctaLabel="Discover Our Story"
      ctaLink="#about-hero"
      gradientWordIndex={0}
    />
  );
};

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
