import { experience, profile, skills, youthAI } from "./data";

/** Canonical site URL. Change this one line when you move to a custom domain. */
export const SITE_URL = "https://jay27codes.vercel.app";

/**
 * schema.org structured data: tells search engines (and AI search) who this
 * page is about, so a search for the name shows a tidy, linked result.
 */
export function personJsonLd() {
  const current = experience.find((e) => e.end === "Present");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: profile.name,
        alternateName: "Jay Sahoo",
        jobTitle: profile.role,
        url: SITE_URL,
        email: `mailto:${profile.email}`,
        sameAs: [profile.socials.github, profile.socials.linkedin],
        knowsAbout: [...skills.Mobile, ...skills.Web, ...skills["State and data"], ...skills.Languages],
        worksFor: current && { "@type": "Organization", name: current.company, url: current.website },
        alumniOf: { "@type": "CollegeOrUniversity", name: "Veer Surendra Sai University of Technology (VSSUT)" },
      },
      {
        "@type": "MobileApplication",
        name: youthAI.name,
        operatingSystem: "iOS, Android, Web",
        applicationCategory: "HealthApplication",
        installUrl: [youthAI.appStore, youthAI.playStore],
        url: youthAI.web,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        contributor: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}

/** Serialises JSON-LD safely: "<" is escaped so no string can close the <script>. */
export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
