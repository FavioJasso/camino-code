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
      <div className="bg-gradient-to-b from-[rgba(248,244,239,1)] to-white">
        <section className="relative">
          <AboutUsHero />
        </section>
        <div className="mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16">
          <hr className="border-t-2 border-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50" />
        </div>
        <section className="relative py-8">
          <AboutUsFounder />
        </section>
        <div className="mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16">
          <hr className="border-t-2 border-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50" />
        </div>
        <section className="relative py-8">
          <AboutUsOffers />
        </section>
        <div className="mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16">
          <hr className="mb-16 border-t-2 border-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50" />
        </div>
        <section className="relative">
          <AboutUsPartners />
        </section>
        <div className="mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16">
          <hr className="border-t-2 border-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50" />
        </div>
        <section className="py-16 md:py-20 lg:py-24">
          <ContactForm />
        </section>
      </div>
      <Footer />
    </main>
  );
}
