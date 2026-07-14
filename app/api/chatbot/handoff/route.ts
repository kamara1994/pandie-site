import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, summary, messages } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;

    // Build a readable conversation transcript
    const transcript = (messages as { role: string; content: string }[])
      .map(m => `${m.role === "user" ? "Visitor" : "Pamela (AI)"}: ${m.content}`)
      .join("\n\n");

    const payload = {
      source: "Pandie Foundation Website — Chatbot",
      type: "human_handoff",
      submittedAt: new Date().toISOString(),
      name,
      email,
      summary: summary || "Visitor requested to speak with a human.",
      transcript,
    };

    // Forward to n8n if configured
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      // Log for debugging if webhook not set up
      console.log("[Human Handoff Request]", payload);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Handoff error:", err);
    return NextResponse.json({ error: "Could not process request." }, { status: 500 });
  }
}
