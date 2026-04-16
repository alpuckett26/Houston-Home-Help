import Link from "next/link";
import { Container, Eyebrow, Section } from "@/components/ui";
import { CheckCircleIcon } from "@/components/icons";

export default function RequestConfirmationPage() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-xl rounded-3xl border border-ink/5 bg-white p-10 text-center shadow-soft">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-hhh-50 text-hhh-700">
            <CheckCircleIcon className="h-6 w-6" />
          </span>
          <Eyebrow className="mt-6 justify-center">Request received</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink">Thanks — we'll be in touch soon.</h1>
          <p className="mt-3 text-ink-500">
            Our coordination team is reviewing your request and will follow up with next steps, usually the same business day.
          </p>
          <Link href="/family" className="mt-6 inline-flex items-center gap-2 rounded-full bg-hhh-700 px-5 py-3 text-sm font-semibold text-cream hover:bg-hhh-800">
            Go to family dashboard
          </Link>
        </div>
      </Container>
    </Section>
  );
}
