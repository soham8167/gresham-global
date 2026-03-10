import Image from "next/image";

const About = () => {
  return (
    /* ABOUT US SECTION */
    <section className="w-full bg-white py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 xl:gap-22">

          {/* ── Left : Image ── */}
          <div className="w-full lg:w-[45%] shrink-0">
            <div className="relative w-full aspect-4/3 lg:aspect-4/3 max-w-137.5 mx-auto lg:mx-0 overflow-hidden rounded-2xl right-10">
              <Image
                src="/images/home/abouthome.webp"
                alt="About Us — Gresham Global team"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 520px"
                priority
              />
            </div>
          </div>

          {/* ── Right : Text ── */}
          <div className="w-full lg:w-[55%]">
            <h2 className="text-[36px] sm:text-[40px] lg:text-[46px] font-extrabold text-black leading-tight tracking-tight mb-7">
              About Us
            </h2>

            <p className="text-[15px] sm:text-[16px] lg:text-[18px] text-gray-600 leading-7 mb-5">
              We deliver comprehensive solutions to ensure your university's success,
              from establishing in-country representation and driving strategic market
              development to executing on-the-ground initiatives and streamlining
              admissions support. Acting as an integrated extension of your team, we
              manage local operations with precision and care, underpinned by deep
              expertise and understanding of the South Asia region.
            </p>

            <p className="text-[15px] sm:text-[16px] lg:text-[18px] text-gray-600 leading-7">
              Our approach turns your international goals into measurable results,
              connecting you with a diverse and talented student diaspora while helping
              establish a lasting presence in one of the world's fastest-growing
              education markets.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
