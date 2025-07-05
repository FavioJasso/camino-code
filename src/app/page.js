"use client";

import NavigationBar from "../components/NavigationBar";
import HeroSection from "../components/HeroSection";
import ContactForm from "../components/ContactFormPages";
import Footer from "../components/Footer";
import AboutUsPartners from "../components/AboutUsPartners";
import HomeAbout from "../components/HomeAbout";
import AboutUsOffers from "../components/AboutUsOffers";
import HomeServices from "../components/HomeServices";
import Work from "../components/Work";
import Testimonials from "../components/Testimonials";
import ClientProviders from "../components/ClientProviders";

export default function Home() {
  return (
    <ClientProviders>
      <main className="h-max w-full gap-4 overflow-hidden">
        <NavigationBar />
        <HeroSection />
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
