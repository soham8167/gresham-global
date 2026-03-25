"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const SERVICE_OPTIONS = [
  { value: "Research & Assessment",     label: "Research & Assessment" },
  { value: "In-Country Representation", label: "In-Country Representation" },
  { value: "Academic Collaborations",   label: "Academic Collaborations" },
  { value: "Admissions Compliance",     label: "Admissions Compliance" },
  { value: "Strategic Marketing",       label: "Strategic Marketing" },
  { value: "Operational Support",       label: "Operational Support" },
  { value: "Others",                    label: "Others" },
];

type StatusState = { type: "success" | "error"; text: string } | null;

function StatusMessage({ status }: { status: StatusState }) {
  if (!status) return null;
  return (
    <p className={`text-sm font-medium mt-1 ${status.type === "success" ? "text-green-400" : "text-red-400"}`}>
      {status.type === "success" ? "✓ " : "✕ "}{status.text}
    </p>
  );
}

const page = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    designation: "",
    organisation: "",
    message: "",
  });

  // ── Multi-select state ──
  const [servicesOpen, setServicesOpen]         = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const servicesRef = useRef<HTMLDivElement>(null);

  // ── Submit state ──
  const [contactLoading, setContactLoading] = useState(false);
  const [contactStatus,  setContactStatus]  = useState<StatusState>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleService = (value: string) =>
    setSelectedServices((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  const servicesLabel =
    selectedServices.length === 0
      ? "Select Services"
      : SERVICE_OPTIONS.filter((o) => selectedServices.includes(o.value))
          .map((o) => o.label)
          .join(", ");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactStatus(null);
    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...formData, services: selectedServices }),
      });
      const data = await res.json();
      if (res.ok) {
        setContactStatus({ type: "success", text: "Message sent!" });
        setFormData({ fullName: "", email: "", designation: "", organisation: "", message: "" });
        setSelectedServices([]);
        setTimeout(() => setContactStatus(null), 3000);
      } else {
        setContactStatus({ type: "error", text: data.error || "Submission failed." });
      }
    } catch {
      setContactStatus({ type: "error", text: "Network error. Please try again." });
    } finally {
      setContactLoading(false);
    }
  };

  const inputClass =
    "w-full bg-[#2e2e2e] text-white placeholder-gray-400 text-sm px-4 py-3 rounded-lg outline-none focus:ring-1 focus:ring-red-500 transition";

  return (
    <section>

      {/* ── Banner ── */}
      <div className="relative w-full h-62.5 sm:h-80 md:h-100 lg:h-112.5 overflow-hidden">
        <Image
          src="/images/about/about-bannerimg.webp"
          alt="About Banner"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
            <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-28 -ml-9 leading-tight">
              Contact Us
            </h1>
          </div>
        </div>
      </div>

      {/* ── Contact Section ── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-2">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-start">

            {/* ── COL 1: Contact Info ── */}
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Gresham Global
              </h2>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-22 h-22 rounded-xl bg-white flex items-center justify-center shrink-0">
                  <Image
                    src="/images/contact/Group1.png"
                    alt="Address"
                    width={62}
                    height={42}
                    className="object-contain"
                  />
                </div>
                <p className="text-[15px] text-gray-700 leading-relaxed font-medium hover:text-red-600">
                  806 - 808, The Epicentre,<br />
                  Wadhwa, Off Eastern<br />
                  Freeway, Chembur,<br />
                  Mumbai - 400 088,<br />
                  Maharashtra, INDIA
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="w-22 h-22 rounded-xl bg-white flex items-center justify-center shrink-0">
                  <Image
                    src="/images/contact/icon2.svg"
                    alt="Phone"
                    width={62}
                    height={42}
                    className="object-contain"
                  />
                </div>
                <span className="text-[15px] text-gray-700 font-medium hover:text-red-600">+91 9773911384</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-22 h-22 rounded-xl bg-white flex items-center justify-center shrink-0">
                  <Image
                    src="/images/contact/icon3.svg"
                    alt="Email"
                    width={62}
                    height={42}
                    className="object-contain"
                  />
                </div>
                <span className="text-[15px] text-gray-700 font-medium hover:text-red-600">contact@gresham.world</span>
              </div>
            </div>

            {/* ── COL 2: Google Map ── */}
            <div className="w-full h-90 sm:h-105 md:h-full min-h-95 rounded-2xl overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.360536425326!2d72.90795297466455!3d19.04787955285579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8ed89588c29%3A0xba83964829b13797!2sGresham%20Global%20consultancy%20LLP!5e0!3m2!1sen!2sin!4v1773127753408!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Gresham Global Location"
              />
            </div>

            {/* ── COL 3: Enquire Now Form ── */}
            <div className="bg-[#1e1e1e] rounded-2xl p-6 sm:p-7 lg:w-110">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-6">
                Enquire Now
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-2">

                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  disabled={contactLoading}
                  className={`${inputClass} disabled:opacity-60`}
                />
                <input
                  type="email"
                  placeholder="Email ID"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={contactLoading}
                  className={`${inputClass} disabled:opacity-60`}
                />
                <input
                  type="text"
                  placeholder="Designation"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  disabled={contactLoading}
                  className={`${inputClass} disabled:opacity-60`}
                />
                <input
                  type="text"
                  placeholder="Organisation"
                  value={formData.organisation}
                  onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                  disabled={contactLoading}
                  className={`${inputClass} disabled:opacity-60`}
                />

                {/* ── Multi-select Services Dropdown ── */}
                <div className="relative" ref={servicesRef}>
                  <button
                    type="button"
                    onClick={() => setServicesOpen((prev) => !prev)}
                    disabled={contactLoading}
                    className={`${inputClass} flex items-center justify-between text-left disabled:opacity-60`}
                  >
                    <span className={`truncate ${selectedServices.length === 0 ? "text-gray-400" : "text-white"}`}>
                      {servicesLabel}
                    </span>
                    <svg
                      width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5"
                      className={`shrink-0 ml-2 text-gray-400 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {servicesOpen && (
                    <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 bg-[#2e2e2e] border border-[#444] rounded-lg shadow-2xl overflow-hidden">
                      {SERVICE_OPTIONS.map((option) => {
                        const checked = selectedServices.includes(option.value);
                        return (
                          <label
                            key={option.value}
                            className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#3a3a3a] transition border-b border-[#3a3a3a] last:border-0"
                          >
                            <input
                              type="checkbox"
                              value={option.value}
                              checked={checked}
                              onChange={() => toggleService(option.value)}
                              className="w-4 h-4 rounded accent-red-600 cursor-pointer shrink-0"
                            />
                            <span className="text-[13.5px] text-gray-200">{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

                <textarea
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={contactLoading}
                  rows={4}
                  className={`${inputClass} resize-y disabled:opacity-60`}
                />

                <StatusMessage status={contactStatus} />

                <button
                  type="submit"
                  disabled={contactLoading}
                  className="w-fit bg-white hover:bg-gray-100 text-gray-900 text-sm font-extrabold px-8 py-3 rounded-lg transition-colors duration-300 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {contactLoading ? "Sending..." : "Submit"}
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

    </section>
  );
};

export default page;
