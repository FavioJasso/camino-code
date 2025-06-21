import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import ServicesHeader from "@/components/ServicesHeader";
import ServicesList from "@/components/ServicesList";
import ServicesDetails from "@/components/ServicesDetails";
import Footer from "@/components/Footer";
import Image from "next/image";
import Work from "@/components/Work";

export const metadata = {
  title: "Our Services - Camino Code",
  description: "Explore our service offerings.",
};

// Background image for the page
const BackgroundImage = () => (
  <div className="fixed inset-0 -z-10 w-full h-full">
    <Image
      src="/assets/images/services_bg01.png"
      alt="Services background"
      fill
      className="object-cover"
      quality={90}
      priority
    />
  </div>
);

// Section wrapper for consistent background color
const ContentSection = ({ children, className = "" }) => (
  <section className={`bg-[#F8F4EF] ${className}`}>
    {children}
  </section>
);

// Simple horizontal rule for section separation
const HorizontalRule = () => (
  <hr className="mx-auto w-full max-w-6xl border-gray-300 my-12" />
);

export default function ServicesPage() {
  return (
    <main>
      <BackgroundImage />
      <NavigationBar iswhite />
      <ServicesHeader />
      <ContentSection>
        <ServicesList />
      </ContentSection>
      <ServicesDetails />
      <ContentSection>
        <HorizontalRule />
        <Work />
        <HorizontalRule />
        <ContactForm />
      </ContentSection>
      <Footer />
    </main>
  );
}
