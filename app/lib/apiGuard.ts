// Shared request-hardening helpers for API routes: origin/CSRF check, body-size
// cap, per-IP rate limiting, and small input validators.

import { NextResponse } from "next/server";
import { rateLimit } from "./rateLimit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Reasonable email-shape check (not RFC-perfect, just abuse-resistant). */
export function isEmail(v: unknown): v is string {
  return typeof v === "string" && v.length <= 254 && EMAIL_RE.test(v);
}

/** Coerce to a trimmed string clamped to max length; non-strings become "". */
export function clampStr(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Hosts allowed to POST to our mutating API routes. */
function allowedHosts(req: Request): Set<string> {
  const hosts = new Set<string>();
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site) { try { hosts.add(new URL(site).host); } catch { /* ignore */ } }
  const host = req.headers.get("host");
  if (host) hosts.add(host); // covers apex, www, and every Vercel preview URL
  hosts.add("pandiefoundation.org");
  hosts.add("www.pandiefoundation.org");
  hosts.add("localhost:3000");
  return hosts;
}

/** CSRF mitigation: require browser-set Origin/Referer to match a host we serve. */
export function isSameOrigin(req: Request): boolean {
  const source = req.headers.get("origin") || req.headers.get("referer");
  if (!source) return false; // browsers always send Origin on cross-origin POST
  let host: string;
  try { host = new URL(source).host; } catch { return false; }
  return allowedHosts(req).has(host);
}

/** True when the declared body is larger than maxBytes. */
export function bodyTooLarge(req: Request, maxBytes: number): boolean {
  const len = Number(req.headers.get("content-length") || "0");
  return Number.isFinite(len) && len > maxBytes;
}

export interface GuardOptions {
  limit: number;            // requests allowed per window, per IP
  windowMs: number;         // window length in ms
  bucket: string;           // rate-limit namespace, e.g. "chatbot"
  maxBytes?: number;        // max request body size (default 32 KB)
  requireSameOrigin?: boolean; // enforce same-origin (default true)
}

/**
 * Standard guard chain for a public POST route: origin → body-size → per-IP rate
 * limit. Returns a ready-to-send error Response if the request should be
 * rejected, or null if it may proceed.
 */
export function guard(req: Request, opts: GuardOptions): NextResponse | null {
  const { limit, windowMs, bucket, maxBytes = 32 * 1024, requireSameOrigin = true } = opts;

  if (requireSameOrigin && !isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  if (bodyTooLarge(req, maxBytes)) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }
  const result = rateLimit(`${bucket}:${getClientIp(req)}`, limit, windowMs);
  if (!result.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down and try again shortly." },
      { status: 429, headers: { "Retry-After": String(result.retryAfterSeconds) } },
    );
  }
  return null;
}
