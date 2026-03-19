"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
    quote:
      "ipsum dolor sit amet consectetur adipisicing elit. Deserunt minus ad praesentium pariatur, dolor ipsa perspiciatis eveniet veniam quo a, deleniti alias architecto sequi voluptas incidunt nemo dolorem distinctio error.",
    personImage: "/images/home/our-partner/partner1.webp",
    personName: "Luke Huo",
    personTitle: "Director of International,\nUniversity College Birmingham, UK",
    universityName: "University College Birmingham",
    universityLogo: "/images/home/our-partner/partnerLogo1.webp",
  },
  {
    id: 2,
    quote:
      " dolor sit amet consectetur adipisicing elit. Deserunt minus ad praesentium pariatur, dolor ipsa perspiciatis eveniet veniam quo a, deleniti alias architecto sequi voluptas incidunt nemo dolorem distinctio error.",
    personImage: "/images/home/our-partner/partner1.webp",
    personName: "John Doe",
    personTitle: "Sales Manager,\nEHL, Switzerland",
    universityName: "EHL",
    universityLogo: "/images/home/our-partner/partnerLogo1.webp",
  },
  {
    id: 3,
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt minus ad praesentium pariatur, dolor ipsa perspiciatis eveniet veniam quo a, deleniti alias architecto sequi voluptas incidunt nemo dolorem distinctio error.",
    personImage: "/images/home/our-partner/partner1.webp",
    personName: "Andrew Clarke",
    personTitle: "Director of Admissions,\nCranfield University, UK",
    universityName: "Cranfield University",
    universityLogo: "/images/home/our-partner/partnerLogo1.webp",
  },
  {
    id: 4,
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt minus ad praesentium pariatur, dolor ipsa perspiciatis eveniet veniam quo a, deleniti alias architecto sequi voluptas incidunt nemo dolorem distinctio error.",
    personImage: "/images/home/our-partner/partner1.webp",
    personName: "Michael Chen",
    personTitle: "Vice Chancellor International,\nUniversity of Westminster, UK",
    universityName: "University of Westminster",
    universityLogo: "/images/media/media1.png",
  },
];

// ─── Constants

const PREVIEW_LENGTH = 150;
const BUFFER = 3;
const wrap = (i: number, total: number) => ((i % total) + total) % total;

// ─── CenterCard

const CenterCard = ({ partner }: { partner: Partner }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = partner.quote.length > PREVIEW_LENGTH;
  const displayText =
    !isLong || expanded
      ? partner.quote
      : partner.quote.slice(0, PREVIEW_LENGTH).trimEnd() + " ...";

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-7 sm:p-9 lg:p-10 flex flex-col h-full max-w-212.5 mx-auto">
      {/* Quote */}
      <div className="flex-1 mb-4">
        <p className="text-gray-800 text-[15px] sm:text-base lg:text-[17px] leading-relaxed">
          {displayText}
        </p>
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

      {/* Person row */}
      <div className="flex items-center justify-between gap-4 mt-2">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative w-20 h-20 sm:w-25 sm:h-25 lg:w-52.5 lg:h-52.5 rounded-full overflow-hidden shrink-0 ring-4 ring-gray-200 shadow-md bg-gray-100">
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

        <div className="relative shrink-0 w-20 h-20 sm:w-27.5 sm:h-27.5 lg:w-57.5 lg:h-32.5 rounded-full overflow-hidden bg-gray-100">
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

// ─── PeekCard

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
      <div>
        <p className="text-gray-700 text-sm sm:text-[14px] leading-relaxed line-clamp-3 sm:line-clamp-4">
          {preview}
        </p>
        {side === "left" && (
          <span className="mt-3 inline-block text-[#E8192C] font-bold text-sm sm:text-[15px]">
            See More
          </span>
        )}
      </div>

      <div className="mt-4">
        {side === "left" ? (
          <div className="relative w-full h-11.25 sm:h-13.75">
            <Image
              src={partner.universityLogo}
              alt={partner.universityName}
              fill
              className="object-contain object-left"
              sizes="160px"
            />
          </div>
        ) : (
          <div className="flex justify-end">
            <div className="relative w-15 h-15 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-2 ring-gray-300 bg-gray-200">
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
  const total = partners.length;

  // ── Infinite strip state (same pattern as Articles) ──
  const [rawIndex, setRawIndex] = useState(BUFFER * total);
  const [isAnimating, setIsAnimating] = useState(false);
  const [enableTransition, setEnableTransition] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  // Strip: (2*BUFFER+1) * total slots, each slot is one partner
  const stripLength = (2 * BUFFER + 1) * total;
  const stripPartners = Array.from({ length: stripLength }, (_, i) =>
    partners[wrap(i, total)]
  );

  // The track is stripLength wide, but the viewport shows only 1 card (the center).
  // We use the same math as Articles: track width = stripLength * 100%, each slot = 1/stripLength of track.
  const translateXPct = -(rawIndex / stripLength) * 100;

  const go = (newRaw: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setEnableTransition(true);
    setRawIndex(newRaw);
    setTimeout(() => {
      setRawIndex((prev) => {
        const equivalent = BUFFER * total + wrap(prev, total);
        if (prev !== equivalent) {
          setEnableTransition(false);
          return equivalent;
        }
        return prev;
      });
      setIsAnimating(false);
    }, 430);
  };

  // Re-enable transition after instant jump (same as Articles)
  useEffect(() => {
    if (!enableTransition) {
      const id = requestAnimationFrame(() => setEnableTransition(true));
      return () => cancelAnimationFrame(id);
    }
  }, [enableTransition]);

  const prev = () => go(rawIndex - 1);
  const next = () => go(rawIndex + 1);

  const activeIndex = wrap(rawIndex, total);
  const leftIndex = wrap(activeIndex - 1, total);
  const rightIndex = wrap(activeIndex + 1, total);

  const dotClick = (i: number) => {
    const current = wrap(rawIndex, total);
    const forward = wrap(i - current, total);
    const backward = total - forward;
    go(rawIndex + (forward <= backward ? forward : -backward));
  };

  return (
    <section className="w-full bg-[#111111] py-14 lg:py-20 overflow-hidden">
      <style>{`
        .partner-track-animate { transition: transform 0.42s cubic-bezier(0.4, 0, 0.2, 1); }
        .partner-track-instant  { transition: none !important; }
      `}</style>

      {/* Heading */}
      <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-12 tracking-tight leading-tight px-4">
        What our partner universities have to say
      </h2>

      {/* Carousel */}
      <div className="relative w-full">
 
        {/* Three-column grid — peek cards stay static, only center animates */}
        <div
          className="grid items-stretch"
          style={{ gridTemplateColumns: "17% 66% 17%" }}
        >
          {/* LEFT PEEK — always shows leftIndex partner, static */}
          <div className="overflow-hidden">
            <PeekCard
              partner={partners[leftIndex]}
              side="left"
              onClick={prev}
            />
          </div>

          {/* CENTER — infinite strip */}
          <div className="overflow-hidden px-3 sm:px-4 lg:px-5">
            <div
              ref={trackRef}
              className={
                enableTransition
                  ? "partner-track-animate flex"
                  : "partner-track-instant flex"
              }
              style={{
                // Track is stripLength cards wide; each card = 100% of the viewport
                width: `${stripLength * 100}%`,
                transform: `translateX(${translateXPct}%)`,
              }}
            >
              {stripPartners.map((partner, i) => (
                <div
                  key={i}
                  style={{ width: `${100 / stripLength}%` }}
                  className="box-border"
                >
                  <CenterCard partner={partner} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PEEK — always shows rightIndex partner, static */}
          <div className="overflow-hidden">
            <PeekCard
              partner={partners[rightIndex]}
              side="right"
              onClick={next}
            />
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={prev}
          disabled={isAnimating}
          aria-label="Previous"
          className="
            absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-30
            flex items-center justify-center
            w-9 h-9 sm:w-11 sm:h-11
            text-red-500
            transition-all duration-200 cursor-pointer shadow-lg
            disabled:opacity-40
          "
        >
          <svg
            className="w-7 h-7 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={4.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={next}
          disabled={isAnimating}
          aria-label="Next"
          className="
            absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-30
            flex items-center justify-center
            w-9 h-9 sm:w-11 sm:h-11
            text-red-500
            transition-all duration-200 cursor-pointer shadow-lg
            disabled:opacity-40
          "
        >
          <svg
            className="w-7 h-7 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={4.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <Dots total={total} active={activeIndex} onDotClick={dotClick} />
    </section>
  );
};

export default OurPartner;
