import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
  description: "Give hope to a child in Sierra Leone. One-time or monthly gifts fund education, meals, medical care, and protection — secure checkout by Stripe.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
