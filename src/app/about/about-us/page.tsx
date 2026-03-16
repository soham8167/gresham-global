import Articles from "@/components/layout/home/Articals";
import Ourvalues from "@/components/layout/home/Ourvalues";
import Image from "next/image";

const Page = () => {
  return (
    <section >
      
     <div className="relative w-full h-62.5 sm:h-80 md:h-100 lg:h-112.5 overflow-hidden">
         {/* Background Image */}
      <Image
        src="/images/about/about-bannerimg.webp"
        alt="About Banner"
        fill
        priority
        
      />     

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
          <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            About Us
          </h1>
        </div>
      </div>
     </div>
    <div className="w-full  py-12 md:py-16 lg:py-20">
  <div className="max-w-7xl mx-auto px-6 md:px-12">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

      {/* Left Image */}
      <div className="flex justify-center md:justify-start">
        <Image
          src="/images/about/aboutusauimg.webp"
          alt="About Image"
          width={420}
          height={520}
          priority
          className="object-contain"
        />
      </div>

      {/* Right Text */}
      <div className="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed lg: w-180 ">

        <p>
          With a focus on international education, we empower international
          universities to thrive and expand in the rapidly evolving Indian
          and South Asian markets. Our comprehensive suite of services is
          designed to elevate your institution’s presence, attract top-tier
          students, and drive significant recruitment growth.
        </p>

        <p>
          From in-country representation and market development to hands-on
          execution and admissions support, we offer everything your
          university needs to succeed. We don’t just consult; we integrate
          as an extension of your team, managing local operations with
          precision, supported by our in-depth regional expertise.
        </p>

      </div>

    </div>

  </div>
</div>

<div className="w-full bg-white py-16 md:py-20 lg:py-24">
  <div className="max-w-7xl mx-auto px-6 md:px-12">

    {/* Section Title */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-14">
      Our Founders
    </h2>

    {/* Founders Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">

      {/* Founder Card 1 - Jaspreet Singh */}
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start lg:w-150 h-90">
        <div className="flex flex-col items-center sm:items-start shrink-0">
          <div className="w-32 h-36 sm:w-36 sm:h-40 rounded-xl overflow-hidden ">
            <Image
              src="/images/about/Group1.webp"
              alt="Jaspreet Singh"
              width={144}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="mt-3 text-base font-bold text-gray-900 text-center sm:text-left">
            Jaspreet Singh
          </h3>
          <p className="text-sm font-semibold text-gray-500 text-center sm:text-left">
            Co-Founder
          </p>
        </div>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          With 20 years of experience, Jaspreet specializes in market entry, strategic
          partnerships, and student recruitment, enabling universities to establish and
          grow their presence in South Asia. His expertise in opening avenues in new
          markets has been instrumental to Gresham Global's success.
        </p>
      </div>

      {/* Founder Card 2 - Jasminder Khanna */}
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start lg:w-150 h-90">
        <div className="flex flex-col items-center sm:items-start shrink-0">
          <div className="w-32 h-36 sm:w-36 sm:h-40 rounded-xl overflow-hidden ">
            <Image
              src="/images/about/Group2.webp"
              alt="Jasminder Khanna"
              width={144}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="mt-3 text-base font-bold text-gray-900 text-center sm:text-left">
            Jasminder Khanna
          </h3>
          <p className="text-sm font-semibold text-gray-500 text-center sm:text-left">
            Co-Founder and CEO
          </p>
        </div>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          Jasminder brings over 15 years of experience in the higher education sector.
          With a strong focus on strategic partnerships and in-country representation,
          he has played a pivotal role in assisting international universities to grow
          in developing markets. His in-depth knowledge of the South Asian education
          landscape and his commitment to excellence ensure impactful outcomes for
          partner institutions worldwide.
        </p>
      </div>

    </div>
  </div>
</div>

<Ourvalues/>
<Articles/>
    </section>
  );
};

export default Page;