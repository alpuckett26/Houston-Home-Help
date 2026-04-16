"use client";

import Link from "next/link";
import { useActionState } from "react";
import { initialActionState, submitCaregiverApplication } from "@/app/actions";
import { serviceTypes } from "@/lib/constants";
import { FormFeedback } from "@/components/forms/form-feedback";
import { SubmitButton } from "@/components/forms/submit-button";

export function CaregiverApplicationForm() {
  const [state, action] = useActionState(submitCaregiverApplication, initialActionState);

  return (
    <form action={action} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input required name="fullName" placeholder="Full name" className="rounded-lg border p-2" />
        <input required name="phone" placeholder="Phone" className="rounded-lg border p-2" />
        <input required type="email" name="email" placeholder="Email" className="rounded-lg border p-2" />
        <input required name="city" defaultValue="Houston" placeholder="City" className="rounded-lg border p-2" />
        <input required pattern="[0-9]{5}" name="zipCode" placeholder="ZIP" className="rounded-lg border p-2" />
        <select required name="transportation" className="rounded-lg border p-2">
          <option value="yes">Transportation available</option>
          <option value="no">No transportation</option>
        </select>
      </div>

      <fieldset className="grid gap-2">
        <legend className="font-semibold">Services offered</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {serviceTypes.map((service) => (
            <label key={service} className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="services" value={service} className="h-4 w-4" /> {service}
            </label>
          ))}
        </div>
      </fieldset>

      <textarea required name="availability" placeholder="Available days/times" className="min-h-20 rounded-lg border p-2" />
      <textarea required minLength={20} name="bio" placeholder="Short bio" className="min-h-20 rounded-lg border p-2" />
      <input required name="languages" placeholder="Languages spoken" className="rounded-lg border p-2" />
      <textarea required name="experience" placeholder="Prior experience" className="min-h-20 rounded-lg border p-2" />

      <label className="flex items-center gap-2 text-sm">
        <input required type="checkbox" name="backgroundReady" /> I am ready for background-check review.
      </label>

      <FormFeedback state={state} />
      {state.success ? <Link href="/apply-caregiver/confirmation" className="text-sm font-semibold text-brand-700">Continue to confirmation</Link> : null}
      <SubmitButton label="Submit Application" pendingLabel="Submitting application..." />
    </form>
  );
}
