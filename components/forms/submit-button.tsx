"use client";

import { useFormStatus } from "react-dom";
import { ArrowRightIcon } from "@/components/icons";

export function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-hhh-700 px-6 py-3 text-sm font-semibold text-cream shadow-soft transition hover:bg-hhh-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {pending ? pendingLabel : label}
      {!pending ? <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /> : null}
    </button>
  );
}
