"use client"

import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { fetchCareerDetails } from "@/lib/api"
import { useState, use, useRef } from "react"
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

type StatusState = { type: "success" | "error"; text: string } | null;

function StatusMessage({ status }: { status: StatusState }) {
  if (!status) return null;
  return (
    <p className={`text-sm font-medium mt-3 ${status.type === "success" ? "text-green-600" : "text-red-500"}`}>
      {status.type === "success" ? "✓ " : "✕ "}{status.text}
    </p>
  );
}

function ApplicationForm({ jobTitle, jobId }: { jobTitle: string; jobId: string }) {
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", city: "",
    workExperience: "", about: "",
  });
  const [resume,     setResume]     = useState<File | null>(null);
  const [fileError,  setFileError]  = useState<string>("");
  const [loading,    setLoading]    = useState(false);
  const [formStatus, setFormStatus] = useState<StatusState>(null);

  // ── ref to reset file input after successful submit ──
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Accept by extension since MIME types vary by OS/browser ──
  const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx", "ppt", "pptx"];

  // ── MIME type map including all known variants ──
  const ALLOWED_MIME_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    // some browsers send these for doc/docx
    "application/octet-stream",
    "application/zip",
    "",  // some OS send empty string for docx
  ];

  const MAX_SIZE_MB = 10;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const file = e.target.files?.[0];
    if (!file) return;

    // ── Validate by file extension (more reliable than MIME on Windows) ──
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setFileError("Invalid file type. Allowed: PDF, DOC, DOCX, PPT, PPTX.");
      setResume(null);
      e.target.value = "";
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setFileError(`File size must be under ${MAX_SIZE_MB}MB.`);
      setResume(null);
      e.target.value = "";
      return;
    }

    setResume(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resume) {
      setFileError("Please upload your CV/Resume.");
      return;
    }

    setLoading(true);
    setFormStatus(null);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => payload.append(key, val));
      payload.append("resume",   resume);
      payload.append("jobTitle", jobTitle);
      payload.append("jobId",    jobId);

      const res  = await fetch("/api/jobform", { method: "POST", body: payload });
      const data = await res.json();

      if (res.ok) {
        setFormStatus({
          type: "success",
          text: "Application submitted! Check your inbox for confirmation.",
        });
        // ── Reset all fields ──
        setFormData({ fullName: "", email: "", phone: "", city: "", workExperience: "", about: "" });
        setResume(null);
        setFileError("");
        if (fileInputRef.current) fileInputRef.current.value = "";
          setTimeout(() => setFormStatus(null), 3000);
      } else {
        setFormStatus({
          type: "error",
          text: data.error || "Submission failed. Please try again.",
        });
      }
    } catch {
      setFormStatus({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-gray-400 disabled:opacity-60 transition";
  const labelClass = "text-[12px] font-bold text-gray-800";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Full Name */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Full Name *</label>
        <input
          name="fullName" type="text" required
          value={formData.fullName}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter your full name"
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Email *</label>
        <input
          name="email" type="email" required
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter your email"
          className={inputClass}
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Phone Number *</label>
        <input
          name="phone" type="tel" required
          value={formData.phone}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter your phone number"
          className={inputClass}
        />
      </div>

      {/* City */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>City *</label>
        <input
          name="city" type="text" required
          value={formData.city}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter your city"
          className={inputClass}
        />
      </div>

      {/* Work Experience */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Work Experience *</label>
        <select
          name="workExperience" required
          value={formData.workExperience}
          onChange={handleChange}
          disabled={loading}
          className={`${inputClass} bg-white`}
        >
          <option value="" disabled>Select Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="1-3 years">1 – 3 years</option>
          <option value="4-8 years">4 – 8 years</option>
          <option value="8+ years">8+ years</option>
        </select>
      </div>

      {/* About */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Tell us about yourself *</label>
        <textarea
          name="about" required rows={3}
          value={formData.about}
          onChange={handleChange}
          disabled={loading}
          placeholder="Brief introduction about yourself..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Resume Upload */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Upload CV/Resume *</label>
        <div className={`flex items-center border rounded overflow-hidden ${fileError ? "border-red-400" : "border-gray-200"}`}>
          <label className={`cursor-pointer bg-gray-100 px-3 py-1.5 text-[12px] border-r border-gray-200 hover:bg-gray-200 transition-colors ${loading ? "opacity-60 pointer-events-none" : ""}`}>
            Choose File
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFile}
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              className="hidden"
            />
          </label>
          <span className="px-3 text-[12px] text-gray-400 truncate">
            {resume ? resume.name : "No file chosen"}
          </span>
        </div>
        {fileError
          ? <p className="text-[11px] text-red-500 mt-0.5">{fileError}</p>
          : <p className="text-[10px] text-gray-400 mt-1">Max 10MB · PDF, DOC, DOCX, PPT, PPTX</p>
        }
      </div>

      {/* Privacy note */}
      <p className="text-[10px] text-gray-500 leading-tight">
        By submitting this form you agree with the storage and handling of your data by Gresham Global.
      </p>

      {/* Status message */}
      <StatusMessage status={formStatus} />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-[#e31e24] hover:bg-red-700 text-white font-bold text-sm px-8 py-2.5 rounded transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Submit Application"}
      </button>

    </form>
  );
}

// ── Skeleton ──
function CareerDetailSkeleton() {
  return (
    <div className="space-y-5">
      <Skeleton height={28} width="55%" borderRadius={4} />
      <Skeleton height={18} width="35%" borderRadius={4} />
      <div className="space-y-2 pt-2">
        <Skeleton height={14} borderRadius={3} />
        <Skeleton height={14} borderRadius={3} />
        <Skeleton height={14} width="80%" borderRadius={3} />
      </div>
      <Skeleton height={20} width="40%" borderRadius={4} />
      <div className="space-y-2">
        <Skeleton height={14} borderRadius={3} />
        <Skeleton height={14} borderRadius={3} />
        <Skeleton height={14} width="65%" borderRadius={3} />
      </div>
      <div className="space-y-2 pl-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton circle width={6} height={6} />
            <Skeleton height={13} width={`${60 + i * 7}%`} borderRadius={3} />
          </div>
        ))}
      </div>
      <Skeleton height={20} width="45%" borderRadius={4} />
      <div className="space-y-2">
        <Skeleton height={14} borderRadius={3} />
        <Skeleton height={14} borderRadius={3} />
        <Skeleton height={14} width="70%" borderRadius={3} />
      </div>
    </div>
  );
}

// ── Main Page ──
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, isLoading } = useQuery<CareerDetail>({
    queryKey: ["careerDetail", id],
    queryFn:  () => fetchCareerDetails(id),
    enabled:  !!id,
  });

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
                height={48} width="50%" borderRadius={6}
                baseColor="#ffffff20" highlightColor="#ffffff40"
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
                    whitespace-normal prose-img:max-w-full prose-img:h-auto
                    prose-pre:overflow-x-auto prose-p:leading-relaxed prose-li:leading-relaxed"
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
              <ApplicationForm
                jobTitle={data?.title || ""}
                jobId={id}
              />
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}