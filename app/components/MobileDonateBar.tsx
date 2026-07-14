"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/app/context/LanguageContext";

/**
 * Persistent one-tap donate CTA for phones. Appears after the user scrolls
 * past the first viewport and hides itself on the donate flow. Desktop keeps
 * the header donate button, so this is `lg:hidden`.
 */
export default function MobileDonateBar() {
  const pathname = usePathname();
  const { t } = useLang();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't cover the donation page itself.
  if (pathname?.startsWith("/donate")) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 lg:hidden transition-transform duration-300 ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-3 mb-3 rounded-2xl border border-gold-500/30 bg-forest-900/95 p-2 pl-4 shadow-card backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-heading text-[17px] font-semibold leading-tight text-white">
              {t.event?.donateLabel || "Give a child a future"}
            </p>
            <p className="truncate text-[11px] text-white/55">
              {t.hero?.stat1Label ? `$10 ${t.impact?.s?.[0]?.sub || "feeds a child for a week"}` : "Secure • Every gift counts"}
            </p>
          </div>
          <Link
            href="/donate"
            className="gold-cta shrink-0 rounded-xl bg-gold-500 px-6 py-3 text-[13px] font-bold uppercase tracking-[0.14em] text-forest-900 transition-colors active:bg-gold-400"
          >
            {t.nav?.donate || "Donate"}
          </Link>
        </div>
      </div>
    </div>
  );
}
