import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor a Child",
  description: "Monthly sponsorship wraps one child in Sierra Leone in steady support — education, meals, medical care, and talent coaching.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
