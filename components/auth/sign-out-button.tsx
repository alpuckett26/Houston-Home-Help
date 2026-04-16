import { signOutAction } from "@/app/(auth)/actions";

export function SignOutButton({ className = "" }: { className?: string }) {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className={`inline-flex items-center rounded-full border border-ink/10 px-3 py-1.5 text-xs font-semibold text-ink-700 transition hover:border-hhh-700/40 hover:text-hhh-700 ${className}`}
      >
        Sign out
      </button>
    </form>
  );
}
