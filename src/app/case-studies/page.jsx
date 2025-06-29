import Head from "next/head";
import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import CaseStudiesHeader from "@/components/CaseStudiesHeader";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const TITLE = "Case Studies - My Next.js Site";
const DESCRIPTION =
  "Explore our case studies to see how we solve real-world problems.";

const CaseStudiesPage = () => (
  <>
    <Head>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
    </Head>

    <main className="">
      <NavigationBar />
      <CaseStudiesHeader />
      <Work />
      <Testimonials />
      <div className="bg-[rgba(248,244,239,1)]">
        <ContactForm />
      </div>
      <Footer />
    </main>
  </>
);

export default CaseStudiesPage;
