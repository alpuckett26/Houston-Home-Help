import { MatchWorkbench } from "@/components/admin/match-workbench";
import { Card, Container, Section } from "@/components/ui";
import { sampleCaregivers, sampleRequests } from "@/lib/data";

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </Card>
  );
}

export default function AdminPage() {
  const newRequests = sampleRequests.filter((r) => r.status === "new").length;
  const activeRequests = sampleRequests.filter((r) => ["new", "contacted", "reviewing", "matched", "scheduled"].includes(r.status)).length;
  const approvedCaregivers = sampleCaregivers.filter((c) => c.application_status === "approved").length;
  const pendingApps = sampleCaregivers.filter((c) => c.application_status === "pending").length;

  return (
    <Section>
      <Container>
        <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="New requests" value={newRequests} />
          <Stat label="Active requests" value={activeRequests} />
          <Stat label="Approved caregivers" value={approvedCaregivers} />
          <Stat label="Pending caregiver apps" value={pendingApps} />
        </div>

        <Card>
          <h2 className="mb-3 text-xl font-semibold">Manual Match Workflow</h2>
          <MatchWorkbench requests={sampleRequests} caregivers={sampleCaregivers} />
        </Card>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="mb-3 text-xl font-semibold">Recent family requests</h2>
            {sampleRequests.length ? (
              <div className="space-y-3">
                {sampleRequests.map((r) => (
                  <div key={r.id} className="rounded-xl border p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold">{r.contact_name} · {r.zip_code}</p>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs uppercase">{r.status}</span>
                    </div>
                    <p className="text-sm text-slate-600">{r.support_summary}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed p-4 text-sm text-slate-500">No family requests yet.</p>
            )}
          </Card>

          <Card>
            <h2 className="mb-3 text-xl font-semibold">Caregiver applications</h2>
            {sampleCaregivers.length ? (
              <div className="space-y-3">
                {sampleCaregivers.map((c) => (
                  <div key={c.id} className="rounded-xl border p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{c.full_name} · {c.zip_code}</p>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs uppercase">{c.application_status}</span>
                    </div>
                    <p className="text-sm text-slate-600">Company: {c.approved_for_company_service ? "Yes" : "No"} · Registry: {c.approved_for_registry ? "Yes" : "No"}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed p-4 text-sm text-slate-500">No caregiver applications yet.</p>
            )}
          </Card>
        </div>
      </Container>
    </Section>
  );
}
