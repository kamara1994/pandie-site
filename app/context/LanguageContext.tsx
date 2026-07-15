"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type LangCode =
  | "en" | "fr" | "ar" | "krio" | "es" | "pt" | "zh" | "ha"
  | "sw" | "hi" | "bn" | "ru" | "ja" | "ko" | "de" | "it"
  | "tr" | "vi" | "th" | "pl" | "nl" | "id" | "ms" | "fa"
  | "yo" | "ig" | "am" | "so" | "rw";

export interface Lang {
  code: LangCode; name: string; nativeName: string;
  dir: "ltr" | "rtl"; flag: string;
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

// Translation tree shape — must match en.json
export interface Translations {
  nav: { about: string; getInvolved: string; programs: string; stories: string; events: string; contact: string; donate: string; };
  hero: { badge: string; line1: string; line2: string; line3a: string; line3b: string; line4: string; body: string; cta1: string; cta2: string; stat1Label: string; stat2Label: string; stat3Label: string; };
  core: { badge: string; heading1: string; heading2: string; body: string; exploreProgram: string; s: Array<{ title: string; description: string; statLabel: string }>; p5title: string; p5desc: string; p6title: string; p6desc: string; p7title: string; p7desc: string; p7new: string; };
  feature: { story1title: string; story1body: string; story1cta: string; story2title: string; story2body: string; story2cta: string; sideLabel: string; sideTitle: string; sideBody: string; sideCta: string; };
  event: { badge: string; heading1: string; heading2: string; body: string; locLabel: string; locVal: string; dateLabel: string; dateVal: string; goalLabel: string; goalVal: string; cta1: string; cta2: string; donateLabel: string; donateBody: string; donateCta: string; };
  impact: { badge: string; heading1: string; heading2: string; body: string; s: Array<{ label: string; sub: string }>; quote: string; quoteAuthor: string; };
  programs: { badge: string; heading1: string; heading2: string; body: string; exploreProgram: string; exploreTalent: string; talent7label: string; talent7new: string; talent7heading1: string; talent7heading2: string; talent7body: string; ctaBadge: string; ctaHeading1: string; ctaHeading2: string; ctaBody: string; ctaDonate: string; ctaTalent: string; supportBadge: string; p: Array<{ title: string; desc: string; statLabel: string }>; };
  chat: { greeting: string; placeholder: string; humanCta: string; poweredBy: string; online: string; suggestions: string[]; donateBtn: string; comingSoon: string; typing: string; langSwitchMsg: string; };
  handoff: { title: string; body: string; nameLbl: string; emailLbl: string; submit: string; submitting: string; orEmail: string; successTitle: string; successBody: string; whileWait: string; whileWaitBody: string; back: string; };
  pages: {
    about: string[]; stories: string[]; events: string[];
    contact: string[]; getInvolved: string[]; donate: string[];
  };
  // Donate-funnel strings; components read them via the flat map (tr/useT),
  // so a loose record type is sufficient here.
  donateUI: Record<string, string>;
  newUI: Record<string, string>;
  chatExtra: {
    leadIntro: string; yourEmail: string; submit: string; skip: string;
    thankYouName: string; fillNameEmail: string; validEmail: string;
    wentWrongEmail: string; troubleReach: string; fullName: string; convoIncluded: string;
  };
  footer: {
    ctaEyebrow: string; ctaHeading: string; donateNow: string; mission: string;
    newsletterHeading: string; namePlaceholder: string; emailPlaceholder: string;
    join: string; newsletterSuccess: string; genericError: string;
    quickLinks: string; aboutUs: string; ourPrograms: string; stories: string;
    events: string; contactUs: string; donate: string;
    education: string; nutrition: string; medical: string; protection: string;
    sponsorship: string; outreach: string;
    getInTouch: string; email: string; phone: string; location: string;
    locationUS: string; locationSL: string; officeHours: string; officeHoursValue: string;
    rights: string; about: string; programs: string; contact: string;
    motto: string; backToTop: string; skipToContent: string;
    searchLanguages: string; search: string; noLanguagesFound: string;
    switchLanguage: string; toggleMenu: string;
  };
}

// ── Static import of English for instant initial render ─────────────
import enJson from "../../public/translations/en.json";
const EN: Translations = enJson as Translations;

// ── Build a flat lookup map: English string -> translated string ────
// This is what <T> and useT() read from. O(1) lookups, no API calls.
type FlatMap = Map<string, string>;
const flatCache = new Map<LangCode, FlatMap>();

function buildFlatMap(en: Translations, translated: Translations): FlatMap {
  const map: FlatMap = new Map();
  function walk(a: unknown, b: unknown) {
    if (typeof a === "string" && typeof b === "string") {
      map.set(a, b);
      return;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      for (let i = 0; i < a.length; i++) walk(a[i], b[i]);
      return;
    }
    if (a && b && typeof a === "object" && typeof b === "object") {
      for (const k of Object.keys(a as Record<string, unknown>)) {
        walk((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]);
      }
    }
  }
  walk(en, translated);
  return map;
}

async function loadLanguage(code: LangCode): Promise<{ tree: Translations; flat: FlatMap }> {
  if (code === "en") {
    const flat = new Map<string, string>();
    return { tree: EN, flat };
  }
  // Fetch the pre-built JSON file from /public/translations/
  try {
    const res = await fetch(`/translations/${code}.json`);
    if (!res.ok) throw new Error(`status ${res.status}`);
    const tree = await res.json() as Translations;
    const flat = buildFlatMap(EN, tree);
    return { tree, flat };
  } catch (err) {
    console.warn(`No pre-built translation for ${code}, falling back to English.`, err);
    return { tree: EN, flat: new Map() };
  }
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
  flat: FlatMap;
  dir: "ltr" | "rtl";
  currentLang: Lang;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: EN,
  flat: new Map(),
  dir: "ltr",
  currentLang: LANGUAGES[0],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");
  const [tree, setTree] = useState<Translations>(EN);
  const [flat, setFlat] = useState<FlatMap>(new Map());

  // Detect browser language once on mount
  useEffect(() => { setLangState(detectLanguage()); }, []);

  // Load the right JSON whenever language changes
  useEffect(() => {
    const l = LANGUAGES.find(x => x.code === lang)!;
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", l?.dir || "ltr");
    localStorage.setItem("pandie-lang", lang);

    if (lang === "en") { setTree(EN); setFlat(new Map()); return; }

    // In-memory cache: switch back to a previously loaded language is instant
    if (flatCache.has(lang)) {
      const cached = flatCache.get(lang)!;
      // We also need the tree — rebuild it from the flat map and EN structure
      // Easier: re-fetch (it's a tiny static file, cached by browser HTTP cache anyway)
    }

    loadLanguage(lang).then(({ tree: t, flat: f }) => {
      flatCache.set(lang, f);
      setTree(t);
      setFlat(f);
    });
  }, [lang]);

  const setLang = (l: LangCode) => setLangState(l);
  const currentLang = LANGUAGES.find(x => x.code === lang) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: tree, flat, dir: currentLang.dir, currentLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
