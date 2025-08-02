import Head from "next/head";
import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import CaseStudyDetails from "@/components/CaseStudyDetails";
import Footer from "@/components/Footer";

const CaseStudyDetailedPage = () => {
  const title = "Case Study Detailed - My Next.js Site";
  const description =
    "Explore our detailed case studies to see how we solve real-world problems.";

  return (
    <main className="min-h-screen bg-white">
      <NavigationBar />
      <CaseStudyDetails />
      <ContactForm />
      <Footer />
    </main>
  );
};

export default CaseStudyDetailedPage;
