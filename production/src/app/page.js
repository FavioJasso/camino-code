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
    <main className="h-max w-full gap-4 overflow-hidden">
      <NavigationBar />
      <HeroSection />
      <AboutUsPartners />
      <div className="bg-[rgba(248,244,239,1)] p-2 md:p-4 lg:p-6 xl:p-8">
        <HomeAbout />
      </div>
      <AboutUsOffers />
      <HomeServices />
      <Work />
      <Testimonials />
      <div className="bg-[rgba(248,244,239,1)] p-2 md:p-4 lg:p-6 xl:p-8">
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
