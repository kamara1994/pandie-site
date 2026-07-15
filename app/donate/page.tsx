"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/app/context/LanguageContext";
import DonateHero from "../components/donate/DonateHero";
import WaysToGive from "../components/donate/WaysToGive";
import MoneyDonation from "../components/donate/MoneyDonation";
import ItemDonation from "../components/donate/ItemDonation";
import SponsorChild from "../components/donate/SponsorChild";
import VolunteerForm from "../components/donate/VolunteerForm";
import PartnerForm from "../components/donate/PartnerForm";
import TrustSection from "../components/donate/TrustSection";
import {
  CurrencyCode, DonationTab, FormData, ItemDonationFormData,
  VolunteerFormData, PartnerFormData, SponsorshipSelection,
  currencyConfig, sponsoredChildren,
} from "./types";

const IMPACT_COPY = [
  { title: "Feed a Child", description: "Provides nutritious meals so a child can learn and grow strong." },
  { title: "School Support", description: "Covers books, uniforms, and supplies to keep a child in school." },
  { title: "Medical Care", description: "Funds treatment, checkups, and preventative care for a child in need." },
  { title: "Full Sponsorship", description: "Wraps a child in education, nutrition, and care for real, lasting change." },
];

const emptyMoney: FormData = {
  fullName: "", email: "", phone: "", message: "", anonymous: false, emailUpdates: false,
};
const emptyItem: ItemDonationFormData = {
  fullName: "", email: "", phone: "", country: "", city: "", category: "",
  itemName: "", quantity: "", condition: "", deliveryMethod: "", preferredDate: "", description: "",
};
const emptyVolunteer: VolunteerFormData = {
  fullName: "", email: "", phone: "", country: "", city: "", skills: "",
  availability: "", preferredRole: "", supportMode: "", experience: "", motivation: "",
};
const emptyPartner: PartnerFormData = {
  organizationName: "", contactPerson: "", email: "", phone: "", country: "",
  partnershipType: "", contributionType: "", estimatedSupport: "", message: "",
};

export default function DonatePage() {
  const { flat, lang } = useLang();
  const tr = (x: string) => (lang === "en" ? x : flat.get(x) ?? x);
  const [activeTab, setActiveTab] = useState<DonationTab>("money");

  // ── Money (Stripe) ────────────────────────────────────────────────
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [selectedAmount, setSelectedAmount] = useState<string>("50");
  const [money, setMoney] = useState<FormData>(emptyMoney);
  const [moneyError, setMoneyError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const impactItems = useMemo(() => {
    const amts = currencyConfig[currency].amounts;
    return IMPACT_COPY.map((c, i) => ({ amount: amts[i] ?? null, title: c.title, description: c.description }));
  }, [currency]);

  async function handleMoneySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMoneyError("");

    const amount = parseFloat(selectedAmount);
    if (!money.fullName.trim() && !money.anonymous) return setMoneyError(tr("Please enter your name, or choose to give anonymously."));
    if (!money.email.includes("@")) return setMoneyError(tr("Please enter a valid email for your receipt."));
    if (!amount || amount <= 0) return setMoneyError(tr("Please choose or enter a donation amount."));

    setSubmitting(true);
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount, currency, frequency,
          donorName: money.fullName, donorEmail: money.email,
          phone: money.phone, message: money.message,
          anonymous: money.anonymous, emailUpdates: money.emailUpdates,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || tr("Could not start checkout."));
      window.location.href = data.url;
    } catch (err) {
      setMoneyError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  // ── Inquiry forms (items / volunteer / partner) ───────────────────
  const [item, setItem] = useState<ItemDonationFormData>(emptyItem);
  const [volunteer, setVolunteer] = useState<VolunteerFormData>(emptyVolunteer);
  const [partner, setPartner] = useState<PartnerFormData>(emptyPartner);
  const [inquiryError, setInquiryError] = useState("");
  const [sent, setSent] = useState<DonationTab | null>(null);

  async function submitInquiry(kind: DonationTab, name: string, email: string, details: Record<string, string>) {
    setInquiryError("");
    if (!email.includes("@")) { setInquiryError("Please enter a valid email address."); return; }
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, name, email, details }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setSent(kind);
    } catch (err) {
      setInquiryError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  // ── Sponsorship ───────────────────────────────────────────────────
  const [sponsorship, setSponsorship] = useState<SponsorshipSelection>(null);
  function handleSponsorSelect(sel: SponsorshipSelection) {
    setSponsorship(sel);
    if (!sel) return;
    // Turn a chosen child into a pre-filled monthly gift on the money tab.
    const child = sponsoredChildren.find((c) => c.id === sel.childId);
    const monthly = child ? parseInt(child.monthlyAmount.replace(/[^0-9]/g, ""), 10) : 35;
    const full = child ? parseInt(child.fullAmount.replace(/[^0-9]/g, ""), 10) : 420;
    setCurrency("USD");
    setFrequency(sel.type === "monthly" ? "monthly" : "one-time");
    setSelectedAmount(String(sel.type === "monthly" ? monthly : full));
    setActiveTab("money");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const successBox = (msg: string) => (
    <section className="bg-[#f4f1ea] px-5 py-16 sm:px-6 sm:py-20 lg:px-20">
      <div className="mx-auto max-w-xl rounded-2xl border border-[#c9962a]/25 bg-white p-7 text-center shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0a1a10] text-2xl text-[#e8b84b]">✓</div>
        <h2 className="mt-6 font-heading text-3xl font-semibold text-[#214c34]">{tr("Thank you!")}</h2>
        <p className="mt-4 text-[15px] leading-7 text-[#5f6663]">{msg}</p>
        <button
          onClick={() => { setSent(null); setActiveTab("money"); }}
          className="mt-8 w-full bg-[#c9962a] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-[#0a1a10] transition hover:bg-[#e8b84b] sm:w-auto"
        >
          {tr("Back to giving")}
        </button>
      </div>
    </section>
  );

  return (
    <>
      <DonateHero />
      <WaysToGive activeTab={activeTab} onTabChange={(t) => { setActiveTab(t); setSent(null); }} />

      {activeTab === "money" && (
        <MoneyDonation
          frequency={frequency}
          currency={currency}
          selectedAmount={selectedAmount}
          formData={money}
          error={moneyError}
          isSubmitting={submitting}
          impactItems={impactItems}
          onFrequencyChange={setFrequency}
          onCurrencyChange={setCurrency}
          onAmountChange={setSelectedAmount}
          onInputChange={(f, v) => setMoney((s) => ({ ...s, [f]: v }))}
          onSubmit={handleMoneySubmit}
        />
      )}

      {activeTab === "items" && (sent === "items" ? successBox("Your item donation offer has been received. Our team will reach out to arrange the details.") : (
        <ItemDonation
          formData={item}
          error={inquiryError}
          onInputChange={(f, v) => setItem((s) => ({ ...s, [f]: v }))}
          onSubmit={(e) => { e.preventDefault(); submitInquiry("items", item.fullName, item.email, item as unknown as Record<string, string>); }}
          onBack={() => setActiveTab("money")}
        />
      ))}

      {activeTab === "sponsor" && (
        <SponsorChild
          selectedSponsorship={sponsorship}
          onSelect={handleSponsorSelect}
          onBack={() => setActiveTab("money")}
        />
      )}

      {activeTab === "volunteer" && (sent === "volunteer" ? successBox("Your volunteer application has been received. We're grateful — our team will be in touch soon.") : (
        <VolunteerForm
          formData={volunteer}
          error={inquiryError}
          onInputChange={(f, v) => setVolunteer((s) => ({ ...s, [f]: v }))}
          onSubmit={(e) => { e.preventDefault(); submitInquiry("volunteer", volunteer.fullName, volunteer.email, volunteer as unknown as Record<string, string>); }}
          onBack={() => setActiveTab("money")}
        />
      ))}

      {activeTab === "partner" && (sent === "partner" ? successBox("Thank you for your interest in partnering with us. Our partnerships team will reach out shortly.") : (
        <PartnerForm
          formData={partner}
          error={inquiryError}
          onInputChange={(f, v) => setPartner((s) => ({ ...s, [f]: v }))}
          onSubmit={(e) => { e.preventDefault(); submitInquiry("partner", partner.contactPerson || partner.organizationName, partner.email, partner as unknown as Record<string, string>); }}
          onBack={() => setActiveTab("money")}
        />
      ))}

      <TrustSection />
    </>
  );
}
