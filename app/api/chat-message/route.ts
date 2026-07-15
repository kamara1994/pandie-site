import { NextResponse } from "next/server";
import { guard, isEmail, clampStr } from "@/app/lib/apiGuard";
import { deliverMessage } from "@/app/lib/messages";

export async function POST(req: Request) {
  // Origin check + 16KB cap + 30/min per IP (this route is called per chat message).
  const blocked = guard(req, { bucket: "chat-message", limit: 30, windowMs: 60_000, maxBytes: 16 * 1024 });
  if (blocked) return blocked;

  try {
    const body = await req.json();

    const name = clampStr(body?.name, 120);
    const email = body?.email;
    const message = clampStr(body?.message, 4000);

    if (!name || !isEmail(email) || !message) {
      return NextResponse.json(
        { error: "Please provide your name, a valid email, and a message." },
        { status: 400 },
      );
    }

    const ok = await deliverMessage({
      source: "chat_message",
      name, email, message,
      payload: { site: "Pandie Foundation Website" },
    });
    if (!ok) {
      return NextResponse.json(
        { error: "Messaging is temporarily unavailable. Please email info@pandiefoundation.org." },
        { status: 503 },
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Chat message error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
