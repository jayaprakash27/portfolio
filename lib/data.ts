export const profile = {
  name: "Jayaprakash Sahoo",
  shortName: "Jay",
  role: "Software Engineer",
  tagline: "Software engineer shipping interfaces that feel alive.",
  location: "India · Remote",
  email: "jay27codes@gmail.com",
  phone: "+917735471415",
  // TODO: replace with your real URLs
  socials: {
    github: "https://github.com/jayaprakash27", // TODO
    linkedin: "https://www.linkedin.com/in/jayaprakash27/", // TODO
    portfolio: "https://example.com/", // TODO (old portfolio, optional)
  },
  resumeUrl: "/resume.pdf",
} as const;

export const about = {
  body:
    "Software engineer shipping web & mobile, fast. I live in TypeScript — mostly Next.js and React Native — and deploy to prod daily. Lowkey obsessed with kinetic type, spatial UI, and the tiny details that make software feel alive.",
  highlights: [
    { label: "Shipping since", value: "2023" },
    { label: "Daily driver", value: "Next.js · TS" },
    { label: "Mobile", value: "React Native + Expo" },
    { label: "Remote from", value: "India" },
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
  /** Full URL to the company website. Used to render the company favicon
   *  and to make the company name a clickable link in the experience card. */
  website?: string;
  logo?: string; // Optional local logo image (e.g. "/logos/enigma.png"). If omitted, a favicon from `website` is used as a fallback.
};

export const experience: Experience[] = [
  {
    company: "Enigma Genomics",
    role: "Software Engineer",
    start: "Nov 2024",
    end: "Present",
    location: "Dammam, Saudi Arabia · Remote",
    website: "https://enigmagenomics.com",
    bullets: [
      "Launched the Youth Wellness mobile app on the App Store and Google Play — built with React Native and Expo for a single cross-platform codebase, with native build pipelines for iOS and Android.",
      "Engineered and deployed a production-grade web application for the Saudi Genomics Database — researchers explore and interpret large genomic datasets with high efficiency.",
      "Improving a scalable admin panel to streamline user management, data updates, and operational workflows.",
      "Designed and implemented PDF report templates with PHP and DomPDF for the youth-wellness product, ensuring structured and professional report generation.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "React Native",
      "Expo",
      "iOS",
      "Android",
      "PHP",
      "DomPDF",
    ],
  },
  {
    company: "Enigma Genomics",
    role: "Software Engineer · Intern",
    start: "May 2024",
    end: "Oct 2024",
    location: "Dammam, Saudi Arabia · Remote",
    website: "https://enigmagenomics.com",
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
    website: "https://www.linkedin.com/company/piggy-ride/", // TODO: confirm correct URL
    bullets: [
      "Upgraded PiggyRide's ride-tracking platform by migrating from static HTML/CSS to a 3D React app using Google Maps JS API, Three.js, Redux, and Tailwind CSS.",
      "Modified the ride-request page (Java Play framework) to introduce the PiggyPass subscription model.",
      "Resolved real-time vehicle and trip-tracking issues on the Piggy Partner site; fixed sign-in, picture upload, and ride-request bugs in the React Native consumer app.",
    ],
    stack: ["React", "Three.js", "Redux", "Tailwind CSS", "Google Maps API", "React Native"],
    logo: "/logos/piggyride.jpeg",
  },
  {
    company: "Louverline Blinds",
    role: "Frontend Developer · Intern",
    start: "Mar 2023",
    end: "Oct 2023",
    location: "Bengaluru, India · Remote",
    website: "https://www.louverlineblinds.com",
    bullets: [
      "Orchestrated development of the My Louverline website, giving 120 authorized dealers real-time access to product data, pricing, and stock.",
      "Implemented a streamlined online ordering system — 30% faster processing, saving the ops team 12 hours/week.",
    ],
    stack: ["React.js", "Google Apps Script", "Firebase", "Tailwind CSS"],
    logo: "/logos/louverline.png",
  },
];

/** Returns a Google-served favicon URL for the given site, or null. */
export function faviconFor(website: string | undefined, size = 64): string | null {
  if (!website) return null;
  try {
    const host = new URL(website).hostname;
    return `https://www.google.com/s2/favicons?domain=${host}&sz=${size}`;
  } catch {
    return null;
  }
}

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
  /** Optional local preview image (e.g. "/projects/petu.png"). If omitted,
   *  a live screenshot of `href` is fetched via Microlink as a fallback. */
  preview?: string;
};

/** Live screenshot of `url`, served by Microlink's free, no-key API.
 *  Returns null if no URL is usable.
 *  Microlink caches results, so repeat loads from the same browser are instant. */
export function screenshotFor(url: string | undefined): string | null {
  if (!url || url === "#") return null;
  try {
    new URL(url);
  } catch {
    return null;
  }
  const params = new URLSearchParams({
    url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    viewport: "1280x720",
    waitFor: "2000",
  });
  return `https://api.microlink.io/?${params.toString()}`;
}

export const projects: Project[] = [
  {
    name: "Meel",
    blurb: "Logistics platform — site + admin panel",
    description:
      "A logistics platform: the public site at trymeel.com and the internal admin panel that runs the operation. Vite + TypeScript on the dashboard side, React muscle memory throughout.",
    stack: ["Vite", "TypeScript", "React", "Tailwind CSS"],
    href: "https://trymeel.com",
    accent: "from-emerald-400/40 via-teal-400/30 to-cyan-500/40",
  },
  {
    name: "My Louverline",
    blurb: "Dealer ordering portal for Louverline Blinds",
    description:
    "An ordering and inventory portal serving 120+ authorized dealers — real-time products, pricing, and stock. React + Tailwind on the front, Firebase Auth + Firestore on the back. Shipped solo, end to end.",
    stack: ["React", "Tailwind CSS", "Firebase", "Firestore"],
    href: "https://mylouverline.com", // private dealer portal — no public URL
    accent: "from-rose-400/40 via-fuchsia-400/30 to-violet-500/40",
  },
  {
    name: "Petu",
    blurb: "Restaurant delivery web app",
    description:
    "A delightful restaurant delivery experience with a captivating frontend in React + Redux + Tailwind, backed by Firebase for auth and data.",
    stack: ["React", "Redux", "Tailwind", "Firebase"],
    href: "https://petu.netlify.app/",
    accent: "from-amber-400/40 via-orange-400/30 to-yellow-500/40",
  },
  {
    name: "Vide",
    blurb: "Cross-platform video-sharing app",
    description:
      "A video-sharing app built with React Native, Expo & Nativewind on the frontend, and Appwrite for backend and authentication.",
    stack: ["React Native", "Expo", "Nativewind", "Appwrite"],
    href: "",
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
