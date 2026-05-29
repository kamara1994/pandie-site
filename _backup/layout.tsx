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
  description:
    "Pandie Foundation is a nonprofit supporting vulnerable children in Sierra Leone through education, nutrition, healthcare, and compassionate care.",

  /* ⭐ GOOGLE SEARCH ICON (FAVICON) */
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  /* ⭐ SOCIAL SHARING PREVIEW */
  openGraph: {
    title: "Pandie Foundation",
    description:
      "Supporting vulnerable children in Sierra Leone through education, nutrition, healthcare, and protection.",
    url: "https://pandiefoundation.org",
    siteName: "Pandie Foundation",
    images: [
      {
        url: "https://pandiefoundation.org/logo.png",
        width: 1200,
        height: 630,
        alt: "Pandie Foundation",
      },
    ],
    type: "website",
  },

  /* ⭐ TWITTER / X PREVIEW */
  twitter: {
    card: "summary_large_image",
    title: "Pandie Foundation",
    description:
      "Supporting vulnerable children in Sierra Leone through education, nutrition, healthcare, and protection.",
    images: ["https://pandiefoundation.org/logo.png"],
  },
};

/* ⭐ ORGANIZATION SCHEMA FOR GOOGLE */
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
  email: "info@pandiefoundation.org",
  telephone: "+1-307-257-0001",
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
}: {
  children: React.ReactNode;
}) {
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