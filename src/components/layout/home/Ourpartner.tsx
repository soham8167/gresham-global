"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// ─── Types 

interface Partner {
  id: number;
  quote: string;
  personImage: string;
  personName: string;
  personTitle: string;
  universityName: string;
  universityLogo: string; 
}

// ─── Data 

const partners: Partner[] = [
  {
    id: 1,
    quote:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt minus ad praesentium pariatur, dolor ipsa perspiciatis eveniet veniam quo a, deleniti alias architecto sequi voluptas incidunt nemo dolorem distinctio error.",
    personImage: "/images/home/our-partner/partner1.webp",
    personName: "Luke Huo",
    personTitle: "Director of International,\nUniversity College Birmingham, UK",
    universityName: "University College Birmingham",
    universityLogo: "/images/home/our-partner/partnerLogo1.webp",
  },
  {
    id: 2,
    quote:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt minus ad praesentium pariatur, dolor ipsa perspiciatis eveniet veniam quo a, deleniti alias architecto sequi voluptas incidunt nemo dolorem distinctio error.",
    personImage: "/images/home/our-partner/partner1.webp",
    personName: "John Doe",
    personTitle: "Sales Manager,\nEHL, Switzerland",
    universityName: "EHL",
    universityLogo: "/images/home/our-partner/partnerLogo1.webp",
  },
  {
    id: 3,
    quote:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt minus ad praesentium pariatur, dolor ipsa perspiciatis eveniet veniam quo a, deleniti alias architecto sequi voluptas incidunt nemo dolorem distinctio error.",
    personImage: "/images/home/our-partner/partner1.webp",
    personName: "Andrew Clarke",
    personTitle: "Director of Admissions,\nCranfield University, UK",
    universityName: "Cranfield University",
    universityLogo: "/images/home/our-partner/partnerLogo1.webp",
  },
  {
    id: 4,
    quote:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt minus ad praesentium pariatur, dolor ipsa perspiciatis eveniet veniam quo a, deleniti alias architecto sequi voluptas incidunt nemo dolorem distinctio error.",
    personImage: "/images/home/our-partner/partner1.webp",
    personName: "Michael Chen",
    personTitle: "Vice Chancellor International,\nUniversity of Westminster, UK",
    universityName: "University of Westminster",
    universityLogo: "/images/home/our-partner/partnerLogo1.webp",
  },
];

// ─── Constants 

const PREVIEW_LENGTH = 150;
const wrap = (i: number, total: number) => ((i % total) + total) % total;

// ─── Slide animation 

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 32 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 32 },
      opacity: { duration: 0.2 },
    },
  }),
};



const CenterCard = ({ partner }: { partner: Partner }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = partner.quote.length > PREVIEW_LENGTH;
  const displayText =
    !isLong || expanded
      ? partner.quote
      : partner.quote.slice(0, PREVIEW_LENGTH).trimEnd() + " ...";

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-7 sm:p-9 lg:p-10 flex flex-col h-full max-w-[850px] mx-auto">

      {/* Quote */}
      <div className="flex-1 mb-4">
        <p className="text-gray-800 text-[15px] sm:text-base lg:text-[17px] leading-relaxed">
          {displayText}
        </p>
        {/* See More / See Less — RIGHT aligned */}
        {isLong && (
          <div className="flex justify-end mt-3">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="text-[#E8192C] font-bold text-sm sm:text-[15px] hover:underline transition-colors"
            >
              {expanded ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </div>

      {/* Person row: [circle avatar + name/title] ... [circle uni logo] */}
      <div className="flex items-center justify-between gap-4 mt-2">

        {/* Left: circular avatar + name + title */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Circular avatar — large, with white ring */}
          <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[210px] lg:h-[210px] rounded-full overflow-hidden flex-shrink-0 ring-4 ring-gray-200 shadow-md bg-gray-100">
            <Image
              src={partner.personImage}
              alt={partner.personName}
              fill
              className="object-cover"
              sizes="110px"
            />
          </div>
          <div>
            <p className="font-bold text-base sm:text-lg lg:text-xl text-gray-900 leading-tight">
              {partner.personName}
            </p>
            <p className="text-sm sm:text-[15px] text-gray-600 whitespace-pre-line leading-snug mt-1">
              {partner.personTitle}
            </p>
          </div>
        </div>

        {/* Right: circular university logo */}
        <div className="relative flex-shrink-0 w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] lg:w-[230px] lg:h-[130px] rounded-full overflow-hidden bg-gray-100">
          <Image
            src={partner.universityLogo}
            alt={partner.universityName}
            fill
            className="object-cover"
            sizes="130px"
          />
        </div>

      </div>
    </div>
  );
};


const PeekCard = ({
  partner,
  side,
  onClick,
}: {
  partner: Partner;
  side: "left" | "right";
  onClick: () => void;
}) => {
  const preview = partner.quote.slice(0, 110).trimEnd() + " ...";

  return (
    <button
      onClick={onClick}
      aria-label={`View ${partner.personName}'s testimonial`}
      className={`
        w-full h-full text-left cursor-pointer
        bg-[#d4d4d4] flex flex-col justify-between
        p-4 sm:p-5
        transition-opacity duration-200 hover:opacity-80
        ${side === "left" ? "rounded-r-3xl" : "rounded-l-3xl"}
      `}
    >
      {/* Top: quote preview */}
      <div>
        <p className="text-gray-700 text-sm sm:text-[14px] leading-relaxed line-clamp-3 sm:line-clamp-4">
          {preview}
        </p>
        {/* See More — only on LEFT card (right card is cut off, doesn't show it) */}
        {side === "left" && (
          <span className="mt-3 inline-block text-[#E8192C] font-bold text-sm sm:text-[15px]">
            See More
          </span>
        )}
      </div>

      {/* Bottom content differs per side */}
      <div className="mt-4">
        {side === "left" ? (
          /* Left: horizontal university logo */
          <div className="relative w-full h-[45px] sm:h-[55px]">
            <Image
              src={partner.universityLogo}
              alt={partner.universityName}
              fill
              className="object-contain object-left"
              sizes="160px"
            />
          </div>
        ) : (
          /* Right: person circular image — partially visible */
          <div className="flex justify-end">
            <div className="relative w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-full overflow-hidden ring-2 ring-gray-300 bg-gray-200">
              <Image
                src={partner.personImage}
                alt={partner.personName}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          </div>
        )}
      </div>
    </button>
  );
};

// ─── Dot Indicators 

const Dots = ({
  total,
  active,
  onDotClick,
}: {
  total: number;
  active: number;
  onDotClick: (i: number) => void;
}) => (
  <div className="flex items-center justify-center gap-2.5 mt-8">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        aria-label={`Go to slide ${i + 1}`}
        onClick={() => onDotClick(i)}
        className={`rounded-full transition-all duration-300 ${
          i === active
            ? "bg-[#E8192C] w-8 h-3.5"
            : "bg-gray-500 hover:bg-gray-400 w-3.5 h-3.5"
        }`}
      />
    ))}
  </div>
);

// ─── Main Component 

const OurPartner = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const total = partners.length;

  const goTo = (i: number, dir: 1 | -1) => {
    setDirection(dir);
    setIndex(wrap(i, total));
  };

  const prev = () => goTo(index - 1, -1);
  const next = () => goTo(index + 1, 1);

  const leftIndex = wrap(index - 1, total);
  const rightIndex = wrap(index + 1, total);

  return (
    <section className="w-full bg-[#111111] py-14 lg:py-20 overflow-hidden">

      {/* Heading */}
      <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-12 tracking-tight leading-tight px-4">
        What our partner universities have to say
      </h2>

      {/* Full-width carousel — no horizontal padding so side cards bleed to edges */}
      <div className="relative w-full">

        {/* Three-column grid */}
        <div
          className="grid items-stretch"
          style={{ gridTemplateColumns: "17% 66% 17%" }}
        >
          {/* LEFT PEEK */}
          <div className="overflow-hidden">
            <PeekCard partner={partners[leftIndex]} side="left" onClick={prev} />
          </div>

          {/* CENTER — animated */}
          <div className="relative overflow-hidden px-3 sm:px-4 lg:px-5">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="h-full"
              >
                <CenterCard partner={partners[index]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT PEEK */}
          <div className="overflow-hidden">
            <PeekCard partner={partners[rightIndex]} side="right" onClick={next} />
          </div>
        </div>

        {/* ── Left Arrow — extreme left edge, overlapping left peek card ── */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="
            absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-30
            flex items-center justify-center
            w-9 h-9 sm:w-11 sm:h-11
            
             text-red-500
          
            transition-all duration-200 cursor-pointer shadow-lg
          "
        >
          <svg className="w-7 h-7 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={4.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* ── Right Arrow — extreme right edge, overlapping right peek card ── */}
        <button
          onClick={next}
          aria-label="Next"
          className="
            absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-30
            flex items-center justify-center
            w-9 h-9 sm:w-11 sm:h-11
             text-red-500
            transition-all duration-200 cursor-pointer shadow-lg
          "
        >
          <svg className="w-7 h-7 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={4.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>

      {/* Dots */}
      <Dots
        total={total}
        active={index}
        onDotClick={(i) => goTo(i, i > index ? 1 : -1)}
      />

    </section>
  );
};

export default OurPartner;
