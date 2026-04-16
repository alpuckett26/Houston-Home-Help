"use client";

import Link from "next/link";
import { useActionState } from "react";
import { initialActionState, submitCaregiverApplication } from "@/app/actions";
import { serviceTypes } from "@/lib/constants";
import { FormFeedback } from "@/components/forms/form-feedback";
import { SubmitButton } from "@/components/forms/submit-button";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-semibold text-ink-700">{children}</span>;
}

export function CaregiverApplicationForm() {
  const [state, action] = useActionState(submitCaregiverApplication, initialActionState);

  return (
    <form action={action} className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2"><FieldLabel>Full name</FieldLabel><input required name="fullName" className="field" /></label>
        <label className="grid gap-2"><FieldLabel>Phone</FieldLabel><input required name="phone" className="field" /></label>
        <label className="grid gap-2"><FieldLabel>Email</FieldLabel><input required type="email" name="email" className="field" /></label>
        <label className="grid gap-2"><FieldLabel>City</FieldLabel><input required name="city" defaultValue="Houston" className="field" /></label>
        <label className="grid gap-2"><FieldLabel>ZIP</FieldLabel><input required pattern="[0-9]{5}" name="zipCode" className="field" /></label>
        <label className="grid gap-2"><FieldLabel>Transportation</FieldLabel>
          <select required name="transportation" className="field-select">
            <option value="yes">I have reliable transportation</option>
            <option value="no">I don't currently have transportation</option>
          </select>
        </label>
      </div>

      <fieldset className="grid gap-3">
        <legend className="text-sm font-semibold text-ink-700">Services you can offer</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {serviceTypes.map((service) => (
            <label key={service} className="flex cursor-pointer items-center gap-3 rounded-xl border border-ink/10 bg-white p-3 text-sm transition hover:border-hhh-500/50 hover:bg-hhh-50/40">
              <input type="checkbox" name="services" value={service} className="h-4 w-4 accent-hhh-700" />
              <span className="text-ink-700">{service}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-2"><FieldLabel>Availability</FieldLabel>
        <textarea required name="availability" className="field min-h-24 resize-y" placeholder="Weekdays 9am–3pm, some weekend availability…" />
      </label>

      <label className="grid gap-2"><FieldLabel>Short bio</FieldLabel>
        <textarea required minLength={20} name="bio" className="field min-h-28 resize-y" placeholder="Tell families a bit about yourself and your care style." />
      </label>

      <label className="grid gap-2"><FieldLabel>Languages spoken</FieldLabel>
        <input required name="languages" className="field" placeholder="English, Spanish" />
      </label>

      <label className="grid gap-2"><FieldLabel>Prior experience</FieldLabel>
        <textarea required name="experience" className="field min-h-24 resize-y" placeholder="Describe previous companion / household support experience." />
      </label>

      <label className="flex items-start gap-3 rounded-xl bg-hhh-50/70 p-4 text-sm text-ink-700 ring-1 ring-hhh-100">
        <input required type="checkbox" name="backgroundReady" className="mt-1 h-4 w-4 accent-hhh-700" />
        <span>I understand Houston Home Help requires background-check readiness for all approved caregivers.</span>
      </label>

      <FormFeedback state={state} />
      {state.success ? (
        <Link href="/apply-caregiver/confirmation" className="text-sm font-semibold text-hhh-700 hover:text-hhh-800">
          Continue to confirmation →
        </Link>
      ) : null}
      <SubmitButton label="Submit application" pendingLabel="Submitting application…" />
    </form>
  );
}
