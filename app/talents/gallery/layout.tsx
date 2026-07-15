import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talent Gallery",
  description: "Every child has a talent. Watch young footballers, singers, scholars, medics, artists, and dancers from Sierra Leone shine — and help one keep going.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
