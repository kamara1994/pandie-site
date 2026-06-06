"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang, LANGUAGES, type LangCode } from "@/app/context/LanguageContext";

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const { t, lang, setLang, currentLang } = useLang();
  const langRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/about",        label: t.nav.about        },
    { href: "/get-involved", label: t.nav.getInvolved  },
    { href: "/programs",     label: t.nav.programs     },
    { href: "/stories",      label: t.nav.stories      },
    { href: "/events",       label: t.nav.events       },
    { href: "/contact",      label: t.nav.contact      },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredLangs = LANGUAGES.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(search.toLowerCase())
  );

  const handleLangSelect = (code: LangCode) => {
    setLang(code);
    setLangOpen(false);
    setSearch("");
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full">
        <div className="absolute inset-0 bg-[#0a1a10]/97 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-md" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
          <Image src="/nav-texture.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#c9962a]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div className="relative z-10 flex w-full items-center justify-between px-6 py-3.5 lg:px-20">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3.5">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/20 transition-all duration-400 group-hover:border-[#c9962a]/50 group-hover:shadow-[0_0_18px_rgba(201,150,42,0.35)] md:h-12 md:w-12">
              <Image src="/logo.png" alt="Pandie Foundation logo" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="leading-none">
              <p className="text-[18px] font-bold tracking-wide text-white transition-colors duration-300 group-hover:text-[#e8b84b] md:text-[20px]">Pandie</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.28em] text-white/45 transition-colors duration-300 group-hover:text-white/60">The Mother of All</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className={`group relative pb-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 ${isActive(l.href) ? "text-white" : "text-white/60 hover:text-white"}`}>
                {l.label}
                <span className={`absolute bottom-0 left-0 h-[1.5px] rounded-full bg-[#c9962a] transition-all duration-300 ${isActive(l.href) ? "w-full" : "w-0 group-hover:w-full"}`} />
                {isActive(l.href) && (
                  <span className="absolute -bottom-[5px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#c9962a] shadow-[0_0_6px_rgba(201,150,42,0.9)]" />
                )}
              </Link>
            ))}

            {/* Language Switcher */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(p => !p)}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold text-white/60 transition hover:border-[#c9962a]/40 hover:text-white"
                title="Switch language"
              >
                <span className="text-[14px]">{currentLang.flag}</span>
                <span className="hidden xl:inline">{currentLang.nativeName}</span>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}>
                  <path d="M0 2l4 4 4-4H0z"/>
                </svg>
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-[260px] rounded-xl border border-white/10 bg-[#0a1a10] shadow-[0_16px_48px_rgba(0,0,0,0.6)] overflow-hidden">
                  {/* Search */}
                  <div className="p-2 border-b border-white/[0.06]">
                    <input
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search languages…"
                      autoFocus
                      className="w-full rounded-lg bg-white/[0.07] px-3 py-2 text-[12px] text-white placeholder:text-white/30 outline-none focus:bg-white/[0.1]"
                    />
                  </div>
                  {/* Language list */}
                  <div className="max-h-[280px] overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#c9962a30 transparent" }}>
                    {filteredLangs.map(l => (
                      <button
                        key={l.code}
                        onClick={() => handleLangSelect(l.code)}
                        className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-white/[0.06] ${lang === l.code ? "bg-[#c9962a]/10" : ""}`}
                      >
                        <span className="text-[16px] shrink-0">{l.flag}</span>
                        <div className="min-w-0">
                          <p className={`text-[12px] font-semibold ${lang === l.code ? "text-[#c9962a]" : "text-white"}`}>{l.nativeName}</p>
                          <p className="text-[10px] text-white/40">{l.name}</p>
                        </div>
                        {lang === l.code && (
                          <svg className="ml-auto shrink-0 text-[#c9962a]" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M10 3L5 9 2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                          </svg>
                        )}
                      </button>
                    ))}
                    {filteredLangs.length === 0 && (
                      <p className="px-4 py-4 text-[12px] text-white/30 text-center">No languages found</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Donate */}
            <Link href="/donate"
              className="group relative overflow-hidden bg-[#c9962a] px-6 py-2.5 text-[11px] font-bold tracking-[0.18em] text-[#0a1a10] transition-all duration-300 hover:bg-[#e8b84b] hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(201,150,42,0.55)]">
              <span className="relative z-10">{t.nav.donate}</span>
              <span className="absolute inset-0 -skew-x-12 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-[200%]" />
            </Link>
          </nav>

          {/* Mobile: lang + hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Mobile language button */}
            <div ref={undefined} className="relative">
              <button
                onClick={() => setLangOpen(p => !p)}
                className="flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-1.5 text-[13px]"
              >
                {currentLang.flag}
                <svg width="8" height="8" viewBox="0 0 8 8" fill="white" opacity="0.4" className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}>
                  <path d="M0 2l4 4 4-4H0z"/>
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-[240px] rounded-xl border border-white/10 bg-[#0a1a10] shadow-[0_16px_48px_rgba(0,0,0,0.7)] overflow-hidden z-[200]">
                  <div className="p-2 border-b border-white/[0.06]">
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…" autoFocus
                      className="w-full rounded-lg bg-white/[0.07] px-3 py-2 text-[12px] text-white placeholder:text-white/30 outline-none" />
                  </div>
                  <div className="max-h-[260px] overflow-y-auto">
                    {filteredLangs.map(l => (
                      <button key={l.code} onClick={() => handleLangSelect(l.code)}
                        className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-white/[0.06] ${lang === l.code ? "bg-[#c9962a]/10" : ""}`}>
                        <span className="text-[15px]">{l.flag}</span>
                        <div>
                          <p className={`text-[12px] font-semibold ${lang === l.code ? "text-[#c9962a]" : "text-white"}`}>{l.nativeName}</p>
                          <p className="text-[10px] text-white/40">{l.name}</p>
                        </div>
                        {lang === l.code && <span className="ml-auto text-[#c9962a] text-[10px]">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button type="button" onClick={() => setOpen(!open)}
              className="relative z-[110] flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
              aria-label="Toggle menu">
              <span className={`block h-[1.5px] w-6 bg-white transition-all duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`block h-[1.5px] w-6 bg-white transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-[1.5px] w-6 bg-white transition-all duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-[100] flex flex-col bg-[#0a1a10] transition-all duration-500 lg:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent" />
        <div className="flex h-full flex-col justify-between px-8 py-24">
          <nav className="space-y-1">
            {links.map((l, i) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className={`flex items-center justify-between border-b border-white/8 py-5 transition-all duration-300 ${isActive(l.href) ? "border-[#c9962a]/20" : ""}`}
                style={{ opacity: open ? 1 : 0, transform: open ? "translateX(0)" : "translateX(-20px)", transitionDelay: `${i * 60}ms` }}>
                <span className={`font-heading text-[32px] font-semibold ${isActive(l.href) ? "text-[#e8b84b]" : "text-white"}`}>{l.label}</span>
                <span className={`text-xl ${isActive(l.href) ? "text-[#e8b84b]" : "text-[#c9962a]"}`}>→</span>
              </Link>
            ))}
          </nav>
          <div style={{ opacity: open ? 1 : 0, transitionDelay: "400ms", transition: "opacity 0.5s" }}>
            <Link href="/donate" onClick={() => setOpen(false)}
              className="block w-full bg-[#c9962a] py-5 text-center text-[13px] font-bold uppercase tracking-[0.22em] text-[#0a1a10] transition hover:bg-[#e8b84b]">
              {t.nav.donate} →
            </Link>
            <div className="mt-8 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20">
                <Image src="/logo.png" alt="Pandie Foundation" fill className="object-cover" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-white">Pandie Foundation</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">The Mother of All</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
