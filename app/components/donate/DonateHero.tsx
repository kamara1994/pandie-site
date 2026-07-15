"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "@/app/context/LanguageContext";

export default function DonateHero() {
  const { flat, lang } = useLang();
  const tr = (x: string) => (lang === "en" ? x : flat.get(x) ?? x);
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <section className="relative overflow-hidden bg-[#0a1a10] py-28 text-white lg:py-36">
      <div className="absolute inset-0">
        <Image src="/hero02.jpg" alt="Children in Sierra Leone" fill className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a10]/98 via-[#0a1a10]/80 to-[#0a1a10]/60" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent opacity-60" />

      <div className="relative px-6 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6 transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: "100ms" }}>
            <div className="h-px w-10 bg-[#c9962a]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">{tr("Support Pandie Foundation")}</span>
          </div>

          <h1 className="font-heading text-[clamp(40px,6vw,78px)] font-semibold leading-[1.05] transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transitionDelay: "250ms" }}>
            {tr("Give Hope.")}<br />{tr("Restore Dignity.")}<br /><em className="italic text-[#e8b84b]">{tr("Change a Child's Future.")}</em>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65 transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transitionDelay: "450ms" }}>
            {tr("Your donation helps vulnerable children in Sierra Leone access education, nutrition, and basic medical care. Every gift matters. Every act of generosity builds a stronger future.")}
          </p>

          {/* Impact quick stats */}
          <div className="mt-14 flex flex-wrap gap-10 border-t border-white/10 pt-10 transition-all duration-700" style={{ opacity: visible ? 1 : 0, transitionDelay: "600ms" }}>
            {[
              { amount: "$10", impact: "Feeds a child for one week" },
              { amount: "$25", impact: "School supplies for one month" },
              { amount: "$50", impact: "Medical visit + treatment" },
              { amount: "$100", impact: "Full month of program support" },
            ].map(({ amount, impact }) => (
              <div key={amount}>
                <p className="font-heading text-3xl font-semibold text-[#c9962a]">{amount}</p>
                <p className="mt-1 text-[12px] text-white/50 max-w-[120px] leading-5">{tr(impact)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
