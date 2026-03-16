import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative text-white">

      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/event.jpg"
          alt="Footer background"
          fill
          className="object-cover object-center"
        />
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-[#0f1f17]/92" />
      </div>

      {/* ── All content sits above the background ── */}
      <div className="relative z-10">

        {/* ── Top CTA Banner ── */}
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
              className="shrink-0 rounded-xl bg-[#d4a017] px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#173325] transition hover:opacity-90"
            >
              Donate Now
            </Link>
          </div>
        </div>

        {/* ── Main Footer Content ── */}
        <div className="px-5 py-16 lg:px-8 xl:px-12">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">

              {/* Brand column */}
              <div>
                <Link href="/" className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/20">
                    <Image src="/logo.png" alt="Pandie Foundation" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">Pandie</p>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/50">The Mother of All</p>
                  </div>
                </Link>

                <p className="mt-6 max-w-xs text-sm leading-7 text-white/70">
                  A humanitarian nonprofit dedicated to protecting and uplifting
                  vulnerable children in Sierra Leone through education, nutrition,
                  medical assistance, and compassionate care.
                </p>

                {/* Social Links */}
                <div className="mt-6 flex gap-3">
                  {[
                    { label: "Facebook", href: "#", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                    { label: "Instagram", href: "#", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                    { label: "Twitter", href: "#", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
                    { label: "TikTok", href: "#", icon: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/70 transition hover:bg-[#d4a017] hover:text-white"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
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
                    { label: "Our Programs", href: "/programs" },
                    { label: "Stories", href: "/stories" },
                    { label: "Events", href: "/events" },
                    { label: "Contact Us", href: "/contact" },
                    { label: "Donate", href: "/donate" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-white/70 transition hover:text-[#d4a017]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Programs */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f0c857]">
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
                      <Link href={link.href} className="text-sm text-white/70 transition hover:text-[#d4a017]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f0c857]">
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
                        <svg className="h-3.5 w-3.5 text-[#f0c857]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">{item.label}</p>
                        <a href={item.href} className="mt-1 text-sm text-white/70 transition hover:text-[#d4a017]">
                          {item.value}
                        </a>
                      </div>
                    </li>
                  ))}

                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <svg className="h-3.5 w-3.5 text-[#f0c857]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">Location</p>
                      <p className="mt-1 text-sm text-white/70">
                        United States of America<br />
                        Sierra Leone Operations: Freetown, SL
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <svg className="h-3.5 w-3.5 text-[#f0c857]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">Office Hours</p>
                      <p className="mt-1 text-sm text-white/70">Mon – Fri: 9:00 AM – 5:00 PM EST</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-white/10 px-5 py-6 lg:px-8 xl:px-12">
          <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} Pandie Foundation. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-white/50">
              <Link href="/about" className="transition hover:text-white/80">About</Link>
              <Link href="/programs" className="transition hover:text-white/80">Programs</Link>
              <Link href="/contact" className="transition hover:text-white/80">Contact</Link>
              <Link href="/donate" className="transition hover:text-white/80">Donate</Link>
              <span className="text-white/30">|</span>
              <p className="text-white/30">Pandie Foundation — The Mother of All</p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}