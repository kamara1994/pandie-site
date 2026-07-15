// ─────────────────────────────────────────────────────────────────────────────
// Potential in Motion — central editable story configuration.
// Everything an editor may need to change lives here: names, programs, copy,
// image paths, and framing. The animation reads from this file.
//
// REPLACING PLACEHOLDER PHOTOGRAPHS
// The current images are the same local photographs already published on the
// /stories page for these children. To substitute a final, consented
// photograph: drop the new file into /public (e.g. /musa-final.jpg) and change
// `image` below. Keep portrait-ish framing (the slot is 4:5, object-fit:cover);
// use `objectPosition` to keep the face in frame at every breakpoint
// (e.g. "50% 20%" pulls the crop toward the top of the photo).
// ─────────────────────────────────────────────────────────────────────────────

export type StoryScene = {
  id: string;
  childName: string;
  program: string;
  headline: string;
  description: string;
  image: string;         // local /public path — no external hotlinks
  objectPosition: string; // keeps the face in frame; tune per photo
  objectLabel: string;    // what the traveling object is during this scene
};

export const STORY_INTRO = {
  headline: "Every child carries a possibility.",
  support: "Scroll to follow one opportunity as it becomes many.",
  scrollCue: "Scroll to begin",
};

export const STORY_SCENES: StoryScene[] = [
  {
    id: "play",
    childName: "Musa",
    program: "Sport and Mentorship",
    headline: "A chance to play.",
    description: "Play can build confidence, courage, and connection.",
    // PLACEHOLDER — replace with final approved photo of Musa
    image: "/story-nutrition.jpg",
    objectPosition: "50% 25%",
    objectLabel: "a football",
  },
  {
    id: "voice",
    childName: "Aminata",
    program: "Music and Creative Expression",
    headline: "A chance to be heard.",
    description: "When children find their voices, they begin to believe in what they can become.",
    // PLACEHOLDER — replace with final approved photo of Aminata
    image: "/story-featured.jpg",
    objectPosition: "50% 22%",
    objectLabel: "a microphone",
  },
  {
    id: "learn",
    childName: "Hawa",
    program: "Education and Learning Support",
    headline: "A chance to discover.",
    description: "Learning turns imagination into a path forward.",
    // PLACEHOLDER — replace with final approved photo of Hawa
    image: "/story-education.jpg",
    objectPosition: "50% 24%",
    objectLabel: "a schoolbook",
  },
  {
    id: "heal",
    childName: "Mariama",
    program: "Health, Care, and Future Careers",
    headline: "A chance to heal.",
    description: "Support today can help a child care for an entire community tomorrow.",
    // PLACEHOLDER — replace with final approved photo of Mariama
    image: "/service-medical.jpg",
    objectPosition: "50% 20%",
    objectLabel: "a stethoscope",
  },
];

export const STORY_FINALE = {
  headline: "Now it is in your hands.",
  support: "One opportunity can become a future. Help us pass the next opportunity forward.",
  primaryCta: { label: "Donate Now", href: "/donate" },
  secondaryCta: { label: "Explore Our Programs", href: "/programs" },
};
