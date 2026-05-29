"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/about", label: "About Us" },
    { href: "/get-involved", label: "Get Involved" },
    { href: "/programs", label: "Programs" },
    { href: "/stories", label: "Stories" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <div className={`absolute inset-0 transition-all duration-500 ${scrolled ? "bg-[#0a1a10]/97 shadow-[0_4px_30px_rgba(0,0,0,0.35)] backdrop-blur-md" : "bg-[#0a1a10]/92 backdrop-blur-sm"}`} />
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <Image src="/nav-texture.jpg" alt="" fill className="object-cover" />
        </div>
        {/* Gold top line */}
        <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9962a]/50 to-transparent" />

        <div className="relative z-10 flex w-full items-center justify-between px-6 py-3.5 lg:px-20">
          {/* Logo — compact */}
          <Link href="/" className="flex items-center gap-3.5">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/20 md:h-12 md:w-12">
              <Image src="/logo.png" alt="Pandie Foundation logo" fill className="object-cover" />
            </div>
            <div className="leading-none">
              <p className="text-[18px] font-bold tracking-wide text-white md:text-[20px]">Pandie</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.28em] text-white/50">The Mother of All</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 text-[11.5px] font-semibold uppercase tracking-[0.18em] lg:flex">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="text-white/65 transition-colors duration-200 hover:text-white">{l.label}</Link>
            ))}
            <Link href="/donate" className="bg-[#c9962a] px-6 py-2.5 text-[11px] font-bold tracking-[0.18em] text-[#0a1a10] transition hover:bg-[#e8b84b]">
              Donate
            </Link>
          </nav>

          {/* Hamburger */}
          <button type="button" onClick={() => setOpen(!open)}
            className="relative z-[110] flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden" aria-label="Toggle menu">
            <span className={`block h-[1.5px] w-6 bg-white transition-all duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`block h-[1.5px] w-6 bg-white transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block h-[1.5px] w-6 bg-white transition-all duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      <div className={`fixed inset-0 z-[100] flex flex-col bg-[#0a1a10] transition-all duration-500 lg:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {/* Gold top line */}
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent" />

        <div className="flex h-full flex-col justify-between px-8 py-24">
          {/* Nav links — large */}
          <nav className="space-y-1">
            {links.map((l, i) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-white/8 py-5 transition-all duration-300"
                style={{ opacity: open ? 1 : 0, transform: open ? "translateX(0)" : "translateX(-20px)", transitionDelay: `${i * 60}ms` }}>
                <span className="font-heading text-[32px] font-semibold text-white">{l.label}</span>
                <span className="text-[#c9962a] text-xl">→</span>
              </Link>
            ))}
          </nav>

          {/* Bottom: donate + logo */}
          <div style={{ opacity: open ? 1 : 0, transitionDelay: "400ms", transition: "opacity 0.5s" }}>
            <Link href="/donate" onClick={() => setOpen(false)}
              className="block w-full bg-[#c9962a] py-5 text-center text-[13px] font-bold uppercase tracking-[0.22em] text-[#0a1a10] transition hover:bg-[#e8b84b]">
              Donate Now →
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
