"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function DonateCancelPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#1f2a1f]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#0a1a10] py-28 text-white lg:py-36">
        {/* Grid overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* Soft glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9962a]/[0.05] blur-[120px]" />
          <div className="absolute left-1/3 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[#6aab7e]/[0.04] blur-[100px]" />
        </div>
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent opacity-60" />

        <div className="relative mx-auto max-w-2xl px-6 text-center">
          {/* Heart icon — warm, not a cold X */}
          <div
            className="relative mx-auto mb-8 w-fit"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "scale(1)" : "scale(0.85)", transition: "all 0.8s ease" }}
          >
            <div className="absolute inset-0 rounded-full bg-[#c9962a]/10 animate-pulse" style={{ animationDuration: "3s" }} />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/5">
              <svg className="h-11 w-11 text-white/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
          </div>

          <p
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(12px)", transition: "all 0.7s ease", transitionDelay: "200ms" }}
          >
            No Payment Was Made ✦
          </p>

          <h1
            className="font-heading text-[clamp(36px,5vw,62px)] font-semibold leading-tight"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease", transitionDelay: "350ms" }}
          >
            Your heart brought you{" "}
            <br />
            <em className="italic text-[#e8b84b]">this far.</em>
          </h1>

          <p
            className="mt-6 text-lg leading-8 text-white/65"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(14px)", transition: "all 0.7s ease", transitionDelay: "500ms" }}
          >
            Nothing was charged. No commitment was made. The children are still waiting — and whenever you are ready, we will be here.
          </p>
        </div>
      </section>

      {/* ── What your gift would mean ── */}
      <section
        className="px-5 py-14 lg:px-8"
        style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.8s ease", transitionDelay: "650ms" }}
      >
        <div className="mx-auto max-w-2xl">
          <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.32em] text-[#c9962a]">
            Here&apos;s what your gift would make possible
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { emoji: "📚", label: "School supplies for a child" },
              { emoji: "🍽️", label: "A week of nutritious meals" },
              { emoji: "💊", label: "A full medical visit" },
            ].map(({ emoji, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 rounded-xl border border-[#e7dfd0] bg-white px-3 py-5 text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <span className="text-3xl">{emoji}</span>
                <p className="text-[12px] leading-4 text-[#5f6663]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recovery card ── */}
      <section className="px-5 pb-16 lg:px-8">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:p-10">
            <h2 className="font-heading text-2xl font-semibold text-[#214c34]">
              No pressure. Come back whenever you&apos;re ready.
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f6663]">
              Your payment was not completed and nothing was charged. If something got in the way — or if you simply needed a moment — that is completely okay. The children will still be here, and so will we.
            </p>

            <div className="mt-6 rounded-xl border border-[#e7dfd0] bg-[#fcfaf6] p-5 text-sm leading-7 text-[#5f6663]">
              <p className="font-semibold text-[#214c34]">Even a small gift changes a life</p>
              <p className="mt-2">
                $10 feeds a child for a week. $30 sponsors a month of education. $50 covers a full medical visit. Every amount — no matter how small — reaches a real child in Sierra Leone.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/donate"
                className="flex-1 rounded-xl bg-[#c9962a] px-6 py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a1a10] transition-all duration-300 hover:bg-[#e8b84b] hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(201,150,42,0.45)]"
              >
                Give Now
              </Link>
              <Link
                href="/"
                className="flex-1 rounded-xl border border-[#214c34] px-6 py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#214c34] transition hover:bg-[#214c34] hover:text-white"
              >
                Return Home
              </Link>
            </div>
          </div>

          <p className="mt-8 text-center text-[15px] leading-8 text-[#5f6663]">
            🌱 A child&apos;s future is worth coming back for.
          </p>
        </div>
      </section>
    </main>
  );
}
