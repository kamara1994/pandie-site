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
const BATCH_SIZE = 50;
const DELAY_MS = 11000;

async function fileExists(p) { try { await access(p); return true; } catch { return false; } }

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function translateBatch(strings, targetName, apiKey, attempt = 0) {
  const numbered = strings.map((t, i) => `${i + 1}. ${t}`).join("\n");
  const prompt = `Translate each numbered line into ${targetName}. Keep the EXACT same numbering. Translate ONLY the text. Preserve emojis, punctuation, $ amounts, and these names exactly: "Pandie Foundation", "Pamela", "Joseph Allan Kamara", "Pandie Grace Bangura", "Sierra Leone", "Freetown", "Mohamed Salah", "Angelique Kidjo", "Aminata", "Musa", "Hawa", "Mariama", "Ibrahim", "Kadiatu". No notes or explanations. Return only the numbered translations.\n\n${numbered}`;

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
      if (attempt >= 5) { console.log(" [gave up on batch, using English]"); return strings; }
      const wait = 30000 * (attempt + 1);
      console.log(` [rate-limited, waiting ${wait / 1000}s]`);
      await sleep(wait);
      return translateBatch(strings, targetName, apiKey, attempt + 1);
    }

    if (!res.ok) { console.log(` [error ${res.status}, using English]`); return strings; }

    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    if (!raw) return strings;

    const out = [...strings];
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*(\d+)\.\s*(.*)$/);
      if (m) {
        const idx = parseInt(m[1], 10) - 1;
        if (idx >= 0 && idx < out.length && m[2].trim()) out[idx] = m[2].trim();
      }
    }
    return out;
  } catch (err) {
    console.log(` [exception: ${err.message}]`);
    return strings;
  }
}

function collectStrings(node, out) {
  if (typeof node === "string") { out.push(node); return; }
  if (Array.isArray(node)) { for (const v of node) collectStrings(v, out); return; }
  if (node && typeof node === "object") for (const k of Object.keys(node)) collectStrings(node[k], out);
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
  if (!apiKey) { console.error("Set GOOGLE_API_KEY env var. Get one at aistudio.google.com/app/apikey"); process.exit(1); }
  if (!(await fileExists(SRC))) { console.error("Source file missing: " + SRC); process.exit(1); }

  const source = JSON.parse(await readFile(SRC, "utf8"));
  await mkdir(OUT_DIR, { recursive: true });
  console.log("OK en (source)");

  const allStrings = [];
  collectStrings(source, allStrings);
  const unique = [...new Set(allStrings)];
  console.log("   " + unique.length + " unique strings per language");
  console.log("   batch size " + BATCH_SIZE + ", " + (DELAY_MS / 1000) + "s between requests (respects free tier)\n");

  const targets = Object.keys(LANG_NAMES);
  const startTime = Date.now();

  for (const lang of targets) {
    const outPath = join(OUT_DIR, lang + ".json");
    if (await fileExists(outPath)) { console.log("OK " + lang + " (cached)"); continue; }

    const langStart = Date.now();
    process.stdout.write("-> " + lang + " (" + LANG_NAMES[lang] + ")");
    const map = new Map();

    for (let i = 0; i < unique.length; i += BATCH_SIZE) {
      const slice = unique.slice(i, i + BATCH_SIZE);
      const translated = await translateBatch(slice, LANG_NAMES[lang], apiKey);
      slice.forEach((s, idx) => map.set(s, translated[idx] || s));
      process.stdout.write(".");
      if (i + BATCH_SIZE < unique.length) await sleep(DELAY_MS);
    }

    const tree = rebuild(source, map);
    await writeFile(outPath, JSON.stringify(tree, null, 2), "utf8");
    console.log(" saved (" + ((Date.now() - langStart) / 1000).toFixed(1) + "s)");
    await sleep(DELAY_MS);
  }

  console.log("\nDONE in " + ((Date.now() - startTime) / 60000).toFixed(1) + " min.");
}

main().catch(err => { console.error("Build failed:", err); process.exit(1); });
