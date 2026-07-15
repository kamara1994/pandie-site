"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/app/context/LanguageContext";
import GoldThread from "./GoldThread";

export default function Footer() {
  const { flat, lang } = useLang();
  // Same lookup as useT(), but callable inside loops: English source string
  // → translated string, falling back to English when a translation is absent.
  const tr = (s: string) => (lang === "en" ? s : flat.get(s) ?? s);

  // Mobile accordion state for the link columns; columns are always open on lg+
  const [openSec, setOpenSec] = useState<string | null>(null);
  const toggleSec = (key: string) => {
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    setOpenSec(prev => (prev === key ? null : key));
  };

  const sectionHeaderCls =
    "flex w-full items-center justify-between text-left text-[11px] font-bold uppercase tracking-[0.24em] text-[#e8b84b] lg:pointer-events-none";
  const SectionHeader = ({ id, label }: { id: string; label: string }) => (
    <button type="button" onClick={() => toggleSec(id)} aria-expanded={openSec === id} className={sectionHeaderCls}>
      <span className="after:mt-3 after:block after:h-px after:w-8 after:bg-gradient-to-r after:from-[#c9962a]/70 after:to-transparent">
        {label}
      </span>
      {/* span wrapper: the unlayered `svg { display:block }` in globals.css would
          override Tailwind's layered lg:hidden if it sat on the svg itself */}
      <span className={`shrink-0 transition-transform duration-300 lg:hidden ${openSec === id ? "rotate-180" : ""}`}>
        <svg width="10" height="10" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
          <path d="M0 2l4 4 4-4H0z" />
        </svg>
      </span>
    </button>
  );
  const sectionBodyCls = (id: string) => `${openSec === id ? "block" : "hidden"} lg:block`;

  const [nlName, setNlName] = useState("");
  const [nlEmail, setNlEmail] = useState("");
  const [nlCompany, setNlCompany] = useState(""); // honeypot — humans never see or fill this
  const [nlStatus, setNlStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [nlError, setNlError] = useState("");

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nlStatus === "sending") return;
    if (nlCompany) {
      // Honeypot tripped: report success to the bot, send nothing.
      setNlStatus("ok");
      return;
    }
    setNlStatus("sending");
    setNlError("");
    try {
      const res = await fetch("/api/chat-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nlName,
          email: nlEmail,
          message: "Newsletter signup from the website footer — please add me to the mailing list.",
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setNlError(data?.error || tr("Something went wrong. Please try again."));
        setNlStatus("error");
        return;
      }
      setNlStatus("ok");
    } catch {
      setNlError(tr("Something went wrong. Please try again."));
      setNlStatus("error");
    }
  };
  const socialLinks = [
    {
      label: "Facebook",
      href: "https://facebook.com/pandiefoundation",
      icon: (
        <path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      ),
    },
    {
      label: "Instagram",
      href: "https://instagram.com/pandiefoundation",
      icon: (
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      ),
    },
    {
      label: "X",
      href: "https://x.com/PandieFdn",
      icon: (
        <path d="M18.244 2H21.5l-7.12 8.138L22.75 22h-6.554l-5.132-6.71L5.19 22H1.93l7.617-8.705L1.5 2h6.72l4.64 6.13L18.244 2zm-1.15 18h1.803L7.214 3.896H5.28L17.094 20z" />
      ),
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@pandiefoundation",
      icon: (
        <path d="M19.589 6.686a4.793 4.793 0 01-3.77-4.245V2h-3.426v13.555a2.896 2.896 0 01-2.89 2.923 2.896 2.896 0 01-2.89-2.923 2.896 2.896 0 012.89-2.923c.28 0 .552.04.809.116V9.277a6.329 6.329 0 00-.809-.052A6.35 6.35 0 003.16 15.58 6.35 6.35 0 009.503 21.94a6.35 6.35 0 006.343-6.36V8.687a8.18 8.18 0 004.775 1.526V6.79a4.815 4.815 0 01-1.032-.104z" />
      ),
    },
  ];

  // Organization structured data — only facts already published on this page
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Pandie Foundation",
    alternateName: "The Mother of All",
    url: "https://pandiefoundation.org",
    logo: "https://pandiefoundation.org/logo.png",
    email: "info@pandiefoundation.org",
    telephone: "+1-307-257-0001",
    description:
      "A humanitarian nonprofit dedicated to protecting and uplifting vulnerable children in Sierra Leone through education, nutrition, medical assistance, and compassionate care.",
    areaServed: "Sierra Leone",
    sameAs: socialLinks.map(s => s.href),
  };

  return (
    <footer className="relative overflow-hidden text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/event.jpg"
          alt="Footer background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0a1a10]/93" />
      </div>

      {/* Gold hairline top edge — mirrors the top bar's, bookending the page */}
      <div className="absolute inset-x-0 top-0 z-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#c9962a]/70 to-transparent" />
      <div className="pointer-events-none absolute -top-1/4 right-0 z-10 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(201,150,42,0.10),transparent_70%)]" />

      {/* Giant serif watermark — the quiet signature behind the grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-10 z-[5] select-none overflow-hidden">
        <p className="text-center font-heading text-[32vw] italic leading-none text-white/[0.03] lg:text-[260px]">Pandie</p>
      </div>

      {/* Content */}
      <div className="relative z-10">

        <div className="border-b border-white/10 px-5 py-12 lg:px-8 xl:px-12">
          <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-8 text-center sm:flex-row sm:text-left">
            <div>
              <GoldThread className="mx-auto w-24 sm:mx-0" />
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#e8b84b]">
                {tr("Make a Difference Today")}
              </p>
              <p className="mt-3 font-heading text-4xl font-semibold leading-none text-white sm:text-5xl">
                {tr("Every Child Deserves Hope")}
              </p>
            </div>

            <Link
              href="/donate"
              className="group relative flex w-full max-w-sm shrink-0 justify-center overflow-hidden bg-[#c9962a] px-9 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] sm:w-auto transition-all duration-300 hover:-translate-y-px hover:bg-[#e8b84b] hover:shadow-[0_6px_24px_rgba(201,150,42,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8b84b]"
            >
              <span className="relative z-10 flex items-center gap-2"><svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>{tr("Donate Now")}</span>
              <span className="absolute inset-0 -translate-x-full -skew-x-12 bg-white/25 transition-transform duration-500 group-hover:translate-x-[200%] motion-reduce:hidden" />
            </Link>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="px-5 py-16 lg:px-8 xl:px-12">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
              {/* Brand column */}
              <div>
                <Link href="/" className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/20">
                    <Image
                      src="/logo.png"
                      alt="Pandie Foundation"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">Pandie</p>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/50">
                      {tr("The Mother of All")}
                    </p>
                  </div>
                </Link>

                <p className="mt-6 max-w-xs text-sm leading-7 text-white/70">
                  {tr("A humanitarian nonprofit dedicated to protecting and uplifting vulnerable children in Sierra Leone through education, nutrition, medical assistance, and compassionate care.")}
                </p>

                {/* Newsletter signup — leads flow through the guarded chat-message API */}
                <div className="mt-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#e8b84b]">
                    {tr("Stay Close to the Work")}
                  </p>
                  {nlStatus === "ok" ? (
                    <p aria-live="polite" className="mt-4 text-sm text-white/80">
                      {tr("You’re on the list — thank you for standing with us.")}
                    </p>
                  ) : (
                    <form onSubmit={handleNewsletter} className="mt-4 max-w-xs">
                      <input
                        type="text"
                        name="company"
                        value={nlCompany}
                        onChange={e => setNlCompany(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="absolute -left-[9999px] h-0 w-0 opacity-0"
                      />
                      <label htmlFor="footer-nl-name" className="sr-only">{tr("Your name")}</label>
                      <input
                        id="footer-nl-name"
                        value={nlName}
                        onChange={e => setNlName(e.target.value)}
                        required
                        placeholder={tr("Your name")}
                        autoComplete="name"
                        className="w-full rounded-none border border-white/15 bg-white/[0.06] px-4 py-3 text-[16px] text-white outline-none transition placeholder:text-white/35 focus:border-[#c9962a]/60 focus:bg-white/[0.09] sm:text-sm"
                      />
                      <div className="mt-2 flex">
                        <label htmlFor="footer-nl-email" className="sr-only">{tr("Email address")}</label>
                        <input
                          id="footer-nl-email"
                          type="email"
                          value={nlEmail}
                          onChange={e => setNlEmail(e.target.value)}
                          required
                          placeholder={tr("Email address")}
                          autoComplete="email"
                          className="min-w-0 flex-1 border border-r-0 border-white/15 bg-white/[0.06] px-4 py-3 text-[16px] text-white outline-none transition placeholder:text-white/35 focus:border-[#c9962a]/60 focus:bg-white/[0.09] sm:text-sm"
                        />
                        <button
                          type="submit"
                          disabled={nlStatus === "sending"}
                          className="shrink-0 bg-[#c9962a] px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a1a10] transition hover:bg-[#e8b84b] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b]"
                        >
                          {nlStatus === "sending" ? "…" : tr("Join")}
                        </button>
                      </div>
                      {nlStatus === "error" && (
                        <p aria-live="polite" className="mt-2 text-[12px] text-[#e8b84b]/90">{nlError}</p>
                      )}
                    </form>
                  )}
                </div>

                {/* Social Links */}
                <div className="mt-6 flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9962a]/35 bg-transparent text-white/55 transition-all duration-300 hover:border-[#c9962a] hover:bg-[#c9962a]/10 hover:text-[#c9962a] hover:shadow-[0_0_18px_rgba(201,150,42,0.35)]"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {social.icon}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="border-b border-white/10 pb-5 lg:border-0 lg:pb-0">
                <SectionHeader id="quick" label={tr("Quick Links")} />
                <ul className={`mt-5 space-y-1 ${sectionBodyCls("quick")}`}>
                  {[
                    { label: "About Us", href: "/about" },
                    { label: "Our Programs", href: "/programs" },
                    { label: "Stories", href: "/stories" },
                    { label: "Events", href: "/events" },
                    { label: "Contact Us", href: "/contact" },
                    { label: "Donate", href: "/donate" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center py-1.5 text-sm text-white/70 transition-colors duration-300 hover:text-[#e8b84b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b]"
                      >
                        <span className="h-px w-0 bg-[#c9962a] transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                        {tr(link.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Programs */}
              <div className="border-b border-white/10 pb-5 lg:border-0 lg:pb-0">
                <SectionHeader id="programs" label={tr("Our Programs")} />
                <ul className={`mt-5 space-y-1 ${sectionBodyCls("programs")}`}>
                  {[
                    { label: "Education Support", href: "/programs/education" },
                    { label: "Nutrition Support", href: "/programs/nutrition" },
                    { label: "Medical Assistance", href: "/programs/medical" },
                    { label: "Child Protection", href: "/programs/protection" },
                    { label: "Child Sponsorship", href: "/programs/sponsorship" },
                    { label: "Community Outreach", href: "/programs/outreach" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center py-1.5 text-sm text-white/70 transition-colors duration-300 hover:text-[#e8b84b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b]"
                      >
                        <span className="h-px w-0 bg-[#c9962a] transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                        {tr(link.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <SectionHeader id="contact" label={tr("Get In Touch")} />
                <ul className={`mt-5 space-y-5 ${sectionBodyCls("contact")}`}>
                  {[
                    {
                      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                      label: "Email",
                      value: "info@pandiefoundation.org",
                      href: "mailto:info@pandiefoundation.org",
                    },
                    {
                      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                      label: "Phone",
                      value: "+1 (307) 257-0001",
                      href: "tel:+13072570001",
                    },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                        <svg
                          className="h-3.5 w-3.5 text-[#e8b84b]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={item.icon}
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                          {tr(item.label)}
                        </p>
                        <a
                          href={item.href}
                          className="mt-1 text-sm text-white/70 transition hover:text-[#e8b84b]"
                        >
                          {item.value}
                        </a>
                      </div>
                    </li>
                  ))}

                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <svg
                        className="h-3.5 w-3.5 text-[#e8b84b]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                        {tr("Location")}
                      </p>
                      <p className="mt-1 text-sm text-white/70">
                        {tr("United States of America")}
                        <br />
                        {tr("Sierra Leone Operations: Freetown, SL")}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <svg
                        className="h-3.5 w-3.5 text-[#e8b84b]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                        {tr("Office Hours")}
                      </p>
                      <p className="mt-1 text-sm text-white/70">
                        {tr("Mon – Fri: 9:00 AM – 5:00 PM EST")}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 px-5 py-6 lg:px-8 xl:px-12">
          <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} Pandie Foundation. {tr("All rights reserved.")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-white/50">
              <Link href="/about" className="transition hover:text-[#e8b84b]">
                {tr("About")}
              </Link>
              <Link href="/programs" className="transition hover:text-[#e8b84b]">
                {tr("Programs")}
              </Link>
              <Link href="/contact" className="transition hover:text-[#e8b84b]">
                {tr("Contact")}
              </Link>
              <Link href="/donate" className="transition hover:text-[#e8b84b]">
                {tr("Donate")}
              </Link>
              <span className="text-white/30">|</span>
              <p className="font-heading text-[15px] italic text-[#c9962a]/80">
                {tr("The Mother of All")}
              </p>
              <button
                type="button"
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                  })
                }
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40 transition hover:text-[#e8b84b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b]"
              >
                {tr("Back to top")}
                <span aria-hidden="true">↑</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}