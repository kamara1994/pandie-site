import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pandiefoundation.org";
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/donate`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/programs`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/programs/education`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs/nutrition`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs/medical`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs/protection`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs/sponsorship`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs/outreach`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs/talent`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/programs/talent/football`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/programs/talent/music`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/programs/talent/academic`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/programs/talent/technology`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/stories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/get-involved`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
