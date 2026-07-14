import { NextResponse } from "next/server";
import { guard, isEmail, clampStr } from "@/app/lib/apiGuard";

const MAX_TRANSCRIPT_MESSAGES = 40;

export async function POST(req: Request) {
  // Origin check + 32KB cap + 5 handoffs/min per IP.
  const blocked = guard(req, { bucket: "handoff", limit: 5, windowMs: 60_000, maxBytes: 32 * 1024 });
  if (blocked) return blocked;

  try {
    const body = await req.json();

    const name = clampStr(body?.name, 120);
    const email = body?.email;
    const summary = clampStr(body?.summary, 1000) || "Visitor requested to speak with a human.";

    if (!name || !isEmail(email)) {
      return NextResponse.json({ error: "A name and valid email are required." }, { status: 400 });
    }

    const rawMessages = Array.isArray(body?.messages) ? body.messages : [];
    const transcript = rawMessages
      .slice(-MAX_TRANSCRIPT_MESSAGES)
      .filter((m: unknown): m is { role: string; content: string } =>
        !!m && typeof m === "object" &&
        typeof (m as { content?: unknown }).content === "string")
      .map((m: { role: string; content: string }) =>
        `${m.role === "user" ? "Visitor" : "Pamela (AI)"}: ${clampStr(m.content, 2000)}`)
      .join("\n\n");

    const payload = {
      source: "Pandie Foundation Website — Chatbot",
      type: "human_handoff",
      submittedAt: new Date().toISOString(),
      name,
      email,
      summary,
      transcript,
    };

    const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      console.error("[handoff] N8N_CHAT_WEBHOOK_URL is not configured");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Handoff error:", err);
    return NextResponse.json({ error: "Could not process request." }, { status: 500 });
  }
}
