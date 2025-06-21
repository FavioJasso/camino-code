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

const BackgroundImage = () => (
  <div className="relative h-screen w-full">
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

const ContentSection = ({ children, className }) => (
  <div className={`bg-[rgba(248,244,239,1)] ${className}`}>
    {children}
  </div>
);

const HorizontalRule = () => (
  <hr className="mx-auto !pt-20 w-full max-w-[1440px] border-gray-700" />
);

export default function ServicesPage() {
  return (
    <main>
      <NavigationBar iswhite={true} />
      <ServicesHeader />
      <ContentSection>
        <ServicesList />
      </ContentSection>
      <BackgroundImage />
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
