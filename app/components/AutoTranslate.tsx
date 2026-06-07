"use client";

import { useEffect, useState } from "react";
import { useLang } from "../context/LanguageContext";

// ── In-memory + localStorage cache ──────────────────────────────────
// Key format: `${lang}::${englishText}` -> translatedText
const memCache = new Map<string, string>();
const PENDING = new Map<string, Promise<Record<string, string>>>();

function cacheKey(lang: string, text: string) {
  return `${lang}::${text}`;
}

function loadFromStorage(lang: string, text: string): string | null {
  if (typeof window === "undefined") return null;
  const k = cacheKey(lang, text);
  if (memCache.has(k)) return memCache.get(k)!;
  try {
    const v = localStorage.getItem("pt:" + k);
    if (v) {
      memCache.set(k, v);
      return v;
    }
  } catch {}
  return null;
}

function saveToStorage(lang: string, text: string, translated: string) {
  const k = cacheKey(lang, text);
  memCache.set(k, translated);
  try {
    localStorage.setItem("pt:" + k, translated);
  } catch {}
}

// Batch queue: collect strings for a short window, then translate together
let queue: { lang: string; text: string }[] = [];
let queueTimer: ReturnType<typeof setTimeout> | null = null;
const listeners = new Map<string, Set<(v: string) => void>>();

async function flushQueue() {
  const batch = queue;
  queue = [];
  queueTimer = null;
  if (batch.length === 0) return;

  // group by language
  const byLang = new Map<string, string[]>();
  for (const item of batch) {
    if (!byLang.has(item.lang)) byLang.set(item.lang, []);
    const arr = byLang.get(item.lang)!;
    if (!arr.includes(item.text)) arr.push(item.text);
  }

  for (const [lang, texts] of byLang.entries()) {
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts, target: lang }),
      });
      const data = await res.json();
      const translations: string[] = data.translations || texts;
      texts.forEach((t, i) => {
        const tr = translations[i] || t;
        saveToStorage(lang, t, tr);
        const k = cacheKey(lang, t);
        listeners.get(k)?.forEach((fn) => fn(tr));
      });
    } catch {
      // fall back to English
      texts.forEach((t) => {
        const k = cacheKey(lang, t);
        listeners.get(k)?.forEach((fn) => fn(t));
      });
    }
  }
}

function requestTranslation(lang: string, text: string, cb: (v: string) => void) {
  const k = cacheKey(lang, text);
  if (!listeners.has(k)) listeners.set(k, new Set());
  listeners.get(k)!.add(cb);

  queue.push({ lang, text });
  if (!queueTimer) queueTimer = setTimeout(flushQueue, 120);

  return () => {
    listeners.get(k)?.delete(cb);
  };
}

// ── Hook: translate a single string ─────────────────────────────────
export function useT(text: string): string {
  const { lang } = useLang();
  const [value, setValue] = useState<string>(() => {
    if (lang === "en") return text;
    return loadFromStorage(lang, text) ?? text;
  });

  useEffect(() => {
    if (lang === "en") {
      setValue(text);
      return;
    }
    const cached = loadFromStorage(lang, text);
    if (cached) {
      setValue(cached);
      return;
    }
    setValue(text); // show English while loading
    const cleanup = requestTranslation(lang, text, setValue);
    return cleanup;
  }, [lang, text]);

  return value;
}

// ── Component: <T>English text</T> ──────────────────────────────────
export function T({ children }: { children: string }) {
  const translated = useT(children);
  return <>{translated}</>;
}
