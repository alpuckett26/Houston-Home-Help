import Link from "next/link";
import { Card, Container, Eyebrow, Pill, Section } from "@/components/ui";
import { sampleCaregivers } from "@/lib/data";

export default function CaregiverDashboardPage() {
  const caregiver = sampleCaregivers[0];

  return (
    <Section>
      <Container>
        <Eyebrow>Caregiver portal</Eyebrow>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink">Your profile</h1>

        {caregiver ? (
          <Card className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display text-xl font-semibold text-ink">{caregiver.full_name}</p>
                <p className="mt-1 text-sm text-ink-500">{caregiver.city} · ZIP {caregiver.zip_code}</p>
              </div>
              <Pill>{caregiver.application_status}</Pill>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-cream-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Availability</p>
                <p className="mt-1 text-sm text-ink-700">Weekdays and weekends by request.</p>
              </div>
              <div className="rounded-2xl bg-cream-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Introductions / assignments</p>
                <p className="mt-1 text-sm text-ink-700">No active introductions yet.</p>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="mt-8 text-center">
            <p className="text-ink-700">No caregiver profile found.</p>
            <Link href="/apply-caregiver" className="mt-3 inline-block font-semibold text-hhh-700">
              Submit caregiver application
            </Link>
          </Card>
        )}
      </Container>
    </Section>
  );
}
