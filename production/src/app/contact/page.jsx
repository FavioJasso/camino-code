import Head from "next/head";
import NavigationBar from "@/components/NavigationBar";
import ContactUsHeader from "@/components/ContactUsHeader";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";

const ContactUsPage = () => {
  const title = "Contact Us - My Next.js Site";
  const description = "Get in touch with us for any inquiries or support.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* Add any additional meta tags here */}
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
};

export default ContactUsPage;
