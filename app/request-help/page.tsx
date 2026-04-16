import { FamilyRequestForm } from "@/components/forms/family-request-form";
import { Container, Eyebrow, Section } from "@/components/ui";

export default function RequestHelpPage() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>Request support</Eyebrow>
            <h1 className="mt-3 font-display text-4xl font-semibold text-ink">Tell us what your family needs.</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-500">
              Share a few details about the support you're looking for. Our team reviews every request manually
              and usually responds the same business day.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-hhh-500" /> No medical services — companion & household support only</li>
              <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-hhh-500" /> Pick HHH team or independent caregiver matching</li>
              <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-hhh-500" /> Admin-managed status updates throughout</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-ink/5 bg-white p-6 shadow-soft sm:p-10">
            <FamilyRequestForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
