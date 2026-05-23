"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, Mail, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/sections/_heading";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please share your name."),
  email: z.string().email("That doesn't look like a valid email."),
  message: z.string().min(10, "A few more words, please."),
});

type FormValues = z.infer<typeof schema>;

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      toast.success("Message sent — I'll be in touch soon.");
      reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send";
      toast.error(message);
    }
  }

  return (
    <section id="contact" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="06 · Contact"
          title="Let's build something together"
          description="Have a role, a project, or just want to chat about the web? Drop a line."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-[1fr_1.3fr]">
          {/* Side — direct contact links */}
          <div className="flex flex-col gap-6">
            <GlassCard className="flex flex-col gap-5 p-7">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                Direct
              </span>
              <div className="flex flex-col gap-3">
                <ContactRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={profile.email}
                  href={`mailto:${profile.email}`}
                />
                <ContactRow
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone"
                  value={profile.phone}
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                />
                <ContactRow
                  icon={<GitHubIcon />}
                  label="GitHub"
                  value="github.com/jay"
                  href={profile.socials.github}
                />
                <ContactRow
                  icon={<LinkedInIcon />}
                  label="LinkedIn"
                  value="linkedin.com/in/jay"
                  href={profile.socials.linkedin}
                />
              </div>
            </GlassCard>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="overflow-hidden p-7">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-sm text-white/85">
                    Replying within ~24 hours
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Form */}
          <GlassCard className="p-7 sm:p-8" interactive={false}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <Field
                label="Your name"
                error={errors.name?.message}
                input={
                  <input
                    {...register("name")}
                    type="text"
                    autoComplete="name"
                    placeholder="Ada Lovelace"
                  />
                }
              />
              <Field
                label="Email"
                error={errors.email?.message}
                input={
                  <input
                    {...register("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="you@domain.com"
                  />
                }
              />
              <Field
                label="Message"
                error={errors.message?.message}
                input={
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell me a bit about what you're working on…"
                  />
                }
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative mt-2 inline-flex items-center justify-center gap-2 self-start rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition hover:border-white/15 hover:bg-white/[0.06]"
    >
      <span className="flex items-center gap-3">
        <span className="glass inline-flex h-8 w-8 items-center justify-center rounded-xl text-white/85">
          {icon}
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
            {label}
          </span>
          <span className="text-sm text-white/90">{value}</span>
        </span>
      </span>
      <span className="text-white/40 transition group-hover:translate-x-0.5 group-hover:text-white/80">
        →
      </span>
    </a>
  );
}

function Field({
  label,
  input,
  error,
}: {
  label: string;
  input: React.ReactNode;
  error?: string;
}) {
  const childWithClasses = React.isValidElement<{ className?: string }>(input)
    ? React.cloneElement(input, {
        className: cn(
          "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/30 focus:bg-white/[0.06] focus:outline-none transition",
          error && "border-rose-400/40"
        ),
      })
    : input;
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
        {label}
      </span>
      {childWithClasses}
      {error && <span className="text-xs text-rose-300/85">{error}</span>}
    </label>
  );
}
