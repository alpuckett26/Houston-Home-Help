import Link from "next/link";
import { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
  return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>;
}

export function Section({ children }: PropsWithChildren) {
  return <section className="py-12 sm:py-16">{children}</section>;
}

export function Card({ children }: PropsWithChildren) {
  return <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">{children}</div>;
}

export function CTAButton({ href, label, variant = "primary" }: { href: string; label: string; variant?: "primary" | "secondary" }) {
  const cls =
    variant === "primary"
      ? "bg-brand-500 text-white hover:bg-brand-700"
      : "bg-white text-brand-700 ring-1 ring-brand-700 hover:bg-brand-50";

  return (
    <Link className={`inline-flex rounded-xl px-5 py-3 font-semibold transition ${cls}`} href={href}>
      {label}
    </Link>
  );
}
