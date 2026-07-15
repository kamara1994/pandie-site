import { NextResponse } from "next/server";
import { guard, isEmail, clampStr } from "@/app/lib/apiGuard";

// Contact form handler. The contact page posts here; previously this route did
// not exist, so every submission failed. Forwards to the n8n operations inbox.

export async function POST(req: Request) {
  const blocked = guard(req, { bucket: "contact", limit: 5, windowMs: 60_000, maxBytes: 16 * 1024 });
  if (blocked) return blocked;

  try {
    const body = await req.json();

    const name = clampStr(body?.fullName, 160);
    const email = body?.email;
    const phone = clampStr(body?.phone, 60);
    const subject = clampStr(body?.subject, 160);
    const message = clampStr(body?.message, 4000);

    if (!name || !isEmail(email) || !message) {
      return NextResponse.json(
        { error: "Please provide your name, a valid email, and a message." },
        { status: 400 },
      );
    }

    const payload = {
      source: "Pandie Foundation Website — Contact Form",
      type: "contact_message",
      submittedAt: new Date().toISOString(),
      name, email, phone, subject, message,
    };

    const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("[contact] N8N_CHAT_WEBHOOK_URL is not configured");
      return NextResponse.json(
        { error: "Messaging is temporarily unavailable. Please email info@pandiefoundation.org directly." },
        { status: 503 },
      );
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
