

"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState, useEffect } from "react";

/* ─── IMAGE HELPER ─── */
const BASE_URL = "https://gresham-global-cms.onrender.com";

const getImageUrl = (url?: string): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${BASE_URL}${url.replace("/api/media/file", "/media")}`;
};

/* ─── RICH TEXT RENDERER ─── */
function RichTextRenderer({ node }: { node: any }): React.ReactElement | null {
  if (!node) return null;

  if (node.type === "root") {
    return (
      <div className="w-full">
        {node.children?.map((child: any, i: number) => (
          <RichTextRenderer key={i} node={child} />
        ))}
      </div>
    );
  }

  if (node.type === "paragraph") {
    const hasContent = node.children?.some(
      (c: any) => c.text || c.children?.length
    );
    if (!hasContent) return <div className="h-3" />;
    return (
      <p className="mb-5 text-gray-700 leading-[1.85] text-[15px] md:text-base text-justify w-full">
        {node.children?.map((child: any, i: number) => (
          <RichTextRenderer key={i} node={child} />
        ))}
      </p>
    );
  }

  if (node.type === "heading") {
    const classes: Record<string, string> = {
      h1: "text-3xl font-bold text-gray-900 mt-10 mb-4",
      h2: "text-2xl font-bold text-gray-800 mt-8 mb-3",
      h3: "text-xl font-semibold text-gray-800 mt-6 mb-2",
      h4: "text-lg font-semibold text-gray-700 mt-5 mb-2",
    };
    const hasContent = node.children?.some((c: any) => c.text);
    if (!hasContent) return null;
    return React.createElement(
      node.tag,
      { className: classes[node.tag] || "font-bold mt-4 mb-2" },
      node.children?.map((child: any, i: number) => (
        <RichTextRenderer key={i} node={child} />
      ))
    );
  }

  if (node.type === "list") {
    const tag = node.listType === "bullet" ? "ul" : "ol";
    const className = `mb-5 pl-6 space-y-1 ${
      node.listType === "bullet" ? "list-disc" : "list-decimal"
    }`;
    return React.createElement(
      tag,
      { className },
      node.children?.map((child: any, i: number) => (
        <RichTextRenderer key={i} node={child} />
      ))
    );
  }

  if (node.type === "listitem") {
    return (
      <li className="text-gray-700 text-[15px] md:text-base leading-relaxed">
        {node.children?.map((child: any, i: number) => (
          <RichTextRenderer key={i} node={child} />
        ))}
      </li>
    );
  }

  if (node.type === "link") {
    return (
      
      <a  href={node.fields?.url || "#"}
        target={node.fields?.newTab ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="text-red-700 underline underline-offset-2 hover:text-red-900 transition-colors"
      >
        {node.children?.map((child: any, i: number) => (
          <RichTextRenderer key={i} node={child} />
        ))}
      </a>
    );
  }

  if (node.type === "text") {
    if (!node.text) return null;
    let content: React.ReactNode = node.text;
    if (node.format & 1)
      content = (
        <strong className="font-semibold text-gray-900">{content}</strong>
      );
    if (node.format & 2) content = <em>{content}</em>;
    if (node.format & 8) content = <u>{content}</u>;
    return <>{content}</>;
  }

  return null;
}

/* ─── RESPONSIVE VISIBLE COUNT ─── */
function useVisibleCount(): number {
  const [count, setCount] = useState(4);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCount(1);
      else if (window.innerWidth < 1024) setCount(2);
      else if (window.innerWidth < 1280) setCount(3);
      else setCount(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

/* ─── DOTS ─── */
function Dots({
  total,
  active,
  onDotClick,
}: {
  total: number;
  active: number;
  onDotClick: (i: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-2.5 mt-6 sm:mt-8">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          className={`rounded-full transition-all duration-300 ${
            i === active
              ? "bg-[#E8192C] w-7 sm:w-8 h-3"
              : "bg-gray-300 hover:bg-gray-400 w-3 h-3"
          }`}
        />
      ))}
    </div>
  );
}

/* ─── GALLERY SLIDER ─── */
const BUFFER = 3;

function GallerySlider({
  images,
}: {
  images: { url: string; alt: string }[];
}) {
  const total = images.length;
  const visibleCount = useVisibleCount();
  const wrap = (i: number) => ((i % total) + total) % total;

  const [rawIndex, setRawIndex] = useState(BUFFER * total);
  const [isAnimating, setIsAnimating] = useState(false);
  const [enableTransition, setEnableTransition] = useState(true);

  const stripLength = (2 * BUFFER + 1) * total;
  const stripCards = Array.from({ length: stripLength }, (_, i) =>
    images[wrap(i)]
  );
  const trackWidthMultiple = stripLength / visibleCount;
  const translateXPct = -(rawIndex / stripLength) * 100;

  const go = (newRaw: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setEnableTransition(true);
    setRawIndex(newRaw);
    setTimeout(() => {
      setRawIndex((prev) => {
        const equivalent = BUFFER * total + wrap(prev);
        if (prev !== equivalent) {
          setEnableTransition(false);
          return equivalent;
        }
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

  const dotClick = (i: number) => {
    const current = wrap(rawIndex);
    const forward = wrap(i - current);
    const backward = total - forward;
    go(rawIndex + (forward <= backward ? forward : -backward));
  };

  if (total === 1) {
    return (
      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden">
        <Image
          src={images[0].url}
          alt={images[0].alt || "gallery"}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <>
      <style>{`
        .gallery-track         { transition: transform 0.42s cubic-bezier(0.4, 0, 0.2, 1); }
        .gallery-track-instant { transition: none !important; }
      `}</style>

      <div className="relative w-full">
        {/* Left Arrow */}
        <button
          onClick={prev}
          disabled={isAnimating}
          className="absolute -left-4 sm:-left-6 lg:-left-10 top-[40%] -translate-y-1/2 z-10 text-red-500 disabled:opacity-40"
        >
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={next}
          disabled={isAnimating}
          className="absolute -right-4 sm:-right-6 lg:-right-10 top-[40%] -translate-y-1/2 z-10 text-red-500 disabled:opacity-40"
        >
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Track */}
        <div className="overflow-hidden w-full">
          <div
            className={
              enableTransition
                ? "gallery-track flex"
                : "gallery-track-instant flex"
            }
            style={{
              width: `${trackWidthMultiple * 100}%`,
              transform: `translateX(${translateXPct}%)`,
            }}
          >
            {stripCards.map((img, i) => (
              <div
                key={i}
                style={{
                  width: `${(100 / visibleCount) / trackWidthMultiple}%`,
                }}
                className="px-2 sm:px-3 box-border"
              >
                <div className="relative w-full h-60 sm:h-48 md:h-56 lg:h-84 overflow-hidden rounded-2xl bg-gray-100">
                  <Image
                    src={img.url}
                    alt={img.alt || `gallery ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,(max-width:1280px) 33vw,25vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <Dots total={total} active={wrap(rawIndex)} onDotClick={dotClick} />
      </div>
    </>
  );
}

/* ─── DETAIL PAGE SKELETON ─── */
function NewsDetailSkeleton() {
  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <main className="min-h-screen bg-gray-50">

        {/* Hero image placeholder — matches section h-75 sm:h-100 md:h-120 lg:h-135 */}
        <section className="relative w-full h-75 sm:h-100 md:h-120 lg:h-135 overflow-hidden">
          <Skeleton height="100%" borderRadius={0} />
        </section>

        {/* Title + Body */}
        <div className="max-w-9xl mx-auto px-4 sm:px-8 lg:px-10">

          {/* Title block */}
          <div className="py-8 md:py-10">
            <Skeleton height={36} width="65%" borderRadius={6} />
          </div>

          {/* Body paragraphs */}
          <div className="py-8 md:py-10 w-full space-y-3">
            <Skeleton count={2} height={15} borderRadius={4} />
            <Skeleton width="80%" height={15} borderRadius={4} />

            <div className="pt-4" />
            <Skeleton count={3} height={15} borderRadius={4} />
            <Skeleton width="55%" height={15} borderRadius={4} />

            <div className="pt-4" />
            <Skeleton count={3} height={15} borderRadius={4} />
            <Skeleton width="70%" height={15} borderRadius={4} />
          </div>

        </div>
      </main>
    </SkeletonTheme>
  );
}

/* ─── DETAIL PAGE ─── */
export default function NewsDetailPage() {
  const searchParams = useSearchParams();
  const cmsSlug = searchParams.get("ref");

  const { data, isLoading, error } = useQuery({
    queryKey: ["newsBlogs"],
    queryFn: async () => {
      const res = await fetch(
        "https://gresham-global-cms.onrender.com/api/news-blogs"
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const item = data?.docs?.find((doc: any) => doc.slug === cmsSlug);

  // ── Loading state ──
  if (isLoading) return <NewsDetailSkeleton />;

  // ── Error / not found ──
  if (error || !item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-red-500 text-lg font-medium">Article not found.</p>
      </div>
    );
  }

  const mainImageUrl = getImageUrl(item.mainImage?.url);

  const galleryImages: { url: string; alt: string }[] =
    item.hasGallery && item.gallery?.length > 0
      ? item.gallery.map((g: any) => ({
          url: getImageUrl(g.images?.url),
          alt: g.images?.alt || "gallery image",
        }))
      : [];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Main Image */}
      <section className="relative w-full h-75 sm:h-100 md:h-120 lg:h-135 overflow-hidden">
        {mainImageUrl && (
          <Image
            src={mainImageUrl}
            alt={item.title}
            fill
            priority
            className="object-cover"
          />
        )}
      </section>

      {/* Title + Body */}
      <div className="max-w-9xl mx-auto px-4 sm:px-8 lg:px-10">

        <div className="py-8 md:py-10 border-gray-200">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {item.title}
          </h1>
        </div>

        <div className="py-8 md:py-10 w-full">
          {item?.details?.root ? (
            <RichTextRenderer node={item.details.root} />
          ) : null}
        </div>

        {/* Video */}
        {item.hasVideo && item.video?.url && (
          <div className="pb-10">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-black aspect-video">
              <video
                src={item.video.url}
                controls
                className="w-full h-full object-contain"
                poster={mainImageUrl || undefined}
              />
            </div>
          </div>
        )}
      </div>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className="w-full bg-gray-50 py-10 sm:py-12">
          <div className="w-full px-10 sm:px-14 lg:px-20">
            <GallerySlider images={galleryImages} />
          </div>
        </section>
      )}

    </main>
  );
}