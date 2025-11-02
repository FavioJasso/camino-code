"use client";

import NavigationBar from "../components/NavigationBar";
import GenericPageHeader from "../components/GenericPageHeader";
import ContactForm from "../components/ContactFormPages";
import Footer from "../components/Footer";
import AboutUsPartners from "../components/AboutUsPartners";
import HomeAbout from "../components/HomeAbout";
import AboutUsOffers from "../components/AboutUsOffers";
import HomeServices from "../components/HomeServices";
import Work from "../components/Work";
import Testimonials from "../components/Testimonials";
import ClientProviders from "../components/ClientProviders";
import StructuredData from "../components/StructuredData";

const Hero = () => {
  const items = [];
  const description = "At Camino Code, we combine data science and web development to create innovative, future-ready solutions. From predictive analytics to custom web applications, we help businesses thrive in the digital age.";

  return (
    <GenericPageHeader
      sectionId="hero"
      titleWords={["CODE", "THE FUTURE"]}
      description={description}
      items={items}
      ctaLabel="Get Started"
      ctaLink="/contact"
      gradientWordIndex={0}
    />
  );
};

export default function Home() {
  return (
    <ClientProviders>
      <StructuredData page="home" />
      <main className="h-max w-full gap-4 overflow-hidden">
        <NavigationBar />
        <Hero />
        <AboutUsPartners />
        <HomeAbout />
        <AboutUsOffers />
        <HomeServices />
        <Work />
        <Testimonials />
        <ContactForm />
        <Footer />
      </main>
    </ClientProviders>
  );
}
