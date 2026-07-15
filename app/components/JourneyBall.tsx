"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/app/context/LanguageContext";


// The Magnet: a site-wide floating football (bottom-LEFT — the chatbot owns
// bottom-right) that bounces gently every ~8s and periodically shows a label
// chip, appearing and disappearing like the donation prompt. Once the visitor
// completes the journey (localStorage pf_journey_done), it becomes the gold
// heart and invites them to meet the talents instead.
export default function JourneyBall() {
  const pathname = usePathname();
  const { flat, lang } = useLang();
  const tr = (x: string) => (lang === "en" ? x : flat.get(x) ?? x);

  const [chip, setChip] = useState(false);
  // Re-read on every render (navigation re-renders via pathname); the storage
  // event covers cross-tab completion.
  const done = useSyncExternalStore(
    (cb) => { window.addEventListener("storage", cb); return () => window.removeEventListener("storage", cb); },
    () => { try { return localStorage.getItem("pf_journey_done") === "1"; } catch { return false; } },
    () => false,
  );

  // Label chip: shows 6s shortly after load, then reappears every 45s with a
  // rotating message. Stays quiet while any dialog (donation prompt) is open.
  const [msgIdx, setMsgIdx] = useState(0);
  useEffect(() => {
    let hide: ReturnType<typeof setTimeout>;
    const show = () => {
      if (document.querySelector('[role="dialog"]')) return; // manners
      setMsgIdx(i => i + 1);
      setChip(true);
      hide = setTimeout(() => setChip(false), 6000);
    };
    const first = setTimeout(show, 2500);
    const loop = setInterval(show, 45000);
    return () => { clearTimeout(first); clearTimeout(hide); clearInterval(loop); };
  }, []);

  // Never on the story itself, its alias, or (in heart mode) the talents page.
  if (pathname.startsWith("/potential-in-motion") || pathname.startsWith("/journey")) return null;
  if (done && pathname.startsWith("/talents")) return null;

  const href = done ? "/talents" : "/potential-in-motion";
  const messages = done
    ? [tr("Meet the talents →"), tr("Every child has a talent.")]
    : [tr("Follow the dream →"), tr("Every dream starts with one gift.")];
  const label = messages[msgIdx % messages.length];

  return (
    <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2.5">
      <style>{`
        @keyframes pfBallBounce {
          0%, 86%, 100% { transform: translateY(0) scale(1, 1); }
          88% { transform: translateY(-10px) scale(0.96, 1.05); }
          91% { transform: translateY(0) scale(1.12, 0.86); }
          93% { transform: translateY(-5px) scale(0.98, 1.03); }
          95% { transform: translateY(0) scale(1.06, 0.94); }
          97% { transform: translateY(0) scale(1, 1); }
        }
        @keyframes pfChipIn {
          from { opacity: 0; transform: translateX(-8px) rotate(-2deg); }
          60% { transform: translateX(2px) rotate(1.5deg); }
          to { opacity: 1; transform: translateX(0) rotate(0); }
        }
        .pf-ball-idle { animation: pfBallBounce 8s ease-in-out infinite; }
        .pf-chip-in { animation: pfChipIn 0.5s cubic-bezier(.22,1,.36,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .pf-ball-idle, .pf-chip-in { animation: none !important; }
        }
      `}</style>

      <Link
        href={href}
        aria-label={done ? "Meet the talents" : "Follow the dream — the journey story"}
        className="group relative block h-14 w-14 rounded-full border-[1.5px] border-[#c9962a]/70 bg-[#0d2015] shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition hover:border-[#e8b84b] hover:shadow-[0_10px_34px_rgba(201,150,42,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b84b]"
      >
        {chip && (
          <span className="absolute inset-[-6px] animate-ping rounded-full border border-[#e8cd85]/60 motion-reduce:hidden" style={{ animationIterationCount: 3 }} />
        )}
        <span className="pf-ball-idle absolute inset-0 flex items-center justify-center">
          {done ? (
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#c9962a" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg viewBox="0 0 200 200" className="h-9 w-9" aria-hidden="true">
              <circle cx="100" cy="100" r="62" fill="#f4f1ea" stroke="#1a2e1f" strokeWidth="6" />
              <polygon points="100,72 126,91 116,122 84,122 74,91" fill="#1a2e1f" />
              <path d="M100 38 v34 M126 91 l32 -18 M116 122 l22 26 M84 122 l-22 26 M74 91 l-32 -18" stroke="#1a2e1f" strokeWidth="6" fill="none" />
            </svg>
          )}
        </span>
      </Link>

      {chip && (
        <Link
          href={href}
          className="pf-chip-in whitespace-nowrap border border-[#c9962a]/50 bg-[#0d2015]/95 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#e8b84b] shadow-[0_10px_28px_rgba(0,0,0,0.4)] backdrop-blur-sm transition hover:border-[#e8b84b] focus-visible:outline-2 focus-visible:outline-[#e8b84b]"
        >
          {label}
        </Link>
      )}
    </div>
  );
}
