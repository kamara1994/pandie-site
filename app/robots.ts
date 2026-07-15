import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/donate/success", "/donate/cancel"],
    },
    sitemap: "https://pandiefoundation.org/sitemap.xml",
  };
}
