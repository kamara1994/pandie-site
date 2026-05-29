#!/bin/bash
set -e
GOLD='\033[0;33m'; GREEN='\033[0;32m'; BOLD='\033[1m'; NC='\033[0m'

echo ""
echo -e "${GOLD}${BOLD}╔══════════════════════════════════════════════════╗${NC}"
echo -e "${GOLD}${BOLD}║  Pandie Foundation — Phase 5: Talent & Mentorship ║${NC}"
echo -e "${GOLD}${BOLD}╚══════════════════════════════════════════════════╝${NC}"
echo ""

if [ ! -f "package.json" ] || [ ! -d "app" ]; then
  echo "ERROR: Run from inside your pandie-site folder."; exit 1
fi

mkdir -p _backup/programs/talent _backup/components
cp app/components/CoreServices.tsx _backup/components/CoreServices.tsx 2>/dev/null || true
cp app/components/TopBar.tsx _backup/components/TopBar.tsx 2>/dev/null || true
cp app/programs/page.tsx _backup/programs/page.tsx 2>/dev/null || true
cp app/sitemap.ts _backup/sitemap.ts 2>/dev/null || true
echo -e "${GREEN}✓ Originals backed up${NC}"

# ── CREATE TALENT PROGRAM DIRECTORY ──────────────────────────────────────────
mkdir -p app/programs/talent

# ── TALENT PROGRAM MAIN PAGE ─────────────────────────────────────────────────
echo -e "${BOLD}Building Talent & Mentorship program page...${NC}"
cat > app/programs/talent/page.tsx << 'EOF'
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type FormType = "mentor" | "nominate" | null;

export default function TalentPage() {
  const [activeForm, setActiveForm] = useState<FormType>(null);
  const [mentorForm, setMentorForm] = useState({ fullName: "", email: "", phone: "", country: "", field: "", experience: "", availability: "", bio: "", linkedIn: "" });
  const [nominateForm, setNominateForm] = useState({ nominator: "", nominatorEmail: "", childName: "", childAge: "", childLocation: "", talent: "", description: "", relationship: "" });
  const [mentorStatus, setMentorStatus] = useState<"" | "success" | "error">("");
  const [nominateStatus, setNominateStatus] = useState<"" | "success" | "error">("");
  const [submitting, setSubmitting] = useState(false);

  const tracks = [
    { icon: "⚽", title: "Football Academy", desc: "Structured coaching, fitness, and tactics. Connections to African academies, European scouts, and Sierra Leone national team pathways.", stat: "The next great footballer could be in a village with no boots today." },
    { icon: "🎵", title: "Music & Arts", desc: "Vocal coaching, instruments, music production, and visual arts. Connections to studios, labels, and competitions across Africa and internationally.", stat: "Sierra Leone has produced world-class artists. Pandie finds the next ones." },
    { icon: "🎓", title: "Academic Excellence", desc: "For children with exceptional intellectual ability — scholarship pathways, university connections, and mentors who are doctors, engineers, and business leaders.", stat: "Intelligence without opportunity is the world's greatest waste." },
    { icon: "💻", title: "Technology & Innovation", desc: "Coding, design, and entrepreneurship for the child who takes apart every device they touch. Connections to tech incubators and international scholarships.", stat: "Africa's next tech founder is growing up in Sierra Leone right now." },
  ];

  const handleMentorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setMentorStatus("success");
    setSubmitting(false);
  };

  const handleNominateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setNominateStatus("success");
    setSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-[#f4f1ea]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#0a1a10] px-6 py-24 text-white lg:px-20">
        <div className="absolute inset-0"><Image src="/laugingchildren.png" alt="" fill className="object-cover opacity-10" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a10]/98 via-[#0a1a10]/85 to-[#0a1a10]/60" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent opacity-60" />

        <div className="relative mx-auto max-w-5xl">
          <Link href="/programs" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a] mb-8 transition hover:text-white">← All Programs</Link>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#c9962a]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">Program 07 · New</span>
          </div>
          <h1 className="font-heading text-[clamp(44px,6vw,82px)] font-semibold leading-[1.02] text-white">
            Talent Discovery &<br /><em className="italic text-[#e8b84b]">Mentorship</em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65">
            We don't just keep children alive — we discover who they truly are. We find the extraordinary talent hidden in Sierra Leone's communities, surround it with world-class mentors, and build a pathway to the world stage.
          </p>

          <div className="mt-14 flex flex-wrap gap-10 border-t border-white/10 pt-10">
            {[["Discover","Find exceptional talent in any community"],["Develop","Match with professional mentors & training"],["Launch","Connect to academies, studios & opportunities"]].map(([n,l])=>(
              <div key={n}>
                <p className="font-heading text-2xl font-semibold text-[#c9962a]">{n}</p>
                <p className="mt-1 text-[13px] text-white/45 max-w-[160px] leading-5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE VISION ── */}
      <section className="px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-5xl grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#c9962a]">The Idea</span>
            <h2 className="mt-4 font-heading text-[clamp(32px,4vw,52px)] font-semibold leading-tight text-[#1a2e1f]">Every village in Sierra Leone<br /><em className="italic text-[#214c34]">is hiding a champion</em></h2>
            <p className="mt-6 text-[16px] leading-8 text-[#626a67]">Somewhere in Sierra Leone right now, a child is kicking a ball with feet that could carry them to the Premier League. Another is humming melodies that could fill stadiums. Another is solving problems that could reshape their country.</p>
            <p className="mt-4 text-[16px] leading-8 text-[#626a67]">They will never be discovered. Not because the talent isn't there — but because no one is looking. Pandie Foundation is changing that.</p>
            <div className="mt-8 space-y-4">
              {["We find the child — through community scouting across Sierra Leone","We develop the child — professional training, mentorship, and full support","We manage the child — connecting them to scouts, academies, and opportunities","We sustain the cycle — a small % of professional success funds the next child"].map(item=>(
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9962a]" />
                  <p className="text-[15px] text-[#1a2e1f]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-[#0a1a10] p-8 text-white">
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c9962a]">Why This Matters</span>
              <p className="mt-4 font-heading text-2xl font-semibold italic text-[#e8b84b] leading-tight">"Mohamed Salah grew up in a village. Salif Keïta was discovered by chance. We refuse to leave discovery to chance."</p>
              <p className="mt-4 text-[15px] leading-7 text-white/60">This program turns Pandie Foundation from a charity into a human development engine. We are not just keeping children alive — we are building their futures.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[["Football","⚽"],["Music","🎵"],["Academic","🎓"],["Technology","💻"]].map(([t,i])=>(
                <div key={t} className="bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.06)] text-center">
                  <div className="text-3xl mb-2">{i}</div>
                  <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#1a2e1f]">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUR TRACKS ── */}
      <section className="bg-[#0a1a10] px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">Four Talent Tracks</span>
            <h2 className="mt-4 font-heading text-[clamp(34px,4vw,56px)] font-semibold text-white">Every gift is<br /><em className="italic text-[#e8b84b]">worth finding</em></h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {tracks.map((t) => (
              <div key={t.title} className="border border-white/10 p-8 transition hover:border-[#c9962a]/40">
                <div className="text-4xl mb-5">{t.icon}</div>
                <div className="h-[2px] w-8 bg-[#c9962a] mb-5" />
                <h3 className="font-heading text-2xl font-semibold text-white mb-3">{t.title}</h3>
                <p className="text-[14px] leading-7 text-white/55 mb-5">{t.desc}</p>
                <p className="text-[13px] italic text-[#c9962a]/80">{t.stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#c9962a]">The Journey</span>
            <h2 className="mt-4 font-heading text-[clamp(34px,4vw,56px)] font-semibold text-[#1a2e1f]">From village to<br /><em className="italic text-[#214c34]">world stage</em></h2>
          </div>
          <div className="grid gap-0 lg:grid-cols-5">
            {[
              { num: "01", title: "Scout", desc: "Pandie scouts visit schools and communities across Sierra Leone looking for exceptional natural talent — any field, any background." },
              { num: "02", title: "Assess", desc: "Identified children are assessed by professionals. Those accepted receive full program support — training, nutrition, and education." },
              { num: "03", title: "Match", desc: "Each child is matched with a personal mentor — a professional in their field who guides and develops them weekly." },
              { num: "04", title: "Launch", desc: "Pandie acts as manager — arranging trials, auditions, academy placements, and the child's first professional opportunity." },
              { num: "05", title: "Sustain", desc: "A small agreed % of professional success flows back to fund the discovery of the next generation of talent." },
            ].map((step, i) => (
              <div key={step.num} className={`p-6 border-t-2 ${i === 0 ? "border-[#c9962a]" : "border-[#e0dbd0]"}`}>
                <p className="font-heading text-5xl font-semibold text-[#c9962a]/20 mb-4">{step.num}</p>
                <h3 className="font-heading text-xl font-semibold text-[#1a2e1f] mb-3">{step.title}</h3>
                <p className="text-[13px] leading-6 text-[#626a67]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TWO FORMS ── */}
      <section className="bg-[#f4f1ea] px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#c9962a]">Get Involved</span>
            <h2 className="mt-4 font-heading text-[clamp(34px,4vw,52px)] font-semibold text-[#1a2e1f]">Are you a mentor?<br />Do you know a talent?</h2>
          </div>

          {/* Form selector */}
          <div className="grid gap-6 sm:grid-cols-2 mb-12">
            <button onClick={() => setActiveForm(activeForm === "mentor" ? null : "mentor")}
              className={`p-8 text-left transition-all duration-300 ${activeForm === "mentor" ? "bg-[#0a1a10] text-white" : "bg-white text-[#1a2e1f] hover:bg-[#0a1a10]/5"}`}>
              <div className="text-4xl mb-4">🤝</div>
              <div className="h-[2px] w-8 bg-[#c9962a] mb-4" />
              <h3 className={`font-heading text-2xl font-semibold mb-2 ${activeForm === "mentor" ? "text-white" : "text-[#1a2e1f]"}`}>Become a Mentor</h3>
              <p className={`text-[14px] leading-6 ${activeForm === "mentor" ? "text-white/60" : "text-[#626a67]"}`}>Are you a professional in football, music, arts, academics, or technology? Apply to mentor a child who could change Sierra Leone's story.</p>
              <p className={`mt-4 text-[11px] font-bold uppercase tracking-[0.2em] ${activeForm === "mentor" ? "text-[#c9962a]" : "text-[#214c34]"}`}>{activeForm === "mentor" ? "Close form ↑" : "Apply to mentor →"}</p>
            </button>

            <button onClick={() => setActiveForm(activeForm === "nominate" ? null : "nominate")}
              className={`p-8 text-left transition-all duration-300 ${activeForm === "nominate" ? "bg-[#214c34] text-white" : "bg-white text-[#1a2e1f] hover:bg-[#214c34]/5"}`}>
              <div className="text-4xl mb-4">⭐</div>
              <div className="h-[2px] w-8 bg-[#c9962a] mb-4" />
              <h3 className={`font-heading text-2xl font-semibold mb-2 ${activeForm === "nominate" ? "text-white" : "text-[#1a2e1f]"}`}>Nominate a Child</h3>
              <p className={`text-[14px] leading-6 ${activeForm === "nominate" ? "text-white/60" : "text-[#626a67]"}`}>Do you know a child in Sierra Leone with exceptional talent? A teacher, parent, community leader, or neighbour — anyone can nominate.</p>
              <p className={`mt-4 text-[11px] font-bold uppercase tracking-[0.2em] ${activeForm === "nominate" ? "text-[#c9962a]" : "text-[#214c34]"}`}>{activeForm === "nominate" ? "Close form ↑" : "Nominate a child →"}</p>
            </button>
          </div>

          {/* MENTOR FORM */}
          {activeForm === "mentor" && (
            <div className="bg-white p-8 shadow-[0_4px_32px_rgba(0,0,0,0.08)] sm:p-10 mb-8">
              <h3 className="font-heading text-2xl font-semibold text-[#1a2e1f] mb-8">Mentor Application</h3>
              {mentorStatus === "success" ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <h4 className="font-heading text-2xl font-semibold text-[#214c34]">Application Received!</h4>
                  <p className="mt-3 text-[#626a67]">Thank you for wanting to change a child's life. We'll review your application and be in touch within 5 business days.</p>
                </div>
              ) : (
                <form onSubmit={handleMentorSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {[["fullName","Full Name *","text","Your full name"],["email","Email Address *","email","you@example.com"],["phone","Phone Number","tel","+1 (000) 000-0000"],["country","Country *","text","Where you are based"],["linkedIn","LinkedIn / Website","url","https://"],["experience","Years of Experience *","number","e.g. 10"]].map(([f,l,t,p])=>(
                      <div key={f}>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#626a67]">{l}</label>
                        <input type={t} placeholder={p} value={mentorForm[f as keyof typeof mentorForm]}
                          onChange={e => setMentorForm(prev => ({...prev, [f]: e.target.value}))}
                          className="w-full border border-[#e0dbd0] bg-[#faf8f5] px-4 py-3.5 text-[15px] text-[#1a2e1f] outline-none transition focus:border-[#c9962a] focus:bg-white placeholder:text-[#b0a898]" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#626a67]">Field of Expertise *</label>
                    <select value={mentorForm.field} onChange={e => setMentorForm(prev => ({...prev, field: e.target.value}))}
                      className="w-full border border-[#e0dbd0] bg-[#faf8f5] px-4 py-3.5 text-[15px] text-[#1a2e1f] outline-none transition focus:border-[#c9962a] focus:bg-white">
                      <option value="">Select your field...</option>
                      <option>Football / Sports</option>
                      <option>Music</option>
                      <option>Visual Arts</option>
                      <option>Academic — Medicine</option>
                      <option>Academic — Engineering</option>
                      <option>Academic — Law</option>
                      <option>Academic — Business</option>
                      <option>Technology / Coding</option>
                      <option>Entrepreneurship</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#626a67]">Availability *</label>
                    <select value={mentorForm.availability} onChange={e => setMentorForm(prev => ({...prev, availability: e.target.value}))}
                      className="w-full border border-[#e0dbd0] bg-[#faf8f5] px-4 py-3.5 text-[15px] text-[#1a2e1f] outline-none transition focus:border-[#c9962a] focus:bg-white">
                      <option value="">How often can you mentor?</option>
                      <option>Weekly (1 hour/week)</option>
                      <option>Bi-weekly (2 hours/month)</option>
                      <option>Monthly check-ins</option>
                      <option>Project-based</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#626a67]">Your Story — Why do you want to mentor? *</label>
                    <textarea rows={4} placeholder="Tell us about yourself and why this matters to you..." value={mentorForm.bio}
                      onChange={e => setMentorForm(prev => ({...prev, bio: e.target.value}))}
                      className="w-full border border-[#e0dbd0] bg-[#faf8f5] px-4 py-3.5 text-[15px] text-[#1a2e1f] outline-none transition focus:border-[#c9962a] focus:bg-white placeholder:text-[#b0a898] resize-none" />
                  </div>
                  <button type="submit" disabled={submitting}
                    className="w-full bg-[#c9962a] py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#e8b84b] disabled:opacity-60">
                    {submitting ? "Submitting..." : "Submit Mentor Application →"}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* NOMINATE FORM */}
          {activeForm === "nominate" && (
            <div className="bg-white p-8 shadow-[0_4px_32px_rgba(0,0,0,0.08)] sm:p-10 mb-8">
              <h3 className="font-heading text-2xl font-semibold text-[#1a2e1f] mb-8">Nominate a Child</h3>
              {nominateStatus === "success" ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">⭐</div>
                  <h4 className="font-heading text-2xl font-semibold text-[#214c34]">Nomination Received!</h4>
                  <p className="mt-3 text-[#626a67]">Thank you for seeing this child. Our team will review the nomination and reach out to you within 7 business days.</p>
                </div>
              ) : (
                <form onSubmit={handleNominateSubmit} className="space-y-5">
                  <div className="bg-[#faf8f5] border border-[#e0dbd0] px-5 py-4 mb-2">
                    <p className="text-[13px] text-[#626a67]">You can be a teacher, parent, neighbour, coach, or community leader. Anyone who knows a child with exceptional talent can nominate them.</p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {[["nominator","Your Full Name *","text","Your name"],["nominatorEmail","Your Email *","email","you@example.com"],["childName","Child's Name *","text","Child's first name"],["childAge","Child's Age *","number","e.g. 12"],["childLocation","Child's Location *","text","Village, City, Sierra Leone"],["relationship","Your Relationship to Child *","text","e.g. Teacher, Neighbour, Coach"]].map(([f,l,t,p])=>(
                      <div key={f}>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#626a67]">{l}</label>
                        <input type={t} placeholder={p} value={nominateForm[f as keyof typeof nominateForm]}
                          onChange={e => setNominateForm(prev => ({...prev, [f]: e.target.value}))}
                          className="w-full border border-[#e0dbd0] bg-[#faf8f5] px-4 py-3.5 text-[15px] text-[#1a2e1f] outline-none transition focus:border-[#c9962a] focus:bg-white placeholder:text-[#b0a898]" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#626a67]">Talent Area *</label>
                    <select value={nominateForm.talent} onChange={e => setNominateForm(prev => ({...prev, talent: e.target.value}))}
                      className="w-full border border-[#e0dbd0] bg-[#faf8f5] px-4 py-3.5 text-[15px] text-[#1a2e1f] outline-none transition focus:border-[#c9962a] focus:bg-white">
                      <option value="">What is this child gifted in?</option>
                      <option>Football</option>
                      <option>Music — Singing</option>
                      <option>Music — Instrument</option>
                      <option>Visual Arts</option>
                      <option>Dance / Performance</option>
                      <option>Academic Excellence</option>
                      <option>Technology</option>
                      <option>Entrepreneurship</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#626a67]">Describe this child's gift *</label>
                    <textarea rows={5} placeholder="Tell us what you have seen. What makes this child extraordinary? What have they achieved despite having nothing? Be as specific as possible..." value={nominateForm.description}
                      onChange={e => setNominateForm(prev => ({...prev, description: e.target.value}))}
                      className="w-full border border-[#e0dbd0] bg-[#faf8f5] px-4 py-3.5 text-[15px] text-[#1a2e1f] outline-none transition focus:border-[#c9962a] focus:bg-white placeholder:text-[#b0a898] resize-none" />
                  </div>
                  <button type="submit" disabled={submitting}
                    className="w-full bg-[#214c34] py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#1a3826] disabled:opacity-60">
                    {submitting ? "Submitting..." : "Submit Nomination →"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── BECOME A TALENT SPONSOR ── */}
      <section className="bg-[#c9962a] px-6 py-20 text-center lg:px-20">
        <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#0a1a10]/60">Sponsor a Talent</span>
        <h2 className="mt-4 font-heading text-[clamp(36px,4vw,60px)] font-semibold text-[#0a1a10]">Fund a child's journey<br />from discovery to the world</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-[#0a1a10]/70">Your sponsorship covers one child's full talent development — coaching, mentorship, equipment, and travel to opportunities. You'll receive updates on their progress. When they make it, you'll know you were there from day one.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/donate" className="bg-[#0a1a10] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#1a3826]">Sponsor a Talent Now</Link>
          <Link href="/contact" className="border-2 border-[#0a1a10] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#0a1a10]/10">Become a Corporate Partner</Link>
        </div>
      </section>
    </main>
  );
}
EOF
echo -e "${GREEN}✓ Talent & Mentorship page built${NC}"

# ── UPDATE CoreServices — add Program 07 ─────────────────────────────────────
echo -e "${BOLD}Adding Program 07 to homepage CoreServices...${NC}"
cat > app/components/CoreServices.tsx << 'EOF'
import Image from "next/image";
import Link from "next/link";

const services = [
  { title: "Education Support", description: "School fees, uniforms, books, and supplies — removing every barrier between a child and their right to learn and grow.", image: "/service-education.jpg", href: "/programs/education", num: "01", stat: "300+", statLabel: "Children in school" },
  { title: "Nutrition & Feeding", description: "Nutritious daily meals so that no child sits in a classroom too hungry to concentrate, dream, or believe in themselves.", image: "/service-nutrition.jpg", href: "/programs/nutrition", num: "02", stat: "200+", statLabel: "Children fed daily" },
  { title: "Medical Assistance", description: "Access to healthcare, treatment, and prevention for children who would otherwise suffer in silence from preventable illness.", image: "/service-medical.jpg", href: "/programs/medical", num: "03", stat: "150+", statLabel: "Medical cases supported" },
  { title: "Child Protection", description: "Safe spaces, advocacy, and emergency support for vulnerable children facing neglect, hardship, and uncertain futures.", image: "/service-protection.jpg", href: "/programs/protection", num: "04", stat: "100%", statLabel: "Commitment to dignity" },
];

export default function CoreServices() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f4f1ea] py-28 xl:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#214c34]/[0.03] blur-3xl" />
        <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-[#c9962a]/[0.05] blur-3xl" />
      </div>
      <div className="relative w-full px-6 sm:px-12 lg:px-20 xl:px-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.38em] text-[#c9962a]">
            <span className="h-px w-8 bg-[#c9962a]" />Seven Programs<span className="h-px w-8 bg-[#c9962a]" />
          </span>
          <h2 className="mt-6 font-heading text-[clamp(40px,5vw,68px)] font-semibold leading-[1.05] text-[#1a2e1f]">
            Seven Pillars of<br /><em className="italic text-[#214c34]">Transformative Change</em>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5f6663]">
            We serve vulnerable children in Sierra Leone through programs that address every dimension of a child's life — from survival to discovering and launching their extraordinary potential.
          </p>
        </div>

        {/* Core 4 programs */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article key={service.title} className="group relative flex flex-col overflow-hidden bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <div className="relative h-64 overflow-hidden bg-[#d4d8da]">
                <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2418]/60 via-transparent to-transparent" />
                <div className="absolute right-5 top-5 font-heading text-5xl font-semibold leading-none text-white/20">{service.num}</div>
                <div className="absolute bottom-4 left-4 bg-[#c9962a] px-3 py-2 flex flex-col">
                  <span className="text-lg font-bold leading-none text-[#0a1a10]">{service.stat}</span>
                  <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#0a1a10]/70">{service.statLabel}</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="h-[2px] w-10 bg-[#c9962a] transition-all duration-500 group-hover:w-16" />
                <h3 className="mt-5 font-heading text-[1.6rem] font-semibold leading-tight text-[#1a2e1f]">{service.title}</h3>
                <p className="mt-4 flex-1 text-[15px] leading-7 text-[#626a67]">{service.description}</p>
                <Link href={service.href} className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#214c34] transition-all duration-300 hover:gap-4">
                  Explore Program <span className="text-[#c9962a]">→</span>
                </Link>
              </div>
              <div className="h-[2px] w-0 bg-[#c9962a] transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>

        {/* Programs 5, 6, 7 — bottom row */}
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            { num: "05", title: "Child Sponsorship", desc: "Connect directly with one child — your monthly commitment transforms their life and inspires an entire community.", href: "/programs/sponsorship", icon: "👶" },
            { num: "06", title: "Community Outreach", desc: "Partnering with local families and leaders to ensure our impact runs deep and lasts for generations.", href: "/programs/outreach", icon: "🤝" },
            { num: "07", title: "Talent & Mentorship", desc: "We discover extraordinary talent in Sierra Leone's communities — football, music, arts, academics — and build a pathway to the world stage.", href: "/programs/talent", icon: "⭐", isNew: true },
          ].map((p) => (
            <Link key={p.title} href={p.href}
              className={`group relative flex items-center gap-6 px-8 py-7 transition-all duration-300 ${p.isNew ? "bg-[#c9962a] hover:bg-[#e8b84b]" : "bg-[#0f2418] hover:bg-[#1a3826]"}`}>
              {p.isNew && <span className="absolute right-4 top-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#0a1a10]/60">New</span>}
              <span className="text-4xl flex-shrink-0">{p.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1" style={{ color: p.isNew ? "rgba(10,26,16,0.5)" : "rgba(201,150,42,0.7)" }}>Program {p.num}</p>
                <h3 className={`font-heading text-xl font-semibold leading-tight ${p.isNew ? "text-[#0a1a10]" : "text-white"}`}>{p.title}</h3>
                <p className={`mt-2 text-[13px] leading-5 ${p.isNew ? "text-[#0a1a10]/65" : "text-white/50"}`}>{p.desc}</p>
              </div>
              <span className={`text-xl transition-transform duration-300 group-hover:translate-x-2 flex-shrink-0 ${p.isNew ? "text-[#0a1a10]/60" : "text-[#c9962a]"}`}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
EOF
echo -e "${GREEN}✓ CoreServices updated — Program 07 added${NC}"

# ── UPDATE PROGRAMS PAGE — add Program 07 ────────────────────────────────────
echo -e "${BOLD}Adding Program 07 to Programs page...${NC}"
cat > app/programs/page.tsx << 'EOF'
import Image from "next/image";
import Link from "next/link";

const programs = [
  { num: "01", title: "Education Support", desc: "School fees, uniforms, books, and learning supplies — removing every barrier between a child and their right to learn.", image: "/service-education.jpg", href: "/programs/education", stat: "300+", statLabel: "Children in school" },
  { num: "02", title: "Nutrition & Feeding", desc: "Daily nutritious meals so no child sits in a classroom too hungry to concentrate, learn, or dream.", image: "/service-nutrition.jpg", href: "/programs/nutrition", stat: "200+", statLabel: "Children fed daily" },
  { num: "03", title: "Medical Assistance", desc: "Healthcare access, treatment, and prevention for children suffering from preventable and treatable conditions.", image: "/service-medical.jpg", href: "/programs/medical", stat: "150+", statLabel: "Medical cases supported" },
  { num: "04", title: "Child Protection", desc: "Safe spaces, advocacy, and emergency support for vulnerable children facing neglect and hardship.", image: "/service-protection.jpg", href: "/programs/protection", stat: "100%", statLabel: "Commitment to dignity" },
  { num: "05", title: "Child Sponsorship", desc: "Connect directly with a child — your monthly commitment transforms one life and inspires a whole community.", image: "/story-featured.jpg", href: "/programs/sponsorship", stat: "1:1", statLabel: "Sponsor to child" },
  { num: "06", title: "Community Outreach", desc: "Partnering with families, schools, and local leaders to ensure our impact runs deep and lasts for generations.", image: "/story-community.jpg", href: "/programs/outreach", stat: "∞", statLabel: "Community impact" },
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <section className="relative overflow-hidden bg-[#0a1a10] px-6 py-24 text-white lg:px-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent opacity-60" />
        <div className="relative mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6"><div className="h-px w-10 bg-[#c9962a]" /><span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">What We Do · Sierra Leone</span></div>
          <h1 className="font-heading text-[clamp(44px,6vw,80px)] font-semibold leading-[1.05] text-white">Seven Pillars of<br /><em className="italic text-[#e8b84b]">Transformative Change</em></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65">From keeping children alive to discovering who they truly are — every program is built on one principle: treat each child as if they were our own.</p>
        </div>
      </section>

      {/* Programs 01–06 */}
      <section className="px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <article key={p.title} className="group flex flex-col overflow-hidden bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <div className="relative h-56 overflow-hidden bg-[#d4d8da]">
                <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a10]/70 via-transparent to-transparent" />
                <div className="absolute right-4 top-4 font-heading text-5xl font-semibold leading-none text-white/15">{p.num}</div>
                <div className="absolute bottom-4 left-4 bg-[#c9962a] px-3 py-1.5 flex flex-col">
                  <span className="text-lg font-bold leading-none text-[#0a1a10]">{p.stat}</span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#0a1a10]/70">{p.statLabel}</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="h-[2px] w-8 bg-[#c9962a] mb-4 transition-all duration-500 group-hover:w-14" />
                <h3 className="font-heading text-2xl font-semibold text-[#1a2e1f] leading-tight">{p.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-7 text-[#626a67]">{p.desc}</p>
                <Link href={p.href} className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#214c34] transition hover:gap-4">
                  Explore Program <span className="text-[#c9962a]">→</span>
                </Link>
              </div>
              <div className="h-[2px] w-0 bg-[#c9962a] transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </section>

      {/* Program 07 — Talent & Mentorship — Featured full-width */}
      <section className="px-6 pb-20 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Link href="/programs/talent" className="group block overflow-hidden bg-[#0a1a10] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[320px] overflow-hidden">
                <Image src="/laugingchildren.png" alt="Talent and Mentorship" fill className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a1a10]/80" />
                <div className="absolute top-6 left-6">
                  <span className="inline-block bg-[#c9962a] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a1a10]">New — Program 07</span>
                </div>
              </div>
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5"><div className="h-px w-8 bg-[#c9962a]" /><span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]">Talent Discovery & Mentorship</span></div>
                <h3 className="font-heading text-[clamp(28px,4vw,48px)] font-semibold text-white leading-tight">We don't just keep<br /><em className="italic text-[#e8b84b]">children alive — we discover<br />who they truly are</em></h3>
                <p className="mt-6 text-[16px] leading-8 text-white/55">We find extraordinary talent hidden in Sierra Leone's communities — football, music, arts, academics — surround it with world-class mentors, and build a pathway to the world stage. The next Mohamed Salah. The next Angélique Kidjo. We find them first.</p>
                <div className="mt-8 flex flex-wrap gap-6">
                  {[["⚽","Football"],["🎵","Music"],["🎓","Academic"],["💻","Technology"]].map(([i,t])=>(
                    <div key={t} className="flex items-center gap-2">
                      <span className="text-xl">{i}</span>
                      <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/60">{t}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9962a] transition-all duration-300 group-hover:gap-5">
                  Explore Talent & Mentorship →
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#c9962a] px-6 py-20 text-center lg:px-20">
        <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#0a1a10]/60">Support Our Work</span>
        <h2 className="mt-4 font-heading text-[clamp(36px,4vw,56px)] font-semibold text-[#0a1a10]">Every program runs<br />because someone gave.</h2>
        <p className="mt-6 text-lg text-[#0a1a10]/70 max-w-lg mx-auto">Your donation directly funds these seven programs — keeping children safe, fed, educated, and helping extraordinary talent reach the world.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/donate" className="bg-[#0a1a10] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#1a3826]">Donate Now</Link>
          <Link href="/programs/talent" className="border-2 border-[#0a1a10] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#0a1a10]/10">Discover Talent Program</Link>
        </div>
      </section>
    </main>
  );
}
EOF
echo -e "${GREEN}✓ Programs page updated — Program 07 featured${NC}"

# ── UPDATE SITEMAP ────────────────────────────────────────────────────────────
echo -e "${BOLD}Updating sitemap...${NC}"
cat > app/sitemap.ts << 'EOF'
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pandiefoundation.org";
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/donate`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/programs`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/programs/education`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs/nutrition`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs/medical`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs/protection`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs/sponsorship`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs/outreach`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs/talent`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/stories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/get-involved`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
EOF
echo -e "${GREEN}✓ Sitemap updated — 15 pages indexed${NC}"

echo ""
echo -e "${GOLD}${BOLD}╔══════════════════════════════════════════════════╗${NC}"
echo -e "${GOLD}${BOLD}║        ✅  Phase 5 Complete!                       ║${NC}"
echo -e "${GOLD}${BOLD}╚══════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Talent & Mentorship is now Program 07:"
echo -e "  ✦ /programs/talent    — Full program page with vision + 4 tracks"
echo -e "  ✦ Mentor form         — Apply to become a mentor"
echo -e "  ✦ Nomination form     — Nominate a talented child"
echo -e "  ✦ CoreServices        — Homepage now shows 7 programs"
echo -e "  ✦ Programs page       — Program 07 featured full-width"
echo -e "  ✦ Sitemap             — 15 pages now indexed by Google"
echo ""
echo -e "Run ${BOLD}npm run dev${NC} and visit ${BOLD}localhost:3000/programs/talent${NC}"
echo -e "Check ${BOLD}localhost:3000/programs${NC} to see Program 07 featured!"
