
"use client"

import Image from "next/image";
import Link from "next/link";
import { Share2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {  fetchPublications } from "@/lib/api";

// ─── Types 
interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  mainImage: string;       
  tag:string;  
  slug: string;
}




// ─── Image Placeholder 
function ImgPlaceholder({
  className,
  iconSize = 40,
}: {
  className?: string;
  iconSize?: number;
}) {
  return (
    <div
      className={`bg-linear-to-br from-gray-200 to-gray-300  flex items-center justify-center ${className ?? ""}`}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#c4c9d0"
        strokeWidth="1.2"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  );
}

// ─── News Card 
function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:-translate-y-2 transition-shadow duration-300 ">

      {/* 1. Main Image (top) */}
      <div className="relative w-full h-52 shrink-0 overflow-hidden">
        {item.mainImage ? (
          <Image
            src={item.mainImage}
            alt={item.title}
            fill
            className="object-cover"
          />
        ) : (
          <ImgPlaceholder className="absolute inset-0" iconSize={44} />
        )}
      </div>



      

      {/* 4. Title */}
      <div className="px-5 pt-3">
        <h3 className="text-[15px] font-bold text-red-700 leading-snug line-clamp-2  transition-colors duration-300">
          {item.title}
        </h3>
      </div>

      {/* 5. Excerpt */}
      <div className="px-5 pt-2 flex-1">
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
          {item.excerpt}
        </p>
      </div>
      <div className="px-5 pt-2 flex-1">
        <p className="text-sm text-gray-900 leading-relaxed line-clamp-3"> 
        Tags:  {item.tag}
        </p>
      </div>

      {/* 6. Divider + Read More + Share */}
      <div className="px-5 pt-4 pb-5 mt-auto">
        <hr className="border-gray-200 mb-4" />
        <div className="flex items-center justify-between">
          <Link
            href={`/publications/${item.slug}`}
            className="inline-block bg-red-700 text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded transition-colors duration-300"
          >
            Read More
          </Link>
          <button
            aria-label="Share"
            className="flex items-center justify-center w-9 h-9 rounded-full cursor-pointer text-gray-400 transition-colors duration-300"
          >
            <Share2 size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page 
export default function Page () {

 const { data, isLoading, error } = useQuery({
    queryKey: ["publications"],
    queryFn: fetchPublications,
  });

  if (isLoading) {
    return <p className="text-center py-20">Loading media...</p>;
  }

  if (error) {
    return <p className="text-center py-20">Error loading media</p>;
  }

  // Convert Payload data to your UI format
  const newsItems: NewsItem[] =
  data?.docs?.map((item: any) => ({
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    tag: item.tag,
    mainImage: item.mainImage?.url || "",
    

    slug: item.slug,
  })) || []; 

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── Banner */}
      <section>
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
              <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-28 -ml-9 leading-tight">
               Publications
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-14 md:py-20 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ">
          {newsItems.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </section>

    </main>
  );
};

