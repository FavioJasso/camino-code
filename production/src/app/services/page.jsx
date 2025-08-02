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
    <main className="min-h-screen bg-white">
      <NavigationBar iswhite={true} />
      <ServicesHeader />
      <section className="bg-gradient-to-b from-[rgba(248,244,239,1)] to-white py-16 md:py-20 lg:py-24">
        <ServicesList />
      </section>
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src="/assets/images/services_bg01.png"
          alt="Services background"
          fill
          className="object-cover scale-105 transition-transform duration-[3000ms] hover:scale-100"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent" />
      </section>
      <section className="relative bg-gradient-to-b from-white to-gray-50 py-16 md:py-20 lg:py-24">
        <ServicesDetails />
      </section>
      <div className="bg-gradient-to-b from-[rgba(248,244,239,1)] to-white">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16">
          <hr className="border-t-2 border-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50 mt-16 md:mt-20 lg:mt-24" />
        </div>
        <section className="relative py-16 md:py-20 lg:py-24">
          <Work />
        </section>
        <div className="mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16">
          <hr className="border-t-2 border-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50 mb-16 md:mb-20 lg:mb-24" />
        </div>
        <section className="py-16 md:py-20 lg:py-24">
          <ContactForm />
        </section>
      </div>
      <Footer />
    </main>
  );
}
