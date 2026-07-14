import { NextResponse } from "next/server";
import { guard, isEmail, clampStr } from "@/app/lib/apiGuard";

// Non-payment giving inquiries (item donations, volunteering, partnerships,
// sponsorship interest). Forwards to the n8n operations pipeline.

const ALLOWED_KINDS = new Set(["items", "volunteer", "partner", "sponsor"]);

export async function POST(req: Request) {
  const blocked = guard(req, { bucket: "inquiry", limit: 5, windowMs: 60_000, maxBytes: 24 * 1024 });
  if (blocked) return blocked;

  try {
    const body = await req.json();

    const kind = clampStr(body?.kind, 20);
    const email = body?.email;
    const name = clampStr(body?.name, 160);

    if (!ALLOWED_KINDS.has(kind) || !isEmail(email) || !name) {
      return NextResponse.json(
        { error: "Please provide your name, a valid email, and the type of support." },
        { status: 400 },
      );
    }

    // Clamp every string field the client sent; drop non-string/oversized values.
    const details: Record<string, string> = {};
    if (body?.details && typeof body.details === "object") {
      for (const [k, v] of Object.entries(body.details as Record<string, unknown>)) {
        if (typeof v === "string" && v.trim()) details[clampStr(k, 40)] = clampStr(v, 2000);
      }
    }

    const payload = {
      source: "Pandie Foundation Website — Giving Inquiry",
      type: `inquiry_${kind}`,
      submittedAt: new Date().toISOString(),
      name,
      email,
      details,
    };

    const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("[inquiry] N8N_CHAT_WEBHOOK_URL is not configured");
      return NextResponse.json(
        { error: "We couldn't submit that right now. Please email info@pandiefoundation.org and we'll help you personally." },
        { status: 503 },
      );
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Inquiry error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
