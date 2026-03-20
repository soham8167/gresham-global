"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@/lib/api";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Job {
  id: string;
  title: string;
  university: string;
  location: string;
  jobType: string;
  workEx: string;
  applyLink: string;
}

/* ─── SKELETON CARD ─── */
function JobCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      {/* Title */}
      <Skeleton height={24} width="75%" borderRadius={4} className="mb-4" />

      {/* Label */}
      <Skeleton height={13} width="40%" borderRadius={3} className="mb-3" />

      {/* List items */}
      <div className="space-y-2 mb-6 flex-1">
        <Skeleton height={13} width="80%" borderRadius={3} />
        <Skeleton height={13} width="60%" borderRadius={3} />
        <Skeleton height={13} width="50%" borderRadius={3} />
        <Skeleton height={13} width="65%" borderRadius={3} />
      </div>

      {/* Button */}
      <Skeleton height={38} width={110} borderRadius={8} />
    </div>
  );
}

/* ─── JOB CARD ─── */
function JobCard({ job }: { job: Job }) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ease-in-out p-6">

      <h3 className="text-[18px] sm:text-[19px] font-extrabold text-red-600 leading-snug mb-4">
        {job.title}
      </h3>

      <p className="text-sm font-semibold text-gray-700 mb-2">Job Description:</p>

      <ul className="space-y-1.5 mb-6 flex-1">
        <li className="flex items-start gap-2 text-sm text-gray-600">
          University: {job.university}
        </li>
        <li className="flex items-start gap-2 text-sm text-gray-600">
          Location: {job.location}
        </li>
        <li className="flex items-start gap-2 text-sm text-gray-600">
          {job.jobType}
        </li>
        <li className="flex items-start gap-2 text-sm text-gray-600">
          Work Ex: {job.workEx}
        </li>
      </ul>

      <div>
        <Link
          href={job.applyLink}
          className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-colors duration-300"
        >
          Apply Now
        </Link>
      </div>

    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function AllOpeningsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const jobs: Job[] =
    data?.docs?.map((item: any) => ({
      id: item.id,
      title: item.title,
      university: item.university,
      location: item.location,
      jobType: item.jobType,
      workEx: item.workEx,
      applyLink: `/careers-details/${item.id}`,
    })) || [];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Banner */}
      <section>
        <div className="relative w-full h-62.5 sm:h-80 md:h-100 lg:h-112.5 overflow-hidden">
          <Image
            src="/images/careers/career-bg.jpg"
            alt="Careers Banner"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
              <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl mt-28 leading-tight">
                All Openings
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-14 md:py-20">
        {error ? (
          <p className="text-center py-10 text-red-500">Error loading jobs</p>
        ) : (
          <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <JobCardSkeleton key={i} />
                  ))
                : jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
            </div>
          </SkeletonTheme>
        )}
      </section>

    </main>
  );
}