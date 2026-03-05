import Image from "next/image";

const Ourcommitment = () => {
  return (
    <section className="w-full bg-[#f6f6f6] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">

        {/* TITLE */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black">
          Our Commitment,{" "}
          <span className="text-red-600">Your Global Growth</span>
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-6 text-gray-600 text-[15px] sm:text-[16px] leading-7 max-w-3xl mx-auto">
          We prioritise understanding your institution’s unique landscape,
          ensuring our tailored strategies drive brand growth and cultivate
          regional success in India and South Asia.
        </p>

        {/* TIMELINE IMAGE */}
        <div className="relative w-full mt-16 h-[200px] sm:h-[260px] md:h-[320px] lg:h-[380px] xl:h-[420px]">
          <Image
            src="/images/home/Group.webp"
            alt="Our Commitment - Gresham Global"
            fill
            className="object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default Ourcommitment;