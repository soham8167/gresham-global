"use client";

import Link from "next/link";

interface Job {
  id: number;
  title: string;
  university: string;
  location: string;
  jobType: string;
  workEx: string;
  applyLink: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Compliance & Admissions Associate – UK University",
    university: "A UK University",
    location: "Mumbai Based",
    jobType: "Full time | On-Site",
    workEx: "2 years",
    applyLink: "#",
  },
  {
    id: 2,
    title: "Student Outreach Officer – UK University",
    university: "A UK University",
    location: "Mumbai Based",
    jobType: "Full time | On-Site",
    workEx: "3 years",
    applyLink: "#",
  },
  {
    id: 3,
    title: "Associate Representative – Canadian University",
    university: "A Canadian University",
    location: "Mumbai Based",
    jobType: "Full time | On-Site",
    workEx: "3 – 5 years",
    applyLink: "#",
  },
];

function JobCard({ job }: { job: Job }) {
  return (
    <div className="
      group flex flex-col bg-white rounded-2xl
      border border-gray-200
      shadow-sm hover:shadow-xl
      hover:-translate-y-2 hover:scale-[1.02]
      transition-all duration-300 ease-in-out
      p-6
    ">
      {/* Title */}
      <h3 className="text-[18px] sm:text-[19px] font-extrabold text-red-600 leading-snug mb-4">
        {job.title}
      </h3>

      {/* Job Description label */}
      <p className="text-sm font-semibold text-gray-700 mb-2">Job Description:</p>

      {/* Bullet points */}
      <ul className="space-y-1.5 mb-6 flex-1">
        <li className="flex items-start gap-2 text-sm text-gray-600">
          <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-gray-500 flex-shrink-0" />
          University: {job.university}
        </li>
        <li className="flex items-start gap-2 text-sm text-gray-600">
          <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-gray-500 flex-shrink-0" />
          Location: {job.location}
        </li>
        <li className="flex items-start gap-2 text-sm text-gray-600">
          <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-gray-500 flex-shrink-0" />
          {job.jobType}
        </li>
        <li className="flex items-start gap-2 text-sm text-gray-600">
          <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-gray-500 flex-shrink-0" />
          Work Ex: {job.workEx}
        </li>
      </ul>

      {/* Apply Now button */}
      <div>
        <a
          href={job.applyLink}
          className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-colors duration-300"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}

export default function CurrentOpenings() {
  return (
    <section className="bg-gray-100 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">

        {/* ── Header: title left, red View All button right ── */}
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Current Openings
          </h2>
          <Link
            href="/careers/openings"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-6 py-3 rounded-lg transition-colors duration-300 flex-shrink-0"
          >
            View All
          </Link>
        </div>

        {/* ── 3-card grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

      </div>
    </section>
  );
}
