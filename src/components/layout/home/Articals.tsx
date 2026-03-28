// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";

// interface Article {
//   id: number;
//   image: string;
//   sourceLogo?: string; 
//   sourceColor: string; 
//   title: string;
//   href?: string;
// } 

// const mediaCards: Article[] = [
//   { id: 1, image: "/images/home/articals/media1.png", sourceLogo: "/images/home/articals/medialogo1.png", sourceColor: "#E8192C", title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!", href: "https://www.business-standard.com/content/press-releases-ani/gresham-global-becomes-south-asia-representative-for-university-of-guelph-124102100639_1.html" },
//   { id: 2, image: "/images/home/articals/media2.png", sourceLogo: "/images/home/articals/medialogo2.png", sourceColor: "#000000", title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!", href: "https://www.business-standard.com/amp/content/press-releases-ani/gacc-2025-by-gresham-global-focuses-on-future-proof-career-opportunities-125092300414_1.html" },
//   { id: 3, image: "/images/home/articals/media3.png", sourceLogo: "/images/home/articals/medialogo5.svg", sourceColor: "#000000", title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!", href: "https://thepienews.com/unis-and-agencies-work-to-leverage-bangladeshi-market/" },
//   { id: 4, image: "/images/home/articals/media4.png", sourceLogo: "/images/home/articals/medialogo2.png", sourceColor: "#CC0000", title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!", href: "https://www.hindustantimes.com/brand-stories/gresham-global-strengthens-south-asia-education-networks-with-inaugural-gresham-connect-event-in-bangladesh-101741068844870.html" },
//   { id: 5, image: "/images/home/articals/media2.png", sourceLogo: "/images/home/articals/medialogo1.png", sourceColor: "#E8192C", title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!", href: "https://www.ptinews.com/press-release/gresham-global-simplifies-south-asia-growth-for-international-universities/2330553" },
//   { id: 6, image: "/images/home/articals/media_5.webp", sourceLogo: "/images/home/articals/medialogo6.svg", sourceColor: "#00457C", title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!", href: "https://thepienews.com/studying-abroad-disease-or-an-opportunity-lets-break-the-myth/" },
// ];

// const newsCards: Article[] = [
//   { id: 1, image: "/images/home/articals/news1.webp", sourceColor: "#E8192C", title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!", href: "#" },
//   { id: 2, image: "/images/home/articals/news2.webp", sourceColor: "#333333", title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!", href: "#" },
//   { id: 3, image: "/images/home/articals/news3.webp", sourceColor: "#005B9A", title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!", href: "#" },
//   { id: 4, image: "/images/home/articals/news4.webp", sourceColor: "#E8192C", title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!", href: "#" },
//   { id: 5, image: "/images/home/articals/news5.jpg", sourceColor: "#1A7F4B", title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!", href: "#" },
// ];

// function useVisibleCount(): number {
//   const [count, setCount] = useState(4);
//   useEffect(() => {
//     const update = () => {
//       if (window.innerWidth < 640) setCount(1);
//       else if (window.innerWidth < 1024) setCount(2);
//       else if (window.innerWidth < 1280) setCount(3);
//       else setCount(4);
//     };
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);
//   return count;
// }


// const ArticleCard = ({ article }: { article: Article }) => (
//   <div className="flex flex-col h-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden shrink-0">
//     <div className="relative w-full h-42.5 sm:h-47.5 md:h-50 overflow-hidden rounded-t-2xl bg-gray-100">
//       <Image src={article.image} alt={article.title} fill className="object-cover" sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,(max-width:1280px) 33vw,25vw" />
//     </div>
//     <div className="flex flex-col gap-3 p-4 sm:p-5 flex-1">
//       {article.sourceLogo && (
//         <div className="relative w-30 sm:w-35 md:w-40 h-7.5 sm:h-8.5 md:h-9.5">
//           <Image src={article.sourceLogo} alt="publication logo" fill className="object-contain object-left" sizes="160px" />
//         </div>
//       )}
//       <h3 className="text-[14px] sm:text-[15px] lg:text-[16px] font-bold text-gray-900 leading-snug flex-1">{article.title}</h3>
//       <div>
//         <a href={article.href ?? "#"} className="inline-block bg-[#E8192C] hover:bg-[#c41424] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-colors">
//           Read More
//         </a>
//       </div>
//     </div>
//   </div>
// );

// const Dots = ({ total, active, onDotClick }: { total: number; active: number; onDotClick: (i: number) => void }) => (
//   <div className="flex items-center justify-center gap-2 sm:gap-2.5 mt-6 sm:mt-8">
//     {Array.from({ length: total }).map((_, i) => (
//       <button key={i} onClick={() => onDotClick(i)} className={`rounded-full transition-all duration-300 ${i === active ? "bg-[#E8192C] w-7 sm:w-8 h-3" : "bg-gray-300 hover:bg-gray-400 w-3 h-3"}`} />
//     ))}
//   </div>
// );

// const BUFFER = 3;

// const Carousel = ({ cards }: { cards: Article[] }) => {
//   const total = cards.length;
//   const visibleCount = useVisibleCount();

//   // ── Single-argument wrap — closes over `total` 
//   const wrap = (i: number) => ((i % total) + total) % total;

//   const [rawIndex, setRawIndex] = useState(BUFFER * total);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [enableTransition, setEnableTransition] = useState(true);
//   const trackRef = useRef<HTMLDivElement>(null);

//   const stripLength = (2 * BUFFER + 1) * total;
//   const stripCards = Array.from({ length: stripLength }, (_, i) => cards[wrap(i)]);
//   const trackWidthMultiple = stripLength / visibleCount;
//   const translateXPct = -(rawIndex / stripLength) * 100;

//   const go = (newRaw: number) => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setEnableTransition(true);
//     setRawIndex(newRaw);
//     setTimeout(() => {
//       setRawIndex((prev) => {
//         const equivalent = BUFFER * total + wrap(prev);
//         if (prev !== equivalent) {
//           setEnableTransition(false);
//           return equivalent;
//         }
//         return prev;
//       });
//       setIsAnimating(false);
//     }, 430);
//   };

//   useEffect(() => {
//     if (!enableTransition) {
//       const id = requestAnimationFrame(() => setEnableTransition(true)); 
//       return () => cancelAnimationFrame(id);
//     }
//   }, [enableTransition]);

//   const prev = () => go(rawIndex - 1);
//   const next = () => go(rawIndex + 1);

//   // ── dotClick: no second arg to wrap 
//   const dotClick = (i: number) => {
//     const current = wrap(rawIndex);          
//     const forward = wrap(i - current);       
//     const backward = total - forward;
//     go(rawIndex + (forward <= backward ? forward : -backward)); 
//   };

//   return (
//     <>
//       <style>{`
//         .carousel-track-infinite { transition: transform 0.42s cubic-bezier(0.4, 0, 0.2, 1); }
//         .carousel-track-instant  { transition: none !important; }
//       `}</style>

//       <div className="relative w-full">
//         <button onClick={prev} disabled={isAnimating} className="absolute -left-4 sm:-left-6 lg:-left-10 top-[40%] -translate-y-1/2 z-10 text-red-500 disabled:opacity-40">
//           <svg className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>

//         <button onClick={next} disabled={isAnimating} className="absolute -right-4 sm:-right-6 lg:-right-10 top-[40%] -translate-y-1/2 z-10 text-red-500 disabled:opacity-40">
//           <svg className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//           </svg>
//         </button>

//         <div className="overflow-hidden w-full">
//           <div
//             ref={trackRef}
//             className={enableTransition ? "carousel-track-infinite flex" : "carousel-track-instant flex"}
//             style={{
//               width: `${trackWidthMultiple * 100}%`,
//               transform: `translateX(${translateXPct}%)`,
//             }}
//           >
//             {stripCards.map((card, i) => (
//               <div key={i} style={{ width: `${(100 / visibleCount) / trackWidthMultiple}%` }} className="px-2 sm:px-3 box-border">
//                 <ArticleCard article={card} />
//               </div>
//             ))}
//           </div>
//         </div>

//         <Dots total={total} active={wrap(rawIndex)} onDotClick={dotClick} />
//       </div>
//     </>
//   );
// };

// type Tab = "media" | "news";

// const Articles = () => {
//   const [activeTab, setActiveTab] = useState<Tab>("media");
//   const cards = activeTab === "media" ? mediaCards : newsCards;

//   return (
//     <section className="w-full bg-[#eef0f3] py-12 sm:py-14 lg:py-15">
//       <div className="max-w-450 mx-auto px-6 sm:px-8 lg:px-14">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
//           <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
//             Articles & Resources
//           </h2>
//           <div className="flex items-center gap-2">
//             <button onClick={() => setActiveTab("media")} className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base lg:text-lg font-bold border-2 transition ${activeTab === "media" ? "bg-[#E8192C] border-[#E8192C] text-white" : "bg-white border-gray-300 text-gray-800"}`}>
//               Media
//             </button>
//             <button onClick={() => setActiveTab("news")} className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base lg:text-lg font-bold border transition ${activeTab === "news" ? "bg-[#E8192C] border-[#E8192C] text-white" : "bg-white border-gray-300 text-gray-800"}`}>
//               News & Blogs
//             </button>
//           </div>
//         </div>
//         <Carousel cards={cards} key={activeTab} />
//       </div>
//     </section>
//   );
// };

// export default Articles; 





















"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchMediaNews, fetchNewsBlogs } from "@/lib/api";
import { slugify } from "@/lib/slugify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// ─── Types 

interface Article {
  id: number;
  image: string;
  sourceLogo?: string;
  sourceColor: string;
  title: string;
  href?: string;
}

// ─── Image helper (same as news-blogs pages) 

const BASE_URL = "https://gresham-global-cms.onrender.com";

const getImageUrl = (url?: string): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${BASE_URL}${url.replace("/api/media/file", "/media")}`;
};

// ─── Responsive visible count hook 

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

// ─── Skeleton Card 

function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-md overflow-hidden shrink-0">
      <Skeleton height={200} borderRadius={0} />
      <div className="flex flex-col gap-3 p-4 sm:p-5 flex-1">
        <Skeleton width={140} height={34} borderRadius={4} />
        <Skeleton height={16} />
        <Skeleton width="70%" height={16} />
        <Skeleton width={100} height={36} borderRadius={8} />
      </div>
    </div>
  );
}

// ─── Article Card 

const ArticleCard = ({ article }: { article: Article }) => {
  const isExternal =
    !!article.href &&
    article.href !== "#" &&
    (article.href.startsWith("http://") || article.href.startsWith("https://"));

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden shrink-0">
      <div className="relative w-full h-42.5 sm:h-47.5 md:h-50 overflow-hidden rounded-t-2xl bg-gray-100">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,(max-width:1280px) 33vw,25vw"
          unoptimized
        />
      </div>
      <div className="flex flex-col gap-3 p-4 sm:p-5 flex-1">
        {article.sourceLogo && (
          <div className="relative w-30 sm:w-35 md:w-40 h-7.5 sm:h-8.5 md:h-9.5">
            <Image
              src={article.sourceLogo}
              alt="publication logo"
              fill
              className="object-contain object-left"
              sizes="160px"
              unoptimized
            />
          </div>
        )}
        <h3 className="text-[14px] sm:text-[15px] lg:text-[16px] font-bold text-gray-900 leading-snug flex-1">
          {article.title}
        </h3>
        <div>
         <a 
            href={article.href ?? "#"}
            {...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="inline-block bg-[#E8192C] hover:bg-[#c41424] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-colors"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── Dots 

const Dots = ({
  total,
  active,
  onDotClick,
}: {
  total: number;
  active: number;
  onDotClick: (i: number) => void;
}) => (
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

// ─── Carousel 

const BUFFER = 3;

const Carousel = ({
  cards,
  isLoading,
}: {
  cards: Article[];
  isLoading?: boolean;
}) => {
  const visibleCount = useVisibleCount();

  if (isLoading) {
    return (
      <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
        <div
          className="grid gap-4 sm:gap-6"
          style={{
            gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: visibleCount }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 mt-6 sm:mt-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-full bg-gray-300 ${
                i === 0 ? "w-7 sm:w-8 h-3" : "w-3 h-3"
              }`}
            />
          ))}
        </div>
      </SkeletonTheme>
    );
  }

  if (!cards.length) {
    return (
      <p className="text-center py-10 text-gray-400 text-sm">
        No articles found.
      </p>
    );
  }

  return <CarouselInner cards={cards} />;
};

// ─── Carousel Inner 

const CarouselInner = ({ cards }: { cards: Article[] }) => {
  const total = cards.length;
  const visibleCount = useVisibleCount();

  const wrap = (i: number) => ((i % total) + total) % total;

  const [rawIndex, setRawIndex] = useState(BUFFER * total);
  const [isAnimating, setIsAnimating] = useState(false);
  const [enableTransition, setEnableTransition] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  const stripLength = (2 * BUFFER + 1) * total;
  const stripCards = Array.from({ length: stripLength }, (_, i) =>
    cards[wrap(i)]
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

  return (
    <>
      <style>{`
        .carousel-track-infinite { transition: transform 0.42s cubic-bezier(0.4, 0, 0.2, 1); }
        .carousel-track-instant  { transition: none !important; }
      `}</style>

      <div className="relative w-full">
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

        <div className="overflow-hidden w-full">
          <div
            ref={trackRef}
            className={
              enableTransition
                ? "carousel-track-infinite flex"
                : "carousel-track-instant flex"
            }
            style={{
              width: `${trackWidthMultiple * 100}%`,
              transform: `translateX(${translateXPct}%)`,
            }}
          >
            {stripCards.map((card, i) => (
              <div
                key={i}
                style={{
                  width: `${(100 / visibleCount) / trackWidthMultiple}%`,
                }}
                className="px-2 sm:px-3 box-border"
              >
                <ArticleCard article={card} />
              </div>
            ))}
          </div>
        </div>

        <Dots total={total} active={wrap(rawIndex)} onDotClick={dotClick} />
      </div>
    </>
  );
};

// ─── Tab types 

type MainTab = "media" | "news";
type NewsSubTab = "news" | "blogs";

// ─── Main Component 

const Articles = () => {
  const [activeTab, setActiveTab] = useState<MainTab>("media");
  const [newsSubTab, setNewsSubTab] = useState<NewsSubTab>("news");

  // ── Media data ──
  const {
    data: mediaData,
    isLoading: mediaLoading,
    error: mediaError,
  } = useQuery({
    queryKey: ["mediaNews"],
    queryFn: fetchMediaNews,
  });

  // ── News & Blogs data ──
  const {
    data: newsBlogsData,
    isLoading: newsBlogsLoading,
    error: newsBlogsError,
  } = useQuery({
    queryKey: ["newsBlogs"],
    queryFn: fetchNewsBlogs,
  });

  // ── Map media → Article ──
  const mediaCards: Article[] =
    mediaData?.docs?.map((item: any) => ({
      id: item.id,
      image: item.mainImage?.url ?? "",
      sourceLogo: item.publicationLogo?.url ?? undefined,
      sourceColor: "#E8192C",
      title: item.title,
      href: item.slug ?? "#",
    })) ?? [];

  // ── Map news-blogs → Article, split by type ──
  const allNewsBlogsCards: Article[] =
    newsBlogsData?.docs?.map((item: any) => ({
      id: item.id,
      image: getImageUrl(item.mainImage?.url),
      sourceColor: "#E8192C",
      title: item.title,
      href: `/media/news-blogs/${slugify(item.title)}?ref=${item.slug}`,
      _type: item.type, // carry type for filtering
    })) ?? [];

  const newsCards = allNewsBlogsCards.filter((c: any) => c._type === "news");
  const blogsCards = allNewsBlogsCards.filter((c: any) => c._type === "blogs");

  // ── Active cards & loading state ──
  const activeCards =
    activeTab === "media"
      ? mediaCards
      : newsSubTab === "news"
      ? newsCards
      : blogsCards;

  const activeLoading =
    activeTab === "media" ? mediaLoading : newsBlogsLoading;

  const activeError =
    activeTab === "media" ? mediaError : newsBlogsError;

  // ── Carousel key: remount on tab or sub-tab change ──
  const carouselKey =
    activeTab === "media" ? "media" : `news-${newsSubTab}`;

  return (
    <section className="w-full bg-[#eef0f3] py-12 sm:py-14 lg:py-15">
      <div className="max-w-450 mx-auto px-6 sm:px-8 lg:px-14">

        {/* ── Header row ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Articles & Resources
          </h2>

          {/* Main tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("media")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base lg:text-lg font-bold border-2 transition ${
                activeTab === "media"
                  ? "bg-[#E8192C] border-[#E8192C] text-white"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            >
              Media
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base lg:text-lg font-bold border transition ${
                activeTab === "news"
                  ? "bg-[#E8192C] border-[#E8192C] text-white"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            >
              News & Blogs
            </button>
          </div>
        </div>

        {/* ── News & Blogs sub-tabs (only visible when News & Blogs tab is active) ── */}
        {activeTab === "news" && (
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setNewsSubTab("news")}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-semibold border transition ${
                newsSubTab === "news"
                  ? "bg-gray-800 border-gray-800 text-white"
                  : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              News
            </button>
            <button
              onClick={() => setNewsSubTab("blogs")}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-semibold border transition ${
                newsSubTab === "blogs"
                  ? "bg-gray-800 border-gray-800 text-white"
                  : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              Blogs
            </button>
          </div>
        )}

        {/* ── Carousel ── */}
        {activeError ? (
          <p className="text-center py-10 text-red-500">
            Error loading articles.
          </p>
        ) : (
          <Carousel
            cards={activeCards}
            isLoading={activeLoading}
            key={carouselKey}
          />
        )}
      </div>
    </section>
  );
};

export default Articles;