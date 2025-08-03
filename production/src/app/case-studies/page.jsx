import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import CaseStudiesHeader from "@/components/CaseStudiesHeader";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Case Studies - Camino Code",
  description: "Explore our case studies to see how we solve real-world problems.",
};

const CaseStudiesPage = () => {
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
