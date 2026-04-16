"use client";

import { useActionState } from "react";
import { signUpAction } from "@/app/(auth)/actions";
import { initialActionState } from "@/app/actions";
import { FormFeedback } from "@/components/forms/form-feedback";
import { SubmitButton } from "@/components/forms/submit-button";

export function SignupForm() {
  const [state, action] = useActionState(signUpAction, initialActionState);

  return (
    <form action={action} className="mt-6 grid gap-4">
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-ink-700">Full name</span>
        <input required name="fullName" className="field" autoComplete="name" />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-ink-700">Email</span>
        <input required type="email" name="email" className="field" autoComplete="email" />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-ink-700">Password</span>
        <input required type="password" name="password" minLength={8} className="field" autoComplete="new-password" />
        <span className="text-xs text-ink-500">At least 8 characters.</span>
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-ink-700">I'm joining as</span>
        <select required name="role" className="field-select">
          <option value="family">A family seeking support</option>
          <option value="caregiver">A caregiver offering support</option>
        </select>
      </label>
      <FormFeedback state={state} />
      <SubmitButton label="Create account" pendingLabel="Creating account…" />
    </form>
  );
}
