"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchPublications } from "@/lib/api";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BASE_URL =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_URL
    : process.env.NEXT_PUBLIC_BASE_URL;

// 🔹 Globe Icon
const GlobeIcon = () => (
  <span className="shrink-0 w-4 h-4 flex items-center justify-center">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4 text-white"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
    </svg>
  </span>
);

// 🔹 Fetch by title
const fetchPublicationByTitle = async (title: string) => {
  const decoded = decodeURIComponent(title);
  const url = `${BASE_URL}/publications?where[title][equals]=${encodeURIComponent(decoded)}&depth=2`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
  const data = await res.json();
  if (!data.docs || data.docs.length === 0) throw new Error("No document found");
  return data.docs[0];
};

export default function Page() {
  const params = useParams();
  const titleParam = Array.isArray(params.title) ? params.title[0] : params.title;

  // Single publication
  const { data, isLoading, error } = useQuery({
    queryKey: ["publication", titleParam],
    queryFn: () => fetchPublicationByTitle(titleParam!),
    enabled: !!titleParam,
  });

  // All publications (for similar section)
  const { data: allData } = useQuery({
    queryKey: ["publications"],
    queryFn: fetchPublications,
  });

  // ── Loading
  if (isLoading) {
    return (
      <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
        <div className="min-h-screen">
          {/* Hero skeleton */}
          <Skeleton height={384} />

          {/* Cover + Title skeleton */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-10 md:py-16">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
              <div className="w-full md:w-56 lg:w-64 xl:w-72 shrink-0">
                <Skeleton height={360} borderRadius={16} />
                <Skeleton height={48} className="mt-4" borderRadius={8} />
              </div>
              <div className="flex-1">
                <Skeleton height={48} className="mb-4" />
                <Skeleton height={24} count={4} className="mb-2" />
              </div>
            </div>
          </div>

          {/* Flip cards skeleton */}
          <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-6">
              <Skeleton height={36} width={280} className="mx-auto mb-12" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Skeleton height={320} borderRadius={16} />
                <Skeleton height={320} borderRadius={16} />
                <Skeleton height={320} borderRadius={16} />
              </div>
            </div>
          </div>

          {/* Key highlights skeleton */}
          <div className="py-16 px-4 sm:px-6 md:px-10" style={{ background: "linear-gradient(135deg, #e8e8e8 0%, #f5f5f5 50%, #e0e0e0 100%)" }}>
            <Skeleton height={40} width={240} className="mx-auto mb-14" />
            <div className="max-w-5xl mx-auto flex justify-between gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <Skeleton circle height={104} width={104} />
                  <Skeleton height={80} width={140} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  // ── Error
  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-4xl">📄</p>
          <h2 className="text-gray-800 font-bold text-xl">Publication Not Found</h2>
          <p className="text-gray-500 text-sm">We couldn't find this publication.</p>
          <Link
            href="/publications"
            className="inline-block mt-2 bg-red-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-800 transition-colors"
          >
            Back to Publications
          </Link>
        </div>
      </div>
    );
  }

  const similar: any[] =
    allData?.docs?.filter((item: any) => item.title !== data.title) ?? [];

  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <div className="bg-white min-h-screen">

        {/* SECTION 1 — HERO BANNER */}
        <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
          {data.mainImage?.url ? (
            <Image
              src={data.mainImage.url}
              alt={data.title}
              fill
              priority
              className="object-cover object-center"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-r from-gray-200 to-gray-300 flex items-center justify-center">
              <p className="text-gray-400 text-sm">No banner image</p>
            </div>
          )}
        </div>

        {/* SECTION 2 — COVER + TITLE + SUMMARY */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-10 md:py-16">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">

            {/* LEFT — Report Cover */}
            <div className="w-full md:w-72 lg:w-80 xl:w-96 shrink-0">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                {data.detailsPageImage?.url ? (
                  <Image
                    src={data.detailsPageImage.url}
                    alt={data.title}
                    width={400}
                    height={200}
                    className="w-full h-100 md:h-125 lg:h-100 object-cover "
                  />
                ) : (
                  <div className="w-full h-72 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <p className="text-gray-400 text-xs text-center px-4">No cover image</p>
                  </div>
                )}
              </div>

              <button className="mt-4 w-full flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 active:bg-red-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 text-sm md:text-base">
                Download Report
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
                  />
                </svg>
              </button>
            </div>

            {/* RIGHT — Title + Summary */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4 md:mb-6">
                {data.title}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                {data.summary || "No summary available."}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3 — WHAT THE REPORT INCLUDES (FLIP CARDS) */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              What the Report Includes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data?.frontSections?.map((section: any, index: number) => (
                <div
                  key={index}
                  className="group perspective-[1000px] h-80 w-full cursor-pointer"
                >
                  <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                    {/* FRONT */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg [backface-visibility:hidden]">
                      {section.image?.url && (
                        <Image
                          src={section.image.url}
                          alt={section["front-title"] || "section"}
                          fill
                          className="object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/30" />
                      <h3 className="absolute bottom-6 left-6 text-white text-2xl font-semibold">
                        {section["front-title"]}
                      </h3>
                      <div className="absolute bottom-2 right-3 w-12 h-12">
                        <Image
                          src="/images/services/rotate.webp"
                          alt="rotate"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* BACK */}
                    <div className="absolute inset-0 rounded-2xl bg-red-600 text-white p-6 shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <h3 className="text-2xl font-semibold mb-5">
                        {section["front-title"]}
                      </h3>
                      <ul className="space-y-3 text-sm">
                        {section.points?.map((point: any, i: number) => (
                          <li key={i} className="flex items-center gap-2">
                            <GlobeIcon />
                            {point.text}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4 — KEY HIGHLIGHTS TIMELINE */}
       {data?.details?.length > 0 && (
  <div
    className="py-12 md:py-16 lg:py-20"
    style={{
      background: "linear-gradient(135deg, #e8e8e8 0%, #f5f5f5 50%, #e0e0e0 100%)",
      position: "relative",
    }}
  >
    
    <div
      className="absolute hidden md:block pointer-events-none"
      style={{
        top: "240px",
        left: 0,
        right: 0,
        borderTop: "2px dashed #aaa",
        zIndex: 0,
      }}
    />

    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12 md:mb-16">
        Key Highlights
      </h2>

      {/* ── DESKTOP TIMELINE ── */}
      <div className="hidden md:block">
        <div className="relative flex items-start justify-between gap-8">
          {data.details.map((item: any, i: number) => (
            <div
              key={i}
              className="relative flex flex-col items-center flex-1"
              style={{ zIndex: 1 }}
            >
              
              <div
                className="ring-4 ring-white shadow-lg"
                style={{
                  width: "128px",
                  height: "128px",
                  minWidth: "128px",
                  borderRadius: "50%",
                  background: "transparent",
                  flexShrink: 0,
                  overflow: "hidden",
                  position: "relative",
                  outline: "2px dashed #bbb",
                  outlineOffset: "5px",
                }}
              >
                {item.detailImage?.url && (
                  <Image
                    src={item.detailImage.url}
                    alt="highlight icon"
                    fill
                    className="object-contain "
                  />
                )}
              </div>

              {/* Connector: dashed vertical → hollow ring → dashed vertical → filled dot */}
              <div className="flex flex-col items-center mt-[6px]">
                <div style={{ borderLeft: "2px dashed #aaa", height: "28px" }} />
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    border: "2px solid #999",
                    background: "#fff",
                    margin: "2px 0",
                  }}
                />
                <div style={{ borderLeft: "2px dashed #aaa", height: "16px" }} />
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#999",
                    marginTop: "2px",
                  }}
                />
              </div>

              {/* Description text */}
              <p
                className="text-center text-gray-600 text-xs lg:text-sm leading-relaxed mt-3"
                style={{ maxWidth: "180px" }}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE TIMELINE — vertical ── */}
      <div className="md:hidden flex flex-col gap-8">
        {data.details.map((item: any, i: number) => (
          <div key={i} className="flex gap-5 items-center">
            <div
              className="shrink-0 ring-4 ring-white shadow-md"
              style={{
                width: "80px",
                height: "80px",
                minWidth: "80px",
                borderRadius: "50%",
                background: "transparent",
                overflow: "hidden",
                position: "relative",
                outline: "2px dashed #bbb",
                outlineOffset: "4px",
              }}
            >
              {item.detailImage?.url && (
                <Image
                  src={item.detailImage.url}
                  alt="highlight icon"
                  fill
                  className="object-contain p-3"
                />
              )}
            </div>
            <p
              className="text-gray-600 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        ))}
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-12 md:mt-14">
        <button className="flex items-center gap-2 bg-red-700 hover:bg-red-800 active:bg-red-900 text-white font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors duration-300 shadow text-sm sm:text-base">
          Download Report
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
)}



        {/* SECTION 5 — SIMILAR PUBLICATIONS */}
        {similar.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-12 md:py-16">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 md:mb-8">
              Similar Publications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {similar.slice(0, 3).map((item: any) => (
                <Link
                  key={item.id}
                  href={`/publications/${encodeURIComponent(item.title)}`}
                >
                  <div className="bg-white rounded-xl shadow hover:shadow-lg p-4 cursor-pointer transition-all duration-300 hover:-translate-y-1">
                    {item.mainImage?.url && (
                      <div className="relative w-full h-44 sm:h-48 rounded-lg overflow-hidden mb-3">
                        <Image
                          src={item.mainImage.url}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </SkeletonTheme>
  );
}
