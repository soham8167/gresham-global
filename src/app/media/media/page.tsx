
"use client";

import Image from "next/image";
import Link from "next/link";
import { Share2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMediaNews } from "@/lib/api";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// ─── Types
interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  mainImage: string; 
  publicationLogo: string;
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
      className={`bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center ${
        className ?? ""
      }`}
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

// ─── Skeleton Card
function MediaCardSkeleton() {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Image placeholder */}
      <Skeleton height={208} borderRadius={0} />

      <div className="px-5 pt-4">
        {/* Date */}
        <Skeleton width={90} height={12} />
      </div>

      {/* Publication logo placeholder */}
      <div className="px-5 pt-3">
        <Skeleton width={144} height={36} borderRadius={4} />
      </div>

      <div className="px-5 pt-3">
        {/* Title – two lines */}
        <Skeleton height={16} className="mb-1" />
        <Skeleton width="70%" height={16} />
      </div>

      <div className="px-5 pt-2 flex-1">
        {/* Description – three lines */}
        <Skeleton count={3} height={13} className="mb-1" />
      </div>

      <div className="px-5 pt-4 pb-5 mt-auto">
        <hr className="border-gray-200 mb-4" />
        <div className="flex items-center justify-between">
          {/* Button */}
          <Skeleton width={100} height={36} borderRadius={4} />
          {/* Share icon */}
          <Skeleton circle width={36} height={36} />
        </div>
      </div>
    </div>
  );
}

// ─── News Card
function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-2">
      {/* Main Image */}
      <div className="relative w-full h-52 shrink-0 overflow-hidden">
        {item.mainImage ? (
          <Image
            src={item.mainImage}
            alt={item.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <ImgPlaceholder className="absolute inset-0" iconSize={44} />
        )}
      </div>

      {/* Date */}
      <div className="px-5 pt-4">
        <p className="text-xs text-gray-400 font-medium tracking-wide">
          {item.date}
        </p>
      </div>

      {/* Publication Logo */}
      <div className="px-5 pt-3">
        <div className="relative h-9 w-36 overflow-hidden rounded">
          {item.publicationLogo ? (
            <Image
              src={item.publicationLogo}
              alt="logo"
              fill
              className="object-contain object-left"
              unoptimized
            />
          ) : (
            <div className="h-full w-full bg-gray-100 border border-gray-200 rounded flex items-center justify-center px-3" />
          )}
        </div>
      </div>

      {/* Title */}
      <div className="px-5 pt-3">
        <h3 className="text-[15px] font-bold text-red-700 leading-snug line-clamp-2">
          {item.title}
        </h3>
      </div>

      {/* Excerpt */}
      <div className="px-5 pt-2 flex-1">
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
          {item.excerpt}
        </p>
      </div>

      {/* Read More */}
      <div className="px-5 pt-4 pb-5 mt-auto">
        <hr className="border-gray-200 mb-4" />
        <div className="flex items-center justify-between">
          <Link
            href={`${item.slug}`}
            className="inline-block bg-red-700 text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded"
          >
            Read More
          </Link>

          <button
            aria-label="Share"
            className="flex items-center justify-center w-9 h-9 rounded-full cursor-pointer text-gray-400"
          >
            <Share2 size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page
export default function Page() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["mediaNews"],
    queryFn: fetchMediaNews,
  });

  const newsItems: NewsItem[] =
    data?.docs?.map((item: any) => ({
      id: item.id,
      title: item.title,
      excerpt: item.excerpt,
      date: new Date(item.date).toDateString(),
      mainImage: item.mainImage?.url ? `${item.mainImage.url}` : "",
      publicationLogo: item.publicationLogo?.url
        ? `${item.publicationLogo.url}`
        : "",
      slug: item.slug,
    })) || [];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Banner */}
      <section>
  <div className="relative w-full h-56 sm:h-80 md:h-100 lg:h-112.5 overflow-hidden">
    <Image
      src="/images/about/about-bannerimg.webp"
      alt="About Banner"
      fill
      priority
      className="object-cover object-center"
    />
    <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/25 to-transparent" />
    <div className="absolute inset-0 flex items-end sm:items-center">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-8 sm:pb-0">
        <h1 className="text-white font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl sm:mt-28 leading-tight">
          Media
        </h1>
      </div>
    </div>
  </div>
</section>

      {/* Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-14 md:py-20">
        {error ? (
          <p className="text-center py-20 text-red-500">Error loading media</p>
        ) : (
          <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <MediaCardSkeleton key={i} /> 
                  ))
                : newsItems.map((item) => (
                    <NewsCard key={item.id} item={item} />
                  ))}
            </div>
          </SkeletonTheme>
        )}
      </section>

    </main>
  );
}