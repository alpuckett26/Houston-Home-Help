"use client";

import { useActionState } from "react";
import { signInAction } from "@/app/(auth)/actions";
import { initialActionState } from "@/app/actions";
import { FormFeedback } from "@/components/forms/form-feedback";
import { SubmitButton } from "@/components/forms/submit-button";

export function LoginForm() {
  const [state, action] = useActionState(signInAction, initialActionState);

  return (
    <form action={action} className="mt-6 grid gap-4">
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-ink-700">Email</span>
        <input required type="email" name="email" className="field" autoComplete="email" />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-ink-700">Password</span>
        <input required type="password" name="password" minLength={8} className="field" autoComplete="current-password" />
      </label>
      <FormFeedback state={state} />
      <SubmitButton label="Sign in" pendingLabel="Signing in…" />
    </form>
  );
}
