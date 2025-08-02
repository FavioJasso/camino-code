import Head from "next/head";
import NavigationBar from "@/components/NavigationBar";
import ContactUsHeader from "@/components/ContactUsHeader";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";

const ContactUsPage = () => {
  const title = "Contact Us - My Next.js Site";
  const description = "Get in touch with us for any inquiries or support.";

  return (
    <main className="min-h-screen bg-white">
      <NavigationBar />
      <ContactUsHeader />
      <ContactForm />
      <Footer />
    </main>
  );
};

export default ContactUsPage;
