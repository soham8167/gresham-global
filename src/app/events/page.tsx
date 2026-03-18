// import Image from "next/image";
// import Link from "next/link";
// import { Share2 } from "lucide-react";

// // ─── Types 
// interface NewsItem {
//   id: number;
//   title: string;
//   excerpt: string;
//   mainImage: string;
//   date: string;       
//   publicationAlt: string;
//   slug: string;
// }

// // ─── Mock Data 
// const newsItems: NewsItem[] = [
//   {
//     id: 1,
//     title: "GACC 2025 by Gresham Global Focuses on Future Proof Career",
//     excerpt:"Gresham Global successfully hosted the second edition of its high-impact conference, the Gresham Annual",
//     mainImage: "/images/media/media1.png",
//     date: "March 05, 2026",
//     publicationAlt: "Business Standard",
//     slug: "q4-results-2026",
//   },
//   {
//     id: 2,
//     title: "Unis and agencies work to leverage Bangladeshi market",
//     excerpt:"As the number of Bangladeshi students pursuing education abroad continues to grow, universities and recruitment agencies",
//     mainImage: "/images/media/media2.png",
//     date: "March 05, 2026",
//     publicationAlt: "The Print",
//     slug: "global-expansion-2026",
//   },
//   {
//     id: 3,
//     title: "Gresham Global Strengthens South Asia Education Networks",
//     excerpt:"With the success of its inaugural event in Bangladesh, Gresham Global is now set to expand the Gresham Connect initiative",
//     mainImage: "/images/media/media3.png",
//     date: "Janury 05, 2026",
//     publicationAlt: "Economic Times",
//     slug: "innovation-award-2026",
//   },

  
// ];

// // ─── Image Placeholder 
// function ImgPlaceholder({
//   className,
//   iconSize = 40,
// }: {
//   className?: string;
//   iconSize?: number;
// }) {
//   return (
//     <div
//       className={`bg-linear-to-br from-gray-200 to-gray-300  flex items-center justify-center ${className ?? ""}`}
//     >
//       <svg
//         width={iconSize}
//         height={iconSize}
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="#c4c9d0"
//         strokeWidth="1.2"
//       >
//         <rect x="3" y="3" width="18" height="18" rx="2" />
//         <circle cx="8.5" cy="8.5" r="1.5" />
//         <polyline points="21 15 16 10 5 21" />
//       </svg>
//     </div>
//   );
// }

// // ─── News Card 
// function NewsCard({ item }: { item: NewsItem }) {
//   return (
//     <div className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:-translate-y-2 transition-shadow duration-300 ">

//       {/* 1. Main Image (top) */}
//       <div className="relative w-full h-52 shrink-0 overflow-hidden">
//         {item.mainImage ? (
//           <Image
//             src={item.mainImage}
//             alt={item.title}
//             fill
//             className="object-cover"
//           />
//         ) : (
//           <ImgPlaceholder className="absolute inset-0" iconSize={44} />
//         )}
//       </div>
// <div className="px-5 pt-4 pb-0">
//         <p className="text-xs text-gray-400 font-medium tracking-wide">
//           {item.date}
//         </p>
//       </div>


      

//       {/* 4. Title */}
//       <div className="px-5 pt-3">
//         <h3 className="text-[15px] font-bold text-red-700 leading-snug line-clamp-2  transition-colors duration-300">
//           {item.title}
//         </h3>
//       </div>

//       {/* 5. Excerpt */}
//       <div className="px-5 pt-2 flex-1">
//         <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
//           {item.excerpt}
//         </p>
//       </div>
     

//       {/* 6. Divider + Read More + Share */}
//       <div className="px-5 pt-4 pb-5 mt-auto">
//         <hr className="border-gray-200 mb-4" />
//         <div className="flex items-center justify-between">
//           <Link
//             href={`/media/${item.slug}`}
//             className="inline-block bg-red-700 text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded transition-colors duration-300"
//           >
//             Read More
//           </Link>
//           <button
//             aria-label="Share"
//             className="flex items-center justify-center w-9 h-9 rounded-full cursor-pointer text-gray-400 transition-colors duration-300"
//           >
//             <Share2 size={25} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Main Page 
// const page = () => {
//   return (
//     <main className="min-h-screen bg-gray-50">

//       {/* ── Banner */}
//       <section>
//         <div className="relative w-full h-62.5 sm:h-80 md:h-100 lg:h-112.5 overflow-hidden">
//           <Image
//             src="/images/about/about-bannerimg.webp"
//             alt="About Banner"
//             fill
//             priority
//             className="object-cover object-center"
//           />
//           <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/25 to-transparent" />
//           <div className="absolute inset-0 flex items-center">
//             <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
//               <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-28 -ml-9 leading-tight">
//                Events
//               </h1>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── Cards Grid */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-14 md:py-20 ">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ">
//           {newsItems.map((item) => (
//             <NewsCard key={item.id} item={item} />
//           ))}
//         </div>
//       </section>

//     </main>
//   );
// };

// export default page;











"use client";

import Image from "next/image";
import Link from "next/link";
import { Share2, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/lib/api";

// ─── Types
interface EventItem {
  id: string;
  title: string;
  excerpt: string;
  mainImage: string;
  date: string;
  slug: string;
}

// ─── Helper: extract plain text from Payload Lexical rich text
function extractPlainText(description: any): string {
  if (!description?.root?.children) return "";
  return description.root.children
    .flatMap((node: any) => node.children ?? [])
    .map((child: any) => child.text ?? "")
    .join(" ");
}

// ─── Format date nicely
function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ─── Image Placeholder
function ImgPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={`bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center ${className ?? ""}`}
    >
      <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#c4c9d0" strokeWidth="1.2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  );
}

// ─── Event Card
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

      {/* Excerpt */}
      <div className="px-5 pt-2 flex-1">
        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
          {item.excerpt}
        </p>
      </div>

      {/* Buttons */}
      <div className="px-5 pt-4 pb-5 mt-auto">
        <hr className="border-gray-200 mb-4" />
        <div className="flex items-center justify-between">
          <Link
            href={`/events/${item.slug}`}
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

// ─── Main Page
export default function EventsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        {/* Skeleton Banner */}
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
      description: extractPlainText(item.description),
      date: item.date,
      mainImage: item.mainImage?.url || "",
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
