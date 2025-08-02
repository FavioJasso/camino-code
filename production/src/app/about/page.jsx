// app/about/page.tsx
import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import AboutUsHeader from "@/components/AboutUsHeader";
import AboutUsFounder from "@/components/AboutUsFounder";
import AboutUsHero from "@/components/AboutUsHero";
import AboutUsOffers from "@/components/AboutUsOffers";
import AboutUsPartners from "@/components/AboutUsPartners";

export const metadata = {
  title: "About Us - Camino Code",
  description: "Learn more about our company and what we do.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavigationBar />
      <AboutUsHeader />
      <AboutUsHero />
      <AboutUsFounder />
      <AboutUsOffers />
      <AboutUsPartners />
      <ContactForm />
      <Footer />
    </main>
  );
}
