import Head from "next/head";
import NavigationBar from "@/components/NavigationBar";
import ContactUsHeader from "@/components/ContactUsHeader";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";

const TITLE = "Contact Us - My Next.js Site";
const DESCRIPTION = "Get in touch with us for any inquiries or support.";

const ContactUsPage = () => (
  <>
    <Head>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
    </Head>

    <main className="">
      <NavigationBar />
      <ContactUsHeader />
      <div className="bg-[rgba(248,244,239,1)]">
        <ContactForm />
      </div>
      <Footer />
    </main>
  </>
);

export default ContactUsPage;
