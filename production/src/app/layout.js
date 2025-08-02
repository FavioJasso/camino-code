// app/layout.jsx
import Head from "next/head";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  generator: "Next.js",
};

export default function RootLayout({ children, params }) {
  const title = params.title || "Default Title";
  const description = params.description || "Default description";

  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <Script src="https://code.jquery.com/jquery-3.6.0.min.js"></Script>
      </body>
    </html>
  );
}
