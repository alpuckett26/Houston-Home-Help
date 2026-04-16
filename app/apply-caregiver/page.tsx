import { CaregiverApplicationForm } from "@/components/forms/caregiver-application-form";
import { Container, Eyebrow, Section } from "@/components/ui";

export default function ApplyCaregiverPage() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>Join our caregiver network</Eyebrow>
            <h1 className="mt-3 font-display text-4xl font-semibold text-ink">Apply to support Houston families.</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-500">
              We approve caregivers for either our company service roster, our caregiver registry, or both — based on
              experience, background-check readiness, and ZIP coverage.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-hhh-500" /> Non-medical companion & household support only</li>
              <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-hhh-500" /> Admin-reviewed applications</li>
              <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-hhh-500" /> Flexible scheduling by your availability</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-ink/5 bg-white p-6 shadow-soft sm:p-10">
            <CaregiverApplicationForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
