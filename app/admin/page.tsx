import { MatchWorkbench } from "@/components/admin/match-workbench";
import { Card, Container, Eyebrow, Pill, Section } from "@/components/ui";
import { requireRole } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { Caregiver, FamilyRequest } from "@/lib/types";

export const dynamic = "force-dynamic";

function StatCard({ label, value, sub }: { label: string; value: number; sub: string }) {
  return (
    <Card>
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-ink">{value}</p>
      <p className="mt-1 text-xs text-ink-500">{sub}</p>
    </Card>
  );
}

export default async function AdminPage() {
  await requireRole("admin");

  const supabase = await getSupabaseServerClient();
  let requests: FamilyRequest[] = [];
  let caregivers: Caregiver[] = [];

  if (supabase) {
    const [reqRes, cgRes] = await Promise.all([
      supabase
        .from("family_requests")
        .select("id, preferred_model, support_summary, preferred_schedule, zip_code, city, contact_name, contact_email, contact_phone, status, created_at, family_profile_id")
        .order("created_at", { ascending: false })
        .limit(100),
      supabase
        .from("caregivers")
        .select("id, full_name, email, phone, city, zip_code, bio, application_status, approved_for_company_service, approved_for_registry")
        .order("created_at", { ascending: false })
        .limit(100)
    ]);
    requests = (reqRes.data ?? []) as FamilyRequest[];
    caregivers = (cgRes.data ?? []) as Caregiver[];
  }

  const newRequests = requests.filter((r) => r.status === "new").length;
  const activeRequests = requests.filter((r) =>
    ["new", "contacted", "reviewing", "matched", "scheduled"].includes(r.status)
  ).length;
  const approvedCaregivers = caregivers.filter((c) => c.application_status === "approved").length;
  const pendingApps = caregivers.filter((c) => c.application_status === "pending").length;

  return (
    <Section>
      <Container>
        <Eyebrow>Admin portal</Eyebrow>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink">Coordination dashboard</h1>
        <p className="mt-2 text-ink-500">Triage new requests, review applications, and manage manual matches.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="New requests" value={newRequests} sub="Awaiting first review" />
          <StatCard label="Active requests" value={activeRequests} sub="Through scheduled" />
          <StatCard label="Approved caregivers" value={approvedCaregivers} sub="On roster or registry" />
          <StatCard label="Pending apps" value={pendingApps} sub="Waiting on admin review" />
        </div>

        <Card className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-display text-xl font-semibold text-ink">Manual match workflow</p>
              <p className="mt-1 text-sm text-ink-500">Filter by ZIP and mode, then create a match or save an internal note. Creating a match posts a visible update to the family.</p>
            </div>
          </div>
          <div className="mt-6">
            <MatchWorkbench requests={requests} caregivers={caregivers} />
          </div>
        </Card>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <p className="font-display text-xl font-semibold text-ink">Recent family requests</p>
            {requests.length ? (
              <div className="mt-4 space-y-3">
                {requests.slice(0, 8).map((r) => (
                  <div key={r.id} className="rounded-2xl border border-ink/5 bg-cream-100 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-ink">
                        {r.contact_name} <span className="text-ink-500">· {r.zip_code}</span>
                      </p>
                      <Pill>{r.status}</Pill>
                    </div>
                    <p className="mt-2 text-sm text-ink-700">{r.support_summary}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 rounded-2xl border border-dashed border-ink/15 p-4 text-sm text-ink-500">
                No family requests yet.
              </p>
            )}
          </Card>

          <Card>
            <p className="font-display text-xl font-semibold text-ink">Caregiver applications</p>
            {caregivers.length ? (
              <div className="mt-4 space-y-3">
                {caregivers.slice(0, 8).map((c) => (
                  <div key={c.id} className="rounded-2xl border border-ink/5 bg-cream-100 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-ink">
                        {c.full_name} <span className="text-ink-500">· {c.zip_code}</span>
                      </p>
                      <Pill>{c.application_status}</Pill>
                    </div>
                    <p className="mt-2 text-sm text-ink-700">
                      Company: {c.approved_for_company_service ? "Yes" : "No"} · Registry: {c.approved_for_registry ? "Yes" : "No"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 rounded-2xl border border-dashed border-ink/15 p-4 text-sm text-ink-500">
                No caregiver applications yet.
              </p>
            )}
          </Card>
        </div>
      </Container>
    </Section>
  );
}
