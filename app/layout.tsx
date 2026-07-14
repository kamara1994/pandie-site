import type { Metadata } from "next";
import { LanguageProvider } from "@/app/context/LanguageContext";
import TopBar from "@/app/components/TopBar";
import ChatWidget from "@/app/components/ChatWidget";
import Footer from "@/app/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pandie Foundation — The Mother of All",
  description: "Standing in the gap for vulnerable children across Sierra Leone.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <TopBar />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
