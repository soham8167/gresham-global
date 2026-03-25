import CurrentOpenings from "@/components/layout/careers/Currentopenings";
import LifeAtGresham from "@/components/layout/careers/Lifeatgresham";
import ReadyToImpact from "@/components/layout/careers/Readytoimpact";
import Ourvalues from "@/components/layout/home/Ourvalues";
import Image from "next/image";

// ─── Why Work With Us Cards Data 
const whyCards = [
  {
    id: 1,
    icon: "/images/services/fi_3207533.svg",
    title: "A Culture of Innovation",
    description:
      "We embrace creativity and forward-thinking, empowering our team members to bring their ideas to life.",
  },
  {
    id: 2,
    icon: "/images/services/fi_9670967.svg",
    title: "Professional Development",
    description:
      "Our learning and development programs are designed to help you acquire new skills, grow professionally, and achieve your career goals.",
  },
  {
    id: 3,
    icon: "/images/services/financialcomicon.svg",
    title: "Work-Life Balance",
    description:
      "We understand the importance of balance and offer flexible work arrangements to help you thrive both personally and professionally.",
  },
  {
    id: 4,
    icon: "/images/services/fi_3207533.svg",
    title: "Diversity & Inclusion",
    description:
      "We celebrate diversity and are committed to creating an inclusive environment where everyone can succeed.",
  },
  {
    id: 5,
    icon: "/images/services/fi_9670967.svg",
    title: "Rewards & Recognition",
    description:
      "We value hard work and celebrate achievements with competitive compensation, bonuses, and employee recognition programs.",
  },
];

// ─── Why Card 
function WhyCard({ card }: { card: (typeof whyCards)[0] }) {
  return (
    <div className="
      group relative flex flex-col gap-4 p-7
      bg-white border border-gray-200 rounded-xl
      cursor-default select-none
      transition-all duration-300 ease-in-out
      hover:bg-red-500 hover:-translate-y-1  
    ">
      {/* Icon box */}
      <div className="
        w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0
        group-hover:bg-white/90 transition-colors duration-300
      ">
        {card.icon ? (
          <div className="relative w-7 h-7"> 
            <Image
              src={card.icon}
              alt={card.title}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          /* Red SVG placeholder icon */
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        )}
      </div>

      {/* Title */}
      <h3 className="
        text-[17px] font-bold text-gray-900 leading-snug
        group-hover:text-white transition-colors duration-300
      ">
        {card.title}
      </h3>

      {/* Description */}
      <p className="
        text-sm text-gray-500 leading-relaxed
        group-hover:text-white transition-colors duration-300
      ">
        {card.description}
      </p>
    </div>
  );
}

// ─── Main Page 
const page = () => {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero Banner: Full-width image, dark overlay left, text on left ── */}
      <section className="relative w-full h-80 sm:h-95 md:h-110 lg:h-125 overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/media/media1.png"
          alt="Careers at Gresham Global"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Dark gradient overlay — strong on left, fades right */}
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/50 to-transparent" />

        {/* Text content — bottom-left aligned */}
        <div className="absolute inset-0 flex items-end pb-12 sm:pb-14 md:pb-16">
          <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 md:px-12">
            <div className="max-w-lg">
              <h1 className="text-white font-extrabold text-5xl sm:text-6xl md:text-7xl leading-none mb-5">
                Careers
              </h1>
              <p className="text-white/85 text-sm sm:text-base leading-relaxed font-medium">
                India and South Asia & vast and diverse landscape presents immense
                opportunities for international universities seeking to expand their footprint. We
                offer tailored research and assessment solutions designed to ensure your
                institution & growth is both impactful and long-term.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Work With Us */}
      <section className="bg-gray-50 py-16 md:py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">

    {/* ── Row 1: Heading (left) + first 2 cards (right) ── */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 mb-5 md:mb-6">

      {/* Heading cell */}
      <div className="flex items-center lg:items-start lg:pt-2">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          Why Work<br />with Us?
        </h2>
      </div>

      {/* Card 1 */}
      <WhyCard card={whyCards[0]} />

      {/* Card 2 */}
      <WhyCard card={whyCards[1]} />
    </div>

    {/* ── Row 2: 3 cards full width ── */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
      <WhyCard card={whyCards[2]} />
      <WhyCard card={whyCards[3]} />
      <WhyCard card={whyCards[4]} />
    </div>

  </div>
</section>

<Ourvalues/>
<LifeAtGresham/>
<CurrentOpenings/>
<ReadyToImpact/>
    </main>
  );
};

export default page;
