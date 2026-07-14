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
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();
  const { t, lang, setLang, currentLang, flat } = useLang();
  // English source string → translated string (falls back to English).
  const tr = (s: string) => (lang === "en" ? s : flat.get(s) ?? s);

  const desktopLangRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/about",        label: t.nav.about       },
    { href: "/get-involved", label: t.nav.getInvolved },
    { href: "/programs",     label: t.nav.programs    },
    { href: "/stories",      label: t.nav.stories     },
    { href: "/events",       label: t.nav.events      },
    { href: "/contact",      label: t.nav.contact     },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  // Close lang dropdown on outside click (both desktop + mobile anchors)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const inDesktop = desktopLangRef.current?.contains(target);
      const inMobile = mobileLangRef.current?.contains(target);
      if (!inDesktop && !inMobile) {
        setLangOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
    setSearch("");
  }, [pathname]);

  // Escape closes menu + dropdown
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setLangOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Compress the bar once scrolled; hide on scroll down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > lastY.current && y > 160);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the full-screen menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const filteredLangs = LANGUAGES.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(search.toLowerCase())
  );

  const handleLangSelect = (code: LangCode) => {
    setLang(code);
    setLangOpen(false);
    setSearch("");
  };

  // Shared language list (used inside both dropdowns)
  const LangList = ({ compact = false }: { compact?: boolean }) => (
    <>
      <div className="border-b border-white/[0.06] p-2">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={compact ? tr("Search…") : tr("Search languages…")}
          autoFocus
          className="w-full rounded-lg bg-white/[0.07] px-3 py-2.5 text-[16px] text-white outline-none placeholder:text-white/30 focus:bg-white/[0.1] sm:text-[13px]"
        />
      </div>
      <div
        className="max-h-[280px] overflow-y-auto overscroll-contain"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#c9962a30 transparent" }}
      >
        {filteredLangs.map(l => (
          <button
            key={l.code}
            onClick={() => handleLangSelect(l.code)}
            className={`flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-white/[0.06] ${lang === l.code ? "bg-[#c9962a]/10" : ""}`}
          >
            <span className="shrink-0 text-[16px]">{l.flag}</span>
            <div className="min-w-0">
              <p className={`text-[13px] font-semibold ${lang === l.code ? "text-[#c9962a]" : "text-white"}`}>{l.nativeName}</p>
              <p className="text-[10px] text-white/40">{l.name}</p>
            </div>
            {lang === l.code && (
              <svg className="ml-auto shrink-0 text-[#c9962a]" width="13" height="13" viewBox="0 0 12 12" fill="none">
                <path d="M10 3L5 9 2 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        ))}
        {filteredLangs.length === 0 && (
          <p className="px-4 py-4 text-center text-[12px] text-white/30">{tr("No languages found")}</p>
        )}
      </div>
    </>
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-[#c9962a] focus:px-5 focus:py-3 focus:text-[12px] focus:font-bold focus:uppercase focus:tracking-[0.18em] focus:text-[#0a1a10] focus:outline-2 focus:outline-offset-2 focus:outline-[#e8b84b]"
      >
        {tr("Skip to content")}
      </a>
      <header
        onFocusCapture={() => setHidden(false)}
        className={`fixed top-0 w-full transition-transform duration-500 motion-reduce:transition-none ${open ? "z-[150]" : "z-50"} ${hidden && !open && !langOpen ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className={`absolute inset-0 backdrop-blur-md transition-all duration-500 ${scrolled ? "bg-[#0a1a10] shadow-[0_8px_40px_rgba(0,0,0,0.55)]" : "bg-[#0a1a10]/92 shadow-[0_4px_30px_rgba(0,0,0,0.35)]"}`} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
          <Image src="/nav-texture.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#c9962a]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div className={`relative z-10 flex w-full items-center justify-between px-5 transition-[padding] duration-500 motion-reduce:transition-none sm:px-6 lg:px-20 ${scrolled ? "py-2 sm:py-2.5" : "py-3.5 sm:py-4"}`}>

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 sm:gap-3.5">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20 transition-all duration-300 group-hover:border-[#c9962a]/50 group-hover:shadow-[0_0_18px_rgba(201,150,42,0.35)] sm:h-11 sm:w-11 md:h-12 md:w-12">
              <Image src="/logo.png" alt="Pandie Foundation logo" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="leading-none">
              <p className="text-[17px] font-bold tracking-wide text-white transition-colors duration-300 group-hover:text-[#e8b84b] sm:text-[18px] md:text-[20px]">Pandie</p>
              <p className="mt-1 text-[8px] uppercase tracking-[0.18em] whitespace-nowrap text-white/45 transition-colors duration-300 group-hover:text-white/60 sm:text-[9px] sm:tracking-[0.28em]">{tr("The Mother of All")}</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`group relative pb-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8b84b] ${isActive(l.href) ? "text-white" : "text-white/60 hover:text-white"}`}>
                {l.label}
                <span className={`absolute bottom-0 left-0 h-[1.5px] rounded-full bg-[#c9962a] transition-all duration-300 ${isActive(l.href) ? "w-full" : "w-0 group-hover:w-full"}`} />
                {isActive(l.href) && (
                  <span className="absolute -bottom-[5px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#c9962a] shadow-[0_0_6px_rgba(201,150,42,0.9)]" />
                )}
              </Link>
            ))}

            {/* Desktop language switcher */}
            <div ref={desktopLangRef} className="relative">
              <button
                onClick={() => setLangOpen(p => !p)}
                aria-expanded={langOpen}
                aria-label={tr("Switch language")}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold text-white/60 transition hover:border-[#c9962a]/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b]"
              >
                <span className="text-[14px]">{currentLang.flag}</span>
                <span className="hidden xl:inline">{currentLang.nativeName}</span>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}>
                  <path d="M0 2l4 4 4-4H0z" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-[260px] overflow-hidden rounded-xl border border-white/10 bg-[#0a1a10] shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
                  <LangList />
                </div>
              )}
            </div>

            {/* Donate */}
            <Link href="/donate"
              className="group relative overflow-hidden bg-[#c9962a] px-6 py-2.5 text-[11px] font-bold tracking-[0.18em] text-[#0a1a10] transition-all duration-300 hover:-translate-y-px hover:bg-[#e8b84b] hover:shadow-[0_6px_24px_rgba(201,150,42,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8b84b]">
              <span className="relative z-10">{t.nav.donate}</span>
              <span className="absolute inset-0 -translate-x-full -skew-x-12 bg-white/25 transition-transform duration-500 group-hover:translate-x-[200%] motion-reduce:hidden" />
            </Link>
          </nav>

          {/* Mobile / iPad: donate + lang + hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
            <Link
              href="/donate"
              className="flex h-11 items-center bg-[#c9962a] px-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0a1a10] transition hover:bg-[#e8b84b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b] max-[374px]:px-2.5 max-[374px]:tracking-[0.08em] sm:px-4 sm:text-[11px]"
            >
              {t.nav.donate}
            </Link>
            <div ref={mobileLangRef} className="relative">
              <button
                onClick={() => setLangOpen(p => !p)}
                aria-expanded={langOpen}
                aria-label={tr("Switch language")}
                className="flex h-11 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 text-[14px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b]"
              >
                {currentLang.flag}
                <svg width="8" height="8" viewBox="0 0 8 8" fill="white" opacity="0.4" className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}>
                  <path d="M0 2l4 4 4-4H0z" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full z-[200] mt-2 w-[260px] overflow-hidden rounded-xl border border-white/10 bg-[#0a1a10] shadow-[0_16px_48px_rgba(0,0,0,0.7)]">
                  <LangList compact />
                </div>
              )}
            </div>

            <button type="button" onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={tr("Toggle menu")}
              className="relative z-[110] flex h-11 w-11 flex-col items-center justify-center gap-[5px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b]">
              <span className={`block h-[1.5px] w-6 bg-white transition-all duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`block h-[1.5px] w-6 bg-white transition-all duration-300 ${open ? "scale-x-0 opacity-0" : ""}`} />
              <span className={`block h-[1.5px] w-6 bg-white transition-all duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / iPad full-screen menu — inert while closed so hidden links leave the tab order */}
      <div
        inert={!open}
        className={`fixed inset-0 z-[100] flex flex-col bg-[#0a1a10] transition-all duration-500 motion-reduce:transition-none lg:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        {/* depth: gold radial glow + texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.10]">
          <Image src="/nav-texture.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="pointer-events-none absolute -top-1/4 right-0 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(201,150,42,0.16),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent" />

        <div className="relative flex h-full flex-col justify-between px-7 pb-12 pt-24 sm:px-10 md:px-16 md:pt-28">
          <nav aria-label="Primary" className="flex flex-col">
            {links.map((l, i) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                aria-current={isActive(l.href) ? "page" : undefined}
                className="group flex items-center gap-5 border-b border-white/[0.07] py-4 md:py-5"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(-24px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  transitionDelay: `${i * 60}ms`,
                }}>
                <span className="w-7 pt-2 font-body text-[11px] font-semibold tracking-[0.2em] text-[#c9962a]/70">
                  0{i + 1}
                </span>
                <span className={`flex-1 font-heading text-[34px] font-semibold leading-none transition-colors duration-300 sm:text-[40px] md:text-[46px] ${isActive(l.href) ? "text-[#e8b84b]" : "text-white group-hover:text-[#e8b84b]"}`}>
                  {l.label}
                </span>
                <span className={`text-2xl transition-transform duration-300 group-hover:translate-x-1 ${isActive(l.href) ? "text-[#e8b84b]" : "text-[#c9962a]"}`}>→</span>
              </Link>
            ))}
          </nav>

          <div style={{ opacity: open ? 1 : 0, transition: "opacity 0.5s ease", transitionDelay: "420ms" }}>
            <Link href="/donate" onClick={() => setOpen(false)}
              className="block w-full bg-[#c9962a] py-5 text-center text-[13px] font-bold uppercase tracking-[0.22em] text-[#0a1a10] transition hover:bg-[#e8b84b]">
              {t.nav.donate} →
            </Link>
            <div className="mt-7 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20">
                <Image src="/logo.png" alt="Pandie Foundation" fill className="object-cover" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-white">Pandie Foundation</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">{tr("The Mother of All")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
