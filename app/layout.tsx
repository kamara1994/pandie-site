import type { Metadata } from "next";
import { LanguageProvider } from "@/app/context/LanguageContext";
import TopBar from "@/app/components/TopBar";
import ChatWidget from "@/app/components/ChatWidget";
import Footer from "@/app/components/Footer";
import DonatePrompt from "@/app/components/DonatePrompt";
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
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
};

export const viewport = {
  themeColor: "#0a1a10",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <TopBar />
          <main id="main-content">{children}</main>
          <Footer />
          <ChatWidget />
          <DonatePrompt />
        </LanguageProvider>
      </body>
    </html>
  );
}
