import Link from "next/link";
import { Container, Eyebrow, Section } from "@/components/ui";
import { CheckCircleIcon } from "@/components/icons";

export default function CaregiverConfirmationPage() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-xl rounded-3xl border border-ink/5 bg-white p-10 text-center shadow-soft">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-hhh-50 text-hhh-700">
            <CheckCircleIcon className="h-6 w-6" />
          </span>
          <Eyebrow className="mt-6 justify-center">Application received</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink">Thanks for applying.</h1>
          <p className="mt-3 text-ink-500">
            Our admin team will review your profile and follow up with approval status or next steps.
          </p>
          <Link href="/caregiver" className="mt-6 inline-flex items-center gap-2 rounded-full bg-hhh-700 px-5 py-3 text-sm font-semibold text-cream hover:bg-hhh-800">
            Go to caregiver dashboard
          </Link>
        </div>
      </Container>
    </Section>
  );
}
