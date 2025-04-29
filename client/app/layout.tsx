import "./globals.css";
import Header from "@/components/dashboard/Header";
import Footer from "@/components/dashboard/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BridgeFi",
  description: "Your bridge to a new future in the USA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
