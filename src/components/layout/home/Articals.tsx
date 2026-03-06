"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// ─── Types 

interface Article {
  id: number;
  image: string;
  sourceLogo?: string;
  sourceColor: string;
  title: string;
  href?: string;
}

// ─── Data 

const mediaCards: Article[] = [
  {
    id: 1,
    image: "/images/home/articals/media1.png",
    sourceLogo: "/images/home/articals/medialogo1.png",
    sourceColor: "#E8192C",
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
  {
    id: 2,
    image: "/images/home/articals/media2.png",
    sourceLogo: "/images/home/articals/medialogo2.png",
    sourceColor: "#000000",
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
  {
    id: 3,
    image: "/images/home/articals/media3.png",
    sourceLogo: "/images/home/articals/medialogo5.svg",
    sourceColor: "#000000",
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
  {
    id: 4,
    image: "/images/home/articals/media4.png",
    sourceLogo: "/images/home/articals/medialogo2.png",
    sourceColor: "#CC0000",
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
  {
    id: 5,
    image: "/images/home/articals/media2.png",
   sourceLogo: "/images/home/articals/medialogo1.png",
    sourceColor: "#E8192C",
    title:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
  {
    id: 6,
    image: "/images/home/articals/media_5.webp",
    sourceLogo: "/images/home/articals/medialogo6.svg",
    sourceColor: "#00457C",
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
];

const newsCards: Article[] = [
  {
    id: 1,
    image: "/images/home/articals/news1.jpg",
    sourceColor: "#E8192C",
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
  {
    id: 2,
    image: "/images/home/articals/news2.webp",
    sourceColor: "#333333",
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
  {
    id: 3,
    image: "/images/home/articals/news3.webp",
    sourceColor: "#005B9A",
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
  {
    id: 4,
    image: "/images/home/articals/news4.webp",
    sourceColor: "#E8192C",
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
  {
    id: 5,
    image: "/images/home/articals/news5.jpg",
    sourceColor: "#1A7F4B",
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus eum numquam facere praesentium consequatur dolores!",
    href: "#",
  },
];

// ─── useVisibleCount 

function useVisibleCount(): number {
  const [count, setCount] = useState(4);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCount(1);
      else if (window.innerWidth < 1024) setCount(2);
      else setCount(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

// ─── Card Image 

const CardImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative w-full h-[190px] sm:h-[210px] overflow-hidden rounded-t-2xl bg-gray-100">
    <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" />
  </div>
);

// ─── Source Logo 

const SourceLogo = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative w-[160px] h-[38px]">
    <Image
      src={src}
      alt={alt}
      fill
      className="object-contain object-left"
      sizes="160px"
    />
  </div>
);

// ─── Article Card 

const ArticleCard = ({ article }: { article: Article }) => (
  <div className="flex flex-col h-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <CardImage src={article.image} alt={article.title} />
    <div className="flex flex-col gap-3 p-5 flex-1">
      {/* Source logo – only for media cards */}
      {article.sourceLogo && (
        <SourceLogo src={article.sourceLogo} alt="publication logo" />
      )}
      <h3 className="text-[15px] font-bold text-gray-900 leading-snug flex-1">
        {article.title}
      </h3>
      <div>
        <a
          href={article.href ?? "#"}
          className="mt-2 inline-block bg-[#E8192C] hover:bg-[#c41424] active:bg-[#a01020] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors duration-200"
        >
          Read More
        </a>
      </div>
    </div>
  </div>
);

// ─── Arrow Button 

const ArrowButton = ({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    aria-label={direction === "left" ? "Previous slide" : "Next slide"}
    className="flex items-center justify-center    text-red-500  transition-all duration-200 cursor-pointer "
  >
    {direction === "left" ? (
      <svg className="w-15 h-15" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    ) : (
      <svg className="w-15 h-15" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    )}
  </button>
);

// ─── Dot Indicators 

const Dots = ({
  total,
  active,
  onDotClick,
}: {
  total: number;
  active: number;
  onDotClick: (i: number) => void;
}) => (
  <div className="flex items-center justify-center gap-2.5 mt-8">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        aria-label={`Go to slide ${i + 1}`}
        onClick={() => onDotClick(i)}
        className={`rounded-full transition-all duration-300 ${
          i === active
            ? "bg-[#E8192C] w-8 h-3.5"
            : "bg-gray-300 hover:bg-gray-400 w-3.5 h-3.5"
        }`}
      />
    ))}
  </div>
);




// ─── Carousel 

const Carousel = ({ cards }: { cards: Article[] }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const visibleCount = useVisibleCount();
  const total = cards.length;

  const wrap = (i: number) => ((i % total) + total) % total;

  const goTo = (i: number, dir: 1 | -1) => {
    setDirection(dir);
    setIndex(wrap(i));
  };

  const prev = () => goTo(index - 1, -1);
  const next = () => goTo(index + 1, 1);

  useEffect(() => {
    setIndex(0);
    setDirection(1);
  }, [cards]);

  const visibleCards = Array.from({ length: visibleCount }, (_, i) =>
    cards[wrap(index + i)]
  );

  return (
    <div className="relative w-full">

      {/* LEFT ARROW */}
      <button
        onClick={prev}
        className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 text-red-500 cursor-pointer"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={next}
        className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 text-red-500 cursor-pointer"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* CARDS */}
      <div className="overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {visibleCards.map((card, i) => (
              <ArticleCard key={`${card.id}-${i}`} article={card} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DOTS */}
      <Dots
        total={total}
        active={index}
        onDotClick={(i) => goTo(i, i > index ? 1 : -1)}
      />
    </div>
  );
};

// ─── Main Component 

type Tab = "media" | "news";

const Articles = () => {
  const [activeTab, setActiveTab] = useState<Tab>("media");
  const cards = activeTab === "media" ? mediaCards : newsCards;

  return (
    <section className="w-full bg-[#eef0f3] py-14 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Articles & Resources
          </h2>

          {/* Tab Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab("media")}
              className={`px-6 py-2.5 rounded-lg text-lg font-bold transition-all duration-200 border-2 cursor-pointer ${
                activeTab === "media"
                  ? "bg-[#E8192C] border-[#E8192C] text-white shadow-md"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            >
              Media
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={`px-6 py-2.5 rounded-lg text-lg font-bold transition-all duration-200 border cursor-pointer ${
                activeTab === "news"
                  ? "bg-[#E8192C] border-[#E8192C] text-white shadow-md"
                  : "bg-white border-gray-300 text-gray-800 "
              }`}
            >
              News & Blogs
            </button>
          </div>
        </div>

        {/* Carousel */}
        <Carousel cards={cards} key={activeTab} />

      </div>
    </section>
  );
};

export default Articles;
