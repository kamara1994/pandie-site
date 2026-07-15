import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pandie Foundation",
    short_name: "Pandie",
    description: "Standing in the gap for vulnerable children across Sierra Leone.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a1a10",
    theme_color: "#0a1a10",
    icons: [{ src: "/logo.png", sizes: "any", type: "image/png" }],
  };
}
