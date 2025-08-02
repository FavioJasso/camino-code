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
      <section className="relative">
        <AboutUsPartners />
      </section>
      <section className="bg-gradient-to-b from-[rgba(248,244,239,1)] to-[rgba(248,244,239,0.8)] py-16 md:py-20 lg:py-24 xl:py-32">
        <HomeAbout />
      </section>
      <section className="relative">
        <AboutUsOffers />
      </section>
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-20 lg:py-24">
        <HomeServices />
      </section>
      <section className="relative bg-gradient-to-b from-white to-gray-50 py-16 md:py-20 lg:py-24">
        <Work />
      </section>
      <section className="bg-gradient-to-t from-gray-100 to-white py-16 md:py-20 lg:py-24">
        <Testimonials />
      </section>
      <section className="bg-gradient-to-b from-[rgba(248,244,239,1)] to-[rgba(248,244,239,0.9)] py-16 md:py-20 lg:py-24 xl:py-32">
        <ContactForm />
      </section>
      <Footer />
    </main>
  );
}
