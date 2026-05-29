import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import TalentPlayer from "./components/TalentPlayer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Pandie Foundation — The Mother of All", template: "%s | Pandie Foundation" },
  description: "Pandie Foundation is a nonprofit supporting vulnerable children in Sierra Leone through education, nutrition, healthcare, and compassionate care.",
  keywords: ["Pandie Foundation", "Sierra Leone charity", "children nonprofit", "education support Sierra Leone", "child sponsorship"],
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/favicon.ico" },
  openGraph: {
    title: "Pandie Foundation — The Mother of All",
    description: "Supporting vulnerable children in Sierra Leone through education, nutrition, healthcare, and protection.",
    url: "https://pandiefoundation.org",
    siteName: "Pandie Foundation",
    images: [{ url: "https://pandiefoundation.org/logo.png", width: 1200, height: 630, alt: "Pandie Foundation" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pandie Foundation — The Mother of All",
    description: "Supporting vulnerable children in Sierra Leone.",
    images: ["https://pandiefoundation.org/logo.png"],
    site: "@PandieFdn",
  },
};

const orgSchema = {
  "@context": "https://schema.org", "@type": "NGO",
  name: "Pandie Foundation", alternateName: "Pandie Foundation - The Mother of All",
  url: "https://pandiefoundation.org", logo: "https://pandiefoundation.org/logo.png",
  description: "Pandie Foundation supports vulnerable children in Sierra Leone.",
  email: "info@pandiefoundation.org", telephone: "+1-307-257-0001",
  founder: { "@type": "Person", name: "Joseph Allan Kamara" },
  areaServed: [{ "@type": "Country", name: "Sierra Leone" }],
  sameAs: ["https://facebook.com/pandiefoundation","https://instagram.com/pandiefoundation","https://x.com/PandieFdn"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="font-body antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <TopBar />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <TalentPlayer />
      </body>
    </html>
  );
}
