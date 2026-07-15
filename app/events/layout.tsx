import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "Fundraisers, feeding programs, and community events by Pandie Foundation — see what's happening and be part of it.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
