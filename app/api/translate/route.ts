// Translate route using Google Gemini (free tier, no rate limit issue).
// Falls back to returning the English source if anything fails — page never breaks.

const LANG_NAMES: Record<string, string> = {
  en: "English", fr: "French", ar: "Arabic", krio: "Sierra Leonean Krio",
  es: "Spanish", pt: "Portuguese", zh: "Simplified Chinese", ha: "Hausa",
  sw: "Swahili", hi: "Hindi", bn: "Bengali", ru: "Russian", ja: "Japanese",
  ko: "Korean", de: "German", it: "Italian", tr: "Turkish", vi: "Vietnamese",
  th: "Thai", pl: "Polish", nl: "Dutch", id: "Indonesian", ms: "Malay",
  fa: "Persian", yo: "Yoruba", ig: "Igbo", am: "Amharic", so: "Somali",
  rw: "Kinyarwanda",
};

const MODEL = "gemini-2.0-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export async function POST(req: Request) {
  let texts: string[] = [];
  let target = "en";

  try {
    const body = await req.json();
    texts = body.texts || [];
    target = body.target || "en";

    if (!target || target === "en" || !Array.isArray(texts) || texts.length === 0) {
      return Response.json({ translations: texts });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error("GOOGLE_API_KEY missing");
      return Response.json({ translations: texts });
    }

    const targetName = LANG_NAMES[target] || target;
    const numbered = texts.map((t, i) => `${i + 1}. ${t}`).join("\n");

    const prompt =
      `Translate each numbered line into ${targetName}. ` +
      `Rules: Keep the EXACT same numbering. Translate ONLY the text, never the numbers. ` +
      `Preserve emojis, punctuation, $ amounts, and names like "Pandie Foundation", "Pamela", "Joseph Allan Kamara", "Sierra Leone", "Freetown" exactly as written. ` +
      `Do not add notes, explanations, or extra lines. Return only the numbered translations.\n\n` +
      numbered;

    const res = await fetch(`${ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 4000,
        },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini API error:", res.status, errText);
      return Response.json({ translations: texts });
    }

    const data = await res.json();
    const raw: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!raw) {
      console.error("Gemini returned empty");
      return Response.json({ translations: texts });
    }

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
    return Response.json({ translations: texts });
  }
}
