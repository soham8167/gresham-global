"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Share2 } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  mainImage: string;
  publicationAlt: string;
  slug: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "GACC 2025 by Gresham Global Focuses on Future Proof Career",
    excerpt: "Gresham Global successfully hosted the second edition of its high-impact conference, the Gresham Annual",
    date: "March 05, 2026",
    mainImage: "/images/media/media1.png",
    publicationAlt: "Business Standard",
    slug: "q4-results-2026",
  },
  {
    id: 2,
    title: "Unis and agencies work to leverage Bangladeshi market",
    excerpt: "As the number of Bangladeshi students pursuing education abroad continues to grow, universities and recruitment agencies",
    date: "February 28, 2026",
    mainImage: "/images/media/media2.png",
    publicationAlt: "The Print",
    slug: "global-expansion-2026",
  },
  {
    id: 3,
    title: "Gresham Global Strengthens South Asia Education Networks",
    excerpt: "With the success of its inaugural event in Bangladesh, Gresham Global is now set to expand the Gresham Connect initiative",
    date: "February 20, 2026",
    mainImage: "/images/media/media3.png",
    publicationAlt: "Economic Times",
    slug: "innovation-award-2026",
  },
  {
    id: 4,
    title: "Gresham Global Simplifies Growth in South Asia for",
    excerpt: "The international higher education landscape is evolving rapidly, and South Asia has emerged as a critical region for student recruitment, institutional",
    date: "February 10, 2026",
    mainImage: "/images/media/media4.png",
    publicationAlt: "Hindustan Times",
    slug: "strategic-alliance-2026",
  },
  {
    id: 5,
    title: "Studying abroad - disease or an opportunity? Let's break",
    excerpt: "The honourable vice president of India, Jagdeep Dhankar, recently described the trend of students studying abroad as a",
    date: "January 30, 2026",
    mainImage: "/images/media/media5.png",
    publicationAlt: "NDTV",
    slug: "csr-initiative-2026",
  },
  {
    id: 6,
    title: "Gresham Global Becomes South Asia Representative for",
    excerpt: "Gresham Global is excited to announce its recent partnership with the University of Guelph, further solidifying its global presence",
    date: "January 18, 2026",
    mainImage: "/images/media/media6.webp",
    publicationAlt: "Mint",
    slug: "platform-launch-2026",
  },
  {
    id: 7,
    title: "Gresham Global Becomes South Asia Representative for",
    excerpt: "Gresham Global is excited to announce its recent partnership with the University of Guelph, further solidifying its global presence",
    date: "January 18, 2026",
    mainImage: "/images/media/media6.webp",
    publicationAlt: "Mint",
    slug: "platform-launch-2026",
  },
  {
    id: 8,
    title: "Gresham Global Becomes South Asia Representative for",
    excerpt: "Gresham Global is excited to announce its recent partnership with the University of Guelph, further solidifying its global presence",
    date: "January 18, 2026",
    mainImage: "/images/media/media6.webp",
    publicationAlt: "Mint",
    slug: "platform-launch-2026",
  },
  {
    id: 9,
    title: "Gresham Global Becomes South Asia Representative for",
    excerpt: "Gresham Global is excited to announce its recent partnership with the University of Guelph, further solidifying its global presence",
    date: "January 18, 2026",
    mainImage: "/images/media/media6.webp",
    publicationAlt: "Mint",
    slug: "platform-launch-2026",
  },
];

const blogsItems: NewsItem[] = [
  {
    id: 1,
    title: "Gresham Global Becomes South Asia Representative for",
    excerpt: "Gresham Global is excited to announce its recent partnership with the University of Guelph, further solidifying its global presence",
    date: "January 18, 2026",
    mainImage: "/images/media/media6.webp",
    publicationAlt: "Mint",
    slug: "platform-launch-2026",
  },
  {
    id: 2,
    title: "Gresham Global Becomes South Asia Representative for",
    excerpt: "Gresham Global is excited to announce its recent partnership with the University of Guelph, further solidifying its global presence",
    date: "January 18, 2026",
    mainImage: "/images/media/media6.webp",
    publicationAlt: "Mint",
    slug: "platform-launch-2026",
  },
];

// ─── Image Placeholder 
function ImgPlaceholder({ className, iconSize = 40 }: { className?: string; iconSize?: number }) {
  return (
    <div className={`bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center ${className ?? ""}`}>
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="#c4c9d0" strokeWidth="1.2">
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
    <div className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-2 duration-300">
      {/* 1. Main Image */}
      <div className="relative w-full h-52 flex-shrink-0 overflow-hidden">
        {item.mainImage ? (
          <Image src={item.mainImage} alt={item.title} fill className="object-cover" />
        ) : (
          <ImgPlaceholder className="absolute inset-0" iconSize={44} />
        )}
      </div>

      {/* 2. Date */}
      <div className="px-5 pt-4 pb-0">
        <p className="text-xs text-gray-400 font-medium tracking-wide">{item.date}</p>
      </div>

      {/* 3. Title */}
      <div className="px-5 pt-3">
        <h3 className="text-[15px] font-bold text-red-700 leading-snug line-clamp-2 transition-colors duration-300">
          {item.title}
        </h3>
      </div>

      {/* 4. Excerpt */}
      <div className="px-5 pt-2 flex-1">
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{item.excerpt}</p>
      </div>

      {/* 5. Divider + Read More + Share */}
      <div className="px-5 pt-4 pb-5 mt-auto">
        <hr className="border-gray-200 mb-4" />
        <div className="flex items-center justify-between">
          <Link
            href={`/media/${item.slug}`}
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

// ─── Toggle Switch 
function TabToggle({
  activeTab,
  onToggle,
}: {
  activeTab: "news" | "blogs";
  onToggle: (tab: "news" | "blogs") => void;
}) {
  return (
    <div
      className="relative flex items-center bg-gray-100 border border-gray-200 rounded-full p-1 w-fit"
      style={{ minWidth: 220 }}
    >
      {/* Sliding red pill */}
      <span
        className="absolute top-1 bottom-1 rounded-full bg-red-700 transition-all duration-300 ease-in-out"
        style={{
          width: "calc(50% - 4px)",
          left: activeTab === "news" ? "4px" : "calc(50%)",
        }}
      />

      {/* News button */}
      <button
        onClick={() => onToggle("news")}
        className={`relative z-10 flex-1 text-sm font-semibold uppercase tracking-wider py-2.5 px-6 rounded-full cursor-pointer transition-colors duration-300 ${
          activeTab === "news" ? "text-white" : "text-gray-500 hover:text-gray-700"
        }`}
      >
        News
      </button>

      {/* Blogs button */}
      <button
        onClick={() => onToggle("blogs")}
        className={`relative z-10 flex-1 text-sm font-semibold uppercase tracking-wider py-2.5 px-6 rounded-full cursor-pointer transition-colors duration-300 ${
          activeTab === "blogs" ? "text-white" : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Blogs
      </button>
    </div>
  );
}

// ─── Main Page 
const page = () => {
  const [activeTab, setActiveTab] = useState<"news" | "blogs">("news");
  const displayItems = activeTab === "news" ? newsItems : blogsItems;

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── Banner */}
      <section>
        <div className="relative w-full h-[250px] sm:h-[320px] md:h-[400px] lg:h-[450px] overflow-hidden">
          <Image
            src="/images/about/about-bannerimg.webp"
            alt="About Banner"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
              <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-28 -ml-9 leading-tight">
                News and Blogs
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tab Toggle */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-12 pb-0">
        <div className="flex items-center justify-center">
          <TabToggle activeTab={activeTab} onToggle={setActiveTab} />
        </div>
      </section>

      {/* ── Cards Grid  */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayItems.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </section>

    </main>
  );
};

export default page;
