import type { ActionState } from "@/lib/types";

export function FormFeedback({ state }: { state: ActionState }) {
  if (!state.message) {
    return null;
  }

  const styles = state.success
    ? "bg-hhh-50 text-hhh-800 ring-hhh-200"
    : "bg-sun-50 text-sun-600 ring-sun-200";

  return (
    <p className={`rounded-xl px-4 py-3 text-sm ring-1 ${styles}`}>{state.message}</p>
  );
}
