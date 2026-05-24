export type Achievement = {
  id: string;
  name: string;
  icon: string;
  flavor: string;
  /** Hidden achievements show as "???" in the modal until earned. */
  hidden?: boolean;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_light",
    name: "First Light",
    icon: "🌅",
    flavor: "You found the page. Welcome in.",
  },
  {
    id: "explorer",
    name: "Explorer",
    icon: "🗺️",
    flavor: "Scrolled past every section. Thorough.",
  },
  {
    id: "stalker",
    name: "Stalker",
    icon: "👀",
    flavor: "Hovered every project. Creepy. Effective.",
  },
  {
    id: "bookworm",
    name: "Bookworm",
    icon: "📄",
    flavor: "Opened the résumé. Hire-me energy detected.",
  },
  {
    id: "reaching_out",
    name: "Reaching Out",
    icon: "💌",
    flavor: "Sent a message. I owe you a reply within 24h.",
  },
  {
    id: "curious",
    name: "Curious",
    icon: "🥷",
    flavor: "Triple-clicked the monogram. Suspicious.",
    hidden: true,
  },
  {
    id: "konami",
    name: "Konami Coder",
    icon: "🎮",
    flavor: "↑ ↑ ↓ ↓ ← → ← → B A. The classics endure.",
    hidden: true,
  },
  {
    id: "night_owl",
    name: "Night Owl",
    icon: "🌙",
    flavor: "Loaded the page after midnight. Same.",
    hidden: true,
  },
  {
    id: "completionist",
    name: "Completionist",
    icon: "🏆",
    flavor: "You found them all. We are kindred spirits.",
  },
];

/** Section ids tracked by the Explorer achievement. Order doesn't matter. */
export const SECTION_IDS = [
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
];

export const STORAGE_KEY = "portfolio_achievements_v1";

/** Konami code sequence, lowercased for case-insensitive matching against `event.key`. */
export const KONAMI_SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

export const HIRE_ME_KEYWORD = "sudo hire-me";
