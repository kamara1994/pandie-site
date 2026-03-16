export type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "CAD"
  | "AUD"
  | "NZD"
  | "CHF"
  | "SEK"
  | "NOK"
  | "DKK"
  | "PLN"
  | "TRY"
  | "SGD"
  | "HKD"
  | "JPY"
  | "CNY"
  | "THB"
  | "INR"
  | "AED"
  | "SAR"
  | "SLE"
  | "NGN"
  | "GHS"
  | "ZAR"
  | "KES";

export type FormData = {
  fullName: string;
  email: string;
  message: string;
};

export type DonationTab = "money" | "items" | "sponsor" | "volunteer" | "partner";

export type ItemDonationFormData = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  category: string;
  itemName: string;
  quantity: string;
  condition: string;
  deliveryMethod: string;
  preferredDate: string;
  description: string;
};

export type VolunteerFormData = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  skills: string;
  availability: string;
  preferredRole: string;
  supportMode: string;
  experience: string;
  motivation: string;
};

export type PartnerFormData = {
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  partnershipType: string;
  contributionType: string;
  estimatedSupport: string;
  message: string;
};

export type SponsorshipSelection = {
  childId: number;
  type: "monthly" | "full";
} | null;

export const currencyConfig: Record<
  CurrencyCode,
  {
    label: string;
    symbol: string;
    amounts: number[];
    customPlaceholder: string;
  }
> = {
  USD: { label: "US Dollar", symbol: "$", amounts: [25, 50, 100, 250], customPlaceholder: "50" },
  EUR: { label: "Euro", symbol: "€", amounts: [25, 50, 100, 250], customPlaceholder: "50" },
  GBP: { label: "British Pound", symbol: "£", amounts: [20, 50, 100, 200], customPlaceholder: "50" },
  CAD: { label: "Canadian Dollar", symbol: "C$", amounts: [25, 50, 100, 250], customPlaceholder: "50" },
  AUD: { label: "Australian Dollar", symbol: "A$", amounts: [25, 50, 100, 250], customPlaceholder: "50" },
  NZD: { label: "New Zealand Dollar", symbol: "NZ$", amounts: [25, 50, 100, 250], customPlaceholder: "50" },
  CHF: { label: "Swiss Franc", symbol: "CHF ", amounts: [25, 50, 100, 250], customPlaceholder: "50" },
  SEK: { label: "Swedish Krona", symbol: "kr ", amounts: [200, 500, 1000, 2000], customPlaceholder: "500" },
  NOK: { label: "Norwegian Krone", symbol: "kr ", amounts: [200, 500, 1000, 2000], customPlaceholder: "500" },
  DKK: { label: "Danish Krone", symbol: "kr ", amounts: [200, 500, 1000, 2000], customPlaceholder: "500" },
  PLN: { label: "Polish Zloty", symbol: "zł ", amounts: [100, 250, 500, 1000], customPlaceholder: "250" },
  TRY: { label: "Turkish Lira", symbol: "₺", amounts: [500, 1000, 2500, 5000], customPlaceholder: "1000" },
  SGD: { label: "Singapore Dollar", symbol: "S$", amounts: [50, 100, 250, 500], customPlaceholder: "100" },
  HKD: { label: "Hong Kong Dollar", symbol: "HK$", amounts: [200, 500, 1000, 2500], customPlaceholder: "500" },
  JPY: { label: "Japanese Yen", symbol: "¥", amounts: [3000, 5000, 10000, 25000], customPlaceholder: "5000" },
  CNY: { label: "Chinese Yuan", symbol: "¥", amounts: [200, 500, 1000, 2500], customPlaceholder: "500" },
  THB: { label: "Thai Baht", symbol: "฿", amounts: [500, 1000, 2500, 5000], customPlaceholder: "1000" },
  INR: { label: "Indian Rupee", symbol: "₹", amounts: [1000, 2500, 5000, 10000], customPlaceholder: "2500" },
  AED: { label: "UAE Dirham", symbol: "AED ", amounts: [100, 250, 500, 1000], customPlaceholder: "250" },
  SAR: { label: "Saudi Riyal", symbol: "SAR ", amounts: [100, 250, 500, 1000], customPlaceholder: "250" },
  SLE: { label: "Sierra Leone Leone", symbol: "Le", amounts: [500, 1000, 2500, 5000], customPlaceholder: "1000" },
  NGN: { label: "Nigerian Naira", symbol: "₦", amounts: [5000, 10000, 25000, 50000], customPlaceholder: "10000" },
  GHS: { label: "Ghanaian Cedi", symbol: "GH₵", amounts: [100, 250, 500, 1000], customPlaceholder: "250" },
  ZAR: { label: "South African Rand", symbol: "R", amounts: [250, 500, 1000, 2500], customPlaceholder: "500" },
  KES: { label: "Kenyan Shilling", symbol: "KSh", amounts: [1000, 2500, 5000, 10000], customPlaceholder: "2500" },
};

export const givingOptions: {
  id: DonationTab;
  title: string;
  description: string;
}[] = [
  {
    id: "money",
    title: "Donate Money",
    description: "Support education, nutrition, and medical care through secure financial giving.",
  },
  {
    id: "items",
    title: "Donate Items",
    description: "Give clothing, food, books, school materials, hygiene products, and other essentials.",
  },
  {
    id: "sponsor",
    title: "Sponsor an Individual Child",
    description: "Personally support one child through monthly or full sponsorship.",
  },
  {
    id: "volunteer",
    title: "Volunteer",
    description: "Offer your time, skills, and services to support children and community programs.",
  },
  {
    id: "partner",
    title: "Partner With Us",
    description: "Support as a business, church, school, or organization through strategic partnership.",
  },
];

export const itemCategories = [
  "Clothing",
  "Food",
  "Books",
  "School Supplies",
  "Medical Supplies",
  "Hygiene Products",
  "Shoes",
  "Baby Supplies",
  "Electronics",
  "Other",
];

export const itemConditions = ["New", "Like New", "Good", "Fair"];

export const deliveryMethods = ["Drop-off", "Pickup Request", "Ship to Foundation"];

export const volunteerRoles = [
  "Teaching / Tutoring",
  "Mentoring",
  "Medical Outreach",
  "Fundraising",
  "Graphic Design",
  "Web Development",
  "Social Media Support",
  "Photography / Media",
  "Event Support",
  "Logistics / Transport",
  "Other",
];

export const volunteerAvailabilityOptions = [
  "Weekdays",
  "Weekends",
  "Evenings",
  "Flexible",
  "Project-Based",
];

export const volunteerSupportModes = [
  "Remote",
  "In-Person",
  "Either Remote or In-Person",
];

export const partnershipTypes = [
  "Corporate Sponsorship",
  "School Partnership",
  "Church Partnership",
  "Nonprofit Collaboration",
  "Medical Partnership",
  "Food / Relief Partnership",
  "Scholarship Support",
  "Event Partnership",
  "Other",
];

export const contributionTypes = [
  "Funding",
  "Bulk Item Donations",
  "Scholarships",
  "Medical Supplies",
  "Food Support",
  "Technology Support",
  "Logistics Support",
  "Volunteer Team Support",
  "Other",
];

export const sponsoredChildren = [
  {
    id: 1,
    name: "Mariama",
    age: 9,
    location: "Bo, Sierra Leone",
    dream: "Wants to become a teacher",
    supportType: "Education Support",
    monthlyAmount: "$35/month",
    fullAmount: "$420/year",
    story:
      "Mariama loves reading and learning. She needs support for school materials, uniforms, and tuition assistance.",
  },
  {
    id: 2,
    name: "Abdul",
    age: 12,
    location: "Makeni, Sierra Leone",
    dream: "Wants to become a doctor",
    supportType: "Medical + Education Support",
    monthlyAmount: "$50/month",
    fullAmount: "$600/year",
    story:
      "Abdul is bright and determined. He needs ongoing support for school attendance and basic medical care.",
  },
  {
    id: 3,
    name: "Hawa",
    age: 7,
    location: "Freetown, Sierra Leone",
    dream: "Wants to become a nurse",
    supportType: "Nutrition Support",
    monthlyAmount: "$30/month",
    fullAmount: "$360/year",
    story:
      "Hawa is cheerful and curious. She needs nutrition assistance and school readiness support to keep growing strong.",
  },
  {
    id: 4,
    name: "Ibrahim",
    age: 11,
    location: "Kenema, Sierra Leone",
    dream: "Wants to become an engineer",
    supportType: "School + Care Support",
    monthlyAmount: "$40/month",
    fullAmount: "$480/year",
    story:
      "Ibrahim is passionate about learning and problem-solving. He needs support for education, clothing, and daily care essentials.",
  },
];