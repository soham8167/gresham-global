

const BASE_URL =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_URL
    : process.env.NEXT_PUBLIC_BASE_URL;

console.log("API BASE URL:", BASE_URL);


// MEDIA NEWS
export const fetchMediaNews = async () => {
  const res = await fetch(`${BASE_URL}/media-news`);

  if (!res.ok) {
    throw new Error("Failed to fetch media news");
  }

  return res.json();
};


// NEWS & BLOGS
export const fetchNewsBlogs = async () => {
  const res = await fetch(`${BASE_URL}/news-blogs`);

  if (!res.ok) {
    throw new Error("Failed to fetch news and blogs");
  }

  return res.json();
};


// PUBLICATIONS
export const fetchPublications = async () => {
  const res = await fetch(`${BASE_URL}/publications`);

  if (!res.ok) {
    throw new Error("Failed to fetch publications");
  }

  return res.json();
};


// EVENTS
export const fetchEvents = async () => {
  const res = await fetch(`${BASE_URL}/events`);

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
};


// JOBS
export const fetchJobs = async () => {
  const res = await fetch(`${BASE_URL}/jobs`);

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
};


// CAREER DETAILS
export const fetchCareerDetails = async (id: string) => {

  const jobRes = await fetch(`${BASE_URL}/jobs/${id}`);

  if (!jobRes.ok) {
    throw new Error(`Failed: ${jobRes.status}`);
  }

  const job = await jobRes.json();

  const detailsRes = await fetch(
    `${BASE_URL}/career-details?where[title][equals]=${encodeURIComponent(job.title)}&limit=1`
  );

  if (!detailsRes.ok) {
    throw new Error(`Failed: ${detailsRes.status}`);
  }

  const details = await detailsRes.json();

  return details?.docs?.[0] ?? null;
};






export const fetchEventBySlug = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/events?where[slug][equals]=${slug}`);
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
};