import raw from "@/data/talents.json";

// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH: /data/talents.json
//
// HOW TO ADD A CHILD (no code needed):
// 1. Upload media into /public/assets/talents/ :
//      {id}.jpg  — poster photo, portrait 4:5 (e.g. 720×900)
//      {id}.mp4  — talent clip, 10–15s, 720p max, ≤2MB if possible
//      {id}.vtt  — captions file for the clip
//    ⚠ Strip location (EXIF/GPS) data from photos and videos BEFORE uploading
//      (on iPhone: share → Options → turn off Location; or use any EXIF cleaner).
// 2. Copy one block in /data/talents.json, change the values, save.
//    Until media is uploaded, the card shows a branded initial tile — nothing breaks.
//
// CHILD-SAFEGUARDING RENDER RULE — enforced HERE and only here, so no template
// can bypass it: a child renders ONLY when BOTH consent flags are true and the
// removed flag is false. Flip "removed": true to take a child down site-wide.
// First names only. Town-level location maximum. Never distress as marketing.
// ─────────────────────────────────────────────────────────────────────────────

export type Talent = {
  id: string;
  firstName: string;
  age: number;
  town: string;
  category: string;
  talentTitle: string;
  video: string;
  poster: string;
  captions: string;
  durationSec: number;
  story: string;
  guardianConsentOnFile: boolean;
  childAssentOnFile: boolean;
  sponsored: boolean;
  removed: boolean;
};

export const CATEGORIES: { id: string; label: string; icon: string }[] = [
  { id: "all", label: "All", icon: "M12 4a8 8 0 100 16 8 8 0 000-16z" },
  { id: "football", label: "Football", icon: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 6l3.5 2.5-1.3 4h-4.4l-1.3-4L12 8z" },
  { id: "music", label: "Music", icon: "M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" },
  { id: "scholars", label: "Scholars", icon: "M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" },
  { id: "medics", label: "Future Medics", icon: "M19 8h-3V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v3H5a2 2 0 00-2 2v4a2 2 0 002 2h3v3a2 2 0 002 2h4a2 2 0 002-2v-3h3a2 2 0 002-2v-4a2 2 0 00-2-2z" },
  { id: "art", label: "Art", icon: "M7 14a3 3 0 00-3 3c0 1.66-1.34 2-2 2 .74 1.22 2.06 2 3.5 2A4.5 4.5 0 0010 16.5 2.5 2.5 0 007 14zm13.71-9.37l-1.34-1.34a1 1 0 00-1.41 0L9 12.25 11.75 15l8.96-8.96a1 1 0 000-1.41z" },
  { id: "dance", label: "Dance", icon: "M9 3v10.55A4 4 0 1011 17V7h2a3 3 0 003 3V8a5 5 0 01-5-5H9z" },
];

// THE render rule. Every surface reads through this function.
export function visibleTalents(): Talent[] {
  return (raw as Talent[]).filter(
    t => t.guardianConsentOnFile === true && t.childAssentOnFile === true && t.removed !== true,
  );
}

export function talentById(id: string): Talent | undefined {
  return visibleTalents().find(t => t.id === id);
}

// PLACEHOLDER SPONSORSHIP TIERS — [CONFIRM WITH FOUNDATION] before launch.
export const SPONSOR_TIERS = [
  { amount: "$15/mo", label: "School supplies", detail: "Books, uniform, and materials for the term." },
  { amount: "$30/mo", label: "School + daily meal", detail: "Everything above, plus a nutritious meal every school day." },
  { amount: "$60/mo", label: "Full support", detail: "Education, meals, medical care, and talent coaching." },
];
