"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: Props) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex flex-col gap-3", alignCls, className)}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">
        {eyebrow}
      </span>
      <h2 className="text-gradient text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-white/65 leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
