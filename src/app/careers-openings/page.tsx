import Image from "next/image"


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
    title: "Associate Representative - Canadian University",
    university: "A Canadian University",
    location: "Mumbai Based",
    jobType: "Full time | On-Site",
    workEx: "3 - 5 years",
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
          <span className="mt-1.75 w-1.25 h-1.25 rounded-full bg-gray-500 shrink-0" />
          University: {job.university}
        </li>
        <li className="flex items-start gap-2 text-sm text-gray-600">
          <span className="mt-1.75 w-1.25 h-1.25 rounded-full bg-gray-500 shrink-0" />
          Location: {job.location}
        </li>
        <li className="flex items-start gap-2 text-sm text-gray-600">
          <span className="mt-1.75 w-1.25 h-1.25 rounded-full bg-gray-500 shrink-0" />
          {job.jobType}
        </li>
        <li className="flex items-start gap-2 text-sm text-gray-600">
          <span className="mt-1.75 w-1.25 h-1.25 rounded-full bg-gray-500 shrink-0" />
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

const page = () => {
  return (
    <section>
       <div className="relative w-full h-62.5 sm:h-80 md:h-100 lg:h-112.5 overflow-hidden">
              <Image
                src="/images/about/about-bannerimg.webp"
                alt="About Banner"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/25 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
                  <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-28 -ml-9 leading-tight">
                    Careers Opening
                  </h1>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
    </section>
  )
}

export default page
