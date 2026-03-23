
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Share2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchNewsBlogs } from "@/lib/api";
import { slugify } from "@/lib/slugify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/* ─── IMAGE HELPER ─── */
const BASE_URL = "https://gresham-global-cms.onrender.com";

const getImageUrl = (url?: string): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${BASE_URL}${url.replace("/api/media/file", "/media")}`;
};

/* ─── TYPES ─── */
interface NewsItem {
  id: string;
  title: string;
  details: string;
  date: string;
  mainImage: string;
  slug: string;
  titleSlug: string;
  type: "news" | "blogs";
}

/* ─── EXTRACT TEXT FROM PAYLOAD RICH TEXT ─── */
function extractPlainText(description: any): string {
  if (!description?.root?.children) return "";
  return description.root.children
    .flatMap((node: any) => node.children ?? [])
    .map((child: any) => child.text ?? "")
    .join(" ");
}

/* ─── IMAGE PLACEHOLDER ─── */
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

/* ─── SKELETON CARD ─── */
function NewsCardSkeleton() {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Image placeholder */}
      <Skeleton height={208} borderRadius={0} />

      <div className="px-5 pt-4">
        {/* Date */}
        <Skeleton width={90} height={12} />
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

/* ─── NEWS CARD ─── */
function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-2 duration-300">
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden">
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

      {/* Date */}
      <div className="px-5 pt-4">
        <p className="text-xs text-gray-400 font-medium">{item.date}</p>
      </div>

      {/* Title */}
      <div className="px-5 pt-3">
        <h3 className="text-[15px] font-bold text-red-700 leading-snug line-clamp-2">
          {item.title}
        </h3>
      </div>

      {/* Details */}
      <div className="px-5 pt-2 flex-1">
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
          {item.details || "No description available."}
        </p>
      </div>

      {/* Footer */}
      <div className="px-5 pt-4 pb-5 mt-auto">
        <hr className="border-gray-200 mb-4" />
        <div className="flex items-center justify-between">
          <Link
            href={`/media/news-blogs/${item.titleSlug}?ref=${item.slug}`}
            className="bg-red-700 text-white text-xs font-semibold uppercase px-5 py-2.5 rounded"
          >
            Read More
          </Link>

          <button className="flex items-center justify-center w-9 h-9 rounded-full text-gray-400">
            <Share2 size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── TAB TOGGLE ─── */
function TabToggle({
  activeTab,
  onToggle,
}: {
  activeTab: "news" | "blogs";
  onToggle: (tab: "news" | "blogs") => void;
}) {
  return (
    <div className="relative flex bg-gray-100 border border-gray-200 rounded-full p-1">
      <span
        className="absolute top-1 bottom-1 rounded-full bg-red-700 transition-all"
        style={{ width: "50%", left: activeTab === "news" ? "0%" : "50%" }}
      />
      <button
        onClick={() => onToggle("news")}
        className={`relative z-10 px-6 py-2 text-sm font-semibold ${
          activeTab === "news" ? "text-white" : "text-gray-600"
        }`}
      >
        News
      </button>
      <button
        onClick={() => onToggle("blogs")}
        className={`relative z-10 px-6 py-2 text-sm font-semibold ${
          activeTab === "blogs" ? "text-white" : "text-gray-600"
        }`}
      >
        Blogs
      </button>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function Page() {
  const [activeTab, setActiveTab] = useState<"news" | "blogs">("news");

  const { data, isLoading, error } = useQuery({
    queryKey: ["newsBlogs"],
    queryFn: fetchNewsBlogs,
  });

  const items: NewsItem[] =
    data?.docs?.map((item: any) => ({
      id: item.id,
      title: item.title,
      details: extractPlainText(item.details),
      date: new Date(item.date).toDateString(),
      mainImage: getImageUrl(item.mainImage?.url),
      slug: item.slug,
      titleSlug: slugify(item.title),
      type: item.type,
    })) || [];

  const displayItems = items.filter((item) => item.type === activeTab);
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Banner */}
      <section className="relative h-56 sm:h-72 md:h-96">
  <Image
    src="/images/about/about-bannerimg.webp"
    alt="banner"
    fill
    priority
    className="object-cover"
  />
  <div className="absolute inset-0 bg-black/40" />
  <div className="absolute inset-0 flex items-end sm:items-center">
    <div className="max-w-7xl mx-auto w-full px-6 pb-6 sm:pb-0">
      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold sm:mt-28 leading-tight">
        News and Blogs
      </h1>
    </div>
  </div>
</section>

      {/* Toggle */}
      <section className="max-w-7xl mx-auto px-6 pt-12 flex justify-center">
        <TabToggle activeTab={activeTab} onToggle={setActiveTab} />
      </section>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {error ? (
          <p className="text-center py-20 text-red-500">Error loading data</p>
        ) : (
          <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <NewsCardSkeleton key={i} />
                  ))
                : displayItems.map((item) => (
                    <NewsCard key={item.id} item={item} />
                  ))}
            </div>
          </SkeletonTheme>
        )}
      </section>

    </main>
  );
}
