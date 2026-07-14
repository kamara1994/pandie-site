import { NextResponse } from "next/server";
import { rateLimit } from "@/app/lib/rateLimit";
import { getClientIp } from "@/app/lib/apiGuard";

// Receives Content-Security-Policy violation reports (from the report-only CSP).
// Purpose: surface any legitimate resource the CSP would block BEFORE we switch
// it to enforcing. No origin check — browsers post these without a standard
// Origin header — but we cap the body and heavily rate-limit to prevent log
// flooding, and we log only a concise, non-sensitive summary.

export async function POST(req: Request) {
  // 60 reports/min per IP is plenty; extra are dropped silently.
  if (!rateLimit(`csp-report:${getClientIp(req)}`, 60, 60_000).ok) {
    return new NextResponse(null, { status: 204 });
  }
  // Cap the body so a malicious client can't post megabytes.
  if (Number(req.headers.get("content-length") || "0") > 16 * 1024) {
    return new NextResponse(null, { status: 204 });
  }

  try {
    const body = await req.json();
    const r = body?.["csp-report"] ?? body; // report-uri vs report-to shapes
    console.warn("[CSP violation]", {
      blocked: String(r?.["blocked-uri"] ?? r?.blockedURL ?? "").slice(0, 200),
      directive: String(r?.["violated-directive"] ?? r?.effectiveDirective ?? "").slice(0, 100),
      document: String(r?.["document-uri"] ?? r?.documentURL ?? "").slice(0, 200),
    });
  } catch {
    // Ignore malformed reports.
  }
  return new NextResponse(null, { status: 204 });
}
