import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Potential in Motion",
  description: "Follow one opportunity as it travels from child to child — a football, a microphone, a book, a stethoscope — and becomes a future. A scroll-guided story from Pandie Foundation.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
