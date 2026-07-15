import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Programs",
  description: "Seven pillars of transformative change: education, nutrition, medical care, child protection, sponsorship, community outreach, and the Talent Program.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
