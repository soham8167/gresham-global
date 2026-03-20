import Image from "next/image";
import Link from "next/link";

export default function ReadyToImpact() {
  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-10">

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-10">

          {/* ── LEFT: circle frame with image ── */}
          <div className="relative shrink-0 w-70 h-70 sm:w-90 sm:h-90 md:w-105 md:h-105 lg:w-120 lg:h-145">
       {/* Image circle */}
            <div className="absolute inset-1 rounded-full overflow-hidden ">
              <Image
                src="/images/careers/impact-section.png"
                alt="Ready to make an impact"
                fill
                className="object-cover"
                sizes="(max-width:768px) 280px, 420px"
              />
            </div>

          </div>

          {/* ── RIGHT: text content ── */}
          <div className="flex flex-col items-start max-w-xl">
            
            <h2 className="text-4xl sm:text-5xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Ready to Make  an <br className="hidden sm:block" />Impact?
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-8">
              Explore our current openings and discover how you can contribute to Gresham Global Together, let's build a brighter future.
            </p>
            <Link
              href="/all-openings"
              className="inline-flex items-center gap-3 bg-red-700 hover:bg-red-800 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-700/30 hover:-translate-y-0.5"
            >
              Current Openings
              
            </Link>
          </div>
        
        </div>
      </div>
    </section>
  );
}
