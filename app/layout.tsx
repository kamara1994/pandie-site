import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { LanguageProvider } from "@/app/context/LanguageContext";
import TopBar from "@/app/components/TopBar";
import ChatWidget from "@/app/components/ChatWidget";
import Footer from "@/app/components/Footer";
import MobileDonateBar from "@/app/components/MobileDonateBar";
import { SITE, siteOrigin } from "@/app/lib/site";
import "./globals.css";

// Self-hosted, preloaded fonts exposed as CSS variables (no render-blocking
// external stylesheet). Weights match what the design actually uses.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Pandie Foundation", "Sierra Leone charity", "sponsor a child",
    "children's charity", "donate", "nonprofit", "education", "nutrition",
    "child protection", "Freetown",
  ],
  authors: [{ name: SITE.founder }],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: siteOrigin(),
    images: [{ url: "/heroimage.jpeg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ["/heroimage.jpeg"],
  },
  icons: { icon: "/favicon.ico", apple: "/logo.png" },
  robots: { index: true, follow: true },
  alternates: { canonical: siteOrigin() },
};

export const viewport: Viewport = {
  themeColor: "#0a1a10",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: SITE.name,
  alternateName: SITE.tagline,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  foundingDate: SITE.founded,
  founder: { "@type": "Person", name: SITE.founder },
  description: SITE.description,
  areaServed: { "@type": "Country", name: "Sierra Leone" },
  sameAs: Object.values(SITE.socials),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${cormorant.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main-content" className="skip-link">Skip to content</a>
        <LanguageProvider>
          <TopBar />
          <main id="main-content">{children}</main>
          <Footer />
          <MobileDonateBar />
          <ChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
