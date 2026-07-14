import type { NextConfig } from "next";

// Content-Security-Policy scoped to the third parties the site actually loads:
//   Stripe  — js.stripe.com (script), api.stripe.com (connect), *.stripe.com/network (frames)
//   PayPal  — *.paypal.com, *.paypalobjects.com (script/connect/frames/images)
//   Fonts   — fonts.googleapis.com (style), fonts.gstatic.com (font)
// Gemini/Groq are called server-side only, so they need no browser CSP grant.
// 'unsafe-inline' is kept for script/style because Next.js App Router injects
// inline bootstrap scripts and Tailwind emits inline styles; tightening this to
// nonces is a follow-up that must be verified against the live checkout first.
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
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
