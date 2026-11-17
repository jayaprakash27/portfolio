# Portfolio redesign — scene plan

Status: built (Nov 2026). This file is the design record; the code lives in `components/scenes`, `components/story` and `components/sections`.
Source of truth for content: `Jayaprakash_Sahoo.pdf` (Nov 2026 resume) → to be synced into `lib/data.ts`.

---

## 1. The big idea

**Headlines are the resume. The body is the story. The stage proves it.**

- A recruiter who reads only the giant headlines gets the full pitch in ~10 seconds.
- A curious reader gets the story in the smaller text, with one dry joke per section.
- A **stage** (right column on desktop, inline on mobile) turns into each company's world and *shows* the claim in the headline.

Every scene follows the same five rules:

1. **One illustrator.** Same palette, same line weight, same flat style everywhere. Each company gets exactly *one* brand-colour detail, nothing more.
2. **Text is never blocked.** The headline and bullets stay readable at every scroll position.
3. **Scroll-driven, not autoplay.** Scrolling back reverses the scene. Nobody waits for an animation.
4. **Phones get a simpler cut.** Same story, fewer moving parts, no WebGL unless it's cheap.
5. **Reduced motion = final frame.** `prefers-reduced-motion` renders each scene's finished state as a still.

---

## 2. Global system

### Visual language
**Chosen direction: B · Night Shift** (see `ui-options.html`).

| Token | Value | Notes |
|---|---|---|
| `--bg` | `#0E0E10` near-black | page background |
| `--fg` | `#F2EEE6` warm paper | text, outlines |
| `--accent` | `#C6F432` acid lime | the one loud colour; never clashes with Louverline red or PiggyRide cyan |
| `--muted` | `#9B978F` | body copy |
| `--card` | `#18181B` | phone screens, windows, cards |
| Display font | Big Shoulders Display 900 (via `next/font/google`) | ALL CAPS headlines, line-height ~0.9, `clamp()` sizing |
| Label font | Geist Mono (already installed) | chapter numbers, versions, timestamps |
| Body font | Geist Sans (already installed) | |

Light mode: same palette inverted (paper background, ink text, same accent).

### Layout
```
Desktop (≥1024px)                     Mobile
┌──────────────────────┬─────────┐    ┌─────────────┐
│ 01 · CHAPTER LABEL   │         │    │ HEADLINE    │
│ GIANT HEADLINE       │  STAGE  │    │ [scene]     │
│ story text + joke    │ (sticky)│    │ story text  │
│ release-notes rows   │         │    │ notes rows  │
└──────────────────────┴─────────┘    └─────────────┘
```

### Shared building blocks (to create)
| Piece | Job |
|---|---|
| `<Chapter id progressRef>` | Section wrapper; exposes scroll progress 0→1 for that chapter |
| `<Stage>` | Sticky container on desktop; swaps scene by active chapter (IntersectionObserver) |
| `useChapterProgress()` | `useScroll({ target, offset })` wrapper → one MotionValue per chapter |
| `<ReleaseNotes items>` | Experience bullets tagged **Added / Improved / Fixed** |
| `<Toast>` | iOS-style notification used by phone, PiggyRide, and the nudge |
| `<ReducedMotionFrame>` | Renders a scene's final frame when motion is reduced |

**One rule for all scenes:** a single progress value (0→1) drives every moving part in that scene. No independent timers, so nothing drifts out of sync.

### Removed from current site
3D cursor orb, mesh gradient, glass cards, liquid-glass navbar, achievements system (one easter egg may come back — see §5).

---

## 3. Page order

| # | Section | Scene | Effort |
|---|---|---|---|
| 0 | Hero | Kinetic headline + phone slides in | M |
| — | Skip intro → TL;DR | App Store listing card | S |
| 1 | Enigma · Youth AI app | Sticky phone, 5 beats | L |
| 2 | Enigma · Saudi Genomics | 1,378-dot helix | M |
| 3 | Enigma · PDF reports | Paper stack, EN ⇄ AR flip | M |
| 4 | Intern → full-time | Title strike-through beat | S |
| 5 | PiggyRide | 3D school run | L |
| 6 | Louverline | Blinds reveal + 120 dealers | M |
| 7 | Side projects | Card hover touches | S |
| 8 | Toolbox (skills) | Typographic list, no scene | S |
| 9 | Education | One line, no scene | S |
| 10 | The end / contact | Phone returns with email compose | S |
| ∞ | Global | Notification nudge, build stamp, 404 | S |

---

## 4. Scenes in detail

Scroll beats are given as % of that chapter's progress.

### 0 · Hero
- **Headline:** REACT NATIVE ENGINEER. / I SHIP TO THE STORES.
- **Sub:** Hi, I'm Jay. I build apps that make it through App Store review. Usually on the first try. *(verify)*
- **Scene:** headline words land one by one on load (the only load-time animation on the site); on first scroll the phone slides up into the stage, ready for chapter 1.
- **UI:** `● Open to work` pill (top right, stays visible all page) · `Skip intro →` button (tooltip: "Recruiter? Respect. Here's the short version.")
- **Mobile:** same, phone appears inline below the fold.
- **Reduced motion:** headline static, phone already in place.

### TL;DR · App Store listing card
Target of "Skip intro". Also reachable from the nav.
- Icon (initials) · **Jay Sahoo** · React Native engineer · **Get** button → email
- Stats row: `2 yrs full-time` · `3 platforms` · `1 app live in stores`
- *What's new · v2.0:* Promoted intern → full-time in 6 months. Added Arabic and right-to-left support.
- Screenshot row: Youth AI · Genomics · Louverline (tap → jumps to that chapter)
- Secondary actions: Resume · LinkedIn · GitHub

### 1 · Enigma — Youth AI app (the phone)
The phone is the stage. Five beats, each with its own headline block on the left.

| Beat | Progress | Headline | Phone shows | Joke line |
|---|---|---|---|---|
| a | 0–20% | ONE CODEBASE. THREE PLATFORMS. | Phone frame morphs → browser window → back | "...a Shopify shop that gently reminds you about the cart you abandoned. We've all been there." |
| b | 20–40% | WHEN EXPO SAYS NO, I OPEN XCODE. | Rich push notification with image drops in | "Xcode and I are on speaking terms. Mostly." |
| c | 40–60% | AI CHAT THAT KEEPS TALKING. | Reply streams in → "connection lost" → resumes | "The assistant never leaves you on read." |
| d | 60–80% | NOW READ THIS RIGHT TO LEFT. | Whole screen mirrors to Arabic; **the headline itself flips direction** | "Every arrow that pointed forward now points… the other forward." |
| e | 80–100% | (no new headline — release notes list) | Report PDF downloads with resumable progress bar, then opens instantly | — |

- **Brand nod:** Enigma's brand colour on the phone's app accent. *(need colour — open question 2)*
- **Release notes under the beats:** Added (Youth AI launch, AI chat, Arabic/RTL, native integrations) · Improved (PDF caching, re-renders, R8 shrinking) · Shipped-with (EAS, OTA, GitHub Actions, Crashlytics, Vitest)
- **Tech:** plain React components faking behaviour (setTimeout-free: streaming text length = f(progress)). CSS `direction: rtl` for the flip.
- **Mobile:** phone inline and smaller; beats stack vertically, each beat's phone screen is a static-ish card that animates once on enter.

### 2 · Enigma — Saudi Genomics Platform (1,378 dots)
- **Headline:** 1,378 GENOMES. ONE SEARCH BAR.
- **Sub:** Next.js variant browser for Saudi researchers, Hasura GraphQL, SMS 2FA. "When CVE-2025-55182 dropped, I patched it and moved every query behind a server route. Genetic data deserves a little paranoia."
- **Beats:**
  - 0–35% scattered dots drift into a slowly rotating double helix
  - 35–60% a search bar types `BRCA…` above the helix
  - 60–85% ~12 dots light up in the brand colour (variant match), rest dim
  - 85–100% a tiny lock icon + "2FA" badge snaps onto the search bar (security beat for the CVE line)
- **Count is exact:** 1,378 dots. It's the number in the headline.
- **Tech:** single `<canvas>`, 2D projection of a helix (no Three.js needed), dot positions precomputed once.
- **Mobile:** ~400 dots *visually* (sampled) with the label still saying 1,378, or full count if it stays at 60 fps — measure.
- **Reduced motion:** helix formed, variants lit.

### 3 · Enigma — PDF reports
- **Headline:** 20+ GENETIC TESTS. ZERO UGLY PDFs.
- **Sub:** "Report templates in English and Arabic, with score meters and charts, signed off by the lab's doctors. Tougher reviewers than any pull request."
- **Beats:**
  - 0–40% report pages fan out from a stack (20+ thin sheets)
  - 40–70% top page's score meter animates to a value; bar chart grows
  - 70–100% page flips: English layout → mirrored Arabic layout
- **Tech:** DOM/CSS 3D (`rotateY` page flip, `perspective`).
- **Includes the intern-period work** (six wellness test templates) in the release notes.

### 4 · Intern → full-time
- **Headline:** INTERN → FULL-TIME IN 6 MONTHS.
- **Sub:** "Apparently the PDFs were good." *(callback to §3)*
- **Scene:** a job-title label `Software Engineer Intern` — the word "Intern" gets struck through and slides away. Small, quick, typographic.
- No stage scene; the stage fades to empty here as a breath between companies.

### 5 · PiggyRide — the school run (3D)
- **Headline:** SCHOOL RUN, LIVE ON A 3D MAP.
- **Sub:** "At PiggyRide — private cabs for kids, mostly the school commute — I rebuilt the ride-tracking site in React, Redux and Three.js so parents could follow every turn. I also fixed sign-in bugs in the app, which parents appreciate most at 7:40 a.m."
- **Beats:**
  - 0–15% top-down map tiles fade in, dawn sky; home pin + school pin
  - 15–30% route line draws home → school; toast `Driver arrived · 7:32`
  - 30–85% low-poly cab drives the route, wheels turn, leans into curves; sky warms to morning; toast `Picked up · on the way` at ~45%
  - 85–100% cab parks, school pin gets ✓; toast `Arrived at school · 7:58 ✓`
- **The cab:** small, rounded, toy-like (kids ride it), built from primitives (boxes + cylinders), **cyan stripe** = PiggyRide brand nod.
- **Tech:** `@react-three/fiber` (already installed), `CatmullRomCurve3` route, `getPointAt(p)` / `getTangentAt(p)` for position + heading. Loaded with `next/dynamic` (`ssr: false`) and mounted only when the chapter is near the viewport. The **only** WebGL scene on the site.
- **Mobile:** 2D SVG version — route path + flat car icon moving along `getPointAtLength`. Same toasts.
- **Reduced motion:** cab parked at school, all three toasts listed.

### 6 · Louverline — blinds reveal + dealers
- **Headline:** 120 DEALERS. 12 HOURS BACK EVERY WEEK.
- **Sub:** "I built the Louverline dealer portal and moved ordering online. Processing got 30% faster, and the ops team got a day and a half of their week back."
- **Revised after review:** full-section blinds over the text felt disturbing. The blinds now live **only inside a contained "window" on the stage**, never over the headline or story, and never loop.
- **Beats (scroll-driven, reverse on scroll up):**
  - 0–35% Louverline-red slats inside the window tilt open, staggered top to bottom
  - 35–55% slats fade out; a thin red bar stays on the window's top edge (the only brand nod)
  - 40–85% a 12×10 grid of **120 small dots** (dealers) lights up in muted tone
  - 40–85% counters tick `0 → 12 hours saved / week` and `0 → 30% faster`
- **Tech:** 16 slat `div`s with `rotateX` + `perspective`, driven by the chapter's single progress value. Dealers are DOM dots.
- **Mobile:** same window, 10 slats.
- **Reduced motion:** blinds open, grid lit, counters final.

### 7 · Side projects
Card-sized touches only, no stage.
- **Meel** *(keep? — open question 3)*: logistics site + admin panel. Hover: a tiny parcel slides across the card.
- **Petu**: "Food delivery, named after what I am. Built while hungry." Hover: steam rises off the card.
- **Vide**: "The world didn't need another video app, but I needed to know how they work." Hover: a fake video scrubber plays across the card.

### 8 · Toolbox
- **Headline:** THE TOOLBOX. — "Things I reach for without googling. Mostly."
- Big typographic list grouped as on the resume: Languages · Mobile · State and UI · APIs and tools. No scene.

### 9 · Education
- One line: "B.Tech in Electrical & Electronics Engineering, VSSUT, 2020–24. I still know which wire not to touch. I just write software now."

### 10 · The end
- **Headline:** YOU SCROLLED ALL THE WAY DOWN. / THAT'S A GOOD SIGN.
- **Sub:** "Tell me what you're building."
- **Scene:** the phone from the hero returns to the stage showing a mail compose screen, `To: Jay` prefilled. Tapping it opens the real `mailto:` / contact form. Bookends the page.
- Actions: Email me · Resume · LinkedIn · GitHub

### Global touches
- **Notification nudge:** at ~70% page scroll, once per visit, an iOS-style toast slides in: "Jay: still here? Let's talk →". Dismissible, never returns (sessionStorage).
- **Build stamp (footer):** `v2.x · last deployed N days ago`, from the git commit date injected at build time.
- **Footer line:** "© 2026 Jay. Built with Next.js, tested on more phones than I'd like to admit."
- **404:** "This page didn't pass review."
- **Easter egg (optional):** reaching the end after reading every chapter shows a tiny badge: "Read the whole changelog. Respect."

---

## 5. Performance budget

| Item | Budget |
|---|---|
| First load JS (hero + TL;DR) | no Three.js, no canvas code |
| Three.js | lazy, PiggyRide chapter only, desktop only |
| Images | none required by scenes (all drawn); logos only |
| Frame rate | 60 fps target on a mid-range Android; measure helix + blinds |
| Lighthouse | Performance ≥ 90 mobile |

---

## 6. Build order

1. Sync `lib/data.ts` + `public/resume.pdf` with the new resume; add `headline`, `story`, and `type: added|improved|fixed` fields.
2. New tokens, fonts, layout shell; remove orb/mesh/glass/achievements.
3. `<Chapter>`, `<Stage>`, `useChapterProgress`, `<Toast>`, `<ReleaseNotes>`.
4. Hero + Skip intro + TL;DR card + Open-to-work pill. *(site is already recruiter-complete here)*
5. Louverline blinds (proves the scroll system cheaply).
6. PiggyRide school run (proves lazy 3D).
7. Enigma phone (biggest scene).
8. Genomics helix, PDF stack, intern beat.
9. Side projects, toolbox, education, the end.
10. Nudge, build stamp, 404, reduced-motion pass, mobile pass, perf pass.

Each step leaves the site shippable.

---

## 7. Open questions

1. ~~Site accent colour~~ — decided: B · Night Shift, acid lime.
2. **Enigma brand colour** for the phone app accent and the lit helix dots.
3. **Keep Meel** in side projects? It's not on the resume.
4. **Verify the "true for tone" lines:** App Store "usually first try"; anything else that reads as a claim.
5. **Contact:** keep the existing Resend contact form behind the end-screen phone, or mailto only?
