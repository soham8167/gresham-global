export const fetchMediaNews = async () => {
  const res = await fetch("http://localhost:3001/api/media-news");
  //const res = await fetch("https://gresham-global-cms.onrender.com/api/media-news");


  if (!res.ok) {
    throw new Error("Failed to fetch media news"); 
  }

  return res.json();
};




export const fetchNewsBlogs = async () =>{
    const res = await fetch("http://localhost:3001/api/news-blogs")
    //const res = await fetch("https://gresham-global-cms.onrender.com/api/news-blogs")
    if(!res.ok){
        throw new Error("Failed to fetch  news and blogs")
    }
    return res.json();
}



export const fetchPublications = async () =>{
    const res = await fetch("http://localhost:3001/api/publications")
   // const res = await fetch("https://gresham-global-cms.onrender.com/api/publications")
    if(!res.ok){
        throw new Error("Failed to fetch  publications")
    }
    return res.json();
}



export const fetchEvents = async () =>{
    const res = await fetch("http://localhost:3001/api/publications")
    //const res = await fetch("https://gresham-global-cms.onrender.com/api/events")
    if(!res.ok){
        throw new Error("Failed to fetch  events")
    }
    return res.json();
}










// const BASE_URL =
//   process.env.ENVIRONMENT === "development"
//     ? process.env.LOCAL_URL
//     : process.env.BASE_URL;

// console.log("LOCAL_URL:", process.env.LOCAL_URL);
// console.log("BASE_URL_ENV:", process.env.BASE_URL);
// console.log("FINAL BASE_URL:", BASE_URL);
// console.log("Calling API:", `${BASE_URL}/media-news`);


// export const fetchMediaNews = async () => {
//   const res = await fetch(`${BASE_URL}/media-news`);

//   if (!res.ok) {
//     throw new Error("Failed to fetch media news");
//   }

//   return res.json();
// };

// export const fetchNewsBlogs = async () => {
//   const res = await fetch(`${BASE_URL}/news-blogs`);

//   if (!res.ok) {
//     throw new Error("Failed to fetch news and blogs");
//   }

//   return res.json();
// };

// export const fetchPublications = async () => {
//   const res = await fetch(`${BASE_URL}/publications`);

//   if (!res.ok) {
//     throw new Error("Failed to fetch publications");
//   }

//   return res.json();
// };

// export const fetchEvents = async () => {
//   const res = await fetch(`${BASE_URL}/events`);

//   if (!res.ok) {
//     throw new Error("Failed to fetch events");
//   }

//   return res.json();
// };