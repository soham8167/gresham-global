'use client'

import Image from 'next/image'
import { useState } from 'react'

const services = [
  'Research & Assessment',
  'In-Country Representation',
  'Academic Collaborations',
  ' Admissions Compliance',
  'Strategic Marketing',
  ' Operational Support',
  'Others',
]

const Page = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
    organisation: '',
    service: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section>

      {/* ── Banner ── */}
      <div className="relative w-full h-62.5 sm:h-80 md:h-100 lg:h-112.5 overflow-hidden">
        <Image
          src="/images/about/about-bannerimg.webp"
          alt="About Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
            <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Approach
            </h1>
          </div>
        </div>
      </div>

      {/* ── Content Section ── */}
      <div className="w-full  py-14 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Two paragraphs */}
          <div className="space-y-6 max-w-4xl">
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
              Expanding into India and South Asia's dynamic and multifaceted market requires
              a strategic framework that goes beyond generic solutions. We adopt a methodical,
              data-driven approach, working as an extension of your institution to ensure
              measurable outcomes and sustainable impact. Our focus is on aligning with your
              institutional goals while navigating the complexities of the region with precision.
            </p>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
              At Gresham Global, our approach is rooted in precision, adaptability, and a
              commitment to delivering measurable value. With a deep understanding of South
              Asia's unique market characteristics and a focus on strategic alignment, we
              provide institutions with the expertise and execution capabilities needed to
              thrive in this competitive landscape.
            </p>
          </div>

          {/* Large image below text */}
          <div className="  mt-10 md:mt-14 w-full relative rounded-2xl overflow-hidden shadow-xl aspect-[16/16] ">
            <Image
              src="/images/about/approach_img.webp"
              alt="Approach"
              fill
              className="object-contain"
            />
          </div>

          {/* Get In Touch Button */}
          <div className="mt-10 md:mt-14 flex justify-center">
            <button
              onClick={() => setFormOpen(true)}
              className="cursor-pointer inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-semibold text-sm sm:text-base px-8 py-4 rounded-2xl active:scale-95 transition-all duration-200 shadow-md"
            >
              Get In Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* ── Modal Backdrop ── */}
      <div
        onClick={() => setFormOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          formOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ── Center Modal ── */}
      <div
        aria-modal="true"
        role="dialog"
        className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-300 ${
          formOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`bg-white w-full max-w-lg rounded-xl shadow-2xl flex flex-col transition-all duration-300 ${
            formOpen
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-6'
          }`}
        >

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Get In Touch</h2>
            <button
              onClick={() => setFormOpen(false)}
              className="text-gray-400 hover:text-gray-700 text-2xl leading-none transition-colors"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          {/* Modal Body */}
          <div className="overflow-y-auto max-h-[80vh] px-6 py-5">
            <form onSubmit={handleSubmit} className="space-y-3">

              {/* Full Name */}
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Email ID"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
              />

              {/* Designation */}
              <input
                type="text"
                placeholder="Designation"
                value={formData.designation}
                onChange={e => setFormData({ ...formData, designation: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
              />

              {/* Organisation */}
              <input
                type="text"
                placeholder="Organisation"
                value={formData.organisation}
                onChange={e => setFormData({ ...formData, organisation: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
              />

              {/* Select Services */}
              <div className="relative">
                <select
                  value={formData.service}
                  onChange={e => setFormData({ ...formData, service: e.target.value })}
                  className="w-full border border-gray-300 rounded px-4 py-3 text-sm bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all cursor-pointer text-gray-400"
                >
                  <option value="" disabled>Select Services</option>
                  {services.map(s => (
                    <option key={s} value={s} className="text-gray-800">{s}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Message */}
              <textarea
                rows={5}
                placeholder="Message"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all resize-none"
              />

              {/* Submit Button */}
              <div className="flex justify-center pt-2 pb-2">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-sm px-12 py-3 rounded transition-all duration-200"
                >
                  Submit
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>

    </section>
  )
}

export default Page
