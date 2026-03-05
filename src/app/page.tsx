import Image from "next/image";
import About from "@/components/layout/home/About";
import Whychoose from "@/components/layout/home/Whychoose";
import Ourcommitment from "@/components/layout/home/Ourcommitment";
import Ourvalues from "@/components/layout/home/Ourvalues";
import Articals from "@/components/layout/home/Articals";
import OurPartner from "@/components/layout/home/Ourpartner";

export default function HomePage() {
  return (
    <main>
      {/* HERO SECTION — Video background*/}
      <section className="relative w-full min-h-[420px] md:min-h-[500px] lg:min-h-[520px] flex items-center overflow-hidden bg-black">

        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="/images/footer/footer-video.mp4" type="video/mp4" />
        </video>

        {/* Very subtle left-to-black gradient so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-[600px]">
            <h1 className="text-[48px] sm:text-[58px] lg:text-[68px] font-extrabold leading-[1.05] text-red-600 tracking-tight">
              Your Global<br />Growth Partner
            </h1>
            <p className="mt-6 text-[15px] sm:text-[16px] lg:text-[17px] text-white/90 leading-7 font-normal max-w-[480px]">
              We are an in-country representative specialist firm for higher education
              institutions looking to expand their reach in India and South Asia
            </p>
          </div>
        </div>

      </section>
      <About/>

       <Whychoose/>
       <Ourcommitment/>
       <Ourvalues/>
       <Articals/>
       <OurPartner/>
    </main>
  );
}
