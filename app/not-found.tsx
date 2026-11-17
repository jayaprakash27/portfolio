import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col justify-center px-4 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">404 · Rejected</p>
        <h1 className="display mt-4 text-[clamp(4rem,12vw,11rem)] text-fg">
          This page didn&apos;t pass <span className="text-accent">review.</span>
        </h1>
        <p className="mt-6 max-w-[46ch] text-lg text-muted">
          Guideline 404: the link you followed points somewhere that doesn&apos;t exist.{" "}
          <span className="text-fg">Resubmitting won&apos;t help.</span>
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex rounded-full bg-fg px-5 py-3 font-mono text-sm text-bg transition-opacity hover:opacity-85"
        >
          ← Back to the homepage
        </Link>
      </div>
    </main>
  );
}
