import Link from "next/link";
import { Card, Container, Section } from "@/components/ui";
import { sampleCaregivers } from "@/lib/data";

export default function CaregiverDashboardPage() {
  const caregiver = sampleCaregivers[0];

  return (
    <Section>
      <Container>
        <h1 className="mb-6 text-3xl font-bold">Caregiver Dashboard</h1>
        {caregiver ? (
          <Card>
            <h2 className="text-xl font-semibold">Profile</h2>
            <p className="mt-2">{caregiver.full_name} · {caregiver.city} {caregiver.zip_code}</p>
            <p className="text-slate-700">Application status: <span className="rounded-full bg-slate-100 px-2 py-1 text-xs uppercase">{caregiver.application_status}</span></p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border p-3">
                <p className="font-semibold">Availability</p>
                <p className="text-sm text-slate-700">Weekdays and weekends by request.</p>
              </div>
              <div className="rounded-xl border p-3">
                <p className="font-semibold">Introductions / assignments</p>
                <p className="text-sm text-slate-700">No active introductions yet.</p>
              </div>
            </div>
          </Card>
        ) : (
          <Card>
            <p className="text-slate-700">No caregiver profile found.</p>
            <Link href="/apply-caregiver" className="mt-3 inline-block text-brand-700">Submit caregiver application</Link>
          </Card>
        )}
      </Container>
    </Section>
  );
}
