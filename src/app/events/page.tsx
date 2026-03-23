
"use client";

import Image from "next/image";
import Link from "next/link";
import { Share2, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/lib/api";

/* ─── IMAGE HELPER ─── */
const BASE_URL = "https://gresham-global-cms.onrender.com";
const getImageUrl = (url?: string): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${BASE_URL}${url.replace("/api/media/file", "/media")}`;
};

/* ─── TYPES ─── */
interface EventItem {
  id: string;
  title: string;
  excerpt: string;       
  description: string;   
  mainImage: string;
  date: string;
  slug: string;
}


function htmlToPlainText(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")   
    .replace(/&nbsp;/g, " ")   
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")      
    .trim();
}

/* ─── FORMAT DATE ─── */
function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ─── IMAGE PLACEHOLDER ─── */
function ImgPlaceholder({ className }: { className?: string }) {
  return (
    <div className={`bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center ${className ?? ""}`}>
      <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#c4c9d0" strokeWidth="1.2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  );
}
/* ─── EVENT CARD ─── */
function EventCard({ item }: { item: EventItem }) {
  return (
    <div className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">

      {/* Image */}
      <div className="relative w-full h-52 shrink-0 overflow-hidden">
        {item.mainImage ? (
          <Image
            src={item.mainImage}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <ImgPlaceholder className="absolute inset-0" />
        )}
      </div>

      {/* Date */}
      <div className="px-5 pt-4 flex items-center gap-2">
        <Calendar size={13} className="text-gray-400" />
        <p className="text-xs text-gray-400 font-medium">{formatDate(item.date)}</p>
      </div>

      {/* Title */}
      <div className="px-5 pt-2">
        <h3 className="text-[15px] font-bold text-red-700 line-clamp-2 leading-snug">
          {item.title}
        </h3>
      </div>

      {/* Excerpt — plain text only for preview */}
      <div className="px-5 pt-2 flex-1">
        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
          {item.excerpt || "No description available."}
        </p>
      </div>

      {/* Buttons */}
      <div className="px-5 pt-4 pb-5 mt-auto">
        <hr className="border-gray-200 mb-4" />
        <div className="flex items-center justify-between">
          <Link
            href={`/events/${encodeURIComponent(item.slug)}`}
            className="bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase px-5 py-2.5 rounded transition-colors duration-200"
          >
            Read More
          </Link>
          <button className="flex items-center justify-center w-9 h-9 rounded-full text-gray-400 hover:text-red-700 hover:bg-red-50 transition-colors duration-200">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function EventsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="w-full h-80 bg-gray-300 animate-pulse" />
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-200">
                <div className="h-52 bg-gray-200 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Error loading events. Please try again.</p>
      </main>
    );
  }

  const events: EventItem[] =
    data?.docs?.map((item: any) => ({
      id: item.id,
      title: item.title,
      excerpt: htmlToPlainText(item.description),
      description: item.description || "",
      date: item.date,
      mainImage: getImageUrl(item.mainImage?.url),
      slug: item.slug,
    })) || [];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Banner */}
      <section>
        <div className="relative w-full h-80 overflow-hidden">
          <Image
            src="/images/about/about-bannerimg.webp"
            alt="Events Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto w-full px-6">
              <h1 className="text-white font-extrabold text-5xl mt-20 tracking-tight">Events</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {events.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((item) => (
              <EventCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

    </main>
  );
}
