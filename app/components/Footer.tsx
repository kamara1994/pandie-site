"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
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

  return (
    <footer className="relative overflow-hidden text-white">
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

      {/* Content */}
      <div className="relative z-10">

        <div className="border-b border-white/10 px-5 py-12 lg:px-8 xl:px-12">
          <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-8 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#e8b84b]">
                Make a Difference Today
              </p>
              <p className="mt-3 font-heading text-4xl font-semibold leading-none text-white sm:text-5xl">
                Every Child Deserves Hope
              </p>
            </div>

            <Link
              href="/donate"
              className="group relative shrink-0 overflow-hidden bg-[#c9962a] px-9 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition-all duration-300 hover:-translate-y-px hover:bg-[#e8b84b] hover:shadow-[0_6px_24px_rgba(201,150,42,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8b84b]"
            >
              <span className="relative z-10">Donate Now</span>
              <span className="absolute inset-0 -translate-x-full -skew-x-12 bg-white/25 transition-transform duration-500 group-hover:translate-x-[200%]" />
            </Link>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="px-5 py-16 lg:px-8 xl:px-12">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
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
                      The Mother of All
                    </p>
                  </div>
                </Link>

                <p className="mt-6 max-w-xs text-sm leading-7 text-white/70">
                  A humanitarian nonprofit dedicated to protecting and uplifting
                  vulnerable children in Sierra Leone through education,
                  nutrition, medical assistance, and compassionate care.
                </p>

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
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#e8b84b] after:mt-3 after:block after:h-px after:w-8 after:bg-gradient-to-r after:from-[#c9962a]/70 after:to-transparent">
                  Quick Links
                </p>
                <ul className="mt-5 space-y-3">
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
                        className="group flex items-center text-sm text-white/70 transition-colors duration-300 hover:text-[#e8b84b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b]"
                      >
                        <span className="h-px w-0 bg-[#c9962a] transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Programs */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#e8b84b] after:mt-3 after:block after:h-px after:w-8 after:bg-gradient-to-r after:from-[#c9962a]/70 after:to-transparent">
                  Our Programs
                </p>
                <ul className="mt-5 space-y-3">
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
                        className="group flex items-center text-sm text-white/70 transition-colors duration-300 hover:text-[#e8b84b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b]"
                      >
                        <span className="h-px w-0 bg-[#c9962a] transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#e8b84b] after:mt-3 after:block after:h-px after:w-8 after:bg-gradient-to-r after:from-[#c9962a]/70 after:to-transparent">
                  Get In Touch
                </p>
                <ul className="mt-5 space-y-5">
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
                          {item.label}
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
                        Location
                      </p>
                      <p className="mt-1 text-sm text-white/70">
                        United States of America
                        <br />
                        Sierra Leone Operations: Freetown, SL
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
                        Office Hours
                      </p>
                      <p className="mt-1 text-sm text-white/70">
                        Mon – Fri: 9:00 AM – 5:00 PM EST
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
              © {new Date().getFullYear()} Pandie Foundation. All rights
              reserved.
            </p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-white/50">
              <Link href="/about" className="transition hover:text-[#e8b84b]">
                About
              </Link>
              <Link href="/programs" className="transition hover:text-[#e8b84b]">
                Programs
              </Link>
              <Link href="/contact" className="transition hover:text-[#e8b84b]">
                Contact
              </Link>
              <Link href="/donate" className="transition hover:text-[#e8b84b]">
                Donate
              </Link>
              <span className="text-white/30">|</span>
              <p className="font-heading text-[15px] italic text-[#c9962a]/80">
                The Mother of All
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}