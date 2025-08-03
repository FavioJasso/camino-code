import NavigationBar from "@/components/NavigationBar";
import ContactUsHeader from "@/components/ContactUsHeader";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us - Camino Code",
  description: "Get in touch with us for any inquiries or support.",
};

const ContactUsPage = () => {
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
