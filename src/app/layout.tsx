import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const josfinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});


export const metadata: Metadata = {
  title: "Full-Stack",
  description: "try to make full stack",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josfinSans.className} h-full antialiased`}
    >
      <body className="mx-auto min-h-screen max-w-360 bg-white">
        <Navbar />
        {children}
        <Footer />

      </body>
    </html>
  );
}
