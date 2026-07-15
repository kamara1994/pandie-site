import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach the Pandie Foundation team — questions, partnerships, volunteering, or press. We answer personally.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
