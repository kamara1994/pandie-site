"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useT } from "../components/AutoTranslate";

function Tx({ children, className }: { children: string; className?: string }) {
  const t = useT(children);
  return <span className={className}>{t}</span>;
}

export default function DonatePage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  const reveal = (delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a1a10]">
      {/* Background image with warm overlay */}
      <div className="absolute inset-0">
        <Image
          src="/heroimage.jpeg"
          alt=""
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a10]/85 via-[#0a1a10]/90 to-[#0a1a10]" />
      </div>

      {/* Decorative blur orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#c9962a]/[0.08] blur-[120px]" />
        <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-[#c9962a]/[0.05] blur-[120px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">

        {/* Logo + glow */}
        <div style={reveal(0)} className="relative mb-10">
          <div className="absolute inset-0 animate-pulse rounded-full bg-[#c9962a]/30 blur-2xl" />
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-[#c9962a]/60 shadow-[0_0_40px_rgba(201,150,42,0.45)]">
            <Image src="/logo.png" alt="Pandie Foundation" fill className="object-cover" />
          </div>
        </div>

        {/* Construction badge */}
        <div style={reveal(150)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#c9962a]/40 bg-[#c9962a]/10 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.32em] text-[#c9962a]">
            <span className="text-base">🔒</span>
            <Tx>Under Construction</Tx>
          </span>
        </div>

        {/* Heading */}
        <h1
          style={reveal(300)}
          className="mt-8 font-heading text-[clamp(40px,6vw,68px)] font-semibold leading-[1.05] text-white"
        >
          <Tx>Thank You for</Tx><br />
          <em className="italic text-[#e8b84b]"><Tx>Your Beautiful Heart</Tx></em>
        </h1>

        {/* Sweet message */}
        <p
          style={reveal(450)}
          className="mt-8 max-w-xl text-[17px] leading-9 text-white/75"
        >
          <Tx>The fact that you came here — ready to give — already means more to us than you can imagine. Our online donation page is being built right now to make sure every gift reaches a child safely and securely.</Tx>
        </p>

        <p
          style={reveal(600)}
          className="mt-5 max-w-xl text-[16px] leading-8 text-white/55"
        >
          <Tx>Online giving will open very soon. Until then, if your heart is leading you to help a child today, we would be so honored to hear from you directly.</Tx>
        </p>

        {/* Email card */}
        <div
          style={reveal(750)}
          className="mt-12 w-full max-w-md rounded-2xl border border-[#c9962a]/25 bg-[#0f2418]/60 p-7 backdrop-blur-sm"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c9962a]">
            <Tx>Donate Today by Email</Tx>
          </p>
          <a
            href="mailto:info@pandiefoundation.org?subject=I want to support Pandie Foundation"
            className="mt-3 inline-block font-heading text-[22px] font-semibold text-white transition hover:text-[#e8b84b] sm:text-[26px]"
          >
            info@pandiefoundation.org
          </a>
          <p className="mt-4 text-[13px] leading-6 text-white/45">
            <Tx>Tell us how you'd like to help — one-time gift, monthly sponsorship, or sponsoring a specific child — and our team will personally guide you through it.</Tx>
          </p>
        </div>

        {/* Phone */}
        <div style={reveal(900)} className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px] text-white/50">
          <span><Tx>or call us</Tx></span>
          <a href="tel:+13072570001" className="font-semibold text-white/80 transition hover:text-[#c9962a]">
            +1 (307) 257-0001
          </a>
        </div>

        {/* CTAs */}
        <div style={reveal(1050)} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/programs"
            className="group inline-flex items-center gap-2 bg-[#c9962a] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition-all duration-300 hover:bg-[#e8b84b] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,150,42,0.45)]"
          >
            <Tx>See Our Programs</Tx>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 border border-white/25 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 transition hover:border-white/60 hover:text-white"
          >
            <Tx>Read Their Stories</Tx>
          </Link>
        </div>

        {/* Closing quote */}
        <p
          style={reveal(1250)}
          className="mt-16 max-w-lg text-[13px] italic leading-7 text-white/35"
        >
          <Tx>"Every child reached, every meal served, every life lifted — it all begins with a heart like yours that chose to care."</Tx>
        </p>
        <p style={reveal(1400)} className="mt-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c9962a]/70">
          <Tx>— The Pandie Family</Tx>
        </p>
      </div>
    </main>
  );
}
