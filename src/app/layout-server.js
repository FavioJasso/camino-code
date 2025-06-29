import ClientLayout from "./layout";
import { metadata } from "./layout-metadata";

export { metadata };

export default function RootLayout({ children }) {
  return <ClientLayout>{children}</ClientLayout>;
}
