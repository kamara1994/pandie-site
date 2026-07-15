// SERVER-SIDE ONLY. One delivery door for every visitor message
// (chat leads, newsletter, contact, inquiries).
// Priority: 1) n8n webhook if N8N_CHAT_WEBHOOK_URL is set,
//           2) Supabase `messages` inbox table (db/create-messages-inbox.sql),
//           3) false -> callers keep their polite 503 fallback.
import { getDb } from "./supabase";

export type InboundMessage = {
  source: string;
  name?: string;
  email?: string;
  message?: string;
  payload?: Record<string, unknown>;
};

export async function deliverMessage(m: InboundMessage): Promise<boolean> {
  const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submittedAt: new Date().toISOString(), ...m, ...(m.payload || {}) }),
      });
      if (res.ok) return true;
      console.error("[messages] n8n webhook returned", res.status);
    } catch (err) {
      console.error("[messages] n8n webhook failed:", err);
    }
  }
  const db = getDb();
  if (!db) return false;
  const { error } = await db.from("messages").insert({
    source: m.source,
    name: m.name ?? null,
    email: m.email ?? null,
    message: m.message ?? null,
    payload: m.payload ?? {},
  });
  if (error) {
    console.error("[messages] supabase insert failed:", error.message);
    return false;
  }
  return true;
}
