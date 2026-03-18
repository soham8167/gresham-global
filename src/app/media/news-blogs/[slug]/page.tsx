"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    if (!hasContent) return <div className="h-3"/>;
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
      <a
        href={node.fields?.url || "#"}
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
    if (node.format & 1) content = <strong className="font-semibold text-gray-900">{content}</strong>;
    if (node.format & 2) content = <em>{content}</em>;
    if (node.format & 8) content = <u>{content}</u>;
    return <>{content}</>;
  }

  return null;
}

/* ─── GALLERY SLIDER ─── */
function GallerySlider({ images }: { images: { url: string; alt: string }[] }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const VISIBLE = 4;

  const totalSlides = Math.ceil(images.length / VISIBLE);

  const go = (dir: "left" | "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => {
        if (dir === "right") return (prev + 1) % totalSlides;
        return (prev - 1 + totalSlides) % totalSlides;
      });
      setAnimating(false);
    }, 350);
  };

  const visibleImages = images.slice(
    current * VISIBLE,
    current * VISIBLE + VISIBLE
  );

  if (images.length === 0) return null;

  // Single image — no slider needed
  if (images.length === 1) {
    return (
      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
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
    <div className="relative w-full">
      {/* Slides */}
      <div
        className="grid gap-3 transition-all duration-350"
        style={{
          gridTemplateColumns: `repeat(${Math.min(VISIBLE, visibleImages.length)}, 1fr)`,
          opacity: animating ? 0 : 1,
          transform: animating
            ? `translateX(${direction === "right" ? "-20px" : "20px"})`
            : "translateX(0)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        {visibleImages.map((img, i) => (
          <div
            key={`${current}-${i}`}
            className="relative h-48 md:h-56 rounded-xl overflow-hidden group"
          >
            <Image
              src={img.url}
              alt={img.alt || `gallery ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {/* Arrow Buttons — only show if more than VISIBLE images */}
      {images.length > VISIBLE && (
        <>
          <button
            onClick={() => go("left")}
            disabled={animating}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-red-700 hover:text-white hover:border-red-700 transition-all duration-200 disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go("right")}
            disabled={animating}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-red-700 hover:text-white hover:border-red-700 transition-all duration-200 disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Dots */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (animating || i === current) return;
                setDirection(i > current ? "right" : "left");
                setAnimating(true);
                setTimeout(() => {
                  setCurrent(i);
                  setAnimating(false);
                }, 350);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-red-700" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
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

  /* ── Loading ── */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-red-700 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading article...</p>
        </div>
      </div>
    );
  }

  /* ── Not found ── */
  if (error || !item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-red-500 text-lg font-medium">Article not found.</p>
       
      </div>
    );
  }

  /* ── Gallery images ── */
  const galleryImages: { url: string; alt: string }[] =
    item.hasGallery && item.gallery?.length > 0
      ? item.gallery.map((g: any) => ({
          url: g.images?.url || "",
          alt: g.images?.alt || "gallery image",
        }))
      : [];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ══ MAIN IMAGE (full width, no overlay text) ══ */}
      <section className="relative w-full h-80 md:h-115 lg:h-130 overflow-hidden">
        {item.mainImage?.url ? (
          <Image
            src={item.mainImage.url}
            alt={item.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-300" />
        )}
      </section>

      {/* ══ CONTENT WRAPPER ══ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Title block ── */}
        <div className="py-8 md:py-10 border-b border-gray-200">
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {item.title}
          </h1>
        </div>

        {/* ── Rich Text Details (full width) ── */}
        <div className="py-8 md:py-10 w-full">
          <RichTextRenderer node={item.details?.root} />
        </div>

        {/* ── Video ── */}
        {item.hasVideo && item.video?.url && (
          <div className="pb-10">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-black aspect-video">
              <video
                src={item.video.url}
                controls
                className="w-full h-full object-contain"
                poster={item.mainImage?.url || undefined}
              />
            </div>
          </div>
        )}

        {/* ── Gallery ── */}
        {galleryImages.length > 0 && (
          <div className="pb-14">
            <div className="px-6">
              <GallerySlider images={galleryImages} />
            </div>
          </div>
        )}

       

      </div>
    </main>
  );
}
