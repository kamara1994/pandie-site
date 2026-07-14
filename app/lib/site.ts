// Single source of truth for site-wide constants that were previously
// duplicated across Footer, contact, ChatWidget, and the donation forms.

export const SITE = {
  name: "Pandie Foundation",
  tagline: "The Mother of All",
  description:
    "Pandie Foundation stands in the gap for vulnerable children across Sierra Leone — providing education, nutrition, medical care, and protection.",
  url: "https://pandiefoundation.org",
  email: "info@pandiefoundation.org",
  phone: "+1 (307) 257-0001",
  phoneHref: "tel:+13072570001",
  founder: "Joseph Allan Kamara",
  founded: "2024",
  hq: "United States",
  operations: "Freetown, Sierra Leone",
  socials: {
    facebook: "https://facebook.com/pandiefoundation",
    instagram: "https://instagram.com/pandiefoundation",
    twitter: "https://twitter.com/pandiefoundation",
    youtube: "https://youtube.com/@pandiefoundation",
  },
} as const;

/** Resolve the public site origin, tolerant of missing env on preview. */
export function siteOrigin(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
