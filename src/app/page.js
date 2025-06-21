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

const PAGE_TITLE = "Camino Code";
const PAGE_DESCRIPTION = "This is my first page built with Astro!";

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
};


export default function Home() {
  return (
    <main className="w-full h-max overflow-hidden gap-4">
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
  );
}
