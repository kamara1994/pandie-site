import type { NextConfig } from "next";

// Content-Security-Policy scoped to what the site loads:
//   Google Fonts — fonts.googleapis.com (style), fonts.gstatic.com (font)
//   Stripe / PayPal — declared ahead of the donation form going live
// Gemini/Groq are called server-side, so they need no browser CSP grant.
// ENFORCING since 2026-07-14, after a full browser sweep of every page showed
// zero violations in Report-Only mode. report-uri stays on so any future
// violation is still logged to /api/csp-report.
// 'unsafe-inline' is required because Next.js injects inline bootstrap scripts
// and Tailwind emits inline styles; nonces are the follow-up hardening.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self' https://checkout.stripe.com https://www.paypal.com",
  "img-src 'self' data: blob: https://*.paypal.com https://*.paypalobjects.com https://*.stripe.com",
  "script-src 'self' 'unsafe-inline' https://js.stripe.com https://*.paypal.com https://*.paypalobjects.com",
  // Fonts are self-hosted via next/font — no Google Fonts grants needed.
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "connect-src 'self' https://api.stripe.com https://*.paypal.com https://*.stripe.com",
  "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://*.paypal.com",
  "upgrade-insecure-requests",
  "report-uri /api/csp-report",
].join("; ");

// These headers are safe to enforce immediately — they cannot change how the
// page renders, only how the browser treats framing, MIME sniffing, transport,
// referrer leakage, and powerful-feature access.
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // Isolate our browsing context from windows we open / that open us (mitigates
  // tab-napping and cross-window XS-Leaks). "-allow-popups" keeps redirect-based
  // payment popups (PayPal) working.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Pin the workspace root: a stray package-lock.json in the home directory
  // otherwise makes Turbopack resolve React from the wrong node_modules,
  // which breaks prerendering with "useContext of null".
  turbopack: {
    root: process.cwd(),
  },
  // AVIF first — roughly 30% smaller than WebP for the same quality, which is
  // the difference between a photo loading or stalling on a 2G/3G connection.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
