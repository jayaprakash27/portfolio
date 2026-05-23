import Link from "next/link";
import { profile } from "@/lib/data";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-white/5 px-6 py-12 text-sm text-white/55">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-mono text-xs uppercase tracking-widest">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-2">
          <FooterLink href={profile.socials.github} label="GitHub">
            <GitHubIcon />
          </FooterLink>
          <FooterLink href={profile.socials.linkedin} label="LinkedIn">
            <LinkedInIcon />
          </FooterLink>
          <FooterLink href={`mailto:${profile.email}`} label="Email">
            <Mail className="h-4 w-4" />
          </FooterLink>
        </div>
        <p className="font-mono text-xs text-white/40">
          Built with Next.js · Deployed on Vercel
        </p>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition hover:bg-white/[0.08] hover:text-white"
    >
      {children}
    </Link>
  );
}
