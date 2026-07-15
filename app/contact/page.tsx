"use client";
import { useState } from "react";
import { useT } from "../components/AutoTranslate";

function Tx({ children, className }: { children: string; className?: string }) {
  const t = useT(children);
  return <span className={className}>{t}</span>;
}

type ContactFormData = { fullName: string; email: string; phone: string; subject: string; message: string; };

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({ fullName: "", email: "", phone: "", subject: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // translated placeholders / option labels
  const phName = useT("Your full name");
  const phEmail = useT("you@example.com");
  const phMsg = useT("Tell us how you'd like to help or what you'd like to know...");
  const subjSelect = useT("Select a subject...");
  const subjDonation = useT("Donation Inquiry");
  const subjSponsor = useT("Child Sponsorship");
  const subjPartner = useT("Corporate Partnership");
  const subjVolunteer = useT("Volunteer Interest");
  const subjMedia = useT("Media & Press");
  const subjGeneral = useT("General Question");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setError("");
    if (!formData.fullName.trim()) { setError("Please enter your full name."); return; }
    if (!formData.email.trim() || !formData.email.includes("@")) { setError("Please enter a valid email address."); return; }
    if (!formData.subject.trim()) { setError("Please select a subject."); return; }
    if (!formData.message.trim()) { setError("Please enter your message."); return; }
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (!response.ok) throw new Error("Failed to send message.");
      setSuccess(true);
      setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" });
    } catch { setError("Something went wrong. Please try again."); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      <section className="relative overflow-hidden bg-[#0a1a10] px-6 py-24 text-white lg:px-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#c9962a]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]"><Tx>We'd Love to Hear From You</Tx></span>
          </div>
          <h1 className="font-heading text-[clamp(44px,6vw,80px)] font-semibold leading-[1.05] text-white">
            <Tx>Get In</Tx><br /><em className="italic text-[#e8b84b]"><Tx>Touch</Tx></em>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-white/65"><Tx>Whether you want to donate, partner, volunteer, or simply learn more — we are here and we would love to connect.</Tx></p>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9962a]"><Tx>Contact Information</Tx></span>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-[#1a2e1f]"><Tx>We answer every message personally.</Tx></h2>
            <p className="mt-4 text-[16px] leading-8 text-[#626a67]"><Tx>Our team reviews every inquiry. Expect a response within 1–2 business days.</Tx></p>

            <div className="mt-10 space-y-6">
              {[
                { icon: "✉️", label: "Email", value: "info@pandiefoundation.org", href: "mailto:info@pandiefoundation.org", translate: false },
                { icon: "📞", label: "Phone", value: "+1 (307) 257-0001", href: "tel:+13072570001", translate: false },
                { icon: "📍", label: "USA Office", value: "United States of America", href: null, translate: true },
                { icon: "🌍", label: "Operations", value: "Freetown, Sierra Leone", href: null, translate: true },
                { icon: "🕐", label: "Hours", value: "Mon–Fri · 9:00 AM – 5:00 PM EST", href: null, translate: true },
              ].map(({ icon, label, value, href, translate }) => (
                <div key={label} className="flex items-start gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#214c34] text-xl">{icon}</div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9962a]"><Tx>{label}</Tx></p>
                    {href ? <a href={href} className="mt-1 block text-[15px] font-semibold text-[#1a2e1f] transition hover:text-[#c9962a]">{value}</a> : <p className="mt-1 text-[15px] font-semibold text-[#1a2e1f]">{translate ? <Tx>{value}</Tx> : value}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 border-t border-[#1a2e1f]/10 pt-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#c9962a] mb-5"><Tx>Follow Our Mission</Tx></p>
              <div className="flex gap-3">
                {[
                  { label: "Facebook", href: "https://facebook.com/pandiefoundation" },
                  { label: "Instagram", href: "https://instagram.com/pandiefoundation" },
                  { label: "X / Twitter", href: "https://x.com/PandieFdn" },
                  { label: "TikTok", href: "https://tiktok.com/@pandiefoundation" },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#0a1a10] text-[11px] font-bold uppercase tracking-[0.14em] text-white/70 transition hover:text-[#c9962a]">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 shadow-[0_2px_30px_rgba(0,0,0,0.07)] sm:p-10">
            {success ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-5xl mb-6">✅</div>
                <h3 className="font-heading text-3xl font-semibold text-[#214c34]"><Tx>Message Sent!</Tx></h3>
                <p className="mt-4 text-[16px] leading-8 text-[#626a67]"><Tx>Thank you for reaching out. We'll respond within 1–2 business days.</Tx></p>
                <button onClick={() => setSuccess(false)} className="gold-cta mt-8 bg-[#c9962a] px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#e8b84b] hover:-translate-y-px hover:shadow-[0_6px_22px_rgba(201,150,42,0.45)]"><Tx>Send Another</Tx></button>
              </div>
            ) : (
              <>
                <h2 className="font-heading text-2xl font-semibold text-[#1a2e1f] mb-8"><Tx>Send Us a Message</Tx></h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {[
                      { field: "fullName" as const, label: "Full Name *", type: "text", placeholder: phName },
                      { field: "email" as const, label: "Email Address *", type: "email", placeholder: phEmail },
                    ].map(({ field, label, type, placeholder }) => (
                      <div key={field}>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#626a67]"><Tx>{label}</Tx></label>
                        <input type={type} placeholder={placeholder} value={formData[field]}
                          onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))}
                          className="w-full border border-[#e0dbd0] bg-[#faf8f5] px-4 py-3.5 text-[15px] text-[#1a2e1f] outline-none transition focus:border-[#c9962a] focus:bg-white placeholder:text-[#b0a898]" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#626a67]"><Tx>Phone (Optional)</Tx></label>
                    <input type="tel" placeholder="+1 (000) 000-0000" value={formData.phone}
                      onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full border border-[#e0dbd0] bg-[#faf8f5] px-4 py-3.5 text-[15px] text-[#1a2e1f] outline-none transition focus:border-[#c9962a] focus:bg-white placeholder:text-[#b0a898]" />
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#626a67]"><Tx>Subject *</Tx></label>
                    <select value={formData.subject} onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                      className="w-full border border-[#e0dbd0] bg-[#faf8f5] px-4 py-3.5 text-[15px] text-[#1a2e1f] outline-none transition focus:border-[#c9962a] focus:bg-white">
                      <option value="">{subjSelect}</option>
                      <option value="Donation Inquiry">{subjDonation}</option>
                      <option value="Child Sponsorship">{subjSponsor}</option>
                      <option value="Corporate Partnership">{subjPartner}</option>
                      <option value="Volunteer Interest">{subjVolunteer}</option>
                      <option value="Media & Press">{subjMedia}</option>
                      <option value="General Question">{subjGeneral}</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#626a67]"><Tx>Message *</Tx></label>
                    <textarea rows={5} placeholder={phMsg} value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      className="w-full border border-[#e0dbd0] bg-[#faf8f5] px-4 py-3.5 text-[15px] text-[#1a2e1f] outline-none transition focus:border-[#c9962a] focus:bg-white placeholder:text-[#b0a898] resize-none" />
                  </div>
                  {error && <p className="text-[13px] font-semibold text-red-600 bg-red-50 px-4 py-3"><Tx>{error}</Tx></p>}
                  <button type="submit" disabled={isSubmitting}
                    className="gold-cta w-full bg-[#c9962a] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a1a10] transition hover:bg-[#e8b84b] hover:shadow-[0_8px_28px_rgba(201,150,42,0.45)] disabled:opacity-60 disabled:cursor-not-allowed">
                    {isSubmitting ? <Tx>Sending...</Tx> : <Tx>Send Message →</Tx>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
