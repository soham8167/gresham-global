import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Poppins } from "next/font/google";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Gresham Global",
  description: "Professional Corporate Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
     <body className={`${poppins.className} font-sans antialiased bg-white text-gray-900`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}