"use client";

// Sponsorship flow — STUB wired for a payment processor.
// TODO [CONFIRM WITH FOUNDATION]: choose Stripe Checkout (recurring price IDs)
// or Donorbox embed, then replace the handoff below at the marked point.
// Until then the flow hands off to the existing live donation page with the
// child's name carried in the visitor's mind, not in the URL (privacy).

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import GoldThread from "../components/GoldThread";
import { SPONSOR_TIERS, talentById } from "../talents/gallery/data";

function SponsorInner() {
  const params = useSearchParams();
  const child = talentById(params.get("child") || "");
  const encourage = params.get("encourage") === "1";
  const [tier, setTier] = useState(1);
  const [sent, setSent] = useState(false);

  if (encourage && child) {
    return (
      <div className="mx-auto max-w-md px-5 py-16 text-center">
        <GoldThread className="mx-auto w-24" />
        <h1 className="mt-5 font-heading text-3xl font-semibold">Send encouragement to {child.firstName}</h1>
        <p className="mt-3 text-[14px] leading-6 text-white/65">
          Your message is reviewed by the foundation team and delivered to {child.firstName} — visitors can
          never contact a child directly.
        </p>
        {sent ? (
          <p className="mt-8 border border-[#c9962a]/40 bg-[#c9962a]/10 px-5 py-4 text-[14px] text-[#e8b84b]">
            Thank you — your message is with our team for review. 💛
          </p>
        ) : (
          <form className="mt-8 text-left" onSubmit={e => { e.preventDefault(); setSent(true); }}>
            {/* TODO: wire to the moderated-messages inbox (n8n) once N8N_CHAT_WEBHOOK_URL is configured */}
            <label htmlFor="enc-msg" className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#c9962a]">Your message</label>
            <textarea id="enc-msg" required rows={4} maxLength={500}
              className="mt-2 w-full border border-white/15 bg-white/[0.06] px-4 py-3 text-[16px] text-white outline-none placeholder:text-white/35 focus:border-[#c9962a]/60 sm:text-sm"
              placeholder={`Something kind for ${child.firstName}…`} />
            <button type="submit"
              className="mt-3 flex min-h-[48px] w-full items-center justify-center bg-[#c9962a] text-[12px] font-bold uppercase tracking-[0.16em] text-[#0a1a10] transition hover:bg-[#e8b84b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b]">
              Send for review
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-5 py-16 text-center">
      <GoldThread className="mx-auto w-24" />
      <h1 className="mt-5 font-heading text-[clamp(28px,6vw,40px)] font-semibold leading-tight">
        {child ? <>Sponsor <em className="italic text-[#e8b84b]">{child.firstName}</em></> : "Sponsor a child"}
      </h1>
      {child && (
        <p className="mt-2 text-[13px] uppercase tracking-[0.16em] text-white/45">
          {child.firstName}, {child.age} · {child.town}
        </p>
      )}
      <p className="mt-4 text-[14px] leading-6 text-white/65">
        Monthly sponsorship wraps one child in steady support. Choose a level — final amounts are being
        confirmed by the foundation.
      </p>

      <div className="mt-8 space-y-2.5 text-left" role="radiogroup" aria-label="Sponsorship level">
        {SPONSOR_TIERS.map((t, i) => (
          <button key={t.amount} role="radio" aria-checked={tier === i} onClick={() => setTier(i)}
            className={`flex w-full items-baseline gap-3 border px-4 py-3.5 text-left transition focus-visible:outline-2 focus-visible:outline-[#e8b84b] ${tier === i ? "border-[#c9962a] bg-[#c9962a]/10" : "border-white/15 hover:border-white/35"}`}>
            <span className="shrink-0 font-heading text-xl font-semibold text-[#e8b84b]">{t.amount}</span>
            <span className="text-[13px] leading-5 text-white/75"><b className="text-white">{t.label}</b> — {t.detail}</span>
          </button>
        ))}
      </div>

      {/* ──────────────────────────────────────────────────────────────
          TODO PAYMENT INTEGRATION [CONFIRM WITH FOUNDATION]
          Option A — Stripe: create recurring Prices, then POST to
            /api/stripe/create-checkout-session with { amount, frequency:
            "monthly", metadata: { sponsorshipChildId } }.
          Option B — Donorbox: replace this button with the campaign embed.
          Until decided, we hand off to the LIVE donate page with the
          matching monthly amount preselected by the visitor there.
         ────────────────────────────────────────────────────────────── */}
      <Link href="/donate"
        className="mt-8 flex min-h-[48px] w-full items-center justify-center gap-2 bg-[#c9962a] text-[12px] font-bold uppercase tracking-[0.16em] text-[#0a1a10] transition hover:-translate-y-px hover:bg-[#e8b84b] hover:shadow-[0_6px_24px_rgba(201,150,42,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b]">
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        Continue to secure giving
      </Link>
      <p className="mt-3 text-[11px] leading-5 text-white/40">
        You&apos;ll complete a monthly gift of {SPONSOR_TIERS[tier].amount.replace("/mo", "")} on our secure
        donation page{child ? ` — mention ${child.firstName} in the message box and we'll link your gift` : ""}.
      </p>
      <Link href="/talents/gallery" className="mt-6 inline-block text-[12px] uppercase tracking-[0.16em] text-white/40 transition hover:text-[#e8b84b] focus-visible:outline-2 focus-visible:outline-[#e8b84b]">
        ← Back to the talents
      </Link>
    </div>
  );
}

export default function SponsorPage() {
  return (
    <div className="min-h-[100svh] bg-[#0a1a10] pt-[72px] text-white sm:pt-[76px]">
      <Suspense fallback={<div className="min-h-[60svh]" />}>
        <SponsorInner />
      </Suspense>
    </div>
  );
}
