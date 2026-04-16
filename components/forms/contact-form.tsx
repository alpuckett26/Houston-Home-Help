"use client";

import { useActionState } from "react";
import { initialActionState, submitContactForm } from "@/app/actions";
import { FormFeedback } from "@/components/forms/form-feedback";
import { SubmitButton } from "@/components/forms/submit-button";

export function ContactForm() {
  const [state, action] = useActionState(submitContactForm, initialActionState);

  return (
    <form action={action} className="mt-6 grid gap-3">
      <input required name="name" placeholder="Name" className="rounded-lg border p-2" />
      <input required type="email" name="email" placeholder="Email" className="rounded-lg border p-2" />
      <input required name="phone" placeholder="Phone" className="rounded-lg border p-2" />
      <textarea required name="message" placeholder="How can we help?" className="min-h-24 rounded-lg border p-2" />
      <FormFeedback state={state} />
      <SubmitButton label="Send Message" pendingLabel="Sending..." />
    </form>
  );
}
