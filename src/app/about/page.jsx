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

const Divider = () => (
  <hr className="mx-auto w-full max-w-[1440px] border-gray-700" />
);

export default function AboutPage() {
  return (
    <main className="mx-auto">
      <NavigationBar />
      <AboutUsHeader />
      <div className="bg-[rgba(248,244,239,1)]">
        <AboutUsHero />
        <Divider />
        <AboutUsFounder />
        <Divider />
        <AboutUsOffers />
        <Divider />
        <AboutUsPartners />
        <Divider />
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
