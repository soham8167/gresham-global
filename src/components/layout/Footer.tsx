
"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/config/navigation";
import { ChevronRight, Phone, Mail, MapPin } from "lucide-react";

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
    <p className={`text-sm font-medium mt-2 ${status.type === "success" ? "text-green-400" : "text-red-400"}`}>
      {status.type === "success" ? "✓ " : "✕ "}{status.text}
    </p>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // ── Multi-select ──
  const [servicesOpen, setServicesOpen]         = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const servicesRef = useRef<HTMLDivElement>(null);

  // ── Newsletter ──
  const [newsletterEmail,   setNewsletterEmail]   = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterStatus,  setNewsletterStatus]  = useState<StatusState>(null);

  // ── Contact form ──
  const [contactForm, setContactForm] = useState({
    fullName: "", email: "", designation: "", organisation: "", message: "",
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactStatus,  setContactStatus]  = useState<StatusState>(null);

  // Close services dropdown on outside click
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

  const toggleDropdown = (label: string) =>
    setOpenDropdown(openDropdown === label ? null : label);

  const servicesLabel =
    selectedServices.length === 0
      ? "Select Services"
      : SERVICE_OPTIONS.filter((o) => selectedServices.includes(o.value))
          .map((o) => o.label)
          .join(", ");

  // ── Newsletter submit ──
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterLoading(true);
    setNewsletterStatus(null);
    try {
      const res  = await fetch("/api/newsletter", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewsletterStatus({ type: "success", text: "Subscribed successfully! Check your inbox." });
        setNewsletterEmail("");
         setTimeout(() => setNewsletterStatus(null), 3000);
      } else {
        setNewsletterStatus({ type: "error", text: data.error || "Subscription failed." });
      }
    } catch {
      setNewsletterStatus({ type: "error", text: "Network error. Please try again." });
    } finally {
      setNewsletterLoading(false);
    }
  };

  // ── Contact form submit ──
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactStatus(null);
    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...contactForm, services: selectedServices }),
      });
      const data = await res.json();
      if (res.ok) {
        setContactStatus({ type: "success", text: "Message sent! We'll get back to you soon." });
        setContactForm({ fullName: "", email: "", designation: "", organisation: "", message: "" });
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
    "w-full bg-[#4e4e4e] border border-[#666] rounded-xl px-5 py-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-gray-300 transition";

  return (
    <footer className="relative text-white overflow-visible">

      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/images/footer/footer.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* NEWSLETTER BANNER */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="relative -top-10 bg-white text-black rounded-3xl border px-5 sm:px-8 lg:px-14 py-6 flex flex-col lg:flex-row items-center justify-between gap-5 max-w-5xl mx-auto">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-red-600 text-center lg:text-left">
            Subscribe to our Newsletter
          </h3>
          <div className="flex flex-col w-full lg:w-auto">
            <form
              name="newsletter-form"
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 sm:gap-0"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                disabled={newsletterLoading}
                className="w-full sm:w-64 md:w-72 lg:w-80 border border-gray-300 sm:border-r-0 rounded-lg sm:rounded-l-lg sm:rounded-r-none px-5 py-3 text-sm text-gray-700 focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={newsletterLoading}
                className="bg-red-600 hover:bg-red-700 transition text-white text-sm font-bold px-6 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {newsletterLoading ? "Subscribing..." : "Subscribe Now"}
              </button>
            </form>
            <StatusMessage status={newsletterStatus} />
          </div>
        </div>
      </div>

      {/* MAIN FOOTER CONTENT */}
      <section className="px-4 sm:px-6 lg:px-8 pt-0 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-6 xl:gap-x-10">

            {/* ── COL 1 : About + Contact ── */}
            <div className="sm:col-span-2 lg:col-span-3">
              <p className="text-gray-300 text-[13.5px] leading-6">
                We are an in-country representative specialist firm for{" "}
                <strong className="text-white">higher education institutions</strong>{" "}
                looking to expand their reach in{" "}
                <strong className="text-white">South Asia.</strong>
              </p>
              <h4 className="mt-8 mb-5 text-[15px] font-bold text-white">Contact Us</h4>
              <ul className="space-y-4 text-[13.5px] text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="shrink-0 w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center">
                    <Phone size={15} className="text-gray-300" />
                  </span>
                  <span>+91 97739 11384</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="shrink-0 w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center">
                    <Mail size={15} className="text-gray-300" />
                  </span>
                  <span>contact@gresham.world</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center mt-0.5">
                    <MapPin size={15} className="text-gray-300" />
                  </span>
                  <address className="not-italic leading-6">
                    806 - 808, The Epicentre,<br />
                    Wadhwa, Off Eastern Freeway,<br />
                    Chembur, Mumbai - 400 088,<br />
                    Maharashtra, INDIA.
                  </address>
                </li>
              </ul>
            </div>

            {/* ── COL 2 : Quick Links ── */}
            <div className="lg:col-span-2">
              <h4 className="text-[15px] font-bold text-white mb-5">Quick Links</h4>
              <nav className="flex flex-col">
                {navigation.map((item) => {
                  const isActive =
                    (item.href === "/" && pathname === "/") ||
                    (item.href && item.href !== "/" && pathname.startsWith(item.href)) ||
                    item.children?.some(
                      (child) =>
                        child.href === pathname ||
                        pathname.startsWith(child.href ?? "___")
                    );
                  const isOpen = openDropdown === item.label;
                  return (
                    <div key={item.label}>
                      {item.href && !item.children ? (
                        <Link
                          href={item.href}
                          className={`inline-flex items-center cursor-pointer px-5 py-2 my-0.5 rounded-full w-fit text-[14.5px] font-medium transition-all duration-150 ${
                            isActive ? "bg-white text-red-600 font-bold" : "text-gray-200 hover:text-white"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          onClick={() => toggleDropdown(item.label)}
                          className={`inline-flex items-center gap-1.5 cursor-pointer px-5 py-2 my-0.5 rounded-full w-fit text-[14.5px] font-medium transition-all duration-150 ${
                            isActive ? "bg-white text-red-600 font-bold" : "text-gray-200 hover:text-white"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronRight
                            size={14}
                            className={`shrink-0 transition-transform duration-200 ${isActive ? "text-red-500" : "text-gray-400"} ${isOpen ? "rotate-90" : ""}`}
                          />
                        </button>
                      )}
                      {item.children && isOpen && (
                        <div className="ml-3 mb-2 bg-white rounded-2xl shadow-2xl overflow-hidden w-52 z-50">
                          {item.children.map((child) => {
                            const isChildActive =
                              child.href === pathname ||
                              pathname.startsWith(child.href ?? "___");
                            return (
                              <Link
                                key={child.label}
                                href={child.href!}
                                onClick={() => setOpenDropdown(null)}
                                className={`block px-5 py-3.5 text-[13px] transition border-b border-gray-100 last:border-0 ${
                                  isChildActive ? "text-red-600 font-bold bg-gray-50" : "text-gray-800 hover:bg-gray-50"
                                }`}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* ── COL 3 : Follow Us ── */}
            <div className="lg:col-span-2 relative">
              <h4 className="text-[15px] font-bold text-white mb-6">Follow us</h4>
              <Link href="" target="_blank" rel="noopener noreferrer" className="inline-block mb-7 hover:opacity-80 transition-opacity">
                <Image src="/images/home/linkedinRound.webp" alt="LinkedIn" width={55} height={55} />
              </Link>
              <div>
                <Image src="/images/footer/offer.webp" alt="Great Place To Work Certified" width={120} height={170} />
              </div>
            </div>

            {/* ── COL 4 : Get in Touch Form ── */}
            <div className="sm:col-span-2 lg:col-span-5">
              <h4 className="text-[22px] font-bold text-white mb-6">Get in touch</h4>
              <form name="contact-form" onSubmit={handleContactSubmit}>
                <div className="bg-[#464646] rounded-2xl p-5 sm:p-7 border border-white/5 shadow-xl">
                  <div className="space-y-4">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text" placeholder="Full Name" required
                        value={contactForm.fullName}
                        onChange={(e) => setContactForm((p) => ({ ...p, fullName: e.target.value }))}
                        disabled={contactLoading}
                        className={`${inputClass} disabled:opacity-60`}
                      />
                      <input
                        type="email" placeholder="Email ID" required
                        value={contactForm.email}
                        onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))}
                        disabled={contactLoading}
                        className={`${inputClass} disabled:opacity-60`}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text" placeholder="Designation"
                        value={contactForm.designation}
                        onChange={(e) => setContactForm((p) => ({ ...p, designation: e.target.value }))}
                        disabled={contactLoading}
                        className={`${inputClass} disabled:opacity-60`}
                      />
                      <input
                        type="text" placeholder="Organisation"
                        value={contactForm.organisation}
                        onChange={(e) => setContactForm((p) => ({ ...p, organisation: e.target.value }))}
                        disabled={contactLoading}
                        className={`${inputClass} disabled:opacity-60`}
                      />
                    </div>

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
                          width="12" height="7" viewBox="0 0 12 7" fill="none"
                          className={`shrink-0 ml-2 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                        >
                          <path d="M1 1L6 6L11 1" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      {servicesOpen && (
                        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 bg-[#2e2e2e] border border-[#555] rounded-xl shadow-2xl overflow-hidden">
                          {SERVICE_OPTIONS.map((option) => {
                            const checked = selectedServices.includes(option.value);
                            return (
                              <label
                                key={option.value}
                                className="flex items-center gap-3 px-5 py-3.5 cursor-pointer hover:bg-[#3a3a3a] transition border-b border-[#444] last:border-0"
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
                      rows={5} placeholder="Message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm((p) => ({ ...p, message: e.target.value }))}
                      disabled={contactLoading}
                      className={`${inputClass} resize-none disabled:opacity-60`}
                    />

                    <StatusMessage status={contactStatus} />

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={contactLoading}
                        className="bg-white text-black font-bold text-[15px] px-12 py-3.5 rounded-full hover:bg-gray-100 active:scale-95 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {contactLoading ? "Sending..." : "Submit"}
                      </button>
                    </div>

                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* BOTTOM BAR */}
      <div className="bg-black/60 border-t border-white/10 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-400">
          <p className="text-lg text-white">© {new Date().getFullYear()} Gresham Global. All rights reserved.</p>
          <Link href="/privacy-policy" className="text-white transition text-lg">Privacy Policy</Link>
        </div>
      </div>

    </footer>
  );
}