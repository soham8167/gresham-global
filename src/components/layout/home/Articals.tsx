"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface Article {
  id: number;
  image: string;
  sourceLogo?: string;
  sourceColor: string;
  title: string;
  href?: string;
}
 
const mediaCards: Article[] = [
  {
    id: 1,
    image: "/images/home/articals/media1.png",
    sourceLogo: "/images/home/articals/medialogo1.png",
    sourceColor: "#E8192C",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
  {
    id: 2,
    image: "/images/home/articals/media2.png",
    sourceLogo: "/images/home/articals/medialogo2.png",
    sourceColor: "#000000",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
  {
    id: 3,
    image: "/images/home/articals/media3.png",
    sourceLogo: "/images/home/articals/medialogo5.svg",
    sourceColor: "#000000",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
  {
    id: 4,
    image: "/images/home/articals/media4.png",
    sourceLogo: "/images/home/articals/medialogo2.png",
    sourceColor: "#CC0000",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
  {
    id: 5,
    image: "/images/home/articals/media2.png",
    sourceLogo: "/images/home/articals/medialogo1.png",
    sourceColor: "#E8192C",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
  {
    id: 6,
    image: "/images/home/articals/media_5.webp",
    sourceLogo: "/images/home/articals/medialogo6.svg",
    sourceColor: "#00457C",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
];

const newsCards: Article[] = [
  {
    id: 1,
    image: "/images/home/articals/news1.webp",
    sourceColor: "#E8192C",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
  {
    id: 2,
    image: "/images/home/articals/news2.webp",
    sourceColor: "#333333",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
  {
    id: 3,
    image: "/images/home/articals/news3.webp",
    sourceColor: "#005B9A",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
  {
    id: 4,
    image: "/images/home/articals/news4.webp",
    sourceColor: "#E8192C",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
  {
    id: 5,
    image: "/images/home/articals/news5.jpg",
    sourceColor: "#1A7F4B",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
];

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

const CardImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative w-full h-[170px] sm:h-[190px] md:h-[200px] lg:h-[210px] overflow-hidden rounded-t-2xl bg-gray-100">
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,(max-width:1280px) 33vw,25vw"
    />
  </div>
);

const SourceLogo = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative w-[120px] sm:w-[140px] md:w-[160px] h-[30px] sm:h-[34px] md:h-[38px]">
    <Image
      src={src}
      alt={alt}
      fill
      className="object-contain object-left"
      sizes="160px"
    />
  </div>
);

const ArticleCard = ({ article }: { article: Article }) => (
  <div className="flex flex-col h-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <CardImage src={article.image} alt={article.title} />

    <div className="flex flex-col gap-3 p-4 sm:p-5 flex-1">
      {article.sourceLogo && (
        <SourceLogo src={article.sourceLogo} alt="publication logo" />
      )}

      <h3 className="text-[14px] sm:text-[15px] lg:text-[16px] font-bold text-gray-900 leading-snug flex-1">
        {article.title}
      </h3>

      <div>
        <a
          href={article.href ?? "#"}
          className="inline-block bg-[#E8192C] hover:bg-[#c41424] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-colors"
        >
          Read More
        </a>
      </div>
    </div>
  </div>
);

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

const Carousel = ({ cards }: { cards: Article[] }) => {
  const [index, setIndex] = useState(0);
  const visibleCount = useVisibleCount();
  const total = cards.length;

  const wrap = (i: number) => ((i % total) + total) % total;

  const prev = () => setIndex(wrap(index - 1));
  const next = () => setIndex(wrap(index + 1));

  const visibleCards = Array.from({ length: visibleCount }, (_, i) =>
    cards[wrap(index + i)]
  );

  return (
    <div className="relative w-full">

      {/* LEFT */}
      <button
        onClick={prev}
        className="absolute -left-4 sm:-left-6 lg:-left-10 top-1/2 -translate-y-1/2 z-10 text-red-500"
      >
        <svg className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      {/* RIGHT */}
      <button
        onClick={next}
        className="absolute -right-4 sm:-right-6 lg:-right-10 top-1/2 -translate-y-1/2 z-10 text-red-500"
      >
        <svg className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <div className="overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {visibleCards.map((card, i) => (
              <ArticleCard key={`${card.id}-${i}`} article={card} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <Dots total={total} active={index} onDotClick={setIndex} />
    </div>
  );
};

type Tab = "media" | "news";

const Articles = () => {
  const [activeTab, setActiveTab] = useState<Tab>("media");
  const cards = activeTab === "media" ? mediaCards : newsCards;

  return (
    <section className="w-full bg-[#eef0f3] py-12 sm:py-14 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Articles & Resources
          </h2>

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

        <Carousel cards={cards} key={activeTab} />

      </div>
    </section>
  );
};

export default Articles;