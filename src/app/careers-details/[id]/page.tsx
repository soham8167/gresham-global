

// "use client"

// import Image from "next/image"
// import { useQuery } from "@tanstack/react-query"
// import { fetchCareerDetails } from "@/lib/api"
// import { useState, use } from "react"

// // ─── Types — matched exactly to Payload CMS response
// interface AboutJobPoint {
//   point: string
//   id?: string
// }

// interface CareerDetail {
//   title: string
//   aboutJobPoints: AboutJobPoint[]  //correct field name from API
// }

// // ─── Application Form
// function ApplicationForm() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     city: "",
//     workExperience: "",
//     about: "",
//     resume: null as File | null,
//   })
//   const [submitted, setSubmitted] = useState(false)
//   const [loading, setLoading] = useState(false)

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) setFormData({ ...formData, resume: e.target.files[0] })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     await new Promise((r) => setTimeout(r, 1200))
//     setLoading(false)
//     setSubmitted(true)
//   }

//   if (submitted) {
//     return (
//       <div className="py-10 text-center">
//         <p className="text-green-600 font-semibold text-lg">Application submitted successfully!</p>
//         <p className="text-gray-500 text-sm mt-2">We will get back to you soon.</p>
//       </div>
//     )
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">

//       <div className="flex flex-col gap-1">
//         <label className="text-sm font-medium text-gray-800">Full Name*</label>
//         <input
//           name="fullName"
//           type="text"
//           value={formData.fullName}
//           onChange={handleChange}
//           required
//           className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-gray-500"
//         />
//       </div>

//       <div className="flex flex-col gap-1">
//         <label className="text-sm font-medium text-gray-800">Email*</label>
//         <input
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-gray-500"
//         />
//       </div>

//       <div className="flex flex-col gap-1">
//         <label className="text-sm font-medium text-gray-800">Phone Number*</label>
//         <input
//           name="phone"
//           type="tel"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//           className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-gray-500"
//         />
//       </div>

//       <div className="flex flex-col gap-1">
//         <label className="text-sm font-medium text-gray-800">City*</label>
//         <input
//           name="city"
//           type="text"
//           value={formData.city}
//           onChange={handleChange}
//           required
//           className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-gray-500"
//         />
//       </div>

//       <div className="flex flex-col gap-1">
//         <label className="text-sm font-medium text-gray-800">Work Experience*</label>
//         <select
//           name="workExperience"
//           value={formData.workExperience}
//           onChange={handleChange}
//           required
//           className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-500 outline-none focus:border-gray-500 bg-white"
//         >
//           <option value="" disabled>Select Experience</option>
//           <option value="fresher">Fresher</option>
//           <option value="1-2">1 – 3 years</option>
//           <option value="3-5">4 – 8 years</option>
//           <option value="5+">8+ years</option>
//         </select>
//       </div>

//       <div className="flex flex-col gap-1">
//         <label className="text-sm font-medium text-gray-800">Tell us about yourself*</label>
//         <textarea
//           name="about"
//           value={formData.about}
//           onChange={handleChange}
//           required
//           rows={5}
//           className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-gray-500 resize-y"
//         />
//       </div>

//       <div className="flex flex-col gap-1">
//         <label className="text-sm font-medium text-gray-800">Upload CV/Resume*</label>
//         <div className="flex items-center border border-gray-300 rounded overflow-hidden">
//           <label className="cursor-pointer bg-gray-100 border-r border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors whitespace-nowrap">
//             Choose File
//             <input
//               type="file"
//               accept=".pdf,.doc,.docx,.ppt,.pptx"
//               onChange={handleFile}
//               required
//               className="hidden"
//             />
//           </label>
//           <span className="px-3 text-sm text-gray-400 truncate">
//             {formData.resume ? formData.resume.name : "No file chosen"}
//           </span>
//         </div>
//         <p className="text-xs text-gray-400 mt-0.5">
//           Maximum allowed file size: 10 MB. Allowed types: PDF, DOC, DOCX, PPT, PPTX
//         </p>
//       </div>

//       <p className="text-xs text-gray-500 text-center border border-gray-200 rounded px-4 py-3 bg-gray-50">
//         By using this form you agree with the storage and handling of your data by this website.
//       </p>

//       <button
//         type="submit"
//         disabled={loading}
//         className="bg-red-600 hover:bg-red-700 disabled:opacity-70 text-white font-semibold text-sm px-8 py-3 rounded transition-colors w-fit"
//       >
//         {loading ? "Submitting..." : "Submit"}
//       </button>

//     </form>
//   )
// }

// // ─── Skeleton Loader
// function Skeleton() {
//   return (
//     <div className="animate-pulse flex flex-col gap-3">
//       <div className="h-4 bg-gray-200 rounded w-3/4" />
//       <div className="h-4 bg-gray-200 rounded w-full" />
//       <div className="h-4 bg-gray-200 rounded w-5/6" />
//       <div className="h-4 bg-gray-200 rounded w-2/3" />
//       <div className="h-4 bg-gray-200 rounded w-full" />
//       <div className="h-4 bg-gray-200 rounded w-4/5" />
//     </div>
//   )
// }

// // ─── Main Page
// export default function Page({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = use(params) 

//   const { data, isLoading, isError } = useQuery<CareerDetail>({
//     queryKey: ["careerDetail", id],
//     queryFn: () => fetchCareerDetails(id),
//     enabled: !!id,  
//   })

//   return (
//     <main className="min-h-screen bg-white">

//       {/* ── Hero Banner */}
//       <section className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
//         <Image
//           src="/images/careers/career-bg.jpg"
//           alt="Career background"
//           fill
//           priority
//           className="object-cover object-center"
//         />
//         <div className="absolute inset-0 bg-black/50" />
//         <div className="absolute inset-0 flex items-center">
//           <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
//             {isLoading ? (
//               <div className="h-12 w-2/3 bg-white/20 rounded animate-pulse" />
//             ) : isError ? null : (
//               <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl">
//                 {data?.title}
//               </h1>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* ── Two-Column: About the Job + Form */}
//       <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
//         <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

//           {/* LEFT — About the Job */}
//           <div className="w-full lg:w-[56%]">
//             <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-5">
//               About the job:
//             </h2>

//             {isLoading ? (
//               <Skeleton />
//             ) : isError ? (
//               <p className="text-red-500 text-sm">Failed to load job details. Please try again.</p>
//             ) : (
//               <ul className="list-disc list-outside pl-5 flex flex-col gap-2">
//                 {/*  correct: aboutJobPoints, then item.point */}
//                 {data?.aboutJobPoints?.map((item) => (
//                   <li
//                     key={item.id}
//                     className="text-gray-700 text-sm sm:text-[15px] leading-relaxed"
//                   >
//                     {item.point}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* RIGHT — Application Form */}
//           <div className="w-full lg:w-[44%] border border-gray-200 rounded-lg p-6 sm:p-8 lg:sticky lg:top-6">
//             <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">
//               Interested in this job?
//             </h2>
//             <ApplicationForm />
//           </div>

//         </div>
//       </section>

//       {/* ── About Us */}
//       <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
//         <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
//           About Us:
//         </h2>
//         <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed max-w-3xl">
//           Gresham Global is an education consulting firm offering launchpad services to educational
//           institutions worldwide. Our offerings include in-country representation, student recruitment,
//           strategic marketing, research, and more. We work with our partners to expand their reach and
//           foster a robust presence throughout the vibrant and diverse South Asian region. We are officially
//           certified as a Great Place to Work, a recognition that reflects our commitment to fostering a
//           positive, inclusive, and supportive work environment.
//         </p>
//       </section>

//     </main>
//   )
// }











"use client"

import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { fetchCareerDetails } from "@/lib/api"
import { useState, use } from "react"

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
          <option value="" disabled >Select Experience</option>
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

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data, isLoading } = useQuery<CareerDetail>({
    queryKey: ["careerDetail", id],
    queryFn: () => fetchCareerDetails(id),
    enabled: !!id,
  })

  console.log(data)

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Simple Hero Banner */}
      <section className="relative w-full h-50 md:h-75">
        <Image 
          src="/images/careers/career-bg.jpg" 
          alt="Banner" fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-6 lg:px-12">
            <h1 className="text-white font-bold text-3xl md:text-5xl">
              {data?.title || "Career Details"}
            </h1>
          </div>
        </div>
      </section>
  
      {/* 2. Main Content Split Section */}
      <section className="max-w-auto mx-auto px-4 sm:px-6 lg:px-3 py-10 md:py-16">

  {/* GRID */}
  <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_550px] gap-8">

    {/* LEFT SIDE */}
    <div className="bg-white rounded-lg p-5 sm:p-6">
  {isLoading ? (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-100 w-1/4" />
      <div className="h-4 bg-gray-100 w-full" />
      <div className="h-4 bg-gray-100 w-3/4" />
    </div>
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
</div>

    {/* RIGHT SIDE */}
    <div className="w-full lg:pr-12">
      <div className="lg:sticky lg:top-10 bg-white  rounded-lg shadow-md p-5 sm:p-6">
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