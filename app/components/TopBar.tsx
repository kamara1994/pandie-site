"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">

      {/* Background layer */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          scrolled
            ? "bg-[#0f1f17]/95 shadow-[0_4px_30px_rgba(0,0,0,0.35)] backdrop-blur-md"
            : "bg-[#0f1f17]/90 backdrop-blur-sm"
        }`}
      />

      {/* Subtle texture image */}
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <Image
          src="/nav-texture.jpg"   // 👉 add this image to /public
          alt=""
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full items-center justify-between px-5 py-4 lg:px-8 xl:px-12">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-4">
          <div className="relative h-[68px] w-[68px] overflow-hidden rounded-full border border-white/20 md:h-[76px] md:w-[76px]">
            <Image
              src="/logo.png"
              alt="Pandie Foundation logo"
              fill
              className="object-cover"
            />
          </div>

          <div className="leading-none">
            <p className="text-2xl font-bold text-white md:text-3xl">
              Pandie
            </p>
            <p className="mt-1.5 text-[10px] uppercase tracking-[0.26em] text-white/60 md:text-xs">
              The Mother of All
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-[12px] font-semibold uppercase tracking-[0.18em] lg:flex">
          <Link href="/about" className="text-white/70 transition hover:text-white">
            About Us
          </Link>
          <Link href="/get-involved" className="text-white/70 transition hover:text-white">
            Get Involved
          </Link>
          <Link href="/programs" className="text-white/70 transition hover:text-white">
            Programs
          </Link>
          <Link href="/stories" className="text-white/70 transition hover:text-white">
            Stories
          </Link>
          <Link href="/events" className="text-white/70 transition hover:text-white">
            Events
          </Link>
          <Link href="/contact" className="text-white/70 transition hover:text-white">
            Contact
          </Link>

          <Link
            href="/donate"
            className="rounded-sm bg-[#d4a017] px-6 py-3 text-[11px] font-bold tracking-[0.18em] text-[#0f1f17] transition hover:bg-[#e0b020]"
          >
            Donate
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`relative z-10 overflow-hidden transition-all duration-300 lg:hidden ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col bg-[#0f1f17] px-5 py-4">
          <Link href="/about" onClick={() => setOpen(false)} className="border-b border-white/10 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:text-white">
            About Us
          </Link>
          <Link href="/get-involved" onClick={() => setOpen(false)} className="border-b border-white/10 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:text-white">
            Get Involved
          </Link>
          <Link href="/programs" onClick={() => setOpen(false)} className="border-b border-white/10 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:text-white">
            Programs
          </Link>
          <Link href="/stories" onClick={() => setOpen(false)} className="border-b border-white/10 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:text-white">
            Stories
          </Link>
          <Link href="/events" onClick={() => setOpen(false)} className="border-b border-white/10 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:text-white">
            Events
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="border-b border-white/10 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:text-white">
            Contact
          </Link>

          <Link
            href="/donate"
            onClick={() => setOpen(false)}
            className="mt-4 inline-block rounded-sm bg-[#d4a017] px-6 py-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f1f17] transition hover:bg-[#e0b020]"
          >
            Donate
          </Link>
        </div>
      </div>
    </header>
  );
}