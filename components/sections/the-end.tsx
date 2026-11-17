"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

type FormValues = { name: string; email: string; message: string };

// Validated with react-hook-form's built-in rules: zod would add ~400 KB
// to the first page load for three fields. The API route still validates.
const rules = {
  name: { required: "Add your name.", minLength: { value: 2, message: "Add your name." } },
  email: {
    required: "Add your email.",
    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "That email doesn't look right." },
  },
  message: {
    required: "Write a message.",
    minLength: { value: 10, message: "A few more words, please." },
  },
} as const;

/**
 * The end bookends the hero: the phone comes back as a mail-compose
 * screen addressed to Jay. It's the real contact form (sent via the
 * existing /api/contact route), not a picture of one.
 */
export function TheEnd() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong");
      toast.success("Sent. I'll reply soon.");
      reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't send. Try email instead.");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 border-t border-line px-4 py-24 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] [&>*]:min-w-0">
        <div className="flex flex-col gap-6">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">The end</span>
          <h2 id="contact-title" className="display text-[clamp(3.5rem,9vw,8.5rem)] text-fg">
            You scrolled all the way down. <span className="text-accent">That&apos;s a good sign.</span>
          </h2>
          <p className="text-lg text-muted">
            Tell me what you&apos;re building. <span className="text-fg">Or skip the form and just email me.</span>
          </p>
          <div className="flex flex-wrap gap-2 font-mono text-sm">
            <a href={`mailto:${profile.email}`} className="rounded-full bg-accent px-4 py-2 text-on-accent hover:opacity-90">
              Email me
            </a>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="rounded-full border border-line px-4 py-2 text-fg hover:border-accent">
              Resume
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-fg hover:border-accent">
              <LinkedInIcon /> LinkedIn
            </a>
            <a href={profile.socials.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-fg hover:border-accent">
              <GitHubIcon /> GitHub
            </a>
          </div>
        </div>

        {/* The phone, back for the finale. */}
        <div className="mx-auto w-full max-w-[340px] rounded-[44px] border-2 border-fg bg-card p-4 pt-3">
          <div className="mx-auto mb-4 h-6 w-20 rounded-full bg-fg" aria-hidden />
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col text-sm text-fg">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs text-muted">New message</span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 font-mono text-xs text-on-accent transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                Send
              </button>
            </div>
            <Row label="To">
              <span className="truncate text-fg">Jay · {profile.email}</span>
            </Row>
            <Field label="From" error={errors.email?.message}>
              <input type="email" autoComplete="email" placeholder="you@company.com" {...register("email", rules.email)} className={inputCls} />
            </Field>
            <Field label="Name" error={errors.name?.message}>
              <input type="text" autoComplete="name" placeholder="Your name" {...register("name", rules.name)} className={inputCls} />
            </Field>
            <Field label="Message" error={errors.message?.message} stacked>
              <textarea
                rows={7}
                placeholder="We're hiring a React Native engineer who…"
                {...register("message", rules.message)}
                className={cn(inputCls, "resize-none leading-relaxed")}
              />
            </Field>
          </form>
        </div>
      </div>
    </section>
  );
}

// No box or ring: like a mail app, focus shows on the whole row instead
// (lime divider + lime label + lime caret), styled in <Field>.
const inputCls =
  "focus-row w-full min-w-0 bg-transparent text-fg caret-accent placeholder:text-muted/60";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-b border-line py-2.5">
      <span className="w-14 shrink-0 text-muted">{label}</span>
      {children}
    </div>
  );
}

function Field({
  label,
  error,
  stacked = false,
  children,
}: {
  label: string;
  error?: string;
  stacked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      className={cn(
        "group flex border-b border-line py-2.5 transition-colors focus-within:border-accent",
        error && "border-accent/60",
        stacked ? "flex-col gap-2" : "items-center gap-3"
      )}
    >
      <span className="w-14 shrink-0 text-muted transition-colors group-focus-within:text-accent">{label}</span>
      <span className="flex min-w-0 flex-1 flex-col">
        {children}
        {error && <span className="mt-1 text-xs text-accent">{error}</span>}
      </span>
    </label>
  );
}
