import Image from "next/image";

export default function Whychoose() {
  return (
    <section className="w-full bg-[#f6f6f6] py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* LEFT CONTENT */}
          <div className="w-full lg:w-[55%]">
            <h2 className="text-[36px] sm:text-[40px] lg:text-[46px] font-extrabold text-black leading-tight mb-6">
              Why Choose Us?
            </h2>

            <p className="text-gray-600 text-[15px] sm:text-[16px] lg:text-[18px] leading-7 mb-5">
              We understand that every university is unique, and entering the
              dynamic South Asian market requires a bespoke approach. Rather
              than applying generic strategies, we take the time to understand
              your vision, strengths, and objectives.
            </p>

            <p className="text-gray-600 text-[15px] sm:text-[16px] lg:text-[18px] leading-7">
              Our tailored solutions are built around your specific goals—
              whether it’s forging meaningful partnerships, creating bespoke
              marketing campaigns, elevating your institution’s profile, or
              driving strategic recruitment. We work to ensure your university
              stands out in this diverse region.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full lg:w-[75%] relative">
            <div className="relative w-full h-80 sm:h-90 md:h-105 lg:h-115 translate-x-0 lg:translate-x-14">
              <Image
                src="/images/home/whychoose.webp"
                alt="Why Choose Us - Gresham Global"
                fill
                className="object-contain"
                sizes="(max-width:768px) 100vw, (max-width:1200px) 45vw, 520px"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}