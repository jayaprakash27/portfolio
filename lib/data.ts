export const profile = {
  name: "Jayaprakash Sahoo",
  shortName: "Jay",
  role: "Software Engineer",
  tagline: "Crafting performant, futuristic interfaces with Next.js, React & React Native.",
  location: "India · Remote",
  email: "jay27codes@gmail.com",
  phone: "+917735471415",
  // TODO: replace with your real URLs
  socials: {
    github: "https://github.com/", // TODO
    linkedin: "https://www.linkedin.com/", // TODO
    portfolio: "https://example.com/", // TODO (old portfolio, optional)
  },
  resumeUrl: "/resume.pdf",
} as const;

export const about = {
  body:
    "I'm a software engineer building production-grade web and mobile experiences. Currently engineering the Saudi Genomics Database platform at Enigma Genomics — shipping fast, accessible interfaces with Next.js and TypeScript. I'm into kinetic typography, spatial UI, and the small details that make software feel alive.",
  highlights: [
    { label: "Years building", value: "3+" },
    { label: "Primary stack", value: "Next.js · TS" },
    { label: "Mobile", value: "React Native" },
    { label: "Based in", value: "India" },
  ],
} as const;

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  bullets: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Enigma Genomics",
    role: "Software Engineer",
    start: "Nov 2024",
    end: "Present",
    location: "Dammam, Saudi Arabia · Remote",
    bullets: [
      "Engineered and deployed a production-grade web application for the Saudi Genomics Database — researchers explore and interpret large genomic datasets with high efficiency.",
      "Improving a scalable admin panel to streamline user management, data updates, and operational workflows.",
      "Designed and implemented PDF report templates with PHP and DomPDF for a youth-wellness product, ensuring structured and professional report generation.",
    ],
    stack: ["Next.js", "TypeScript", "React", "PHP", "DomPDF"],
  },
  {
    company: "Enigma Genomics",
    role: "Software Engineer · Intern",
    start: "May 2024",
    end: "Oct 2024",
    location: "Dammam, Saudi Arabia · Remote",
    bullets: [
      "Built a cross-platform mobile app with React Native, Expo, and Nativewind — integrated with Firebase for real-time database and authentication.",
      "Designed dynamic HTML layouts rendered via DomPDF (PHP) to generate detailed, customizable PDF reports.",
    ],
    stack: ["React Native", "Expo", "Nativewind", "Firebase", "PHP"],
  },
  {
    company: "PiggyRide",
    role: "Frontend Developer · Intern",
    start: "Nov 2023",
    end: "Mar 2024",
    location: "Bengaluru, India · Remote",
    bullets: [
      "Upgraded PiggyRide's ride-tracking platform by migrating from static HTML/CSS to a 3D React app using Google Maps JS API, Three.js, Redux, and Tailwind CSS.",
      "Modified the ride-request page (Java Play framework) to introduce the PiggyPass subscription model.",
      "Resolved real-time vehicle and trip-tracking issues on the Piggy Partner site; fixed sign-in, picture upload, and ride-request bugs in the React Native consumer app.",
    ],
    stack: ["React", "Three.js", "Redux", "Tailwind CSS", "Google Maps API", "React Native"],
  },
  {
    company: "Louverline Blinds",
    role: "Frontend Developer · Intern",
    start: "Mar 2023",
    end: "Oct 2023",
    location: "Bengaluru, India · Remote",
    bullets: [
      "Orchestrated development of the My Louverline website, giving 120 authorized dealers real-time access to product data, pricing, and stock.",
      "Implemented a streamlined online ordering system — 30% faster processing, saving the ops team 12 hours/week.",
    ],
    stack: ["React.js", "Google Apps Script", "Firebase", "Tailwind CSS"],
  },
];

export const skills = {
  Development: [
    "React.js",
    "Next.js",
    "React Native",
    "Expo",
    "Redux",
    "Three.js",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Material UI",
    "Firebase",
  ],
  Languages: ["JavaScript", "TypeScript", "Java", "Python", "PHP"],
  Tools: ["Git", "GitHub", "VS Code", "Figma", "Vercel"],
} as const;

export type Project = {
  name: string;
  blurb: string;
  description: string;
  stack: string[];
  href?: string;
  accent: string;
};

export const projects: Project[] = [
  {
    name: "Petu",
    blurb: "Restaurant delivery web app",
    description:
      "A delightful restaurant delivery experience with a captivating frontend in React + Redux + Tailwind, backed by Firebase for auth and data.",
    stack: ["React", "Redux", "Tailwind", "Firebase"],
    href: "#", // TODO: live link
    accent: "from-rose-400/40 via-fuchsia-400/30 to-violet-500/40",
  },
  {
    name: "Vide",
    blurb: "Cross-platform video-sharing app",
    description:
      "A video-sharing app built with React Native, Expo & Nativewind on the frontend, and Appwrite for backend and authentication.",
    stack: ["React Native", "Expo", "Nativewind", "Appwrite"],
    href: "#", // TODO: repo / store link
    accent: "from-cyan-400/40 via-sky-400/30 to-indigo-500/40",
  },
];

export const education = {
  degree: "B.Tech, Electrical & Electronics Engineering",
  school: "Veer Surendra Sai University of Technology, Burla",
  period: "2020 – 2024",
  detail: "CGPA 7.45",
  prior: {
    school: "KMBB Science Higher Secondary, Nayapalli",
    period: "2019",
    detail: "CHSE, Odisha · 74.33%",
  },
};

export const certifications = [
  { name: "Learn Advance Java", issuer: "Codechef" },
  { name: "Developer Virtual Experience", issuer: "Accenture" },
  { name: "Software Engineering Virtual Experience", issuer: "JP Morgan & Chase" },
  { name: "Software Testing", issuer: "Microsoft (NIIT Foundation)" },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
