import { redirect } from "next/navigation";

// Alias required by the build brief — the canonical story lives at
// /potential-in-motion (already live, linked, and in the sitemap).
export default function JourneyAlias() {
  redirect("/potential-in-motion");
}
