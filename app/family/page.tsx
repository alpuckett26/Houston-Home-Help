import Link from "next/link";
import { Card, Container, Section } from "@/components/ui";
import { sampleRequests } from "@/lib/data";

export default function FamilyDashboardPage() {
  const request = sampleRequests[0];

  return (
    <Section>
      <Container>
        <h1 className="mb-6 text-3xl font-bold">Family Dashboard</h1>
        {request ? (
          <Card>
            <h2 className="text-xl font-semibold">Request Summary</h2>
            <p className="mt-2">Status: <span className="rounded-full bg-slate-100 px-2 py-1 text-xs uppercase">{request.status}</span></p>
            <p className="mt-2 text-slate-700">{request.support_summary}</p>
            <p className="mt-2 text-slate-700">Preferred schedule: {request.preferred_schedule}</p>
            <div className="mt-4 rounded-xl border p-3">
              <p className="font-semibold">Visible updates</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                <li>HHH received your request and verified service area coverage.</li>
                <li>Admin is reviewing available companions for your ZIP code.</li>
              </ul>
            </div>
          </Card>
        ) : (
          <Card>
            <p className="text-slate-700">No requests found yet.</p>
            <Link href="/request-help" className="mt-3 inline-block text-brand-700">Submit your first request</Link>
          </Card>
        )}
      </Container>
    </Section>
  );
}
