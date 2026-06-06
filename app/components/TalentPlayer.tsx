"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

const TALENTS = [
  { name:"Aminata Koroma", age:14, location:"Freetown, Sierra Leone", flag:"🇸🇱",
    category:"🎵 MUSIC", quote:"Wrote her first song at age 9 with no instrument",
    track:"Rise — original composition", flagImg:"https://flagcdn.com/w320/sl.png", watchUrl:"/programs/talent/music" },
  { name:"Kwame Asante", age:16, location:"Accra, Ghana", flag:"🇬🇭",
    category:"⚽ FOOTBALL", quote:"23 goals this season — scouts calling from Europe",
    track:"23 goals · 2 academy offers · U-17 MVP", flagImg:"https://flagcdn.com/w320/gh.png", watchUrl:"/programs/talent/football" },
  { name:"Fatou Diop", age:13, location:"Dakar, Senegal", flag:"🇸🇳",
    category:"🎵 MUSIC", quote:"Sings in Wolof, French and English — age 13",
    track:"Teranga — original", flagImg:"https://flagcdn.com/w320/sn.png", watchUrl:"/programs/talent/music" },
  { name:"Chidi Okonkwo", age:17, location:"Lagos, Nigeria", flag:"🇳🇬",
    category:"💡 TECHNOLOGY", quote:"Built a health app for 800 families on a borrowed laptop",
    track:"800 families · Health app · Age 17", flagImg:"https://flagcdn.com/w320/ng.png", watchUrl:"/programs/talent/technology" },
  { name:"Emmanuel Dabo", age:15, location:"Abidjan, Ivory Coast", flag:"🇨🇮",
    category:"💡 TECHNOLOGY", quote:"Built a solar kit powering 6 homes for just $12",
    track:"6 homes powered · $12 build · Age 15", flagImg:"https://flagcdn.com/w320/ci.png", watchUrl:"/programs/talent/technology" },
  { name:"Aissatou Barry", age:17, location:"Conakry, Guinea", flag:"🇬🇳",
    category:"📚 ACADEMIC", quote:"Won the West Africa Mathematics Olympiad at 17",
    track:"Olympiad champion · Target: MIT", flagImg:"https://flagcdn.com/w320/gn.png", watchUrl:"/programs/talent/academic" },
  { name:"Kofi Mensah", age:14, location:"Kumasi, Ghana", flag:"🇬🇭",
    category:"🎵 MUSIC", quote:"Produces full tracks on a phone — no laptop, no studio",
    track:"Tomorrow — original", flagImg:"https://flagcdn.com/w320/gh.png", watchUrl:"/programs/talent/music" },
  { name:"Amara Sesay", age:15, location:"Bo, Sierra Leone", flag:"🇸🇱",
    category:"⚽ FOOTBALL", quote:"Trains barefoot every morning before school starts",
    track:"18 assists · Scouted by 2 academies", flagImg:"https://flagcdn.com/w320/sl.png", watchUrl:"/programs/talent/football" },
  { name:"Yasmine El Fassi", age:16, location:"Marrakech, Morocco", flag:"🇲🇦",
    category:"📚 ACADEMIC", quote:"Top science score in all of Morocco — full scholarship target",
    track:"Top 1% nationally · Cambridge target", flagImg:"https://flagcdn.com/w320/ma.png", watchUrl:"/programs/talent/academic" },
  { name:"Mariama Bah", age:13, location:"Labé, Guinea", flag:"🇬🇳",
    category:"🎵 MUSIC", quote:"Blends ancient Fula instruments with modern pop at age 13",
    track:"Sunrise — Fula fusion original", flagImg:"https://flagcdn.com/w320/gn.png", watchUrl:"/programs/talent/music" },
];

function wavePath(phase: number, amp: number): string {
  const W = 300, H = 62, mid = H / 2;
  let d = `M0 ${mid}`;
  for (let x = 0; x <= W; x += 6) {
    const y = mid
      + Math.sin(x * 0.045 + phase) * amp * Math.sin(x * 0.012 + phase * 0.5)
      + Math.sin(x * 0.11 + phase * 1.7) * amp * 0.4;
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return d;
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');

/* ── Stage ── */
.pandie-stage {
  position:fixed; width:340px; height:auto;
  z-index:9999; user-select:none;
  font-family:'Rajdhani',sans-serif;
  animation:pfFloatIn .55s cubic-bezier(.19,1,.22,1) both;
}
@keyframes pfFloatIn {
  from{opacity:0;transform:translateY(20px) scale(.9);filter:blur(8px)}
  to{opacity:1;transform:none;filter:none}
}

/* ── Crystal shards ── */
.shard {
  position:absolute; pointer-events:none;
  background:linear-gradient(135deg,rgba(0,240,255,.22),rgba(150,80,255,.18),rgba(255,90,210,.20));
  backdrop-filter:blur(3px);
  border:1px solid rgba(190,220,255,.35);
  box-shadow:0 0 28px rgba(120,80,255,.4),inset 0 0 16px rgba(255,255,255,.18);
  mix-blend-mode:screen; opacity:.88;
  animation:pfShardFloat 7s ease-in-out infinite;
}
@keyframes pfShardFloat {
  0%,100%{transform:translateY(0) rotate(var(--r,0deg))}
  50%{transform:translateY(-7px) rotate(var(--r,0deg))}
}
.shard.s-left  { left:-20px;  top:90px;   width:88px;  height:88px;  --r:18deg;
  clip-path:polygon(50% 0,100% 38%,78% 100%,18% 84%,0 36%); }
.shard.s-left2 { left:4px;    top:158px;  width:60px;  height:68px;  --r:-12deg;
  clip-path:polygon(50% 0,100% 50%,55% 100%,0 55%); opacity:.6; }
.shard.s-tr    { right:-7px;  top:4px;    width:82px;  height:92px;  --r:-22deg;
  clip-path:polygon(42% 0,100% 22%,86% 100%,12% 78%,0 30%); }
.shard.s-right { right:-22px; top:115px;  width:72px;  height:78px;  --r:14deg;
  clip-path:polygon(50% 0,100% 40%,72% 100%,8% 70%); }
.shard.s-br    { right:0;     bottom:-7px;width:46px;  height:52px;  --r:24deg;
  clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%); opacity:.75; }

/* ── Glass card ── */
.pandie-widget {
  position:absolute; left:24px; top:46px; width:292px;
  padding:16px 16px 13px; border-radius:22px;
  background:linear-gradient(135deg,
    rgba(150,90,255,.13) 0%,rgba(40,200,255,.06) 45%,
    rgba(255,80,200,.10) 75%,rgba(120,60,255,.13) 100%);
  backdrop-filter:blur(20px) saturate(170%);
  -webkit-backdrop-filter:blur(20px) saturate(170%);
  box-shadow:
    0 0 0 1px rgba(255,255,255,.07) inset,
    0 0 50px rgba(130,60,255,.30),
    0 0 90px rgba(40,200,255,.10),
    0 24px 64px rgba(0,0,0,.65);
  transition:box-shadow .3s ease;
}
.pandie-widget::before {
  content:""; position:absolute; inset:-1.5px; border-radius:22px; padding:1.5px;
  background:linear-gradient(120deg,#00f0ff,#9b4bff,#ff5bd1,#00f0ff,#9b4bff);
  background-size:300% 300%;
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor; mask-composite:exclude;
  opacity:.45; animation:pfShimmer 5s linear infinite; pointer-events:none;
}
.pandie-stage:hover .pandie-widget::before { opacity:.88; }
.pandie-widget::after {
  content:""; position:absolute; inset:0; border-radius:22px; pointer-events:none;
  background:linear-gradient(115deg,transparent 28%,rgba(255,255,255,.055) 46%,transparent 58%);
}
@keyframes pfShimmer { 0%{background-position:0% 50%} 100%{background-position:300% 50%} }

/* ── HUD corners ── */
.hud { position:absolute; width:24px; height:24px; border:2px solid rgba(0,240,255,.7);
  filter:drop-shadow(0 0 7px rgba(0,240,255,.9)); pointer-events:none; z-index:3; }
.hud.tl { top:-11px;    left:-11px;  border-right:none; border-bottom:none; border-radius:6px 0 0 0; }
.hud.tr { top:-11px;    right:-11px; border-left:none;  border-bottom:none; border-radius:0 6px 0 0; }
.hud.bl { bottom:-11px; left:-11px;  border-right:none; border-top:none;    border-radius:0 0 0 6px; }
.hud.br { bottom:-11px; right:-11px; border-left:none;  border-top:none;    border-radius:0 0 6px 0; }
.hud-tick { position:absolute; height:2px; background:rgba(0,240,255,.55);
  filter:drop-shadow(0 0 4px rgba(0,240,255,.8)); pointer-events:none; z-index:3; }
.hud-tick.t1 { top:-6px; left:36px; width:24px; }
.hud-tick.t2 { top:-6px; right:48px; width:11px; }

/* ── Drag handle ── */
.pw-head { display:flex; justify-content:space-between; align-items:flex-start;
  cursor:grab; margin-bottom:13px; position:relative; z-index:2; }
.pw-head:active { cursor:grabbing; }
.pw-title { margin:0; font-weight:700; font-size:15px; color:#eaf7ff; line-height:1.2;
  text-shadow:0 0 14px rgba(0,240,255,.75),0 0 4px rgba(255,255,255,.4); }
.pw-sub { margin-top:3px; font-size:11px; font-weight:500; color:rgba(195,165,255,.78);
  text-shadow:0 0 8px rgba(150,90,255,.45); }
.pw-controls { display:flex; gap:6px; flex-shrink:0; }
.pw-min,.pw-close {
  width:24px; height:24px; border-radius:7px; cursor:pointer; display:grid; place-items:center;
  font-size:13px; color:#dcceff; background:rgba(120,80,200,.14);
  border:1px solid rgba(180,160,255,.35); transition:all .2s ease;
}
.pw-close:hover { background:rgba(255,80,160,.28); border-color:#ff5bd1;
  box-shadow:0 0 14px rgba(255,91,209,.65); transform:rotate(90deg); }
.pw-min:hover { background:rgba(0,200,255,.22); border-color:#00f0ff;
  box-shadow:0 0 14px rgba(0,240,255,.55); }

/* ── Profile ── */
.pw-profile { display:flex; align-items:center; gap:13px; margin-bottom:11px;
  position:relative; z-index:2; }

/* ── Real spinning globe ── */
.globe-wrap { width:56px; height:56px; flex-shrink:0; position:relative; }
.earth {
  width:100%; height:100%; border-radius:50%; position:relative; overflow:hidden;
  border:1.5px solid rgba(120,200,255,.5); background:#071a3e;
  box-shadow:
    inset -13px -6px 26px rgba(0,0,0,.92),
    inset 4px 4px 10px rgba(100,160,255,.06),
    0 0 22px rgba(0,170,255,.55),
    0 0 38px rgba(100,80,255,.35);
}
.earth-surface {
  position:absolute; inset:0; border-radius:50%;
  background-image:url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Whole_world_-_land_and_oceans.jpg/1280px-Whole_world_-_land_and_oceans.jpg');
  background-size:200% 100%; background-repeat:repeat-x; background-position:0% center;
  animation:pfSpin 12s linear infinite;
}
@keyframes pfSpin {
  from { background-position:0% center; }
  to   { background-position:200% center; }
}
.earth-gloss {
  position:absolute; inset:0; border-radius:50%; pointer-events:none;
  background:
    radial-gradient(circle at 28% 26%, rgba(255,255,255,.55) 0%, transparent 30%),
    radial-gradient(circle at 82% 52%, rgba(0,0,20,.9) 0%, transparent 44%),
    radial-gradient(circle at 50% 50%, transparent 52%, rgba(0,0,18,.5) 100%);
}
.flag-badge {
  position:absolute; left:50%; top:54%; transform:translate(-50%,-50%);
  width:28px; height:20px; border-radius:4px; overflow:hidden; z-index:4;
  background-size:cover; background-position:center;
  border:1.5px solid rgba(255,255,255,.75);
  box-shadow:0 0 10px rgba(0,0,0,.6),0 0 14px rgba(0,240,255,.5);
}
.globe-wrap::after {
  content:""; position:absolute; inset:-5px; border-radius:50%;
  border:1px solid rgba(170,120,255,.4);
  animation:pfHalo 2.6s ease-in-out infinite;
}
@keyframes pfHalo { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.16);opacity:0} }

.pw-name { font-family:'Orbitron',sans-serif; font-weight:700; font-size:14px; color:#fff;
  letter-spacing:.3px; text-shadow:0 0 12px rgba(0,240,255,.65); }
.pw-meta { margin-top:2px; font-size:11px; font-weight:500; color:rgba(198,172,255,.88);
  text-shadow:0 0 6px rgba(150,90,255,.4); }
.pw-badge { display:inline-flex; align-items:center; gap:4px; margin-top:6px; padding:2px 10px;
  font-size:10px; font-weight:700; letter-spacing:1px; border-radius:18px; color:#aef6ff;
  background:rgba(0,200,255,.10); border:1px solid rgba(0,240,255,.45);
  box-shadow:0 0 12px rgba(0,240,255,.28); text-shadow:0 0 7px rgba(0,240,255,.65); }

/* ── Quote ── */
.pw-quote { font-style:italic; font-size:11.5px; color:rgba(228,232,255,.9);
  padding:5px 0 5px 11px; border-left:2px solid #b14bff; margin:3px 0 11px;
  position:relative; z-index:2; line-height:1.55;
  box-shadow:-2px 0 12px -4px rgba(177,75,255,.8);
  text-shadow:0 0 9px rgba(150,90,255,.3); }

/* ── Player ── */
.pw-player { display:flex; align-items:center; gap:11px; margin-bottom:3px;
  position:relative; z-index:2; }
.pw-play {
  width:40px; height:40px; border-radius:11px; flex-shrink:0; cursor:pointer;
  display:grid; place-items:center; color:#f0e8ff; font-size:13px;
  position:relative; overflow:hidden;
  background:linear-gradient(145deg,rgba(150,80,255,.4),rgba(70,35,150,.28));
  border:1px solid rgba(190,140,255,.62);
  box-shadow:0 0 18px rgba(150,80,255,.52),inset 0 0 9px rgba(255,255,255,.18);
  transition:all .2s ease;
}
.pw-play::before {
  content:""; position:absolute; inset:0;
  background-image:
    linear-gradient(90deg,transparent 47%,rgba(0,240,255,.4) 49%,transparent 52%),
    linear-gradient(transparent 68%,rgba(0,240,255,.32) 70%,transparent 73%);
  opacity:.5; animation:pfCircuit 2.2s ease-in-out infinite;
}
@keyframes pfCircuit { 0%,100%{opacity:.22} 50%{opacity:.68} }
.pw-play:hover { transform:scale(1.08); box-shadow:0 0 28px rgba(150,80,255,.9); }
.pw-wave {
  flex:1; height:54px; border-radius:12px; overflow:hidden;
  background:rgba(40,20,80,.22); border:1px solid rgba(160,110,255,.26);
  box-shadow:inset 0 0 16px rgba(120,60,255,.3);
}
.pw-wave svg { width:100%; height:100%; display:block; }
.ribbon { fill:none; stroke-width:2; stroke-linecap:round;
  filter:drop-shadow(0 0 5px rgba(150,90,255,.9)); }
.pw-track { margin:5px 0 13px 51px; font-size:11px; font-weight:500;
  color:rgba(182,162,255,.78); text-shadow:0 0 6px rgba(120,80,255,.38);
  position:relative; z-index:2; }

/* ── CTA ── */
.pw-cta {
  display:flex; align-items:center; justify-content:center; gap:7px;
  width:100%; padding:11px; border:none; cursor:pointer; border-radius:12px;
  position:relative; z-index:2;
  font-family:'Rajdhani',sans-serif; font-weight:700; font-size:13px;
  letter-spacing:.7px; color:#fff;
  text-shadow:0 0 11px rgba(0,240,255,.8); overflow:hidden; text-decoration:none;
  background:linear-gradient(135deg,rgba(150,70,255,.5),rgba(60,30,140,.42));
  border:1px solid rgba(190,140,255,.66);
  box-shadow:0 0 22px rgba(150,80,255,.48),inset 0 0 16px rgba(255,255,255,.09);
  transition:all .25s ease;
}
.pw-cta::after {
  content:""; position:absolute; inset:0;
  background-image:repeating-linear-gradient(90deg,transparent 0 17px,rgba(0,240,255,.15) 17px 18px);
  opacity:.5; animation:pfCircuit 2.4s ease-in-out infinite;
}
.pw-cta:hover { transform:translateY(-1px);
  box-shadow:0 0 32px rgba(150,80,255,.9),inset 0 0 20px rgba(255,255,255,.16); }

/* ── Nav footer ── */
.pw-foot { display:flex; align-items:center; justify-content:space-between;
  margin-top:12px; position:relative; z-index:2; }
.pw-dots { display:flex; gap:6px; }
.pw-dots i { width:5px; height:5px; border-radius:50%; cursor:pointer; list-style:none;
  background:rgba(160,140,255,.32); transition:all .25s ease; display:block; }
.pw-dots i.active { background:#00f0ff; width:14px; border-radius:3px;
  box-shadow:0 0 10px rgba(0,240,255,.88); }
.pw-next { display:inline-flex; align-items:center; gap:5px; padding:6px 12px;
  border-radius:9px; cursor:pointer; font-weight:700; font-size:11px; letter-spacing:.3px;
  color:#aef6ff; background:rgba(0,200,255,.09); border:1px solid rgba(0,240,255,.40);
  box-shadow:0 0 10px rgba(0,240,255,.26); text-shadow:0 0 6px rgba(0,240,255,.65);
  transition:all .2s ease; user-select:none; }
.pw-next:hover { background:rgba(0,200,255,.2); transform:translateX(2px); }

/* ── Reopen orb ── */
.pf-reopen {
  position:fixed; bottom:22px; right:22px; z-index:9998;
  padding:10px 15px; border-radius:11px; cursor:pointer;
  font-family:'Rajdhani',sans-serif; font-weight:700; font-size:13px;
  color:#aef6ff; background:rgba(0,200,255,.12);
  border:1px solid rgba(0,240,255,.48);
  animation:pfReopenPulse 2s ease-in-out infinite;
}
@keyframes pfReopenPulse {
  0%,100%{box-shadow:0 0 12px rgba(0,240,255,.38);}
  50%{box-shadow:0 0 24px rgba(0,240,255,.78),0 0 44px rgba(0,240,255,.22);}
}

/* ── Mobile ── */
@media (max-width:499px) {
  .pandie-stage  { width:280px !important; }
  .pandie-widget { width:236px !important; left:20px !important; top:38px !important;
    padding:13px 13px 10px !important; }
  .globe-wrap    { width:44px !important; height:44px !important; }
  .pw-name       { font-size:12px !important; }
  .pw-title      { font-size:13px !important; }
  .pw-wave       { height:44px !important; }
  .pw-play       { width:34px !important; height:34px !important; }
  .shard.s-left2,.shard.s-right { display:none; }
  .shard.s-left  { width:60px !important; height:60px !important; left:-14px !important; top:70px !important; }
  .shard.s-tr    { width:62px !important; height:68px !important; }
  .shard.s-br    { width:34px !important; height:40px !important; }
}
`;

export default function TalentPlayer() {
  const [visible, setVisible]     = useState(false);
  const [hidden, setHidden]       = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [cur, setCur]             = useState(0);
  const [pos, setPos]             = useState({ x: 20, y: 70 });
  const [isMobile, setIsMobile]   = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const rib1Ref  = useRef<SVGPathElement>(null);
  const rib2Ref  = useRef<SVGPathElement>(null);
  const rafRef   = useRef<number>(0);
  const tRef     = useRef(0);
  const posRef   = useRef({ x: 20, y: 70 });
  const dragging = useRef(false);
  const dragOff  = useRef({ ox: 0, oy: 0 });
  const autoRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  // Determine initial position: right side on desktop, centred on mobile
  useEffect(() => {
    const mobile = window.innerWidth < 500;
    setIsMobile(mobile);
    if (mobile) {
      const w = 280;
      const x = Math.max(8, Math.floor((window.innerWidth - w) / 2));
      const y = Math.max(90, window.innerHeight - 480);
      posRef.current = { x, y };
      setPos({ x, y });
    } else {
      const w = 340;
      const x = Math.max(0, window.innerWidth - w - 16);
      posRef.current = { x, y: 90 };
      setPos({ x, y: 90 });
    }
  }, []);

  // Flowing 3D ribbon wave via RAF — direct DOM, no re-renders
  useEffect(() => {
    const animate = () => {
      tRef.current += 0.08;
      rib1Ref.current?.setAttribute("d", wavePath(tRef.current, 16));
      rib2Ref.current?.setAttribute("d", wavePath(tRef.current + 1.2, 11));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Auto carousel
  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => setCur(c => (c + 1) % TALENTS.length), 7000);
  }, []);

  useEffect(() => {
    if (visible && !hidden) resetAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [visible, hidden, resetAuto]);

  // Mobile "going on and off": auto-hide after 8 s, auto-reopen after 10 s
  useEffect(() => {
    if (!isMobile || !visible || hidden) return;
    const t = setTimeout(() => setHidden(true), 8000);
    return () => clearTimeout(t);
  }, [isMobile, visible, hidden]);

  useEffect(() => {
    if (!isMobile || !hidden) return;
    const t = setTimeout(() => {
      setHidden(false);
      setCur(c => (c + 1) % TALENTS.length);
    }, 10000);
    return () => clearTimeout(t);
  }, [isMobile, hidden]);

  // Global drag — direct DOM at 60 fps, commit to React state on mouseup
  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const cx = "touches" in e ? e.touches[0].clientX : e.clientX;
      const cy = "touches" in e ? e.touches[0].clientY : e.clientY;
      const sw = stageRef.current?.offsetWidth  ?? 340;
      const sh = stageRef.current?.offsetHeight ?? 460;
      const nx = Math.max(0, Math.min(window.innerWidth  - sw, cx - dragOff.current.ox));
      const ny = Math.max(0, Math.min(window.innerHeight - sh, cy - dragOff.current.oy));
      posRef.current = { x: nx, y: ny };
      if (stageRef.current) {
        stageRef.current.style.left = `${nx}px`;
        stageRef.current.style.top  = `${ny}px`;
      }
    };
    const onUp = () => {
      if (dragging.current) { dragging.current = false; setPos({ ...posRef.current }); }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    e.preventDefault();
    const cx = "touches" in e ? e.touches[0].clientX : e.clientX;
    const cy = "touches" in e ? e.touches[0].clientY : e.clientY;
    dragging.current = true;
    dragOff.current = { ox: cx - posRef.current.x, oy: cy - posRef.current.y };
  };

  // Show after 3 s delay
  useEffect(() => {
    const id = setTimeout(() => {
      if (!sessionStorage.getItem("talent-dismissed-v3")) setVisible(true);
    }, 3000);
    return () => clearTimeout(id);
  }, []);

  const go       = (idx: number) => { setCur(idx); resetAuto(); };
  const minimize = () => { setHidden(true);  if (autoRef.current) clearInterval(autoRef.current); };
  const reopen   = () => { setHidden(false); resetAuto(); };
  const dismiss  = () => { setDismissed(true); sessionStorage.setItem("talent-dismissed-v3", "1"); };

  if (dismissed || !visible) return null;

  const tl = TALENTS[cur];

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Pulsing reopen orb (bottom-right) when minimised */}
      {hidden && (
        <button className="pf-reopen" onClick={reopen}>◆ Show talents</button>
      )}

      {/* Main stage */}
      {!hidden && (
        <div ref={stageRef} className="pandie-stage" style={{ left: pos.x, top: pos.y }}>
          {/* Faceted 3D crystal shards */}
          <span className="shard s-left" />
          <span className="shard s-left2" />
          <span className="shard s-tr" />
          <span className="shard s-right" />
          <span className="shard s-br" />

          {/* Holographic glass card */}
          <div className="pandie-widget">
            <span className="hud tl" /><span className="hud tr" />
            <span className="hud bl" /><span className="hud br" />
            <span className="hud-tick t1" /><span className="hud-tick t2" />

            {/* Drag handle / header */}
            <div className="pw-head" onMouseDown={startDrag} onTouchStart={startDrag}>
              <div>
                <p className="pw-title">Hey! Want to watch our talents? 🌍</p>
                <p className="pw-sub">Africa&apos;s next generation — discover them</p>
              </div>
              <div className="pw-controls">
                <button className="pw-min" onClick={minimize}>–</button>
                <button className="pw-close" onClick={dismiss}>✕</button>
              </div>
            </div>

            {/* Profile: spinning real globe + talent info */}
            <div className="pw-profile">
              <div className="globe-wrap">
                <div className="earth">
                  {/* Real Earth texture scrolling = spinning globe */}
                  <div className="earth-surface" />
                  {/* Sphere lighting overlay */}
                  <div className="earth-gloss" />
                  {/* Country flag badge on globe face */}
                  <div className="flag-badge"
                    style={{ backgroundImage: `url('${tl.flagImg}')` }} />
                </div>
              </div>
              <div>
                <div className="pw-name">{tl.name}</div>
                <div className="pw-meta">Age {tl.age} · {tl.location} {tl.flag}</div>
                <span className="pw-badge">{tl.category}</span>
              </div>
            </div>

            <div className="pw-quote">&ldquo;{tl.quote}&rdquo;</div>

            {/* Waveform player */}
            <div className="pw-player">
              <div className="pw-play">▶</div>
              <div className="pw-wave">
                <svg viewBox="0 0 300 62" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="pfRibGrad" x1="0" x2="1">
                      <stop offset="0"   stopColor="#00f0ff" />
                      <stop offset="0.5" stopColor="#9b4bff" />
                      <stop offset="1"   stopColor="#ff5bd1" />
                    </linearGradient>
                  </defs>
                  <path ref={rib1Ref} className="ribbon" stroke="url(#pfRibGrad)" opacity="0.95" />
                  <path ref={rib2Ref} className="ribbon" stroke="url(#pfRibGrad)" opacity="0.45" />
                </svg>
              </div>
            </div>
            <div className="pw-track">{tl.track}</div>

            {/* CTA */}
            <Link href={tl.watchUrl} className="pw-cta">
              <span>⏱</span>
              <span>Watch {tl.name.split(" ")[0]}&apos;s talent</span>
              <span>→</span>
            </Link>

            {/* Dots nav + Next */}
            <div className="pw-foot">
              <div className="pw-dots">
                {TALENTS.map((_, i) => (
                  <i key={i} className={i === cur ? "active" : ""} onClick={() => go(i)} />
                ))}
              </div>
              <span className="pw-next" onClick={() => go((cur + 1) % TALENTS.length)}>
                Next ▶
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
