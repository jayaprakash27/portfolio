# Jayaprakash Sahoo — Portfolio

A personal portfolio built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **Lenis** smooth-scroll — styled with an Apple "Liquid Glass" aesthetic.

## Stack

- Next.js 16 + React 19 (App Router, Turbopack)
- TypeScript, Tailwind CSS v4
- Framer Motion · Lenis · Sonner
- React Hook Form + Zod for the contact form
- Resend for transactional email
- Deployed on Vercel

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in RESEND_API_KEY (optional in dev)
npm run dev
```

Open <http://localhost:3000>.

> If `RESEND_API_KEY` is unset the contact API will log the payload to the server console instead of sending email — so the form still "works" in development.

## Customize

| What | Where |
| --- | --- |
| Personal info, experience, projects, skills | `lib/data.ts` |
| Hero photo | drop into `public/headshot.jpg` |
| Resume PDF | `public/resume.pdf` |
| Colors / glass tokens | `app/globals.css` (CSS vars + `@utility glass`) |
| Email recipient / sender | `.env.local` (`CONTACT_RECIPIENT`, `CONTACT_SENDER`) |

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import the repo at <https://vercel.com/new>.
3. Add environment variables (project → settings → environment variables):
   - `RESEND_API_KEY` — from <https://resend.com/api-keys>
   - `CONTACT_RECIPIENT` — *(optional)* your inbox
   - `CONTACT_SENDER` — *(optional)* e.g. `"Portfolio <hello@yourdomain.com>"` after verifying a domain in Resend
4. Deploy. You'll get a free `*.vercel.app` URL automatically.

## TODOs after first deploy

- Add real social URLs to `lib/data.ts` (LinkedIn, GitHub, existing portfolio).
- Drop a real headshot in `public/headshot.jpg`.
- Verify your domain in Resend and update `CONTACT_SENDER` for production deliverability.
