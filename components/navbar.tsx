"use client";

import * as React from "react";
import Link from "next/link";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, profile } from "@/lib/data";
import { KonarkWheel } from "@/components/konark-wheel";

/**
 * Night Shift top bar: name on the left, section links in the middle,
 * and the always-visible "Open to work" pill + résumé on the right.
 * The pill is the persistent contact point from the redesign plan, so
 * a visitor can reach out from anywhere on the page.
 */
export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || open ? "border-line bg-bg" : "border-transparent bg-transparent"
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="#top" className="shrink-0 font-mono text-sm tracking-wide text-fg">
          <span className="sm:hidden">{profile.shortName.toUpperCase()}</span>
          <span className="hidden sm:inline">{profile.name.toUpperCase()}</span>
        </Link>

        <ul className="ml-auto hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="font-mono text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-fg">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <KonarkWheel />
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line px-3 py-1.5 font-mono text-xs text-fg transition-colors hover:border-accent"
          >
            <span className="status-dot" aria-hidden />
            {profile.status}
          </Link>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-fg px-3 py-1.5 font-mono text-xs text-bg transition-opacity hover:opacity-85 sm:inline-flex"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-fg lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="mx-auto flex max-w-6xl flex-col px-4 pb-4 lg:hidden">
          {navLinks.map((l) => (
            <li key={l.href} className="border-t border-line">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="display block py-3 text-4xl text-fg"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="border-t border-line pt-4">
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="font-mono text-sm text-accent">
              Download resume →
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
