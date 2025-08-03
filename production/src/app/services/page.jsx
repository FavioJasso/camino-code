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
      <NavigationBar />
      <ServicesHeader />
      <ServicesList />
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src="/assets/images/services_bg01.png"
          alt="Services background"
          fill
          className="scale-105 object-cover transition-transform duration-[3000ms] hover:scale-100"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent" />
      </section>
      <ServicesDetails />
      <Work />
      <ContactForm />
      <Footer />
    </main>
  );
}
