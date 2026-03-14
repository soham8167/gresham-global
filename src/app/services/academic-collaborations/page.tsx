"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"


const services = [
  'Research & Assessment',
  'In-Country Representation',
  'Academic Collaborations',
  ' Admissions Compliance',
  'Strategic Marketing',
  ' Operational Support',
  'Others',
]

// ── All 6 services with their routes 
const allServices = [
  { title: "Research & Assessment",      href: "/services/research-assessment" },
  { title: "In-Country Representation",  href: "/services/in-country-representation" },
  { title: "Operational Support",        href: "/services/operational-support" },
  { title: "Academic Collaborations",    href: "/services/academic-collaborations" },
  { title: "Admission & Compliance",     href: "/services/admission-compliance" },
  { title: "Strategic Marketing",        href: "/services/strategic-marketing" },
]

const serviceCards = [
  {
    icon: "/images/services/markeiconra.svg",
    title: "Market Analysis & Research",
    description:
      "Understanding the intricacies of the South Asian education market requires more than surface-level insights. Our in-depth, data-driven research uncovers critical trends, student preferences, and emerging opportunities, providing a comprehensive view of the market's potential and challenges. By conducting competitive benchmarking, we highlight your institution's positioning against key players, equipping you with actionable insights to navigate this dynamic region effectively.",
  },
  {
    icon: "/images/services/fi_9670967.svg",
    title: "Go-To-Market Strategy",
    description:
      "Strategically establish your institution's presence in South Asia with a bespoke roadmap. We help you navigate the region's geographic and cultural diversity, pinpoint high-potential markets, and identify ideal partners. This approach positions your university for long-term success and impactful engagement.",
  },
  {
    icon: "/images/services/fi_3207533.svg",
    title: "Legal & Regulatory Guidance",
    description:
      "Operating within South Asia's complex legal and regulatory environments requires expert support. Our experienced team provides comprehensive guidance on local regulations, contracts, and institutional policies, ensuring your operations are fully aligned with regional requirements. By simplifying the intricacies of compliance and mitigating risks, we empower your institution to function confidently and effectively within the framework of local laws.",
  },
  {
    icon: "/images/services/financialcomicon.svg",
    title: "Financial Compliance",
    description:
      "Navigating South Asia's complex regulatory landscape requires meticulous financial compliance. Our expertise ensures your institution adheres to local financial regulations while upholding global standards of transparency and efficiency.",
  },
  {
    icon: "/images/services/financialcomicon.svg",
    title: "Financial Compliancee",
    description:
      "Navigating South Asia's complex regulatory landscape requires meticulous financial compliance. Our expertise ensures your institution adheres to local financial regulations while upholding global standards of transparency and efficiency .",
  },
]

const page = () => {
  const pathname = usePathname()
  const [formOpen, setFormOpen] = useState(false)
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      designation: '',
      organisation: '',
      service: '',
      message: '',
    })
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // backend integration to be added later
    }

  // Filter out the current page so it never shows in the explore list
  const otherServices = allServices.filter((s) => s.href !== pathname)

  return (
    <section>

      {/* ── Hero Banner ── */}
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
            <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-6xl mt-14 leading-tight">
              Academic
              <br />
             Collaborations
            </h1>
          </div>
        </div>
      </div>

      {/* ── Intro Section ── */}
      <div className="w-full bg-white py-10 md:py-14 lg:py-16 px-6 md:px-12">
        <div className="max-w-8xl mx-auto text-center">
          <h2 className="font-extrabold text-black text-3xl sm:text-4xl md:text-[2.6rem] lg:text-5xl leading-tight mb-5">
            Shaping Your Academic Partnerships
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-5xl mx-auto">
            Expanding your global footprint through Academic Partnerships and Transnational Education (TNE) initiatives requires
             a strategic vision and a deep understanding of both local and international academic landscapes.
              At Gresham Global, we empower institutions to form meaningful alliances that align with
               their academic strengths and long-term objectives, fostering impactful and sustainable growth.
          </p>
        </div>
      </div>

      {/* ── Service Cards ── */}
      <div className="w-full bg-white pb-14 md:pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {serviceCards.map(({ icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-[#C0193A]/30 bg-white p-7 sm:p-9 flex flex-col gap-5 transition-shadow duration-300 hover:shadow-[0_4px_32px_0_rgba(192,25,58,0.12)]"
            >
              <div className="shrink-0">
                <Image
                  src={icon}
                  alt={title}
                  height={80}
                  width={80}
                  className="w-17.5 h-17.5 sm:w-20 sm:h-20"
                />
              </div>
              <h3 className="font-bold text-[#C0193A] text-xl sm:text-[1.3rem] leading-snug">
                {title}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Explore Our Other Services ── */}
      <div className="w-full bg-[#f5f5f5] py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          <h2 className="font-extrabold text-black text-3xl sm:text-4xl md:text-[2.6rem] text-center mb-10 md:mb-12">
            Explore our other services
          </h2>

          <div className="flex flex-wrap justify-center gap-4 md:gap-5">
            {otherServices.map(({ title, href }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-between gap-4 bg-white border border-gray-200 rounded-xl px-5 py-5 w-full sm:w-[calc(50%-10px)] lg:w-[calc(20%-16px)] min-w-45 transition-all duration-300 hover:bg-[#C0193A] hover:border-[#C0193A]"
              >
                {/* Service name */}
                <span className="font-semibold text-gray-900 text-[0.95rem] leading-snug group-hover:text-white transition-colors duration-300">
                  {title}
                </span>

                {/* Arrow in red circle — replace src with your actual arrow image */}
                <span className="shrink-0 w-9 h-9 rounded-full bg-[#C0193A] group-hover:bg-white flex items-center justify-center transition-colors duration-300">
                  <Image
                    src="/images/services/right-up.svg"
                    alt=""
                    width={26}
                    height={16}
                    className="brightness-0 invert group-hover:brightness-100 group-hover:invert-0"
                  />
                </span>
              </Link>
            ))}
          </div>

        </div>
         <div className="mt-10 md:mt-14 flex justify-center">
            <button
              onClick={() => setFormOpen(true)}
              className="cursor-pointer inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-semibold text-sm sm:text-base px-8 py-4 rounded-2xl active:scale-95 transition-all duration-200 shadow-md"
            >
              Get In Touch
              
            </button>
          </div>

      </div>



   <div
        onClick={() => setFormOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          formOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ── Center Modal ── */}
      <div
        aria-modal="true"
        role="dialog"
        className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-300 ${
          formOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`bg-white w-full max-w-lg rounded-xl shadow-2xl flex flex-col transition-all duration-300 ${
            formOpen
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-6'
          }`}
        >

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Get In Touch</h2>
            <button
              onClick={() => setFormOpen(false)}
              className="text-gray-400 hover:text-gray-700 text-2xl leading-none transition-colors"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          {/* Modal Body */}
          <div className="overflow-y-auto max-h-[80vh] px-6 py-5">
            <form onSubmit={handleSubmit} className="space-y-3">

              {/* Full Name */}
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Email ID"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
              />

              {/* Designation */}
              <input
                type="text"
                placeholder="Designation"
                value={formData.designation}
                onChange={e => setFormData({ ...formData, designation: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
              />

              {/* Organisation */}
              <input
                type="text"
                placeholder="Organisation"
                value={formData.organisation}
                onChange={e => setFormData({ ...formData, organisation: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
              />

              {/* Select Services */}
              <div className="relative">
                <select
                  value={formData.service}
                  onChange={e => setFormData({ ...formData, service: e.target.value })}
                  className="w-full border border-gray-300 rounded px-4 py-3 text-sm bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all cursor-pointer text-gray-400"
                >
                  <option value="" disabled>Select Services</option>
                  {services.map(s => (
                    <option key={s} value={s} className="text-gray-800">{s}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Message */}
              <textarea
                rows={5}
                placeholder="Message"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all resize-none"
              />

              {/* Submit Button */}
              <div className="flex justify-center pt-2 pb-2">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-sm px-12 py-3 rounded transition-all duration-200"
                >
                  Submit
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>

    </section>
  )
}

export default page
 