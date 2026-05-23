"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
};

const container: Variants = {
  hidden: {},
  show: (custom: { delay: number; stagger: number }) => ({
    transition: { staggerChildren: custom.stagger, delayChildren: custom.delay },
  }),
};

const child: Variants = {
  hidden: { y: "115%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { type: "spring", stiffness: 110, damping: 18, mass: 0.6 },
  },
};

export function AnimatedText({
  text,
  className,
  as = "p",
  delay = 0,
  stagger = 0.04,
}: Props) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      custom={{ delay, stagger }}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden align-bottom pr-[0.25em]">
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
