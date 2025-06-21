import Head from "next/head";
import {
  NavigationBar,
  ContactForm,
  CaseStudiesHeader,
  Work,
  Testimonials,
  Footer,
} from "@/components";

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
