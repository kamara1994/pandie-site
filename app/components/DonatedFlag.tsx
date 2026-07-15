"use client";

import { useEffect } from "react";

// Rendered on the donate success page: marks this browser as a donor so the
// donation prompt never appears for them again.
export default function DonatedFlag() {
  useEffect(() => {
    try { localStorage.setItem("pf_donated", "1"); } catch {}
  }, []);
  return null;
}
