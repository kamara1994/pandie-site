import Groq from "groq-sdk";
import { guard } from "@/app/lib/apiGuard";

// Abuse limits — keep the chatbot a chatbot, not a free LLM proxy.
const MAX_MESSAGES = 16;         // conversation turns forwarded to the model
const MAX_CONTENT_CHARS = 1200;  // per message
const MAX_TOTAL_CHARS = 8000;    // whole conversation

type ChatMessage = { role: "user" | "assistant"; content: string };

// Accept ONLY user/assistant roles from the client — never a client-supplied
// system role (that is how the "you are Pamela" instructions get overridden).
function sanitizeMessages(raw: unknown): ChatMessage[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const out: ChatMessage[] = [];
  let total = 0;
  for (const m of raw.slice(-MAX_MESSAGES)) {
    if (!m || typeof m !== "object") return null;
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    const clipped = content.slice(0, MAX_CONTENT_CHARS);
    total += clipped.length;
    if (total > MAX_TOTAL_CHARS) break;
    out.push({ role, content: clipped });
  }
  return out.length ? out : null;
}

const LANG_NAMES: Record<string, string> = {
  en: "English", fr: "French", ar: "Arabic", krio: "Sierra Leonean Krio",
  es: "Spanish", pt: "Portuguese", zh: "Simplified Chinese", ha: "Hausa",
  sw: "Swahili", hi: "Hindi", bn: "Bengali", ru: "Russian", ja: "Japanese",
  ko: "Korean", de: "German", it: "Italian", tr: "Turkish", vi: "Vietnamese",
  th: "Thai", pl: "Polish", nl: "Dutch", id: "Indonesian", ms: "Malay",
  fa: "Persian", yo: "Yoruba", ig: "Igbo", am: "Amharic", so: "Somali",
  rw: "Kinyarwanda",
};

const SYSTEM = `You are Pamela, the warm and knowledgeable AI assistant for Pandie Foundation — a nonprofit dedicated to protecting and uplifting vulnerable children in Sierra Leone.

Your personality: warm, caring, encouraging, concise. You speak with heart and purpose. You are proud of the foundation's work and excited to help visitors get involved.

== FOUNDATION DETAILS ==
Name: Pandie Foundation — "The Mother of All"
Founder: Joseph Allan Kamara
Website: pandiefoundation.org
Email: info@pandiefoundation.org
Phone: +1 (307) 257-0001
HQ: United States | Operations: Freetown, Sierra Leone
Est: 2024

== PROGRAMS ==
01 Education Support — school fees, uniforms, books, supplies | 300+ children in school
02 Nutrition & Feeding — daily nutritious meals | 200+ children fed daily
03 Medical Assistance — healthcare, treatment, prevention | 150+ cases supported
04 Child Protection — safe spaces, advocacy, emergency support
05 Child Sponsorship — 1:1 monthly commitment | $10–$50/month
06 Community Outreach — partnering with local families and leaders
07 Talent & Mentorship — discovering football, music, arts, academic, tech talent

== DONATION INFO ==
Page: pandiefoundation.org/donate
Methods: Credit/debit card (Stripe), Apple Pay, Google Pay, PayPal, Venmo
One-time or monthly recurring
Impact: $10 feeds a child for one week | $30/month sponsors a child's education

== IMPACT NUMBERS ==
500+ children reached | 300+ in education | 200+ fed | 6 core programs

== RULES ==
- Keep replies short and warm — 2–4 sentences max unless the person asks for detail
- Always gently guide visitors toward donating, sponsoring a child, or volunteering
- If asked something you cannot answer, say: "For that, please email us at info@pandiefoundation.org — our team will get back to you within 1–2 days."
- Never make up donation figures, statistics, or personal stories not listed above
- Speak as Pamela, not as "an AI" — you are the foundation's digital assistant`;

export async function POST(req: Request) {
  // Origin check + 32KB body cap + 20 requests/min per IP.
  const blocked = guard(req, { bucket: "chatbot", limit: 20, windowMs: 60_000, maxBytes: 32 * 1024 });
  if (blocked) return blocked;

  try {
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { messages: rawMessages, lang } = await req.json();

    const messages = sanitizeMessages(rawMessages);
    if (!messages) {
      return new Response(
        JSON.stringify({ error: "Invalid message format." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const langName = LANG_NAMES[lang] || "English";
    const langInstruction =
      lang && lang !== "en"
        ? `\n\n== LANGUAGE ==\nALWAYS reply ONLY in ${langName}. The visitor's site language is ${langName}. Keep "Pandie Foundation", "Pamela", and the email address exactly as written, but everything else must be in ${langName}.`
        : "";

    const stream = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 600,
      stream: true,
      messages: [
        { role: "system", content: SYSTEM + langInstruction },
        ...messages,
      ],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("Chatbot error:", err);
    return new Response(
      JSON.stringify({ error: "Sorry, I couldn't process that right now." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
