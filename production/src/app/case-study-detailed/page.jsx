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
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <main className="min-h-screen bg-white">
        <NavigationBar />
        <div className="bg-gradient-to-b from-[rgba(248,244,239,1)] via-[rgba(252,250,247,1)] to-white">
          <section className="relative">
            <CaseStudyDetails />
          </section>
          <section className="relative bg-gradient-to-b from-transparent to-white py-16 md:py-20 lg:py-24">
            <ContactForm />
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default CaseStudyDetailedPage;
