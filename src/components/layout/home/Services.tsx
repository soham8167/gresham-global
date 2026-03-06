"use client";

import Image from "next/image";

const services = [
  {
    title: "Research & Assessment",
    image: "/images/home/articals/news5.jpg",
    points: [
      "Market Analysis & Research",
      "Market Analysis & Research",
      "Market Analysis & Research",
      "Market Analysis & Research",
    ],
  },
  {
    title: "In-Country Representation",
    image: "/images/home/articals/news5.jpg",
    points: [
      "Student Engagement & Recruitment",
      "Student Engagement & Recruitment",
      "Student Engagement & Recruitment",
      "Student Engagement & Recruitment",
    ],
  },
  {
    title: "Operational Support",
    image: "/images/home/articals/news5.jpg",
    points: [
      "Talent Acquisition",
      "Talent Acquisition",
      "Talent Acquisition",
      "Talent Acquisition",
    ],
  },
  {
    title: "Academic Collaboration",
    image: "/images/home/articals/news5.jpg",
    points: [
      "University Partnerships",
      "University Partnerships",
      "University Partnerships",
      "University Partnerships",
    ],
  },
  {
    title: "Strategic Marketing",
    image: "/images/home/articals/news5.jpg",
    points: [
      "Digital Marketing",
      "Digital Marketing",
      "Digital Marketing",
      "Digital Marketing",
    ],
  },
  {
    title: "Admission Compliance",
    image: "/images/home/articals/news5.jpg",
    points: [
      "Documentation Review",
      "Documentation Review",
      "Documentation Review",
      "Documentation Review",
    ],
  },
];

const Services = () => {
  return (
    <section className="relative py-20 bg-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-7xl font-bold text-center mb-16">Services</h2>

        {/* cards grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={index} className="group [perspective:1000px] h-[280px] w-[400px]">
              <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* FRONT CARD */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg [backface-visibility:hidden]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />

                  {/* overlay */}
                  <div className="absolute inset-0 bg-black/60"></div>

                  {/* title */}
                 <h3 className="absolute bottom-6 left-6 text-white text-3xl font-semibold whitespace-pre-line max-w-[200px] leading-tight">
                {service.title}
            </h3>

                  <div className="absolute bottom-2 right-3 w-15 h-15 opacity-90">
                    <Image
                      src="/images/services/rotate.webp"
                      alt="logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* BACK CARD */}
                <div className="absolute inset-0 rounded-2xl bg-red-600 text-white p-6 shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <h3 className="text-3xl font-semibold mb-5">
                    {service.title}
                  </h3>

                  <ul className="space-y-3 text-sm">
                    {service.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span>•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* bottom decorative logo */}
      </div>
    </section>
  );
};

export default Services;
