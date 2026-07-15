"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/app/context/LanguageContext";
import GoldThread from "./GoldThread";

// UNICEF-style donation prompt: appears once per session after 20s or ~45%
// scroll (whichever first), never on the donate flow, always dismissible.
export default function DonatePrompt() {
  const pathname = usePathname();
  const { flat, lang } = useLang();
  const tr = (s: string) => (lang === "en" ? s : flat.get(s) ?? s);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Never prompt on the donate flow, or over the Potential in Motion story —
    // that page carries its own donation arc and finale CTA.
    if (pathname.startsWith("/donate") || pathname.startsWith("/potential-in-motion")) return;
    if (sessionStorage.getItem("pandie-donate-prompt")) return;

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      sessionStorage.setItem("pandie-donate-prompt", "1");
      setOpen(true);
      cleanup();
    };
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      if (scrolled > document.documentElement.scrollHeight * 0.45) show();
    };
    const timer = setTimeout(show, 20000);
    window.addEventListener("scroll", onScroll, { passive: true });
    const cleanup = () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
    return cleanup;
  }, [pathname]);

  // Esc dismisses
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label={tr("Make a Difference Today")}
      className="fixed inset-x-0 bottom-0 z-[95] p-3 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:w-[380px] sm:p-0"
      style={{ animation: "donatePromptIn 0.5s cubic-bezier(.22,1,.36,1) both" }}
    >
      <style>{`
        @keyframes donatePromptIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { [role="dialog"] { animation: none !important; } }
      `}</style>
      <div className="relative overflow-hidden rounded-2xl bg-[#0a1a10] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)] ring-1 ring-[#c9962a]/30 sm:p-7">
        <div className="pointer-events-none absolute -right-1/4 -top-1/2 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(201,150,42,0.14),transparent_70%)]" />
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center text-white/40 transition hover:text-white focus-visible:outline-2 focus-visible:outline-[#e8b84b]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <GoldThread className="w-16" />
        <p className="mt-4 font-heading text-[24px] font-semibold leading-snug text-white sm:text-[26px]">
          {tr("Every Child Deserves Hope")}
        </p>
        <p className="mt-2 text-[14px] leading-6 text-white/70">
          {tr("Are you ready to change a child's life today?")}
        </p>

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <Link
            href="/donate"
            onClick={() => setOpen(false)}
            className="flex flex-1 items-center justify-center gap-2 bg-[#c9962a] px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a1a10] transition hover:bg-[#e8b84b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b]"
          >
            <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {tr("Donate Now")}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/50 transition hover:text-white focus-visible:outline-2 focus-visible:outline-[#e8b84b]"
          >
            {tr("Not yet")}
          </button>
        </div>
      </div>
    </div>
  );
}
