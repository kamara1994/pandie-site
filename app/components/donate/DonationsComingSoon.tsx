"use client";

import Link from "next/link";
import { useLang } from "@/app/context/LanguageContext";

/**
 * Shown in place of the payment flows while DONATIONS_LIVE is false.
 * Keeps the page warm and on-brand: this is a pause, not a closed door.
 */
export default function DonationsComingSoon() {
  const { flat, lang } = useLang();
  const tr = (x: string) => (lang === "en" ? x : flat.get(x) ?? x);

  return (
    <section className="bg-[#f4f1ea] px-5 py-16 sm:px-6 sm:py-24 lg:px-20">
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#c9962a]/25 bg-white p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:p-12">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9962a]">
          {tr("Under construction")}
        </p>
        <h2 className="mt-4 font-heading text-4xl font-semibold text-[#214c34] sm:text-5xl">
          {tr("Online giving is coming soon")}
        </h2>
        <div className="mx-auto mt-6 h-px w-16 bg-[#c9962a]/50" />
        <p className="mt-6 text-[15px] leading-8 text-[#5f6663]">
          {tr("We are putting the final touches on a secure donation experience so every gift reaches the children safely and transparently. Thank you for your patience — and for caring.")}
        </p>
        <p className="mt-4 text-[15px] leading-8 text-[#5f6663]">
          {tr("In the meantime, you can still volunteer, donate items, or partner with us below — or reach out directly and we will guide you personally.")}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="w-full bg-[#c9962a] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-[#0a1a10] transition hover:bg-[#e8b84b] sm:w-auto"
          >
            {tr("Contact us to give")}
          </Link>
          <Link
            href="/get-involved"
            className="w-full border border-[#214c34]/30 px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-[#214c34] transition hover:border-[#214c34] sm:w-auto"
          >
            {tr("Other ways to help")}
          </Link>
        </div>
      </div>
    </section>
  );
}
