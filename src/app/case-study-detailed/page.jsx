import Head from 'next/head';
import NavigationBar from '@/components/NavigationBar';
import ContactForm from '@/components/ContactFormPages';
import CaseStudyDetails from '@/components/CaseStudyDetails';
import Footer from '@/components/Footer';

const TITLE = "Case Study Detailed - My Next.js Site";
const DESCRIPTION = "Explore our detailed case studies to see how we solve real-world problems.";

const CaseStudyDetailedPage = () => {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
      </Head>
      
      <main className="">
        <NavigationBar />
        <div className='bg-[rgba(248,244,239,1)]'>
          <CaseStudyDetails />
          <ContactForm />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default CaseStudyDetailedPage;
