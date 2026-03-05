import Image from "next/image";

const values = [
  {
    title: "COMPLIANCE",
    text: "Ensuring adherence to regulations, policies, and ethical standards",
    icon: "/images/home/compliance-icon.webp",
  },
  {
    title: "QUALITY",
    text: "Maintaining high standards in recruitment, partnerships, and collaboration",
    icon: "/images/home/quality-icon.webp",
  },
  {
    title: "COMMITMENT",
    text: "Aligning with your goals to ensure success",
    icon: "/images/home/commitment-icon.webp",
  },
  {
    title: "GROWTH",
    text: "Expanding visibility, numbers, and impact across South Asia",
    icon: "/images/home/growth-icon.webp",
  },
  {
    title: "TRANSPARENCY",
    text: "Maintaining clear communication and accountability",
    icon: "/images/home/transparency-icon.webp",
  },
];

const Ourvalues = () => {
  const leftValues = values.slice(0, 2);
  const rightValues = values.slice(2);

  return (
    <section className="w-full">
      <div className="flex flex-col lg:flex-row">

        {/* LEFT IMAGE */}
        <div className="relative w-full lg:w-[40%] h-[420px] sm:h-[520px] lg:h-auto">
          <Image
            src="/images/home/our-values.webp"
            alt="Our Values - Gresham Global"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full lg:w-[60%] bg-[#f2f2f2] px-6 sm:px-10 lg:px-16 py-16">

  <div className="grid sm:grid-cols-2 ">

    {/* LEFT COLUMN */}
    <div>
      <h2 className="text-[64px] font-extrabold text-red-600 leading-none mb-14">
        OUR <br /> VALUES
      </h2>

      <div className="flex flex-col gap-12">
        {leftValues.map((item, index) => (
          <div key={index}>

            {/* ICON + TITLE */}
            <div className="flex items-center gap-6">
              <div className="w-[90px] h-[90px] rounded-full bg-red-600 flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={80}
                  height={80}
                />
              </div>

              <h3 className="font-bold text-[22px] tracking-wide">
                {item.title}
              </h3>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-[15px] leading-relaxed mt-3 max-w-[300px]">
              {item.text}
            </p>

          </div>
        ))}
      </div>
    </div>

    {/* RIGHT COLUMN */}
    <div className="flex flex-col gap-12 mt-[20px]">
      {rightValues.map((item, index) => (
        <div key={index}>

          {/* ICON + TITLE */}
          <div className="flex items-center gap-6">
            <div className="w-[90px] h-[90px] rounded-full bg-red-600 flex items-center justify-center">
              <Image
                src={item.icon}
                alt={item.title}
                width={80}
                height={80}
              />
            </div>

            <h3 className="font-bold text-[22px] tracking-wide">
              {item.title}
            </h3>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 text-[15px] leading-relaxed mt-3  max-w-[300px]">
            {item.text}
          </p>

        </div>
      ))}
    </div>

  </div>
</div>
      </div>
    </section>
  );
};

export default Ourvalues;