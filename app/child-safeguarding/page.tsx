import type { Metadata } from "next";
import Link from "next/link";
import GoldThread from "../components/GoldThread";

export const metadata: Metadata = {
  title: "Child Safeguarding",
  description: "Pandie Foundation's child-safeguarding promise: consent-first media, first names only, no direct contact, 24-hour removal.",
};

// Policy stub — the foundation should review and expand this with counsel.
const RULES = [
  ["Consent first", "No child appears on this site without written guardian consent and the child's own assent, both on file. Either can be withdrawn at any time."],
  ["Minimal identity", "First names and town-level location only. Never surnames, school names, addresses, or daily routines."],
  ["No direct contact", "Visitors can never message, comment on, or contact a child. Every sponsor message is reviewed and delivered by foundation staff."],
  ["Dignity always", "We show talent, effort, and joy. We never use a child's distress as marketing."],
  ["Fast removal", "Any child is removed from the entire site within 24 hours of a request — one flag takes down every appearance."],
  ["Clean media", "Location metadata is stripped from photographs and videos before publication."],
];

export default function SafeguardingPage() {
  return (
    <div className="min-h-[100svh] bg-[#0a1a10] pt-[72px] text-white sm:pt-[76px]">
      <div className="mx-auto max-w-2xl px-5 py-16">
        <GoldThread className="w-24" />
        <h1 className="mt-5 font-heading text-[clamp(30px,6vw,48px)] font-semibold leading-tight">
          Our child-safeguarding promise
        </h1>
        <p className="mt-4 text-[15px] leading-7 text-white/65">
          Every child on this site is a real child with a real future. These rules protect them — and they
          are enforced in the website&apos;s code, not just in policy.
        </p>
        <div className="mt-8 space-y-5">
          {RULES.map(([title, body]) => (
            <div key={title} className="border-l-2 border-[#c9962a]/60 pl-4">
              <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#e8b84b]">{title}</h2>
              <p className="mt-1.5 text-[14px] leading-6 text-white/70">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[13px] leading-6 text-white/50">
          Concerns about any content involving a child? Email{" "}
          <a href="mailto:info@pandiefoundation.org" className="text-[#e8b84b] underline underline-offset-4">info@pandiefoundation.org</a>{" "}
          and it will be reviewed within 24 hours.
        </p>
        <Link href="/talents/gallery" className="mt-8 inline-block text-[12px] uppercase tracking-[0.16em] text-[#e8b84b] hover:underline">
          ← Back to the Talent Gallery
        </Link>
      </div>
    </div>
  );
}
