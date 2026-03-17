import type { Metadata } from "next";
import { Playfair_Display, Open_Sans } from "next/font/google";
import "./globals.css";

import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";

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

/* ⭐ ORGANIZATION SCHEMA */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Pandie Foundation",
  alternateName: "Pandie Foundation - The Mother of All",
  url: "https://pandiefoundation.org",
  logo: "https://pandiefoundation.org/logo.png",
  image: "https://pandiefoundation.org/logo.png",
  description:
    "Pandie Foundation is a nonprofit organization supporting vulnerable children in Sierra Leone through education, nutrition, medical assistance, and compassionate care.",
  email: "kamarajosephallan@gmail.com",
  telephone: "+1-208-419-5855",
  founder: {
    "@type": "Person",
    name: "Joseph Allan Kamara",
  },
  areaServed: [
    {
      "@type": "Country",
      name: "Sierra Leone",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${openSans.variable}`}>

        {/* ⭐ GOOGLE ORGANIZATION DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <TopBar />

        {children}

        <Footer />

        {/* ⭐ Floating chat button */}
        <ChatWidget />

      </body>
    </html>
  );
}