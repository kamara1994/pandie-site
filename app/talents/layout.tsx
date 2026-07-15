import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Talent Room",
  description: "Step inside the Talent Room — footballers, singers, scholars, and young innovators from across Africa, each waiting for one person to believe in them.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
