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

      <main className="min-h-screen bg-white">
        <NavigationBar />
        <ContactUsHeader />
        <section className="relative bg-gradient-to-b from-[rgba(248,244,239,1)] via-[rgba(252,250,247,1)] to-white py-16 md:py-20 lg:py-24">
          <div className="relative z-10">
            <ContactForm />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-transparent to-red-50/20 pointer-events-none" />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default ContactUsPage;
