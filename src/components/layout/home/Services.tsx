"use client";

import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Research & Assessment",
    href: "/services/research-assessment",
    image: "/images/home/articals/news5.jpg",
    points: [
      "Market Analysis & Research",
      "Go-To Market Strategy",
      "Financial Compliance",
      "Legal and Regulatory Guidance",
    ],
  },
  {
    title: "In-Country Representation",
    href: "/services/in-country-representation",
    image: "/images/home/articals/news5.jpg",
    points: [
      "Student Engagement & Recruitment",
      "Regional Offices",
      "Educational Fairs and Events",
      "Strategic Alliances",
    ],
  },
  {
    title: "Operational Support",
    href: "/services/operational-support",
    image: "/images/home/articals/news5.jpg",
    points: [
      "Talent Acquisition",
      "Office Setup & Management",
      "HR & Payroll Support",
      "IT & Infrastructure",
    ],
  },
  {
    title: "Academic Collaboration",
    href: "/services/academic-collaborations",
    image: "/images/home/articals/news5.jpg",
    points: [
      "University Partnerships",
      "Joint Research Programs",
      "Faculty Exchange",
      "Curriculum Development",
    ],
  },
  {
    title: "Strategic Marketing",
    href: "/services/strategic-marketing",
    image: "/images/home/articals/news5.jpg",
    points: [
      "Digital Marketing",
      "Brand Strategy",
      "Content Creation",
      "Campaign Management",
    ],
  },
  {
    title: "Admission Compliance",
    href: "/services/admission-compliance",
    image: "/images/home/articals/news5.jpg",
    points: [
      "Documentation Review",
      "Application Processing",
      "Visa Guidance",
      "Regulatory Compliance",
    ],
  },
];

const GlobeIcon = () => (
  <span className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4.5 h-4.5 text-white"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
    </svg>
  </span>
);

const Services = () => {
  return (
    <section className="relative bg-gray-100 overflow-hidden py-12 md:py-16 ">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-5xl lg:text-7xl font-bold text-center mb-10 md:mb-16">
          Services
        </h2>

        {/* ── DESKTOP grid (md and up): flip cards ── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 ">
          {services.map((service, index) => (
            <Link key={index} href={service.href}>
              <div className="group perspective-[1000px] h-80 w-full cursor-pointer">
                <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                  {/* FRONT */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg [backface-visibility:hidden]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <h3 className="absolute bottom-6 left-6 text-white text-2xl xl:text-3xl font-semibold max-w-50 leading-tight">
                      {service.title}
                    </h3>
                    <div className="absolute bottom-2 right-3 w-12 h-12 opacity-90">
                      <Image
                        src="/images/services/rotate.webp"
                        alt="rotate"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="absolute inset-0 rounded-2xl bg-red-600 text-white p-6 shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <h3 className="text-2xl xl:text-3xl font-semibold mb-5">
                      {service.title}
                    </h3>
                    <ul className="space-y-3 text-sm">
                      {service.points.map((point, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <GlobeIcon />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── MOBILE / TABLET list  ── */}
        <div className="flex flex-col gap-5 md:hidden">
          {services.map((service, index) => (
            <Link key={index} href={service.href}>
              <div className="relative rounded-2xl overflow-hidden shadow-md h-52 sm:h-60 w-full cursor-pointer">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/10" />
                <div className="absolute inset-0 flex flex-col justify-center px-5 py-4">
                  <h3 className="text-white text-xl sm:text-2xl font-bold mb-3 leading-tight">
                    {service.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {service.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-white text-sm sm:text-base font-medium"
                      >
                        <GlobeIcon />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
