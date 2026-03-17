"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative text-white">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/event.jpg"
          alt="Footer background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0f1f17]/92" />
      </div>

      <div className="relative z-10">

        {/* Top CTA */}
        <div className="border-b border-white/10 px-5 py-10 lg:px-8 xl:px-12">
          <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f0c857]">
                Make a Difference Today
              </p>
              <p className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                Every Child Deserves Hope
              </p>
            </div>

            <Link
              href="/donate"
              className="rounded-xl bg-[#d4a017] px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#173325] transition hover:opacity-90"
            >
              Donate Now
            </Link>
          </div>
        </div>

        {/* Main Footer */}
        <div className="px-5 py-16 lg:px-8 xl:px-12">
          <div className="mx-auto max-w-[1100px] grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">

            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/20">
                  <Image src="/logo.png" alt="Pandie Foundation" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-xl font-bold">Pandie</p>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/50">
                    The Mother of All
                  </p>
                </div>
              </Link>

              <p className="mt-6 max-w-xs text-sm leading-7 text-white/70">
                A humanitarian nonprofit dedicated to protecting and uplifting
                vulnerable children in Sierra Leone through education, nutrition,
                medical assistance, and compassionate care.
              </p>

              {/* SOCIAL LINKS */}
              <div className="mt-6 flex gap-3">

                {/* Facebook */}
                <a
                  href="https://facebook.com/pandiefoundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-[#d4a017]"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                    <path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/pandiefoundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-[#d4a017]"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07..." />
                  </svg>
                </a>

                {/* X / Twitter */}
                <a
                  href="https://x.com/PandieFdn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-[#d4a017]"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775..." />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@pandiefoundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-[#d4a017]"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25..." />
                  </svg>
                </a>

              </div>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f0c857]">
                Quick Links
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Programs", href: "/programs" },
                  { label: "Stories", href: "/stories" },
                  { label: "Events", href: "/events" },
                  { label: "Contact", href: "/contact" },
                  { label: "Donate", href: "/donate" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-[#d4a017]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f0c857]">
                Contact
              </p>
              <ul className="mt-5 space-y-4 text-sm text-white/70">
                <li>Email: info@pandiefoundation.org</li>
                <li>Phone: +1 (307) 257-0001</li>
                <li>USA • Sierra Leone Operations</li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f0c857]">
                Office Hours
              </p>
              <p className="mt-5 text-sm text-white/70">
                Mon – Fri: 9:00 AM – 5:00 PM EST
              </p>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 px-5 py-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} Pandie Foundation. All rights reserved.
        </div>

      </div>
    </footer>
  );
}