import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stories",
  description: "Real children, real names, real change — stories of hope from the communities Pandie Foundation serves across Sierra Leone.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
