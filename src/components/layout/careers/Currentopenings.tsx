





"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@/lib/api";

interface Job {
  id: string;
  title: string;
  university: string;
  location: string;
  jobType: string;
  workEx: string;
  applyLink: string;
}

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

export default function CurrentOpenings() {

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading jobs...</p>;
  }

  if (error) {
    return <p className="text-center py-10">Error loading jobs</p>;
  }

  const jobs: Job[] = data?.docs?.map((item: any) => {
    

    return {
      id: item.id,
      title: item.title,
      university: item.university,
      location: item.location,
      jobType: item.jobType,
      workEx: item.workEx,
      //  if linked, go to career-details page; else go to general careers page
      applyLink: `/careers-details/${item.id}`,
    }
  }) || [];

  return (
    <section className="bg-gray-100 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">

        <div className="flex items-center justify-between mb-8 md:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Current Openings
          </h2>
          <Link
            href="/careers-openings"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-6 py-3 rounded-lg"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {jobs.slice(0, 3).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

      </div>
    </section>
  );
}
