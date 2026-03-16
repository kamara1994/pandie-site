import type { Metadata } from "next";
import { Playfair_Display, Open_Sans } from "next/font/google";
import "./globals.css";

import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget"; // ⭐ ADD THIS

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Pandie Foundation",
  description: "Pandie - The Mother of All Foundation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${openSans.variable}`}>
        <TopBar />

        {children}

        <Footer />

        {/* ⭐ Floating chat button (appears on all pages) */}
        <ChatWidget />
      </body>
    </html>
  );
}