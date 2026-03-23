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
  if (!res.ok) throw new Error("Failed to fetch news and blogs");
  return res.json();
};

// Fetch single item — we get all and filter by CMS slug
export const fetchNewsBlogBySlug = async (cmsSlug: string) => {
  const res = await fetch(`${BASE_URL}/news-blogs`);
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  const item = data?.docs?.find((doc: any) => doc.slug === cmsSlug);
  if (!item) throw new Error("Not found");
  return item;
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
  if (!res.ok) throw new Error("Failed to fetch jobs"); 
  return res.json();
};

// CAREER DETAILS — jobs endpoint already has all the data
export const fetchCareerDetails = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`);
  if (!res.ok) throw new Error(`Failed: ${res.status}`);
  return res.json();
};



export const fetchEventBySlug = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/events?where[slug][equals]=${slug}`);
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
};