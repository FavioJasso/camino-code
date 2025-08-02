// app/services/page.tsx
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
  description: "Explore the range of services we offer to our clients.",
};

export default function ServicesPage() {
  return (
    <main>
      <NavigationBar iswhite={true} />
      <ServicesHeader />
      <div className="bg-[rgba(248,244,239,1)]">
        <ServicesList />
      </div>
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
      <ServicesDetails />
      <div className="bg-[rgba(248,244,239,1)]">
        <hr className="mx-auto !pt-20 w-full max-w-[1440px] border-gray-700" />
        <Work />
        <hr className="mx-auto pt-20 w-full max-w-[1440px] border-gray-700" />
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
