"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/* ─── RICH TEXT RENDERER ─── */
function RichTextRenderer({ node }: { node: any }): React.ReactElement | null {
  if (!node) return null;

  if (node.type === "root") {
    return (
      <div className="prose prose-gray max-w-none">
        {node.children?.map((child: any, i: number) => (
          <RichTextRenderer key={i} node={child} />
        ))}
      </div>
    );
  }

  if (node.type === "paragraph") {
    const hasContent = node.children?.some((c: any) => c.text || c.children?.length);
    if (!hasContent) return <br />;
    return (
      <p className="mb-4 text-gray-700 leading-relaxed text-base">
        {node.children?.map((child: any, i: number) => (
          <RichTextRenderer key={i} node={child} />
        ))}
      </p>
    );
  }

  if (node.type === "heading") {
    const classes: Record<string, string> = {
      h1: "text-3xl font-bold text-gray-900 mt-8 mb-4",
      h2: "text-2xl font-bold text-gray-800 mt-6 mb-3",
      h3: "text-xl font-semibold text-gray-800 mt-5 mb-2",
      h4: "text-lg font-semibold text-gray-700 mt-4 mb-2",
    };
    const hasContent = node.children?.some((c: any) => c.text);
    if (!hasContent) return null;

    return React.createElement(
      node.tag,
      { className: classes[node.tag] || "font-bold mt-4 mb-2" },
      node.children?.map((child: any, i: number) => (
        <RichTextRenderer key={i} node={child} />
      ))
    );
  }

  if (node.type === "list") {
    const Tag = node.listType === "bullet" ? "ul" : "ol";
    return (
      <Tag className={`mb-4 pl-6 ${node.listType === "bullet" ? "list-disc" : "list-decimal"}`}>
        {node.children?.map((child: any, i: number) => (
          <RichTextRenderer key={i} node={child} />
        ))}
      </Tag>
    );
  }

  if (node.type === "listitem") {
    return (
      <li className="mb-1 text-gray-700">
        {node.children?.map((child: any, i: number) => (
          <RichTextRenderer key={i} node={child} />
        ))}
      </li>
    );
  }

  if (node.type === "link") {
    return (
      
       <a href={node.fields?.url || "#"}
        target={node.fields?.newTab ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="text-red-700 underline hover:text-red-900"
      >
        {node.children?.map((child: any, i: number) => (
          <RichTextRenderer key={i} node={child} />
        ))}
      </a>
    );
  }

  if (node.type === "text") {
    if (!node.text) return null;
    let content: React.ReactNode = node.text;
    if (node.format & 1) content = <strong>{content}</strong>;
    if (node.format & 2) content = <em>{content}</em>;
    if (node.format & 8) content = <u>{content}</u>;
    return <>{content}</>;
  }

  return null;
}

/* ─── DETAIL PAGE ─── */
export default function NewsDetailPage() {
  const searchParams = useSearchParams();
  const cmsSlug = searchParams.get("ref");

  const { data, isLoading, error } = useQuery({
    queryKey: ["newsBlogs"],
    queryFn: async () => {
      const res = await fetch("https://gresham-global-cms.onrender.com/api/news-blogs");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const item = data?.docs?.find((doc: any) => doc.slug === cmsSlug);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 text-lg">Article not found.</p>
        <Link href="/media/news-blogs" className="text-red-700 underline">
          ← Back to News & Blogs
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── Hero Banner ── */}
      <section className="relative h-80 md:h-96">
        {item.mainImage?.url ? (
          <Image src={item.mainImage.url} alt={item.title} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gray-300" />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-4xl mx-auto px-6 pb-10 w-full">
            <span className="inline-block bg-red-700 text-white text-xs font-semibold uppercase px-3 py-1 rounded mb-3">
              {item.type}
            </span>
            <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight">
              {item.title}
            </h1>
            <p className="text-gray-300 text-sm mt-3">
              {new Date(item.date).toDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="max-w-4xl mx-auto px-6 py-12">

        {/* Back link */}
        <Link
          href="/media/news-blogs"
          className="inline-flex items-center gap-2 text-red-700 text-sm font-medium mb-8 hover:underline"
        >
          ← Back to News & Blogs
        </Link>

        {/* Rich text body */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <RichTextRenderer node={item.details?.root} />
        </div>

        {/* Video */}
        {item.hasVideo && item.video?.url && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Video</h2>
            <video src={item.video.url} controls className="w-full rounded-xl shadow" />
          </div>
        )}

        {/* Gallery */}
        {item.hasGallery && item.gallery?.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {item.gallery.map((g: any, i: number) => (
                <div key={i} className="relative h-48 rounded-xl overflow-hidden">
                  <Image
                    src={g.images?.url}
                    alt={g.images?.alt || "gallery image"}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </section>
    </main>
  );
}