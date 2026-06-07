import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "public", "translations", "en.json");
const OUT_DIR = join(ROOT, "public", "translations");

const LANG_CODES = {
  fr: "fr-FR", ar: "ar-SA", krio: "kri",
  es: "es-ES", pt: "pt-BR", zh: "zh-CN", ha: "ha-NG",
  sw: "sw-KE", hi: "hi-IN", bn: "bn-BD", ru: "ru-RU", ja: "ja-JP",
  ko: "ko-KR", de: "de-DE", it: "it-IT", tr: "tr-TR", vi: "vi-VN",
  th: "th-TH", pl: "pl-PL", nl: "nl-NL", id: "id-ID", ms: "ms-MY",
  fa: "fa-IR", yo: "yo-NG", ig: "ig-NG", am: "am-ET", so: "so-SO",
  rw: "rw-RW",
};

async function fileExists(p) { try { await access(p); return true; } catch { return false; } }

async function translateOne(text, targetCode) {
  const placeholders = [
    ["Pandie Foundation","__P1__"],["Pandie Grace Bangura","__P2__"],
    ["Joseph Allan Kamara","__P3__"],["Sierra Leone","__P4__"],
    ["Freetown","__P5__"],["Pamela","__P6__"],
    ["Mohamed Salah","__P7__"],["Angelique Kidjo","__P8__"],
  ];
  let prepared = text;
  for (const [name, ph] of placeholders) prepared = prepared.split(name).join(ph);
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(prepared)}&langpair=en|${targetCode}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return text;
    const data = await res.json();
    let translated = data?.responseData?.translatedText || text;
    if (translated.toUpperCase().includes("INVALID") || translated.toUpperCase().includes("QUOTA") || translated.toUpperCase().includes("MYMEMORY WARNING")) return text;
    for (const [name, ph] of placeholders) translated = translated.split(ph).join(name);
    return translated;
  } catch { return text; }
}

async function translateBatch(strings, targetCode) {
  const CONCURRENCY = 5;
  const out = new Array(strings.length);
  let cursor = 0;
  async function worker() {
    while (true) {
      const i = cursor++;
      if (i >= strings.length) return;
      out[i] = await translateOne(strings[i], targetCode);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  return out;
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
  if (!(await fileExists(SRC))) { console.error("Source file missing: " + SRC); process.exit(1); }
  const source = JSON.parse(await readFile(SRC, "utf8"));
  await mkdir(OUT_DIR, { recursive: true });
  console.log("OK en (source)");
  const allStrings = [];
  collectStrings(source, allStrings);
  const unique = [...new Set(allStrings)];
  console.log("   " + unique.length + " unique strings per language");
  const targets = Object.keys(LANG_CODES);
  const startTime = Date.now();
  for (const lang of targets) {
    const outPath = join(OUT_DIR, lang + ".json");
    if (await fileExists(outPath)) { console.log("OK " + lang + " (cached)"); continue; }
    const langStart = Date.now();
    process.stdout.write("-> " + lang + "... ");
    const translated = await translateBatch(unique, LANG_CODES[lang]);
    const map = new Map();
    unique.forEach((s, i) => map.set(s, translated[i] || s));
    const tree = rebuild(source, map);
    await writeFile(outPath, JSON.stringify(tree, null, 2), "utf8");
    console.log("saved (" + ((Date.now() - langStart) / 1000).toFixed(1) + "s)");
  }
  console.log("DONE in " + ((Date.now() - startTime) / 60000).toFixed(1) + " min.");
}

main().catch(err => { console.error("Translation build failed:", err); process.exit(0); });
