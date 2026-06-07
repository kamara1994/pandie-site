"use client";

import { useLang } from "../context/LanguageContext";

// Look up an English string in the pre-built translation map.
// Instant — no API calls. If a string isn't in the pre-built file,
// we fall back to English.
export function useT(text: string): string {
  const { flat, lang } = useLang();
  if (lang === "en") return text;
  return flat.get(text) ?? text;
}

export function T({ children }: { children: string }) {
  return <>{useT(children)}</>;
}
