"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { navigation } from "@/config/navigation";
import { ChevronRight, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const inputClass =
    "w-full bg-[#4e4e4e] border border-[#666] rounded-xl px-5 py-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-gray-300 transition";

  return (
    <footer className="relative text-white overflow-visible">

      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/images/footer/footer-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* NEWSLETTER BANNER*/}
      <div className="relative z-10 ">
        <Container>
          <div className="
            relative -top-10
            bg-white text-black rounded-4xl
            border 
            shadow-[0_12px_48px_rgba(0,0,0,0.22)]
            px-25 py-5
            flex flex-col md:flex-row items-center justify-between gap-6
            max-w-5xl mx-auto 
          ">
            <h3 className="text-[22px] font-extrabold text-red-600 whitespace-nowrap">
              Subscribe to our Newsletter
            </h3>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-85 border border-gray-300 border-r-0 rounded-l-lg px-5 py-3.5 text-sm text-gray-700 focus:outline-none"
              />
              <button className="bg-red-600 hover:bg-red-700 transition text-white text-sm font-bold px-7 py-3.5 rounded-r-lg whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* MAIN FOOTER GRID*/}
      <Container className="pt-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-8 xl:gap-x-12">

          {/* ── COL 1 : About + Contact ── */}
          <div className="lg:col-span-3">
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
          <div className="lg:col-span-3">
            <h4 className="text-[15px] font-bold text-white mb-5">Quick Links</h4>

            <nav className="flex flex-col">
              {navigation.map((item) => {
                // Determine if this nav item is "active" based on current pathname
                const isActive =
                  // Exact match for home
                  (item.href === "/" && pathname === "/") ||
                  // Starts-with match for other pages (e.g. /publications, /events)
                  (item.href && item.href !== "/" && pathname.startsWith(item.href)) ||
                  // Or any child route matches (for About, Services, Media)
                  item.children?.some(
                    (child) =>
                      child.href === pathname ||
                      pathname.startsWith(child.href ?? "___")
                  );

                const isOpen = openDropdown === item.label;

                return (
                  <div key={item.label}>

                    {/* Items with a direct href and NO children */}
                    {item.href && !item.children ? (
                      <Link
                        href={item.href}
                        className={`
                          inline-flex items-center cursor-pointer
                          px-5 py-2 my-0.5 rounded-full w-fit
                          text-[14.5px] font-medium transition-all duration-150
                          ${isActive
                            ? "bg-white text-red-600 font-bold"
                            : "text-gray-200 hover:text-white"
                          }
                        `}
                      >
                        {item.label}
                      </Link>

                    ) : (
                      // Items with children — dropdown trigger
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className={`
                          inline-flex items-center gap-1.5 cursor-pointer
                          px-5 py-2 my-0.5 rounded-full w-fit
                          text-[14.5px] font-medium transition-all duration-150
                          ${isActive
                            ? "bg-white text-red-600 font-bold"
                            : "text-gray-200 hover:text-white"
                          }
                        `}
                      >
                        <span>{item.label}</span>
                        <ChevronRight
                          size={14}
                          className={`
                            shrink-0 transition-transform duration-200
                            ${isActive ? "text-red-500" : "text-gray-400"}
                            ${isOpen ? "rotate-90" : ""}
                          `}
                        />
                      </button>
                    )}

                    {/* White floating dropdown card */}
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
                              className={`
                                block px-5 py-3.5 text-[13px] transition
                                border-b border-gray-100 last:border-0
                                ${isChildActive
                                  ? "text-red-600 font-bold bg-gray-50"
                                  : "text-gray-800 hover:bg-gray-50"
                                }
                              `}
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

          {/*  Follow Us */}
          <div className="lg:col-span-2">
            <h4 className="text-[15px] font-bold text-white mb-6">Follow us</h4>
            <Link
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-7 hover:opacity-80 transition-opacity"
            >
              <Image src="/images/home/linkedinRound.webp" alt="LinkedIn" width={55} height={55} />
            </Link>
            <div>
              <Image src="/images/footer/offer.webp" alt="Great Place To Work Certified" width={120} height={170} />
            </div>
          </div>

          {/* ── COL 4 : Get in Touch Form ── */}
          <div className="lg:col-span-4">
            <h4 className="text-[22px] font-bold text-white mb-6">Get in touch</h4>

            <div className="bg-[#464646] rounded-2xl p-7 border border-white/5 shadow-xl">
              <div className="space-y-4">

                <div className="grid grid-cols-2 gap-4">
                  <input type="text"  placeholder="Full Name"   className={inputClass} />
                  <input type="email" placeholder="Email ID"    className={inputClass} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Designation"  className={inputClass} />
                  <input type="text" placeholder="Organisation" className={inputClass} />
                </div>

                <div className="relative">
                  <select className={`${inputClass} appearance-none pr-10 cursor-pointer`}>
                    <option value=""          className="bg-[#464646] text-gray-300">Select Services</option>
                    <option value="research"  className="bg-[#464646]">Research & Assessment</option>
                    <option value="rep"       className="bg-[#464646]">In-Country Representation</option>
                    <option value="collab"    className="bg-[#464646]">Academic Collaborations</option>
                    <option value="comply"    className="bg-[#464646]">Admission Compliance</option>
                    <option value="marketing" className="bg-[#464646]">Strategic Marketing</option>
                    <option value="ops"       className="bg-[#464646]">Operational Support</option>
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                      <path d="M1 1L6 6L11 1" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>

                <textarea rows={5} placeholder="Message" className={`${inputClass} resize-none`} />

                <div className="pt-2">
                  <button
                    type="button"
                    className="bg-white text-black font-bold text-[15px] px-12 py-3.5 rounded-full hover:bg-gray-100 active:scale-95 transition cursor-pointer"
                  >
                    Submit
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </Container>

      {/* BOTTOM BAR */}
      <div className="bg-black/60 border-t border-white/10 py-5">
        <Container className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Gresham Global. All rights reserved.</p>
          <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
        </Container>
      </div>

    </footer>
  );
}
