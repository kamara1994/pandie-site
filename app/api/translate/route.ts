import Groq from "groq-sdk";

// Map our app language codes to full language names for the model
const LANG_NAMES: Record<string, string> = {
  en: "English", fr: "French", ar: "Arabic", krio: "Sierra Leonean Krio",
  es: "Spanish", pt: "Portuguese", zh: "Simplified Chinese", ha: "Hausa",
  sw: "Swahili", hi: "Hindi", bn: "Bengali", ru: "Russian", ja: "Japanese",
  ko: "Korean", de: "German", it: "Italian", tr: "Turkish", vi: "Vietnamese",
  th: "Thai", pl: "Polish", nl: "Dutch", id: "Indonesian", ms: "Malay",
  fa: "Persian", yo: "Yoruba", ig: "Igbo", am: "Amharic", so: "Somali",
  rw: "Kinyarwanda",
};

export async function POST(req: Request) {
  try {
    const { texts, target } = await req.json();

    // No work needed for English or empty input
    if (!target || target === "en" || !Array.isArray(texts) || texts.length === 0) {
      return Response.json({ translations: texts || [] });
    }

    const targetName = LANG_NAMES[target] || target;
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // We send a numbered list and ask for a numbered list back.
    // This keeps order stable and lets us translate many strings in one call.
    const numbered = texts
      .map((t: string, i: number) => `${i + 1}. ${t}`)
      .join("\n");

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      max_tokens: 4000,
      messages: [
        {
          role: "system",
          content:
            `You are a professional translator. Translate each numbered line into ${targetName}. ` +
            `Rules: Keep the EXACT same numbering. Translate ONLY the text, never the numbers. ` +
            `Preserve emojis, punctuation, $ amounts, and names like "Pandie Foundation", "Pamela", ` +
            `"Joseph Allan Kamara", "Sierra Leone", "Freetown" exactly as written. ` +
            `Do not add notes, explanations, or extra lines. Return only the numbered translations.`,
        },
        { role: "user", content: numbered },
      ],
    });

    const raw = completion.choices[0]?.message?.content || "";

    // Parse "1. xxx" lines back into an array, in order.
    const out: string[] = [...texts];
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*(\d+)\.\s*(.*)$/);
      if (m) {
        const idx = parseInt(m[1], 10) - 1;
        if (idx >= 0 && idx < out.length && m[2].trim()) {
          out[idx] = m[2].trim();
        }
      }
    }

    return Response.json({ translations: out });
  } catch (err) {
    console.error("Translate error:", err);
    // On failure, return the original English so the page never breaks
    const body = await req.clone().json().catch(() => ({ texts: [] }));
    return Response.json({ translations: body.texts || [] });
  }
}
