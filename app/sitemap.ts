import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://pandiefoundation.org",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://pandiefoundation.org/about",
      lastModified: new Date(),
    },
    {
      url: "https://pandiefoundation.org/programs",
      lastModified: new Date(),
    },
    {
      url: "https://pandiefoundation.org/get-involved",
      lastModified: new Date(),
    },
    {
      url: "https://pandiefoundation.org/contact",
      lastModified: new Date(),
    },
  ];
}