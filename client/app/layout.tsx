// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/dashboard/Header";
import { Footer } from "@/components/dashboard/footer";
import { ChatWidgetWrapper } from "./ChatWidgetWrapper";
import { Toaster } from "@/components/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BridgeFi - Your Bridge to a New Future in the USA",
  description:
    "Connect with immigration lawyers, employers offering sponsorship, and financial resources for your U.S. immigration journey.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ChatWidgetWrapper />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
