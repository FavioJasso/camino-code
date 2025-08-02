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
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <main className="min-h-screen bg-white">
        <NavigationBar />
        <CaseStudiesHeader />
        <section className="relative bg-gradient-to-b from-white to-gray-50 py-16 md:py-20 lg:py-24">
          <Work />
        </section>
        <section className="relative">
          <Testimonials />
        </section>
        <section className="bg-gradient-to-b from-[rgba(248,244,239,1)] to-white py-16 md:py-20 lg:py-24">
          <ContactForm />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default CaseStudiesPage;
