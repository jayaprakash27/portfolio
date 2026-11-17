import Link from "next/link";
import { profile } from "@/lib/data";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { Mail } from "lucide-react";
import { BuildStamp } from "@/components/build-stamp";
import { NayagadaFact } from "@/components/nayagada-fact";

export function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-line px-4 py-10 text-sm text-muted sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex max-w-2xl flex-col gap-1">
          <p className="mb-1 text-base text-fg">
            Made in <NayagadaFact />, Odisha. Shipped everywhere.
          </p>
          <p>
            © {new Date().getFullYear()} {profile.shortName}. Built with Next.js, tested on more phones
            than I&apos;d like to admit.
          </p>
          <BuildStamp />
        </div>
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-fg"
    >
      {children}
    </Link>
  );
}
