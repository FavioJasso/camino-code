import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata = {
  title: "Camino Code - Code the Future",
  description:
    "At Camino Code, we combine data science and web development to create innovative, future-ready solutions.",
  generator: "Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="cursor-none">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
