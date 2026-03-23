

"use client"

import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { fetchCareerDetails } from "@/lib/api"
import { useState, use } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

interface CareerDetail {
  title: string 
  university: string
  location: string
  jobType: string
  workEx: string
  aboutJob: string
}

function ApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", city: "",
    workExperience: "", about: "", resume: null as File | null,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFormData({ ...formData, resume: e.target.files[0] })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="py-10 text-center">
        <p className="text-green-600 font-bold">Application submitted successfully!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { label: "Full Name*", name: "fullName", type: "text" },
        { label: "Email*", name: "email", type: "email" },
        { label: "Phone Number*", name: "phone", type: "tel" },
        { label: "City*", name: "city", type: "text" },
      ].map((field) => (
        <div key={field.name} className="flex flex-col gap-1">
          <label className="text-[12px] font-bold text-gray-800">{field.label}</label>
          <input
            name={field.name}
            type={field.type}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-gray-400"
          />
        </div>
      ))}

      <div className="flex flex-col gap-1">
        <label className="text-[12px] font-bold text-gray-800">Work Experience*</label>
        <select
          name="workExperience"
          onChange={handleChange}
          required
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-white outline-none focus:border-gray-400"
        >
          <option value="" disabled>Select Experience</option>
          <option value="fresher">Fresher</option>
          <option value="1-3">1 – 3 years</option>
          <option value="4-8">4 – 8 years</option>
          <option value="8+">8+ years</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[12px] font-bold text-gray-800">Tell us about yourself*</label>
        <textarea
          name="about"
          onChange={handleChange}
          required
          rows={3}
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-gray-400 resize-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[12px] font-bold text-gray-800">Upload CV/Resume*</label>
        <div className="flex items-center border border-gray-200 rounded overflow-hidden">
          <label className="cursor-pointer bg-gray-100 px-3 py-1.5 text-[12px] border-r border-gray-200 hover:bg-gray-200 transition-colors">
            Choose File
            <input type="file" onChange={handleFile} required className="hidden" />
          </label>
          <span className="px-3 text-[12px] text-gray-400 truncate">
            {formData.resume ? formData.resume.name : "No file chosen"}
          </span>
        </div>
        <p className="text-[10px] text-gray-400 mt-1">
          Maximum allowed file size: 10 MB. Allowed types: PDF, DOC, DOCX, PPT, PPTX
        </p>
      </div>

      <p className="text-[10px] text-gray-500 leading-tight">
        By using this form you agree with the storage and handling of your data by this website.
      </p>

      <button
        type="submit"
        disabled={loading}
        className="bg-[#e31e24] hover:bg-red-700 text-white font-bold text-sm px-8 py-2.5 rounded transition-colors shadow-sm"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  )
}

/* ─── CAREER DETAIL SKELETON ─── */
function CareerDetailSkeleton() {
  return (
    <div className="space-y-5">
      {/* Main heading */}
      <Skeleton height={28} width="55%" borderRadius={4} />

      {/* Sub-heading / role line */}
      <Skeleton height={18} width="35%" borderRadius={4} />

      {/* Paragraph block 1 */}
      <div className="space-y-2 pt-2">
        <Skeleton height={14} borderRadius={3} />
        <Skeleton height={14} borderRadius={3} />
        <Skeleton height={14} width="80%" borderRadius={3} />
      </div>

      {/* Section heading */}
      <Skeleton height={20} width="40%" borderRadius={4} />

      {/* Paragraph block 2 */}
      <div className="space-y-2">
        <Skeleton height={14} borderRadius={3} />
        <Skeleton height={14} borderRadius={3} />
        <Skeleton height={14} width="65%" borderRadius={3} />
      </div>

      {/* Bullet list skeleton */}
      <div className="space-y-2 pl-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton circle width={6} height={6} />
            <Skeleton height={13} width={`${60 + i * 7}%`} borderRadius={3} />
          </div>
        ))}
      </div>

      {/* Section heading 2 */}
      <Skeleton height={20} width="45%" borderRadius={4} />

      {/* Paragraph block 3 */}
      <div className="space-y-2">
        <Skeleton height={14} borderRadius={3} />
        <Skeleton height={14} borderRadius={3} />
        <Skeleton height={14} width="70%" borderRadius={3} />
      </div>
    </div>
  )
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data, isLoading } = useQuery<CareerDetail>({
    queryKey: ["careerDetail", id],
    queryFn: () => fetchCareerDetails(id),
    enabled: !!id,
  })

  return (
    <main className="min-h-screen bg-white">

      {/* Hero Banner */}
      <section className="relative w-full h-140">
        <Image
          src="/images/careers/career-bg.jpg"
          alt="Banner"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-6 lg:px-12">
            {isLoading ? (
              <Skeleton
                height={48}
                width="50%"
                borderRadius={6}
                baseColor="#ffffff20"
                highlightColor="#ffffff40"
              />
            ) : (
              <h1 className="text-white font-bold text-3xl md:text-5xl">
                {data?.title || "Career Details"}
              </h1>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-auto mx-auto px-4 sm:px-6 lg:px-3 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_550px] gap-8">

          {/* LEFT — Job description */}
          <div className="bg-white rounded-lg p-5 sm:p-6">
            <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
              {isLoading ? (
                <CareerDetailSkeleton />
              ) : (
                <div
                  className="prose prose-sm md:prose-base max-w-none
                    whitespace-normal
                    prose-img:max-w-full prose-img:h-auto
                    prose-pre:overflow-x-auto
                    prose-p:leading-relaxed
                    prose-li:leading-relaxed"
                  style={{ wordBreak: "keep-all" }}
                  dangerouslySetInnerHTML={{
                    __html: data?.aboutJob
                      ?.replace(/<wbr\s*\/?>/g, "")
                      ?.replace(/&nbsp;/g, " ") ?? ""
                  }}
                />
              )}
            </SkeletonTheme>
          </div>

          {/* RIGHT — Application form */}
          <div className="w-full lg:pr-12">
            <div className="lg:sticky lg:top-10 bg-white rounded-lg shadow-md p-5 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Interested in this job?
              </h2>
              <ApplicationForm />
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}