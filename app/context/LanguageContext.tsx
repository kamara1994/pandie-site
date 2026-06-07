"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";

export type LangCode =
  | "en" | "fr" | "ar" | "krio" | "es" | "pt" | "zh" | "ha"
  | "sw" | "hi" | "bn" | "ru" | "ja" | "ko" | "de" | "it"
  | "tr" | "vi" | "th" | "pl" | "nl" | "id" | "ms" | "fa"
  | "yo" | "ig" | "am" | "so" | "rw";

export interface Lang {
  code: LangCode;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  flag: string;
}

export const LANGUAGES: Lang[] = [
  { code: "en",   name: "English",     nativeName: "English",           dir: "ltr", flag: "🇬🇧" },
  { code: "fr",   name: "French",      nativeName: "Français",          dir: "ltr", flag: "🇫🇷" },
  { code: "krio", name: "Krio",        nativeName: "Krio",              dir: "ltr", flag: "🇸🇱" },
  { code: "ha",   name: "Hausa",       nativeName: "Hausa",             dir: "ltr", flag: "🇳🇬" },
  { code: "yo",   name: "Yoruba",      nativeName: "Yorùbá",            dir: "ltr", flag: "🇳🇬" },
  { code: "ig",   name: "Igbo",        nativeName: "Igbo",              dir: "ltr", flag: "🇳🇬" },
  { code: "sw",   name: "Swahili",     nativeName: "Kiswahili",         dir: "ltr", flag: "🇰🇪" },
  { code: "am",   name: "Amharic",     nativeName: "አማርኛ",              dir: "ltr", flag: "🇪🇹" },
  { code: "so",   name: "Somali",      nativeName: "Soomaali",          dir: "ltr", flag: "🇸🇴" },
  { code: "rw",   name: "Kinyarwanda", nativeName: "Kinyarwanda",       dir: "ltr", flag: "🇷🇼" },
  { code: "ar",   name: "Arabic",      nativeName: "العربية",            dir: "rtl", flag: "🇸🇦" },
  { code: "fa",   name: "Persian",     nativeName: "فارسی",              dir: "rtl", flag: "🇮🇷" },
  { code: "es",   name: "Spanish",     nativeName: "Español",           dir: "ltr", flag: "🇪🇸" },
  { code: "pt",   name: "Portuguese",  nativeName: "Português",         dir: "ltr", flag: "🇧🇷" },
  { code: "de",   name: "German",      nativeName: "Deutsch",           dir: "ltr", flag: "🇩🇪" },
  { code: "it",   name: "Italian",     nativeName: "Italiano",          dir: "ltr", flag: "🇮🇹" },
  { code: "nl",   name: "Dutch",       nativeName: "Nederlands",        dir: "ltr", flag: "🇳🇱" },
  { code: "pl",   name: "Polish",      nativeName: "Polski",            dir: "ltr", flag: "🇵🇱" },
  { code: "ru",   name: "Russian",     nativeName: "Русский",           dir: "ltr", flag: "🇷🇺" },
  { code: "tr",   name: "Turkish",     nativeName: "Türkçe",            dir: "ltr", flag: "🇹🇷" },
  { code: "hi",   name: "Hindi",       nativeName: "हिन्दी",               dir: "ltr", flag: "🇮🇳" },
  { code: "bn",   name: "Bengali",     nativeName: "বাংলা",                dir: "ltr", flag: "🇧🇩" },
  { code: "zh",   name: "Chinese",     nativeName: "中文",                dir: "ltr", flag: "🇨🇳" },
  { code: "ja",   name: "Japanese",    nativeName: "日本語",               dir: "ltr", flag: "🇯🇵" },
  { code: "ko",   name: "Korean",      nativeName: "한국어",                dir: "ltr", flag: "🇰🇷" },
  { code: "vi",   name: "Vietnamese",  nativeName: "Tiếng Việt",        dir: "ltr", flag: "🇻🇳" },
  { code: "th",   name: "Thai",        nativeName: "ภาษาไทย",             dir: "ltr", flag: "🇹🇭" },
  { code: "id",   name: "Indonesian",  nativeName: "Bahasa Indonesia",  dir: "ltr", flag: "🇮🇩" },
  { code: "ms",   name: "Malay",       nativeName: "Bahasa Melayu",     dir: "ltr", flag: "🇲🇾" },
];

const BROWSER_MAP: Record<string, LangCode> = {
  en:"en","en-US":"en","en-GB":"en",
  fr:"fr","fr-FR":"fr","fr-CA":"fr",
  ar:"ar","ar-SA":"ar",
  es:"es","es-ES":"es","es-MX":"es","es-419":"es",
  pt:"pt","pt-BR":"pt","pt-PT":"pt",
  zh:"zh","zh-CN":"zh","zh-TW":"zh",
  ha:"ha", sw:"sw", hi:"hi", bn:"bn", ru:"ru",
  ja:"ja", ko:"ko", de:"de", it:"it", tr:"tr",
  vi:"vi", th:"th", pl:"pl", nl:"nl", id:"id",
  ms:"ms", fa:"fa", yo:"yo", ig:"ig", am:"am",
  so:"so", rw:"rw",
};

export interface Translations {
  nav: {
    about: string; getInvolved: string; programs: string;
    stories: string; events: string; contact: string; donate: string;
  };
  hero: {
    badge: string; line1: string; line2: string; line3a: string;
    line3b: string; line4: string; body: string; cta1: string; cta2: string;
    stat1Label: string; stat2Label: string; stat3Label: string;
  };
  core: {
    badge: string; heading1: string; heading2: string; body: string;
    exploreProgram: string;
    s: Array<{ title: string; description: string; statLabel: string }>;
    p5title: string; p5desc: string;
    p6title: string; p6desc: string;
    p7title: string; p7desc: string; p7new: string;
  };
  feature: {
    story1title: string; story1body: string; story1cta: string;
    story2title: string; story2body: string; story2cta: string;
    sideLabel: string; sideTitle: string; sideBody: string; sideCta: string;
  };
  event: {
    badge: string; heading1: string; heading2: string; body: string;
    locLabel: string; locVal: string;
    dateLabel: string; dateVal: string;
    goalLabel: string; goalVal: string;
    cta1: string; cta2: string;
    donateLabel: string; donateBody: string; donateCta: string;
  };
  impact: {
    badge: string; heading1: string; heading2: string; body: string;
    s: Array<{ label: string; sub: string }>;
    quote: string; quoteAuthor: string;
  };
  programs: {
    badge: string; heading1: string; heading2: string; body: string;
    exploreProgram: string; exploreTalent: string;
    talent7label: string; talent7new: string;
    talent7heading1: string; talent7heading2: string; talent7body: string;
    ctaBadge: string; ctaHeading1: string; ctaHeading2: string; ctaBody: string;
    ctaDonate: string; ctaTalent: string;
    supportBadge: string;
    p: Array<{ title: string; desc: string; statLabel: string }>;
  };
  chat: {
    greeting: string; placeholder: string; humanCta: string;
    poweredBy: string; online: string; suggestions: string[];
    donateBtn: string; comingSoon: string; typing: string; langSwitchMsg: string;
  };
  handoff: {
    title: string; body: string; nameLbl: string; emailLbl: string;
    submit: string; submitting: string; orEmail: string;
    successTitle: string; successBody: string; whileWait: string;
    whileWaitBody: string; back: string;
  };
}

type T = Translations;

function en(): T { return {
  nav: { about:"About Us", getInvolved:"Get Involved", programs:"Programs", stories:"Stories", events:"Events", contact:"Contact", donate:"Donate" },
  hero: { badge:"Sierra Leone · Est. 2024", line1:"Every", line2:"Child", line3a:"Deserves a", line3b:"Mother's", line4:"Love", body:"Pandie Foundation stands in the gap for vulnerable children across Sierra Leone — providing education, nutrition, medical care, and the warmth of human dignity.", cta1:"Make an Impact", cta2:"Our Story", stat1Label:"Children Reached", stat2Label:"In Education", stat3Label:"Fed & Nourished" },
  core: { badge:"Seven Programs", heading1:"Seven Pillars of", heading2:"Transformative Change", body:"We serve vulnerable children in Sierra Leone through programs that address every dimension of a child's life — from survival to discovering and launching their extraordinary potential.", exploreProgram:"Explore Program", s:[{title:"Education Support",description:"School fees, uniforms, books, and supplies — removing every barrier between a child and their right to learn and grow.",statLabel:"Children in school"},{title:"Nutrition & Feeding",description:"Nutritious daily meals so that no child sits in a classroom too hungry to concentrate, dream, or believe in themselves.",statLabel:"Children fed daily"},{title:"Medical Assistance",description:"Access to healthcare, treatment, and prevention for children who would otherwise suffer in silence from preventable illness.",statLabel:"Medical cases supported"},{title:"Child Protection",description:"Safe spaces, advocacy, and emergency support for vulnerable children facing neglect, hardship, and uncertain futures.",statLabel:"Commitment to dignity"}], p5title:"Child Sponsorship", p5desc:"Connect directly with one child — your monthly commitment transforms their life and inspires an entire community.", p6title:"Community Outreach", p6desc:"Partnering with local families and leaders to ensure our impact runs deep and lasts for generations.", p7title:"Talent & Mentorship", p7desc:"We discover extraordinary talent in Sierra Leone's communities — football, music, arts, academics — and build a pathway to the world stage.", p7new:"New" },
  feature: { story1title:"A Child Back in School", story1body:"Through support, encouragement, and basic school materials, a vulnerable child was able to return to class with confidence and renewed hope.", story1cta:"Success Stories", story2title:"Acts of Kindness", story2body:"From meals and medical help to school support, every act of care restores dignity and protects the future of vulnerable children.", story2cta:"More Good News", sideLabel:"Featured Program", sideTitle:"Pandie Child Support Program", sideBody:"Our flagship program supports the most vulnerable children in Sierra Leone with education assistance, nutrition support, and access to basic medical care.", sideCta:"View Program" },
  event: { badge:"Upcoming Campaign", heading1:"Back to School &", heading2:"Child Wellness Drive", body:"Join us as we provide school materials, nutrition support, and basic health assistance for vulnerable children in Sierra Leone.", locLabel:"Location", locVal:"Freetown, Sierra Leone", dateLabel:"Date", dateVal:"August — September 2025", goalLabel:"Goal", goalVal:"500 children supported", cta1:"View Full Event →", cta2:"Support This Drive", donateLabel:"Every $10 donated", donateBody:"Feeds a child for one week", donateCta:"Donate $10 →" },
  impact: { badge:"Our Impact", heading1:"Behind Every Number", heading2:"Is a Name", body:"Every statistic represents a real child in Sierra Leone whose life changed because someone chose to care.", s:[{label:"Children Reached",sub:"Through all programs combined"},{label:"In Education",sub:"Back in school with supplies"},{label:"Fed & Nourished",sub:"Regular nutrition support"},{label:"Core Programs",sub:"Addressing every need"}], quote:'"When a child receives food, they can concentrate in school. When they receive education, they gain independence. When they receive compassion, they gain belief in their own worth."', quoteAuthor:"— The Pandie Mission" },
  programs: { badge:"What We Do · Sierra Leone", heading1:"Seven Pillars of", heading2:"Transformative Change", body:"From keeping children alive to discovering who they truly are — every program is built on one principle: treat each child as if they were our own.", exploreProgram:"Explore Program", exploreTalent:"Explore Talent & Mentorship →", talent7label:"Talent Discovery & Mentorship", talent7new:"New — Program 07", talent7heading1:"We don't just keep", talent7heading2:"children alive — we discover who they truly are", talent7body:"We find extraordinary talent hidden in Sierra Leone's communities — football, music, arts, academics — surround it with world-class mentors, and build a pathway to the world stage. The next Mohamed Salah. The next Angélique Kidjo. We find them first.", ctaBadge:"Support Our Work", ctaHeading1:"Every program runs", ctaHeading2:"because someone gave.", ctaBody:"Your donation directly funds these seven programs — keeping children safe, fed, educated, and helping extraordinary talent reach the world.", ctaDonate:"Donate Now", ctaTalent:"Discover Talent Program", supportBadge:"Support Our Work", p:[{title:"Education Support",desc:"School fees, uniforms, books, and learning supplies — removing every barrier between a child and their right to learn.",statLabel:"Children in school"},{title:"Nutrition & Feeding",desc:"Daily nutritious meals so no child sits in a classroom too hungry to concentrate, learn, or dream.",statLabel:"Children fed daily"},{title:"Medical Assistance",desc:"Healthcare access, treatment, and prevention for children suffering from preventable and treatable conditions.",statLabel:"Medical cases supported"},{title:"Child Protection",desc:"Safe spaces, advocacy, and emergency support for vulnerable children facing neglect and hardship.",statLabel:"Commitment to dignity"},{title:"Child Sponsorship",desc:"Connect directly with a child — your monthly commitment transforms one life and inspires a whole community.",statLabel:"Sponsor to child"},{title:"Community Outreach",desc:"Partnering with families, schools, and local leaders to ensure our impact runs deep and lasts for generations.",statLabel:"Community impact"}] },
  chat: { greeting:"Hi! I'm Pamela 👋 I'm here to help you learn about Pandie Foundation and how you can change a child's life in Sierra Leone. What would you like to know?", placeholder:"Ask Pamela anything…", humanCta:"Prefer to talk to a real person?", poweredBy:"Powered by Groq AI · Pandie Foundation", online:"Online", suggestions:["How can I donate?","Tell me about your programs","How do I sponsor a child?","How can I volunteer?"], donateBtn:"Donate Now", comingSoon:"Online donations coming soon! To donate now, please email info@pandiefoundation.org 💛", typing:"Pamela is typing…", langSwitchMsg:"I've switched to English for you! How can I help?" },
  handoff: { title:"Talk to our team 👤", body:"Leave your details and we'll get back to you personally — usually within a few hours.", nameLbl:"Your Name", emailLbl:"Email Address", submit:"Connect with Our Team →", submitting:"Sending…", orEmail:"Or email us directly at", successTitle:"We got your message!", successBody:"Our team will reach out to", whileWait:"While you wait", whileWaitBody:"Pamela can still answer most questions instantly.", back:"← Back to Pamela" },
};}

// ── Auto-translate any nested object of strings ────────────────────
// Walks the tree, collects every string, sends them all to /api/translate
// in one batch, then rebuilds the object with translations in place.

type AnyObj = Record<string, unknown>;

function collectStrings(node: unknown, out: string[]): void {
  if (typeof node === "string") { out.push(node); return; }
  if (Array.isArray(node)) { for (const v of node) collectStrings(v, out); return; }
  if (node && typeof node === "object") {
    for (const k of Object.keys(node as AnyObj)) collectStrings((node as AnyObj)[k], out);
  }
}

function rebuild(node: unknown, map: Map<string, string>): unknown {
  if (typeof node === "string") return map.get(node) ?? node;
  if (Array.isArray(node)) return node.map(v => rebuild(v, map));
  if (node && typeof node === "object") {
    const out: AnyObj = {};
    for (const k of Object.keys(node as AnyObj)) out[k] = rebuild((node as AnyObj)[k], map);
    return out;
  }
  return node;
}

const TREE_CACHE = new Map<LangCode, T>();
const STORAGE_PREFIX = "pandie-tree-v1:";

function loadTreeFromStorage(code: LangCode): T | null {
  if (typeof window === "undefined") return null;
  if (TREE_CACHE.has(code)) return TREE_CACHE.get(code)!;
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + code);
    if (raw) {
      const parsed = JSON.parse(raw) as T;
      TREE_CACHE.set(code, parsed);
      return parsed;
    }
  } catch {}
  return null;
}

function saveTreeToStorage(code: LangCode, tree: T) {
  TREE_CACHE.set(code, tree);
  try { localStorage.setItem(STORAGE_PREFIX + code, JSON.stringify(tree)); } catch {}
}

async function fetchTranslatedTree(code: LangCode): Promise<T> {
  const source = en();
  const strings: string[] = [];
  collectStrings(source, strings);

  // dedupe while keeping order
  const unique: string[] = [];
  const seen = new Set<string>();
  for (const s of strings) { if (!seen.has(s)) { seen.add(s); unique.push(s); } }

  // Translate in chunks of 40 to keep each request fast
  const CHUNK = 40;
  const map = new Map<string, string>();
  for (let i = 0; i < unique.length; i += CHUNK) {
    const slice = unique.slice(i, i + CHUNK);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: slice, target: code }),
      });
      const data = await res.json();
      const translations: string[] = data.translations || slice;
      slice.forEach((s, idx) => map.set(s, translations[idx] || s));
    } catch {
      slice.forEach(s => map.set(s, s));
    }
  }

  return rebuild(source, map) as T;
}

function detectLanguage(): LangCode {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("pandie-lang") as LangCode | null;
  if (saved && LANGUAGES.find(l => l.code === saved)) return saved;
  const langs = navigator.languages || [navigator.language];
  for (const l of langs) {
    const code = BROWSER_MAP[l] || BROWSER_MAP[l.split("-")[0]];
    if (code) return code;
  }
  return "en";
}

interface LanguageContextType {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: Translations;
  dir: "ltr" | "rtl";
  currentLang: Lang;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en", setLang: () => {}, t: en(), dir: "ltr",
  currentLang: LANGUAGES[0],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");
  const [tree, setTree] = useState<T>(() => en());
  const inFlight = useRef<Set<LangCode>>(new Set());

  // On mount, detect browser language
  useEffect(() => { setLangState(detectLanguage()); }, []);

  // When language changes, set the tree (cached or auto-translate)
  useEffect(() => {
    const l = LANGUAGES.find(x => x.code === lang)!;
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", l?.dir || "ltr");
    localStorage.setItem("pandie-lang", lang);

    // English: always instant
    if (lang === "en") { setTree(en()); return; }

    // Cached: instant
    const cached = loadTreeFromStorage(lang);
    if (cached) { setTree(cached); return; }

    // Otherwise: keep showing current (English) while we fetch
    setTree(en());
    if (inFlight.current.has(lang)) return;
    inFlight.current.add(lang);

    fetchTranslatedTree(lang).then(translated => {
      saveTreeToStorage(lang, translated);
      // Only apply if user hasn't switched away again
      setLangState(currentLang => {
        if (currentLang === lang) setTree(translated);
        return currentLang;
      });
      inFlight.current.delete(lang);
    }).catch(() => {
      inFlight.current.delete(lang);
    });
  }, [lang]);

  const setLang = (l: LangCode) => setLangState(l);
  const currentLang = LANGUAGES.find(x => x.code === lang) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: tree, dir: currentLang.dir, currentLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
