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

const title = "Camino Code";
const description = "This is my first page built with Astro!";

export const metadata = {
  title: title,
  description: description,
};

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-white">
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
