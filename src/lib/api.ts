export const fetchMediaNews = async () => {
  //const res = await fetch("http://localhost:3001/api/media-news");
  const res = await fetch("https://gresham-global-cms.onrender.com/api/media");

  if (!res.ok) {
    throw new Error("Failed to fetch media news"); 
  }

  return res.json();
};




export const fetchNewsBlogs = async () =>{
    //const res = await fetch("http://localhost:3001/api/news-blogs")
    const res = await fetch("https://gresham-global-cms.onrender.com/api/news-blogs")
    if(!res.ok){
        throw new Error("Failed to fetch  news and blogs")
    }
    return res.json();
}



export const fetchPublications = async () =>{
    //const res = await fetch("http://localhost:3001/api/publications")
    const res = await fetch("https://gresham-global-cms.onrender.com/api/publications")
    if(!res.ok){
        throw new Error("Failed to fetch  publications")
    }
    return res.json();
}