import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { LanguageProvider } from "@/app/context/LanguageContext";
import TopBar from "@/app/components/TopBar";
import Footer from "@/app/components/Footer";
import LazyWidgets from "@/app/components/LazyWidgets";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pandiefoundation.org"),
  title: {
    default: "Pandie Foundation — The Mother of All",
    template: "%s — Pandie Foundation",
  },
  description: "Standing in the gap for vulnerable children across Sierra Leone through education, nutrition, medical care, and compassionate protection.",
  openGraph: {
    siteName: "Pandie Foundation",
    type: "website",
    images: [{ url: "/heroimage.jpeg", width: 1024, height: 701, alt: "Pandie Foundation — every child deserves a mother's love" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@PandieFdn",
  },
};

export const viewport = {
  themeColor: "#0a1a10",
};

// Self-hosted via next/font: fonts ship from our own domain with zero
// render-blocking requests to fonts.googleapis.com — critical on slow networks.
const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});
const body = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <LanguageProvider>
          <TopBar />
          <main id="main-content">{children}</main>
          <Footer />
          <LazyWidgets />
        </LanguageProvider>
      </body>
    </html>
  );
}
