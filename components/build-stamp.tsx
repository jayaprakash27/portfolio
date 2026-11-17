"use client";

import * as React from "react";

const BUILT = process.env.NEXT_PUBLIC_BUILD_TIME ?? "";
const COMMITS = process.env.NEXT_PUBLIC_COMMIT_COUNT ?? "0";

function relative(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const days = Math.floor((Date.now() - then) / 86_400_000);
  if (days <= 0) return "last deployed today";
  if (days === 1) return "last deployed yesterday";
  return `last deployed ${days} days ago`;
}

function absolute(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : `deployed ${d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}`;
}

const noop = () => () => {};

/**
 * "v2.<commits> · last deployed N days ago", from the build time and git
 * commit count injected in next.config.ts. The server renders an absolute
 * date; the client swaps in the relative one, so hydration always matches.
 */
export function BuildStamp() {
  const when = React.useSyncExternalStore(noop, () => relative(BUILT), () => absolute(BUILT));
  return (
    <p className="font-mono text-xs text-muted">
      v2.{COMMITS}
      {when && ` · ${when}`}
    </p>
  );
}
