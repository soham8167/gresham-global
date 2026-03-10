"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const galleryImages = [
  { id: 1, src: "/images/careers/Life1.webp", alt: "Life at Gresham 1" },
  { id: 2, src: "/images/careers/Life2.webp", alt: "Life at Gresham 2" },
  { id: 3, src: "/images/careers/Life3.webp", alt: "Life at Gresham 3" },
  { id: 4, src: "/images/careers/Life1.webp", alt: "Life at Gresham 4" },
  { id: 5, src: "/images/careers/Life3.webp", alt: "Life at Gresham 5" },
  { id: 6, src: "/images/careers/Life2.webp", alt: "Life at Gresham 6" },
];

const VISIBLE = 3; 
const BUFFER  = 3; 

function useInView(threshold = 0.15) {
  const ref  = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function LifeAtGresham() {
  const { ref: headRef, inView: headIn } = useInView();

  const total     = galleryImages.length;
  const wrap      = (i: number) => ((i % total) + total) % total;
  const stripLen  = (2 * BUFFER + 1) * total;
  const stripCards = Array.from({ length: stripLen }, (_, i) => galleryImages[wrap(i)]);

  const [rawIndex, setRawIndex]           = useState(BUFFER * total);
  const [isAnimating, setIsAnimating]     = useState(false);
  const [enableTransition, setEnableTransition] = useState(true);

  const trackWidthMultiple = stripLen / VISIBLE;
  const translateXPct      = -(rawIndex / stripLen) * 100;

  const go = (newRaw: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setEnableTransition(true);
    setRawIndex(newRaw);
    setTimeout(() => {
      setRawIndex((prev) => {
        const eq = BUFFER * total + wrap(prev);
        if (prev !== eq) { setEnableTransition(false); return eq; }
        return prev;
      });
      setIsAnimating(false);
    }, 430);
  };

  useEffect(() => {
    if (!enableTransition) {
      const id = requestAnimationFrame(() => setEnableTransition(true));
      return () => cancelAnimationFrame(id);
    }
  }, [enableTransition]);

  const prev = () => go(rawIndex - 1);
  const next = () => go(rawIndex + 1);

  return (
    <>
      <style>{`
        .life-track-anim   { transition: transform 0.42s cubic-bezier(0.4,0,0.2,1); }
        .life-track-instant{ transition: none !important; }
        .life-img-tile img { transition: transform 0.6s ease; }
        .life-img-tile:hover img { transform: scale(1.08); }
      `}</style>

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 ">

          {/* ── Header ── */}
          <div
            ref={headRef}
            className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-16 mb-12 md:mb-16 "
            style={{
              opacity: headIn ? 1 : 0,
              transform: headIn ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className=" w-full flex justify-center ">
              <h2 className=" text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                Life at Gresham Global
              </h2>
            </div>
            
          </div>

          {/* ── Carousel: 3 cards visible, arrows left/right ── */}
          <div className="relative">

            {/* LEFT arrow */}
            <button
              onClick={prev}
              disabled={isAnimating}
              className="absolute -left-4 sm:-left-5 lg:-left-7 top-1/2 -translate-y-1/2 z-10
                         w-10 h-10 rounded-full 
                         flex items-center justify-center text-red-800 
                         disabled:opacity-40 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* RIGHT arrow */}
            <button
              onClick={next}
              disabled={isAnimating}
              className="absolute -right-4 sm:-right-5 lg:-right-7 top-1/2 -translate-y-1/2 z-10
                         w-10 h-10 rounded-full 
                         flex items-center justify-center text-red-800 
                         disabled:opacity-40 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Track window */}
            <div className="overflow-hidden">
              <div
                className={enableTransition ? "life-track-anim flex" : "life-track-instant flex"}
                style={{
                  width: `${trackWidthMultiple * 100}%`,
                  transform: `translateX(${translateXPct}%)`,
                }}
              >
                {stripCards.map((img, i) => (
                  <div
                    key={i}
                    style={{ width: `${(100 / VISIBLE) / trackWidthMultiple}%` }}
                    className="px-2 sm:px-3 box-border"
                  >
                    <div className="life-img-tile relative h-[220px] sm:h-[260px] md:h-[300px] rounded-2xl overflow-hidden bg-gray-200">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
