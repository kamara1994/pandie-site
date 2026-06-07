// Pre-translation build script.
// Runs during `npm run build`. Reads the English source (en.json),
// translates it into all 28 other languages via Gemini, and writes
// static JSON files to public/translations/. Visitors load these
// directly — zero API calls at runtime, instant translations.

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "public", "translations", "en.json");
const OUT_DIR = join(ROOT, "public", "translations");

const LANG_NAMES = {
  fr: "French", ar: "Arabic", krio: "Sierra Leonean Krio",
  es: "Spanish", pt: "Portuguese", zh: "Simplified Chinese", ha: "Hausa",
  sw: "Swahili", hi: "Hindi", bn: "Bengali", ru: "Russian", ja: "Japanese",
  ko: "Korean", de: "German", it: "Italian", tr: "Turkish", vi: "Vietnamese",
  th: "Thai", pl: "Polish", nl: "Dutch", id: "Indonesian", ms: "Malay",
  fa: "Persian", yo: "Yoruba", ig: "Igbo", am: "Amharic", so: "Somali",
  rw: "Kinyarwanda",
};

const MODEL = "gemini-2.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const CHUNK = 40;

async function fileExists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function translateBatch(strings, target, apiKey) {
  const targetName = LANG_NAMES[target];
  const numbered = strings.map((t, i) => `${i + 1}. ${t}`).join("\n");
  const prompt =
    `Translate each numbered line into ${targetName}. ` +
    `Rules: Keep the EXACT same numbering. Translate ONLY the text, never the numbers. ` +
    `Preserve emojis, punctuation, $ amounts, and these names exactly as written: ` +
    `"Pandie Foundation", "Pamela", "Joseph Allan Kamara", "Sierra Leone", "Freetown", ` +
    `"Pandie Grace Bangura", "Aminata", "Musa", "Hawa", "Mariama", "Ibrahim", "Kadiatu". ` +
    `Do not add notes, explanations, or extra lines. Return only the numbered translations.\n\n` +
    numbered;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`${ENDPOINT}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 8000 },
        }),
      });

      if (res.status === 429) {
        const wait = 20000 + attempt * 15000;
        console.log(`    rate-limited, waiting ${wait / 1000}s...`);
        await new Promise(r => setTimeout(r, wait));
        continue;
      }

      if (!res.ok) {
        const err = await res.text();
        console.error(`    Gemini error ${res.status}: ${err.slice(0, 200)}`);
        return strings;
      }

      const data = await res.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      if (!raw) return strings;

      const out = [...strings];
      for (const line of raw.split("\n")) {
        const m = line.match(/^\s*(\d+)\.\s*(.*)$/);
        if (m) {
          const idx = parseInt(m[1], 10) - 1;
          if (idx >= 0 && idx < out.length && m[2].trim()) {
            out[idx] = m[2].trim();
          }
        }
      }
      return out;
    } catch (err) {
      console.error(`    attempt ${attempt + 1} failed:`, err.message);
      await new Promise(r => setTimeout(r, 5000));
    }
  }
  return strings;
}

function collectStrings(node, out) {
  if (typeof node === "string") { out.push(node); return; }
  if (Array.isArray(node)) { for (const v of node) collectStrings(v, out); return; }
  if (node && typeof node === "object") {
    for (const k of Object.keys(node)) collectStrings(node[k], out);
  }
}

function rebuild(node, map) {
  if (typeof node === "string") return map.get(node) ?? node;
  if (Array.isArray(node)) return node.map(v => rebuild(v, map));
  if (node && typeof node === "object") {
    const out = {};
    for (const k of Object.keys(node)) out[k] = rebuild(node[k], map);
    return out;
  }
  return node;
}

async function main() {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.warn("⚠️  GOOGLE_API_KEY not set — skipping translation build.");
    console.warn("   The site will still build, but only English will be pre-translated.");
    console.warn("   Other languages will fall back to runtime translation if /api/translate works.");
    return;
  }

  if (!(await fileExists(SRC))) {
    console.error(`❌ Source file not found: ${SRC}`);
    process.exit(1);
  }

  const source = JSON.parse(await readFile(SRC, "utf8"));
  await mkdir(OUT_DIR, { recursive: true });

  // English is the source — just copy it (it's already at en.json)
  console.log("✓ en (source)");

  const allStrings = [];
  collectStrings(source, allStrings);
  const unique = [...new Set(allStrings)];
  console.log(`   ${unique.length} unique strings to translate per language`);

  const targets = Object.keys(LANG_NAMES);

  for (const lang of targets) {
    const outPath = join(OUT_DIR, `${lang}.json`);
    // Skip if already exists and source hasn't changed since
    // (simple cache: delete public/translations/<lang>.json to force re-translate)
    if (await fileExists(outPath)) {
      console.log(`✓ ${lang} (cached, delete public/translations/${lang}.json to refresh)`);
      continue;
    }

    console.log(`→ ${lang} (${LANG_NAMES[lang]})...`);
    const map = new Map();

    for (let i = 0; i < unique.length; i += CHUNK) {
      const slice = unique.slice(i, i + CHUNK);
      const translated = await translateBatch(slice, lang, apiKey);
      slice.forEach((s, idx) => map.set(s, translated[idx] || s));
      // small delay to be polite
      await new Promise(r => setTimeout(r, 800));
    }

    const tree = rebuild(source, map);
    await writeFile(outPath, JSON.stringify(tree, null, 2), "utf8");
    console.log(`✓ ${lang} saved`);
  }

  console.log("✅ Translation build complete.");
}

main().catch(err => {
  console.error("Translation build failed:", err);
  // Don't fail the deploy — site still works, just without pre-translation
  process.exit(0);
});
