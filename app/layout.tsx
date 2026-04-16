import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "@/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "Houston Home Help (HHH)",
    template: "%s | Houston Home Help"
  },
  description:
    "Houston Home Help (HHH) provides non-medical companion visits, check-ins, errands, respite sitting, and household support for Houston families."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
