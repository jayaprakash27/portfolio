/* ------------------------------------------------------------------ */
/*  Portfolio content                                                  */
/*  Source of truth: public/resume.pdf (Nov 2026).                     */
/*  Two layers:                                                        */
/*   - `experience`: facts — roles, dates, release notes.              */
/*   - `chapters`:   story — headline, story, quip, which scene shows. */
/*  Headlines are sentence case; the display font uppercases via CSS.  */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Jayaprakash Sahoo",
  shortName: "Jay",
  hometown: "Nayagada",
  role: "React Native & Next.js Engineer",
  /** Small mono line above the hero headline. */
  eyebrow: "React Native · Next.js engineer",
  /** Two-line hero headline. "ship" is the accent word. */
  headline: ["I ship to the stores.", "And the browser."],
  intro:
    "Hi, I'm Jay. React Native for phones, Next.js for the web, one TypeScript brain for both. My apps make it through App Store review. Usually on the first try.",
  status: "Open to work",
  location: "India · Remote",
  email: "jay27codes@gmail.com",
  phone: "+917735471415",
  socials: {
    github: "https://github.com/jayaprakash27",
    linkedin: "https://www.linkedin.com/in/jayaprakash27/",
    portfolio: "https://jay27codes.vercel.app/",
  },
  resumeUrl: "/resume.pdf",
} as const;

/** Youth AI is live: real store listings (region-free App Store link). */
export const youthAI = {
  name: "Youth AI",
  appStore: "https://apps.apple.com/app/id6769384688",
  playStore: "https://play.google.com/store/apps/details?id=ai.myyouth",
} as const;

/** The App Store–style "short version" card that Skip intro lands on. */
export const tldr = {
  stats: [
    { value: "2 yrs", label: "full-time" },
    { value: "1 app", label: "live in stores" },
    { value: "1,378", label: "exomes · Next.js" },
  ],
  whatsNew: {
    version: "v2.0",
    text: "Promoted intern to full-time in 6 months. Added Arabic and right-to-left support.",
  },
  summary:
    "React Native and Next.js engineer with 2 years of full-time startup experience and three internships. Shipped an Expo app to the App Store, Google Play and the web, owning native work, performance, crash monitoring and releases, and built a Next.js variant browser over 1,378 Saudi exomes.",
} as const;

/* ------------------------------------------------------------------ */
/*  Experience — the factual layer                                     */
/* ------------------------------------------------------------------ */

export type NoteType = "added" | "improved" | "fixed";

export type ReleaseNote = {
  type: NoteType;
  text: string;
};

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  notes: ReleaseNote[];
  stack: string[];
  /** Full URL to the company website. Used for the favicon fallback and link. */
  website?: string;
  /** Optional local logo image (e.g. "/logos/enigma.png"). */
  logo?: string;
};

export const experience: Experience[] = [
  {
    company: "Enigma Genomics",
    role: "Software Engineer",
    start: "Nov 2024",
    end: "Present",
    location: "Dammam, Saudi Arabia · Remote",
    website: "https://enigmagenomics.com",
    notes: [
      {
        type: "added",
        text: "Launched the Youth AI app on the App Store, Google Play and web from one React Native and Expo codebase in TypeScript: report viewer, 7-day nutrition plan and a Shopify shop with abandoned-cart reminders.",
      },
      {
        type: "added",
        text: "Integrated native APIs through Expo config plugins and patches to react-native-maps, WebView and AppsFlyer: rich push via an iOS Notification Service Extension (Swift), deep links, secure storage.",
      },
      {
        type: "added",
        text: "Developed the AI health assistant chat with SSE-streamed replies, typing indicators and dropped-stream recovery.",
      },
      {
        type: "improved",
        text: "Optimized performance by caching report PDFs on the device with resumable downloads, cutting re-renders with memoized hooks and stable FlatList props, and enabling R8 code shrinking for Android releases.",
      },
      {
        type: "added",
        text: "Automated releases with Expo EAS, fingerprint-based over-the-air updates and GitHub Actions, backed by Firebase Crashlytics crash reporting and Vitest unit tests for chat streaming, Arabic text and auth errors.",
      },
      {
        type: "added",
        text: "Localized the app into Arabic with right-to-left layouts on iOS, Android and web.",
      },
      {
        type: "added",
        text: "Delivered the Saudi Genomics Platform, a Next.js variant browser over 1,378 Saudi exomes, with Hasura GraphQL and SMS 2FA.",
      },
      {
        type: "fixed",
        text: "Moved all Saudi Genomics Platform queries behind a server-side API route and patched CVE-2025-55182.",
      },
      {
        type: "added",
        text: "Created PDF report templates for 20+ genetic tests in PHP and DomPDF, in English and Arabic.",
      },
    ],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Swift",
      "Next.js",
      "Hasura GraphQL",
      "Shopify Storefront API",
      "Firebase Crashlytics",
      "GitHub Actions",
      "Vitest",
      "PHP",
      "DomPDF",
    ],
  },
  {
    company: "Enigma Genomics",
    role: "Software Engineer Intern",
    start: "May 2024",
    end: "Oct 2024",
    location: "Dammam, Saudi Arabia · Remote",
    website: "https://enigmagenomics.com",
    notes: [
      {
        type: "added",
        text: "Designed and coded PDF report templates for six consumer wellness tests in PHP and DomPDF, with score meters and charts generated from patient results, reviewed and signed off by the lab's doctors.",
      },
    ],
    stack: ["PHP", "DomPDF"],
  },
  {
    company: "PiggyRide",
    role: "Frontend Developer Intern",
    start: "Nov 2023",
    end: "Mar 2024",
    location: "Bengaluru, India · Remote",
    website: "https://www.linkedin.com/company/piggy-ride/",
    logo: "/logos/piggyride.jpeg",
    notes: [
      {
        type: "fixed",
        text: "Resolved sign-in, photo upload and ride-request bugs in the React Native app, plus partner-site tracking bugs.",
      },
      {
        type: "improved",
        text: "Migrated the ride-tracking site from static HTML/CSS to React, Redux and Tailwind CSS, with Three.js 3D visuals and the Google Maps JavaScript API.",
      },
    ],
    stack: ["React", "Redux", "Tailwind CSS", "Three.js", "Google Maps API", "React Native"],
  },
  {
    company: "Louverline Blinds",
    role: "Frontend Developer Intern",
    start: "Mar 2023",
    end: "Oct 2023",
    location: "Bengaluru, India · Remote",
    website: "https://www.louverlineblinds.com",
    logo: "/logos/louverline.png",
    notes: [
      {
        type: "added",
        text: "Engineered the Louverline dealer portal (mylouverline.com) in React, Tailwind CSS and Firebase for 120 dealers.",
      },
      {
        type: "improved",
        text: "Rolled out online ordering that cut order processing time by 30%, saving operations 12 hours a week.",
      },
    ],
    stack: ["React", "Tailwind CSS", "Firebase"],
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

/* ------------------------------------------------------------------ */
/*  Chapters — the story layer (drives the scroll scenes)              */
/* ------------------------------------------------------------------ */

export type SceneKey =
  | "phone-codebase"
  | "phone-native"
  | "phone-chat"
  | "phone-rtl"
  | "genomics-helix"
  | "pdf-stack"
  | "intern-beat"
  | "school-run"
  | "louver-window";

export type Chapter = {
  id: string;
  /** Small mono label above the headline, e.g. "01 · Enigma Genomics". */
  label: string;
  company: string;
  /** The skim layer: a recruiter reading only these gets the pitch. */
  headline: string;
  /** The story layer. */
  story: string;
  /** One dry line, rendered slightly brighter than the story. */
  quip?: string;
  scene: SceneKey;
  /** Brand-colour nod for this chapter's scene (one detail only). */
  brand?: string;
  /** Show the live App Store / Google Play links under the text. */
  storeLinks?: boolean;
};

export const chapters: Chapter[] = [
  {
    id: "one-codebase",
    label: "01 · Enigma Genomics · Youth AI",
    company: "Enigma Genomics",
    headline: "One codebase. Three platforms.",
    story:
      "The Youth AI app runs on iOS, Android and web from the same TypeScript. Report viewer, a 7-day nutrition plan, and a Shopify shop that gently reminds you about the cart you abandoned.",
    quip: "We've all been there.",
    scene: "phone-codebase",
    storeLinks: true,
  },
  {
    id: "native",
    label: "02 · Enigma Genomics · Native work",
    company: "Enigma Genomics",
    headline: "When Expo says no, I open Xcode.",
    story:
      "Config plugins, patched native modules, and a Swift notification extension so push notifications can show images.",
    quip: "Xcode and I are on speaking terms. Mostly.",
    scene: "phone-native",
  },
  {
    id: "ai-chat",
    label: "03 · Enigma Genomics · AI chat",
    company: "Enigma Genomics",
    headline: "AI chat that keeps talking.",
    story:
      "Replies stream in over SSE, with typing dots and recovery when the connection drops mid-sentence.",
    quip: "The assistant never leaves you on read.",
    scene: "phone-chat",
  },
  {
    id: "rtl",
    label: "04 · Enigma Genomics · Arabic",
    company: "Enigma Genomics",
    headline: "Now read this right to left.",
    story: "I localized the whole app into Arabic, with right-to-left layouts on iOS, Android and web.",
    quip: "Every arrow that pointed forward now points… the other forward.",
    scene: "phone-rtl",
  },
  {
    id: "genomics",
    label: "05 · Enigma Genomics · Saudi Genomics Platform",
    company: "Enigma Genomics",
    headline: "1,378 genomes. One search bar.",
    story:
      "A Next.js variant browser for Saudi researchers, with Hasura GraphQL and SMS 2FA. When CVE-2025-55182 dropped, I patched it and moved every query behind a server route.",
    quip: "Genetic data deserves a little paranoia.",
    scene: "genomics-helix",
  },
  {
    id: "pdf-reports",
    label: "06 · Enigma Genomics · Reports",
    company: "Enigma Genomics",
    headline: "20+ genetic tests. Zero ugly PDFs.",
    story:
      "Report templates in English and Arabic, with score meters and charts, signed off by the lab's doctors.",
    quip: "Tougher reviewers than any pull request.",
    scene: "pdf-stack",
  },
  {
    id: "intern-to-fte",
    label: "07 · Enigma Genomics",
    company: "Enigma Genomics",
    headline: "Intern → full-time in 6 months.",
    story: "",
    quip: "Apparently the PDFs were good.",
    scene: "intern-beat",
  },
  {
    id: "school-run",
    label: "08 · PiggyRide",
    company: "PiggyRide",
    headline: "School run, live on a 3D map.",
    story:
      "At PiggyRide (private cabs for kids, mostly the school commute), I rebuilt the ride-tracking site in React, Redux and Three.js so parents could follow every turn. I also fixed sign-in bugs in the app.",
    quip: "Parents appreciate that most at 7:40 a.m.",
    scene: "school-run",
    brand: "#22E1E6",
  },
  {
    id: "louverline",
    label: "09 · Louverline Blinds",
    company: "Louverline Blinds",
    headline: "120 dealers. 12 hours back every week.",
    story:
      "I built the Louverline dealer portal and moved ordering online. Processing got 30% faster.",
    quip: "The ops team got a day and a half of their week back.",
    scene: "louver-window",
    brand: "#C0302F",
  },
];

/* ------------------------------------------------------------------ */
/*  Skills — Mobile and Web side by side                               */
/* ------------------------------------------------------------------ */

export const skills = {
  Languages: ["TypeScript", "JavaScript (ES6+)", "HTML", "CSS", "PHP"],
  Mobile: [
    "React Native",
    "Expo (EAS, config plugins, OTA updates)",
    "Swift (iOS extensions)",
    "Xcode",
    "NativeWind",
    "Crashlytics",
  ],
  Web: ["Next.js", "React", "Tailwind CSS", "MUI", "Three.js"],
  "State and data": [
    "TanStack Query",
    "Redux",
    "REST APIs",
    "SSE",
    "Hasura GraphQL",
    "Firebase",
    "Shopify Storefront API",
  ],
  Tools: ["Git", "GitHub Actions", "Vitest"],
} as const;

/* ------------------------------------------------------------------ */
/*  Side projects                                                      */
/* ------------------------------------------------------------------ */

export type Project = {
  name: string;
  blurb: string;
  description: string;
  /** One dry line for the redesigned card. */
  quip?: string;
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
    blurb: "Logistics platform: site + admin panel",
    description:
      "A logistics platform: the public site at trymeel.com and the internal admin panel that runs the operation.",
    quip: "The admin panel is where the real work happens. As usual.",
    stack: ["Vite", "TypeScript", "React", "Tailwind CSS"],
    href: "https://trymeel.com",
    accent: "from-emerald-400/40 via-teal-400/30 to-cyan-500/40",
  },
  {
    name: "Petu",
    blurb: "Restaurant delivery web app",
    description: "A restaurant delivery web app in React, Redux and Tailwind CSS, with Firebase for auth and data.",
    quip: "Browse restaurants, fill a cart, check out. Designed to make you hungry before the last step.",
    stack: ["React", "Redux", "Tailwind CSS", "Firebase"],
    href: "https://petu.netlify.app/",
    accent: "from-amber-400/40 via-orange-400/30 to-yellow-500/40",
  },
  {
    name: "Vide",
    blurb: "Video-sharing mobile app",
    description: "A video-sharing mobile app in React Native, Expo and NativeWind, with Appwrite for backend and auth.",
    quip: "The world didn't need another video app, but I needed to know how they work.",
    stack: ["React Native", "Expo", "NativeWind", "Appwrite"],
    href: "https://github.com/jayaprakash27/vide",
    accent: "from-cyan-400/40 via-sky-400/30 to-indigo-500/40",
  },
];

/* ------------------------------------------------------------------ */
/*  Education                                                          */
/* ------------------------------------------------------------------ */

export const education = {
  degree: "B.Tech, Electrical & Electronics Engineering",
  school: "Veer Surendra Sai University of Technology (VSSUT), Burla",
  period: "2020 – 2024",
  detail: "CGPA 7.45",
  quip: "I still know which wire not to touch. I just write software now.",
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
  { href: "#story", label: "Story" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
