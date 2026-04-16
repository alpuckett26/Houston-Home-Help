import type { ActionState } from "@/lib/types";

export function FormFeedback({ state }: { state: ActionState }) {
  if (!state.message) {
    return null;
  }

  return (
    <p className={`rounded-lg p-3 text-sm ${state.success ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
      {state.message}
    </p>
  );
}
