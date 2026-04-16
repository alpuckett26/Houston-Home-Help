"use client";

import { useActionState } from "react";
import { initialActionState, submitContactForm } from "@/app/actions";
import { FormFeedback } from "@/components/forms/form-feedback";
import { SubmitButton } from "@/components/forms/submit-button";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-semibold text-ink-700">{children}</span>;
}

export function ContactForm() {
  const [state, action] = useActionState(submitContactForm, initialActionState);

  return (
    <form action={action} className="mt-8 grid gap-5">
      <label className="grid gap-2"><FieldLabel>Name</FieldLabel><input required name="name" className="field" /></label>
      <label className="grid gap-2"><FieldLabel>Email</FieldLabel><input required type="email" name="email" className="field" /></label>
      <label className="grid gap-2"><FieldLabel>Phone</FieldLabel><input required name="phone" className="field" /></label>
      <label className="grid gap-2"><FieldLabel>How can we help?</FieldLabel>
        <textarea required name="message" className="field min-h-32 resize-y" />
      </label>
      <FormFeedback state={state} />
      <SubmitButton label="Send message" pendingLabel="Sending…" />
    </form>
  );
}
