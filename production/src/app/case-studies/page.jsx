import Head from "next/head";
import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import CaseStudiesHeader from "@/components/CaseStudiesHeader";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const CaseStudiesPage = () => {
  const title = "Case Studies - My Next.js Site";
  const description =
    "Explore our case studies to see how we solve real-world problems.";

  return (
    <main className="min-h-screen bg-white">
      <NavigationBar />
      <CaseStudiesHeader />
      <Work />
      <Testimonials />
      <ContactForm />
      <Footer />
    </main>
  );
};

export default CaseStudiesPage;
