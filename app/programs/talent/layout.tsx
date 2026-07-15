import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talent Program — Pandie Foundation",
  description: "Africa's future footballers, musicians, scholars, and innovators — browse real young talents and sponsor a journey that changes a family forever.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
