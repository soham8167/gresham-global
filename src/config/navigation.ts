import { NavItem } from "@/types/navigation";

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    children: [
      { label: "About Us", href: "/about/about-us" },
      { label: "Approach", href: "/about/approach" },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Research & Assessment", href: "/services/research-assessment" },
      { label: "In-Country Representation", href: "/services/country-representation" },
      { label: "Academic Collaborations", href: "/services/academic-collaborations" },
      {label:"Admission Compliance", href:"/services/admission-compliance"},
      {label:"Strategic Marketing", href:"/services/strategic-marketing"},
      {label:"Operational support", href:"/services/operational-support"},
    ],
  },
  {
    label: "Media",
    children: [
      { label: "Media", href: "/media/media" },
      { label: "News and Blogs", href: "/media/news-blogs" },
    ],
  }, 
  { label: "Publications", href: "/publications" },
  { label: "Events", href: "/events" },
  {label: "Careers", href: "/careers"},
  {label: "Contact", href: "/contact"},
];