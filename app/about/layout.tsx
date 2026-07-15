import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "The story of Pandie Foundation — founded by Joseph Allan Kamara in honor of his mother, Pandie Grace Bangura, to protect and uplift vulnerable children in Sierra Leone.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
