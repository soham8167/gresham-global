"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { fetchEventBySlug } from "@/lib/api";

/* ─── IMAGE HELPER ─── */
const BASE_URL = "https://gresham-global-cms.onrender.com";
const getImageUrl = (url?: string): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${BASE_URL}${url.replace("/api/media/file", "/media")}`;
};


function extractDescription(description: any): string {
  if (!description) return "";

  // Format 1: plain string or HTML string
  if (typeof description === "string") {
    return description.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
  }

  //  Format 2: Lexical rich text object
  if (description?.root?.children) {
    return description.root.children
      .flatMap((node: any) => node.children ?? [])
      .map((child: any) => child.text ?? "")
      .join(" ")
      .trim();
  }

  return "";
}

/* ─── YouTube ID extractor ─── */
function extractYouTubeId(videoStr: string): string | null {
  if (!videoStr) return null;
  const match = videoStr.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

/* ─── Detect direct video file ─── */
function isDirectVideoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
}

/* ─── Video Component ─── */
function VideoEmbed({ videoStr }: { videoStr: string }) {
  const youtubeId = extractYouTubeId(videoStr);

  if (youtubeId) {
    return (
      <div className="relative w-full rounded-xl overflow-hidden shadow-lg" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="Event Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (isDirectVideoUrl(videoStr)) {
    return (
      <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
        <video className="w-full rounded-xl" src={videoStr} controls playsInline preload="metadata">
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  if (videoStr.startsWith("http")) {
    return (
      <div className="relative w-full rounded-xl overflow-hidden shadow-lg" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={videoStr}
          title="Event Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return null;
}

/* ─── Gallery with Location Filter ─── */
function GallerySection({ gallery }: { gallery: any[] }) {
  const locations = [
    "All Cities",
    ...Array.from(new Set(gallery.map((g) => g.location).filter(Boolean))),
  ];
  const [activeLocation, setActiveLocation] = useState("All Cities");

  const filtered =
    activeLocation === "All Cities"
      ? gallery
      : gallery.filter((g) => g.location === activeLocation);

  const handleDownload = async (imageUrl: string, location: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${location || "event-photo"}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      window.open(imageUrl, "_blank");
    }
  };

  return (
    <div className="mt-10">
      {/* Location Filter Pills */}
      <div className="flex flex-wrap gap-3 mb-8">
        {locations.map((loc) => (
          <button
            key={loc}
            onClick={() => setActiveLocation(loc)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
              activeLocation === loc
                ? "bg-red-700 text-white border-red-700 shadow-md"
                : "bg-white text-gray-600 border-gray-300 hover:border-red-700 hover:text-red-700"
            }`}
          >
            {loc}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((g: any) => {
          // ✅ FIXED: resolve gallery image URLs through getImageUrl
          const imgUrl = getImageUrl(g.images?.url);
          if (!imgUrl) return null;

          return (
            <div
              key={g.id}
              className="relative rounded-lg overflow-hidden group cursor-pointer"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src={imgUrl} // ✅ fixed
                alt={g.location || "Event photo"}
                fill
                className="object-cover"
              />

              {/* Download Button */}
              <button
                onClick={(e) => handleDownload(imgUrl, g.location, e)}
                className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
                title="Download image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>

              {/* Location label */}
              {g.location && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex items-center gap-1">
                    <MapPin size={10} className="text-white" />
                    <span className="text-white text-[10px] font-medium">{g.location}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main Detail Page ─── */
export default function EventDetailPage() {
  const { slug } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["event", slug],
    queryFn: () => fetchEventBySlug(slug as string),
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="w-full h-[60vh] bg-gray-200 animate-pulse" />
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-2/3" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
        </div>
      </main>
    );
  }

  if (error || !data?.docs?.[0]) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Event not found.</p>
      </main>
    );
  }

  const item = data.docs[0];

  //  FIXED: handles both HTML string and Lexical object
  const description = extractDescription(item.description);

  //  FIXED: mainImage can be a string ID (not populated) or an object
  // only use it if it's a populated object with a url
  const mainImageUrl =
    typeof item.mainImage === "object" && item.mainImage !== null
      ? getImageUrl(item.mainImage.url)
      : "";

  const hasVideo = item.hasVideo && item.video;
  const hasGallery = item.hasGallery && item.gallery?.length > 0;

  return (
    <main className="min-h-screen bg-white">

      {/* Hero Banner */}
      <section
        className="relative w-full overflow-hidden bg-gray-900"
        style={{ height: "60vh", minHeight: "320px" }}
      >
        {/*  FIXED: only render Image if we have a valid URL */}
        {mainImageUrl ? (
          <Image
            src={mainImageUrl}
            alt={item.title}
            fill
            priority
            className="object-cover opacity-90"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
      </section>

      {/* Title + Description */}
      <section className="max-w-8xl mx-auto px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
          {item.title}
        </h1>

        {/*  FIXED: description now correctly extracted from both formats */}
        {description && (
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            {description}
          </p>
        )}
      </section>

      {/* Video */}
      {hasVideo && (
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <VideoEmbed videoStr={item.video} />
        </section>
      )}

      {/* Gallery */}
      {hasGallery && (
        <section className="max-w-8xl mx-auto px-6 pb-20">
          <GallerySection gallery={item.gallery} />
        </section>
      )}

    </main>
  );
}
