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

      <main className="">
        <NavigationBar />
        <div className="bg-[rgba(248,244,239,1)]">
          <CaseStudyDetails />
          <ContactForm />
        </div>

        <Footer />
      </main>
    </>
  );
};

export default CaseStudyDetailedPage;
