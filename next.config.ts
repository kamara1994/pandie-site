import type { NextConfig } from "next";

// Content-Security-Policy scoped to what the site loads:
//   Google Fonts — fonts.googleapis.com (style), fonts.gstatic.com (font)
//   Stripe / PayPal — declared ahead of the donation form going live
// Gemini/Groq are called server-side, so they need no browser CSP grant.
// Shipped as Report-Only for now: it CANNOT break rendering, only reports
// violations, so we can confirm it's clean in the browser before enforcing.
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
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "connect-src 'self' https://api.stripe.com https://*.paypal.com https://*.stripe.com",
  "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://*.paypal.com",
  "upgrade-insecure-requests",
  "report-uri /api/csp-report",
].join("; ");

// These headers are safe to enforce immediately — they cannot change how the
// page renders, only how the browser treats framing, MIME sniffing, transport,
// referrer leakage, and powerful-feature access.
const securityHeaders = [
  { key: "Content-Security-Policy-Report-Only", value: csp },
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
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
