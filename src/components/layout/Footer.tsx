"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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

      {/* NEWSLETTER BANNER — floats above, centered with max-width */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 ">
  <div
    className="
      relative -top-10
      bg-white text-black rounded-3xl
      border 
      px-5 sm:px-8 lg:px-14 py-6
      flex flex-col lg:flex-row
      items-center lg:items-center
      justify-between
      gap-5
      max-w-5xl mx-auto
    "
  >
    {/* Title */}
    <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-red-600 text-center lg:text-left">
      Subscribe to our Newsletter
    </h3>

    {/* Input + Button */}
    <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 sm:gap-0">
      
      <input
        type="email"
        placeholder="Enter your email"
        className="
          w-full sm:w-64 md:w-72 lg:w-80
          border border-gray-300
          sm:border-r-0
          rounded-lg sm:rounded-l-lg sm:rounded-r-none
          px-5 py-3
          text-sm text-gray-700
          focus:outline-none
        "
      />

      <button
        className="
          bg-red-600 hover:bg-red-700 transition
          text-white text-sm font-bold
          px-6 py-3
          rounded-lg sm:rounded-l-none sm:rounded-r-lg
          whitespace-nowrap
        "
      >
        Subscribe Now
      </button>

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

            {/* ── COL 3 : Follow Us ── */}
            <div className="lg:col-span-2 relative right-8">
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
            <div className="sm:col-span-2 lg:col-span-5">
              <h4 className="text-[22px] font-bold text-white mb-6">Get in touch</h4>

              <div className="bg-[#464646] rounded-2xl p-5 sm:p-7 border border-white/5 shadow-xl">
                <div className="space-y-4">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text"  placeholder="Full Name"   className={inputClass} />
                    <input type="email" placeholder="Email ID"    className={inputClass} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </div>
      </section>

      {/* BOTTOM BAR */}
      <div className="bg-black/60 border-t border-white/10 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Gresham Global. All rights reserved.</p>
          <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
        </div>
      </div>

    </footer>
  );
}
