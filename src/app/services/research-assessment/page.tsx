"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
]

const page = () => {
  const pathname = usePathname()

  // Filter out the current page so it never shows in the explore list
  const otherServices = allServices.filter((s) => s.href !== pathname)

  return (
    <section>

      {/* ── Hero Banner ── */}
      <div className="relative w-full h-[250px] sm:h-[320px] md:h-[400px] lg:h-[450px] overflow-hidden">
        <Image
          src="/images/about/about-bannerimg.webp"
          alt="About Banner"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
            <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-6xl mt-14 leading-tight">
              Research and
              <br />
              Assessment
            </h1>
          </div>
        </div>
      </div>

      {/* ── Intro Section ── */}
      <div className="w-full bg-white py-10 md:py-14 lg:py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-extrabold text-black text-3xl sm:text-4xl md:text-[2.6rem] leading-tight mb-5">
            Empowering your University&apos;s Future, Today
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            India and South Asia&apos;s vast and diverse landscape presents immense opportunities
            for international universities seeking to expand their footprint. We offer tailored
            research and assessment solutions designed to ensure your institution&apos;s growth is
            both impactful and long-term.
          </p>
        </div>
      </div>

      {/* ── Service Cards ── */}
      <div className="w-full bg-white pb-14 md:pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {serviceCards.map(({ icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-[#C0193A]/30 bg-white p-7 sm:p-9 flex flex-col gap-5 transition-shadow duration-300 hover:shadow-[0_4px_32px_0_rgba(192,25,58,0.12)]"
            >
              <div className="flex-shrink-0">
                <Image
                  src={icon}
                  alt={title}
                  height={80}
                  width={80}
                  className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px]"
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
                className="group flex items-center justify-between gap-4 bg-white border border-gray-200 rounded-xl px-5 py-5 w-full sm:w-[calc(50%-10px)] lg:w-[calc(20%-16px)] min-w-[180px] transition-all duration-300 hover:bg-[#C0193A] hover:border-[#C0193A]"
              >
                {/* Service name */}
                <span className="font-semibold text-gray-900 text-[0.95rem] leading-snug group-hover:text-white transition-colors duration-300">
                  {title}
                </span>

                {/* Arrow in red circle — replace src with your actual arrow image */}
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#C0193A] group-hover:bg-white flex items-center justify-center transition-colors duration-300">
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
      </div>

    </section>
  )
}

export default page
