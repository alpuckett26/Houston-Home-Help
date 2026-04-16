import Link from "next/link";
import { PropsWithChildren } from "react";
import { ArrowRightIcon } from "@/components/icons";

export function Container({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  tone = "default"
}: PropsWithChildren<{ className?: string; tone?: "default" | "cream" | "hhh" | "dark" }>) {
  const tones: Record<string, string> = {
    default: "",
    cream: "bg-cream-200/60",
    hhh: "bg-hhh-50",
    dark: "bg-hhh-900 text-cream"
  };
  return <section className={`py-16 sm:py-20 ${tones[tone]} ${className}`}>{children}</section>;
}

export function Card({
  children,
  className = "",
  interactive = false
}: PropsWithChildren<{ className?: string; interactive?: boolean }>) {
  return (
    <div
      className={`rounded-2xl border border-ink/5 bg-white p-6 shadow-soft ${
        interactive ? "transition hover:-translate-y-0.5 hover:shadow-ring" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left"
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className={`mt-3 text-3xl font-semibold text-ink sm:text-4xl`}>{title}</h2>
      {description ? <p className="mt-4 text-lg leading-relaxed text-ink-500">{description}</p> : null}
    </div>
  );
}

export function CTAButton({
  href,
  label,
  variant = "primary",
  icon = false,
  className = ""
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  icon?: boolean;
  className?: string;
}) {
  const variants: Record<string, string> = {
    primary: "bg-hhh-700 text-cream hover:bg-hhh-800 shadow-soft",
    secondary: "bg-white text-hhh-700 ring-1 ring-hhh-700/20 hover:ring-hhh-700/40 hover:bg-hhh-50",
    ghost: "text-hhh-700 hover:bg-hhh-50",
    dark: "bg-ink-900 text-cream hover:bg-ink-700"
  };
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`}
    >
      {label}
      {icon ? <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /> : null}
    </Link>
  );
}

export function Pill({ children }: PropsWithChildren) {
  return <span className="pill">{children}</span>;
}

export function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-white/80 px-5 py-4 ring-1 ring-ink/5 backdrop-blur">
      <p className="font-display text-2xl font-semibold text-hhh-800">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-500">{label}</p>
    </div>
  );
}
