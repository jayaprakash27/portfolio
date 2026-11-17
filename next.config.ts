import type { NextConfig } from "next";
import { execFileSync } from "node:child_process";

/** Reads one line from git at build time; falls back when git isn't available. */
function git(args: string[], fallback: string): string {
  try {
    return execFileSync("git", args, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim() || fallback;
  } catch {
    return fallback;
  }
}

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.3"],
  // Footer build stamp: "v2.<commits> · last deployed N days ago".
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
    NEXT_PUBLIC_COMMIT_COUNT: git(["rev-list", "--count", "HEAD"], "0"),
  },
};

export default nextConfig;
