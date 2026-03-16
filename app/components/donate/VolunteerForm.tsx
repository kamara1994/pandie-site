"use client";

import {
  VolunteerFormData,
  volunteerRoles,
  volunteerAvailabilityOptions,
  volunteerSupportModes,
} from "../../donate/types";

type Props = {
  formData: VolunteerFormData;
  error: string;
  onInputChange: (field: keyof VolunteerFormData, value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
};

export default function VolunteerForm({
  formData,
  error,
  onInputChange,
  onSubmit,
  onBack,
}: Props) {
  return (
    <section className="px-5 py-16 lg:px-8 xl:px-12">
      <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[1fr_1fr]">

        {/* Left – info panel */}
        <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a017]">
            Volunteer With Us
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-[#214c34] sm:text-4xl">
            Give Your Time, Skills, and Heart
          </h2>

          <p className="mt-5 text-[17px] leading-8 text-[#5f6663]">
            Volunteers help us reach more children through education,
            outreach, care, media, fundraising, logistics, and community support.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {volunteerRoles.map((role) => (
              <div
                key={role}
                className="rounded-xl border border-[#e7dfd0] bg-[#fcfaf6] px-4 py-4 text-sm font-medium text-[#214c34]"
              >
                {role}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-[#e7dfd0] bg-[#fcfaf6] p-6">
            <h3 className="text-lg font-semibold text-[#214c34]">
              Volunteer opportunities can include
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#626a67]">
              <li>• Tutoring and mentoring children</li>
              <li>• Supporting medical or nutrition outreach</li>
              <li>• Graphic design, web, media, and storytelling help</li>
              <li>• Events, campaigns, fundraising, and logistics support</li>
            </ul>
          </div>
        </div>

        {/* Right – form */}
        <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-10">
          <h2 className="text-3xl font-semibold text-[#214c34] sm:text-4xl">
            Volunteer Form
          </h2>

          <p className="mt-5 text-[16px] leading-8 text-[#626a67]">
            Tell us how you would like to serve, and our team can reach out
            with the right next steps.
          </p>

          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => onInputChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => onInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => onInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => onInputChange("country", e.target.value)}
                  placeholder="Enter your country"
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => onInputChange("city", e.target.value)}
                  placeholder="Enter your city"
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Preferred Role
                </label>
                <select
                  value={formData.preferredRole}
                  onChange={(e) => onInputChange("preferredRole", e.target.value)}
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                >
                  <option value="">Select a role</option>
                  {volunteerRoles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Availability
                </label>
                <select
                  value={formData.availability}
                  onChange={(e) => onInputChange("availability", e.target.value)}
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                >
                  <option value="">Select availability</option>
                  {volunteerAvailabilityOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                  Support Mode
                </label>
                <select
                  value={formData.supportMode}
                  onChange={(e) => onInputChange("supportMode", e.target.value)}
                  className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
                >
                  <option value="">Select support mode</option>
                  {volunteerSupportModes.map((mode) => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                Skills
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => onInputChange("skills", e.target.value)}
                placeholder="Example: teaching, photography, medical support, web design"
                className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                Experience
              </label>
              <textarea
                value={formData.experience}
                onChange={(e) => onInputChange("experience", e.target.value)}
                placeholder="Briefly describe any relevant experience"
                rows={4}
                className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[#214c34]">
                Why You Want to Help
              </label>
              <textarea
                value={formData.motivation}
                onChange={(e) => onInputChange("motivation", e.target.value)}
                placeholder="Tell us why you want to volunteer with Pandie Foundation"
                rows={5}
                className="w-full rounded-xl border border-[#d6d2c8] bg-white px-4 py-4 text-[#1f2a1f] outline-none transition placeholder:text-[#8b8f8c] focus:border-[#5a7d5d] focus:ring-2 focus:ring-[#5a7d5d]/15"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="rounded-xl border border-[#e7dfd0] bg-[#fcfaf6] p-4 text-sm text-[#5f6663]">
              <p className="font-semibold text-[#214c34]">How volunteering works</p>
              <div className="mt-3 space-y-2">
                <p>1. Submit your volunteer interest form</p>
                <p>2. Our team reviews your skills and availability</p>
                <p>3. We contact you with the best fit opportunity</p>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#d4a017] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#173325] transition hover:opacity-90"
            >
              Submit Volunteer Form
            </button>
          </form>

          <button
            type="button"
            onClick={onBack}
            className="mt-6 inline-block text-sm font-semibold uppercase tracking-[0.14em] text-[#214c34] transition hover:text-[#d4a017]"
          >
            ← Back to Donate Money
          </button>
        </div>
      </div>
    </section>
  );
}