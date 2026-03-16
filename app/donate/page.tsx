"use client";

import { useMemo, useState } from "react";

import {
  CurrencyCode,
  DonationTab,
  FormData,
  ItemDonationFormData,
  VolunteerFormData,
  PartnerFormData,
  SponsorshipSelection,
  currencyConfig,
} from "./types";

import DonateHero from "../components/donate/DonateHero";
import WaysToGive from "../components/donate/WaysToGive";
import MoneyDonation from "../components/donate/MoneyDonation";
import ItemDonation from "../components/donate/ItemDonation";
import SponsorChild from "../components/donate/SponsorChild";
import VolunteerForm from "../components/donate/VolunteerForm";
import PartnerForm from "../components/donate/PartnerForm";
import TrustSection from "../components/donate/TrustSection";

export default function DonatePage() {
  // ── Tab ───────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<DonationTab>("money");

  // ── Sponsorship ───────────────────────────────────────────────────────────
  const [selectedSponsorship, setSelectedSponsorship] =
    useState<SponsorshipSelection>(null);

  // ── Money donation ────────────────────────────────────────────────────────
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [selectedAmount, setSelectedAmount] = useState<string>(
    String(currencyConfig.USD.amounts[1]),
  );
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Item donation ─────────────────────────────────────────────────────────
  const [itemFormData, setItemFormData] = useState<ItemDonationFormData>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    category: "",
    itemName: "",
    quantity: "",
    condition: "",
    deliveryMethod: "",
    preferredDate: "",
    description: "",
  });
  const [itemError, setItemError] = useState("");

  // ── Volunteer ─────────────────────────────────────────────────────────────
  const [volunteerFormData, setVolunteerFormData] = useState<VolunteerFormData>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    skills: "",
    availability: "",
    preferredRole: "",
    supportMode: "",
    experience: "",
    motivation: "",
  });
  const [volunteerError, setVolunteerError] = useState("");

  // ── Partner ───────────────────────────────────────────────────────────────
  const [partnerFormData, setPartnerFormData] = useState<PartnerFormData>({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    country: "",
    partnershipType: "",
    contributionType: "",
    estimatedSupport: "",
    message: "",
  });
  const [partnerError, setPartnerError] = useState("");

  // ── Derived ───────────────────────────────────────────────────────────────
  const currentCurrency = currencyConfig[currency];

  const impactItems = useMemo(
    () => [
      {
        amount: currentCurrency.amounts[0],
        title: "School Supplies",
        description: "Can help provide essential learning materials for a child.",
      },
      {
        amount: currentCurrency.amounts[1],
        title: "Nutrition Support",
        description: "Can help support meals and basic nutrition assistance.",
      },
      {
        amount: currentCurrency.amounts[2],
        title: "Medical Care",
        description: "Can help with school and basic medical support for a child.",
      },
      {
        amount: null,
        title: "Custom Giving",
        description: "Give any amount to support our mission and programs.",
      },
    ],
    [currentCurrency],
  );

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    setSelectedAmount(String(currencyConfig[newCurrency].amounts[1]));
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemInputChange = (
    field: keyof ItemDonationFormData,
    value: string,
  ) => {
    setItemFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleVolunteerInputChange = (
    field: keyof VolunteerFormData,
    value: string,
  ) => {
    setVolunteerFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePartnerInputChange = (
    field: keyof PartnerFormData,
    value: string,
  ) => {
    setPartnerFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const amountNumber = Number(selectedAmount);

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!selectedAmount.trim() || Number.isNaN(amountNumber) || amountNumber <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }

    const donationPayload = {
      donorName: formData.fullName.trim(),
      donorEmail: formData.email.trim(),
      donorMessage: formData.message.trim(),
      donationType: frequency,
      currency,
      amount: amountNumber,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationPayload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Donation failed.");

      alert("Donation request submitted successfully.");
      setFormData({ fullName: "", email: "", message: "" });
      setSelectedAmount(String(currencyConfig[currency].amounts[1]));
      setFrequency("one-time");
      setError("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleItemSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setItemError("");

    if (!itemFormData.fullName.trim()) {
      setItemError("Please enter your full name.");
      return;
    }
    if (!itemFormData.email.trim() || !itemFormData.email.includes("@")) {
      setItemError("Please enter a valid email address.");
      return;
    }
    if (!itemFormData.phone.trim()) {
      setItemError("Please enter your phone number.");
      return;
    }
    if (!itemFormData.country.trim()) {
      setItemError("Please enter your country.");
      return;
    }
    if (!itemFormData.city.trim()) {
      setItemError("Please enter your city.");
      return;
    }
    if (!itemFormData.category) {
      setItemError("Please choose a donation category.");
      return;
    }
    if (!itemFormData.itemName.trim()) {
      setItemError("Please enter the item name.");
      return;
    }
    if (!itemFormData.quantity.trim()) {
      setItemError("Please enter the quantity.");
      return;
    }
    if (!itemFormData.condition) {
      setItemError("Please choose the item condition.");
      return;
    }
    if (!itemFormData.deliveryMethod) {
      setItemError("Please choose a delivery method.");
      return;
    }

    alert("Item donation form completed. Backend submission is the next step.");
    setItemFormData({
      fullName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      category: "",
      itemName: "",
      quantity: "",
      condition: "",
      deliveryMethod: "",
      preferredDate: "",
      description: "",
    });
    setItemError("");
  };

  const handleVolunteerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVolunteerError("");

    if (!volunteerFormData.fullName.trim()) {
      setVolunteerError("Please enter your full name.");
      return;
    }
    if (
      !volunteerFormData.email.trim() ||
      !volunteerFormData.email.includes("@")
    ) {
      setVolunteerError("Please enter a valid email address.");
      return;
    }
    if (!volunteerFormData.phone.trim()) {
      setVolunteerError("Please enter your phone number.");
      return;
    }
    if (!volunteerFormData.country.trim()) {
      setVolunteerError("Please enter your country.");
      return;
    }
    if (!volunteerFormData.preferredRole) {
      setVolunteerError("Please choose a preferred role.");
      return;
    }
    if (!volunteerFormData.availability) {
      setVolunteerError("Please choose your availability.");
      return;
    }
    if (!volunteerFormData.supportMode) {
      setVolunteerError("Please choose how you want to support.");
      return;
    }

    alert("Volunteer form completed. Backend submission is the next step.");
    setVolunteerFormData({
      fullName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      skills: "",
      availability: "",
      preferredRole: "",
      supportMode: "",
      experience: "",
      motivation: "",
    });
    setVolunteerError("");
  };

  const handlePartnerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPartnerError("");

    if (!partnerFormData.organizationName.trim()) {
      setPartnerError("Please enter the organization name.");
      return;
    }
    if (!partnerFormData.contactPerson.trim()) {
      setPartnerError("Please enter the contact person name.");
      return;
    }
    if (
      !partnerFormData.email.trim() ||
      !partnerFormData.email.includes("@")
    ) {
      setPartnerError("Please enter a valid email address.");
      return;
    }
    if (!partnerFormData.phone.trim()) {
      setPartnerError("Please enter your phone number.");
      return;
    }
    if (!partnerFormData.country.trim()) {
      setPartnerError("Please enter the country.");
      return;
    }
    if (!partnerFormData.partnershipType) {
      setPartnerError("Please choose a partnership type.");
      return;
    }
    if (!partnerFormData.contributionType) {
      setPartnerError("Please choose a contribution type.");
      return;
    }

    alert("Partner form completed. Backend submission is the next step.");
    setPartnerFormData({
      organizationName: "",
      contactPerson: "",
      email: "",
      phone: "",
      country: "",
      partnershipType: "",
      contributionType: "",
      estimatedSupport: "",
      message: "",
    });
    setPartnerError("");
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#1f2a1f]">
      <DonateHero />

      <WaysToGive activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "money" && (
        <MoneyDonation
          frequency={frequency}
          currency={currency}
          selectedAmount={selectedAmount}
          formData={formData}
          error={error}
          isSubmitting={isSubmitting}
          impactItems={impactItems}
          onFrequencyChange={setFrequency}
          onCurrencyChange={handleCurrencyChange}
          onAmountChange={setSelectedAmount}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      )}

      {activeTab === "items" && (
        <ItemDonation
          formData={itemFormData}
          error={itemError}
          onInputChange={handleItemInputChange}
          onSubmit={handleItemSubmit}
          onBack={() => setActiveTab("money")}
        />
      )}

      {activeTab === "sponsor" && (
        <SponsorChild
          selectedSponsorship={selectedSponsorship}
          onSelect={setSelectedSponsorship}
          onBack={() => setActiveTab("money")}
        />
      )}

      {activeTab === "volunteer" && (
        <VolunteerForm
          formData={volunteerFormData}
          error={volunteerError}
          onInputChange={handleVolunteerInputChange}
          onSubmit={handleVolunteerSubmit}
          onBack={() => setActiveTab("money")}
        />
      )}

      {activeTab === "partner" && (
        <PartnerForm
          formData={partnerFormData}
          error={partnerError}
          onInputChange={handlePartnerInputChange}
          onSubmit={handlePartnerSubmit}
          onBack={() => setActiveTab("money")}
        />
      )}

      <TrustSection />
    </main>
  );
}