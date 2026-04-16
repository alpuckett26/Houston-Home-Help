"use client";

import Link from "next/link";
import { useActionState } from "react";
import { initialActionState, submitFamilyRequest } from "@/app/actions";
import { serviceTypes } from "@/lib/constants";
import { FormFeedback } from "@/components/forms/form-feedback";
import { SubmitButton } from "@/components/forms/submit-button";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-semibold text-ink-700">{children}</span>;
}

export function FamilyRequestForm() {
  const [state, action] = useActionState(submitFamilyRequest, initialActionState);

  return (
    <form action={action} className="grid gap-6">
      <fieldset className="grid gap-3">
        <legend className="text-sm font-semibold text-ink-700">1. Support types needed</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {serviceTypes.map((service) => (
            <label key={service} className="flex cursor-pointer items-center gap-3 rounded-xl border border-ink/10 bg-white p-3 text-sm transition hover:border-hhh-500/50 hover:bg-hhh-50/40">
              <input type="checkbox" name="services" value={service} className="h-4 w-4 accent-hhh-700" />
              <span className="text-ink-700">{service}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-2">
        <FieldLabel>2. Preferred model</FieldLabel>
        <select required name="preferredModel" className="field-select">
          <option value="company">I want help from Houston Home Help</option>
          <option value="registry">I want to be matched with an independent caregiver</option>
        </select>
      </label>

      <label className="grid gap-2">
        <FieldLabel>3. Support summary</FieldLabel>
        <textarea required minLength={10} name="supportSummary" className="field min-h-28 resize-y" placeholder="Tell us a bit about who we'll be supporting and what they need." />
      </label>

      <label className="grid gap-2">
        <FieldLabel>4. Preferred schedule</FieldLabel>
        <input required name="preferredSchedule" className="field" placeholder="Mon/Wed/Fri 9am–1pm" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <FieldLabel>5. ZIP code</FieldLabel>
          <input required pattern="[0-9]{5}" name="zipCode" className="field" placeholder="77007" />
        </label>
        <label className="grid gap-2">
          <FieldLabel>City</FieldLabel>
          <input required name="city" defaultValue="Houston" className="field" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="grid gap-2">
          <FieldLabel>6. Contact name</FieldLabel>
          <input required name="contactName" className="field" />
        </label>
        <label className="grid gap-2">
          <FieldLabel>Email</FieldLabel>
          <input required type="email" name="contactEmail" className="field" />
        </label>
        <label className="grid gap-2">
          <FieldLabel>Phone</FieldLabel>
          <input required name="contactPhone" className="field" />
        </label>
      </div>

      <FormFeedback state={state} />
      {state.success ? (
        <Link href="/request-help/confirmation" className="text-sm font-semibold text-hhh-700 hover:text-hhh-800">
          Continue to confirmation →
        </Link>
      ) : null}
      <SubmitButton label="Submit request" pendingLabel="Submitting request…" />
    </form>
  );
}
