import Link from "next/link";
import { Card, Container, Eyebrow, Pill, Section } from "@/components/ui";
import { sampleRequests } from "@/lib/data";

export default function FamilyDashboardPage() {
  const request = sampleRequests[0];

  return (
    <Section>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Family portal</Eyebrow>
            <h1 className="mt-2 font-display text-4xl font-semibold text-ink">Your requests</h1>
          </div>
          <Link href="/request-help" className="inline-flex rounded-full bg-hhh-700 px-5 py-2.5 text-sm font-semibold text-cream hover:bg-hhh-800">
            Start a new request
          </Link>
        </div>

        {request ? (
          <Card className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display text-xl font-semibold text-ink">Request summary</p>
                <p className="mt-1 text-sm text-ink-500">Preferred model: {request.preferred_model === "company" ? "Company service" : "Caregiver registry"}</p>
              </div>
              <Pill>{request.status}</Pill>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-cream-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Summary</p>
                <p className="mt-1 text-sm text-ink-700">{request.support_summary}</p>
              </div>
              <div className="rounded-2xl bg-cream-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Schedule</p>
                <p className="mt-1 text-sm text-ink-700">{request.preferred_schedule}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-ink/5 p-5">
              <p className="font-semibold text-ink">Visible updates</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-700">
                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-hhh-500" /> HHH received your request and verified service area coverage.</li>
                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-hhh-500" /> Admin is reviewing available companions for your ZIP code.</li>
              </ul>
            </div>
          </Card>
        ) : (
          <Card className="mt-8 text-center">
            <p className="text-ink-700">No requests found yet.</p>
            <Link href="/request-help" className="mt-3 inline-block font-semibold text-hhh-700">
              Submit your first request
            </Link>
          </Card>
        )}
      </Container>
    </Section>
  );
}
