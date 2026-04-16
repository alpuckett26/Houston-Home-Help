"use client";

import Link from "next/link";
import { useActionState } from "react";
import { initialActionState, submitFamilyRequest } from "@/app/actions";
import { serviceTypes } from "@/lib/constants";
import { FormFeedback } from "@/components/forms/form-feedback";
import { SubmitButton } from "@/components/forms/submit-button";

export function FamilyRequestForm() {
  const [state, action] = useActionState(submitFamilyRequest, initialActionState);

  return (
    <form action={action} className="grid gap-4">
      <fieldset className="grid gap-2">
        <legend className="font-semibold">1) Support types needed</legend>
        {serviceTypes.map((service) => (
          <label key={service} className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="services" value={service} className="h-4 w-4" /> {service}
          </label>
        ))}
      </fieldset>

      <label className="grid gap-1">
        <span className="font-semibold">2) Preferred model</span>
        <select required name="preferredModel" className="rounded-lg border p-2">
          <option value="company">I want help from Houston Home Help</option>
          <option value="registry">I want to be matched with an independent caregiver</option>
        </select>
      </label>

      <label className="grid gap-1"><span className="font-semibold">3) Support summary</span><textarea required minLength={10} name="supportSummary" className="min-h-24 rounded-lg border p-2" /></label>
      <label className="grid gap-1"><span className="font-semibold">4) Preferred schedule</span><input required name="preferredSchedule" className="rounded-lg border p-2" /></label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1"><span className="font-semibold">5) ZIP code</span><input required pattern="[0-9]{5}" name="zipCode" className="rounded-lg border p-2" /></label>
        <label className="grid gap-1"><span className="font-semibold">City</span><input required name="city" defaultValue="Houston" className="rounded-lg border p-2" /></label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="grid gap-1"><span className="font-semibold">6) Contact name</span><input required name="contactName" className="rounded-lg border p-2" /></label>
        <label className="grid gap-1"><span className="font-semibold">Contact email</span><input required type="email" name="contactEmail" className="rounded-lg border p-2" /></label>
        <label className="grid gap-1"><span className="font-semibold">Contact phone</span><input required name="contactPhone" className="rounded-lg border p-2" /></label>
      </div>

      <FormFeedback state={state} />
      {state.success ? <Link href="/request-help/confirmation" className="text-sm font-semibold text-brand-700">Continue to confirmation</Link> : null}
      <SubmitButton label="7) Submit Request" pendingLabel="Submitting request..." />
    </form>
  );
}
