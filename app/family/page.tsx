import Link from "next/link";
import { Card, Container, Eyebrow, Pill, Section } from "@/components/ui";
import { requireRole } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { FamilyRequest, RequestUpdate } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function FamilyDashboardPage() {
  const session = await requireRole(["family", "admin"]);
  const supabase = await getSupabaseServerClient();

  let requests: FamilyRequest[] = [];
  let updatesByRequest = new Map<string, RequestUpdate[]>();

  if (supabase && session.profile) {
    const { data: reqs } = await supabase
      .from("family_requests")
      .select("id, preferred_model, support_summary, preferred_schedule, zip_code, city, contact_name, contact_email, contact_phone, status, created_at")
      .eq("family_profile_id", session.profile.id)
      .order("created_at", { ascending: false });
    requests = (reqs ?? []) as FamilyRequest[];

    if (requests.length) {
      const ids = requests.map((r) => r.id);
      const { data: updates } = await supabase
        .from("request_updates")
        .select("id, family_request_id, visible_to_family, message, created_at")
        .in("family_request_id", ids)
        .eq("visible_to_family", true)
        .order("created_at", { ascending: false });

      (updates ?? []).forEach((u) => {
        const arr = updatesByRequest.get(u.family_request_id) ?? [];
        arr.push(u as RequestUpdate);
        updatesByRequest.set(u.family_request_id, arr);
      });
    }
  }

  return (
    <Section>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Family portal</Eyebrow>
            <h1 className="mt-2 font-display text-4xl font-semibold text-ink">Your requests</h1>
            {session.profile?.full_name ? (
              <p className="mt-1 text-sm text-ink-500">Signed in as {session.profile.full_name}</p>
            ) : null}
          </div>
          <Link
            href="/request-help"
            className="inline-flex rounded-full bg-hhh-700 px-5 py-2.5 text-sm font-semibold text-cream hover:bg-hhh-800"
          >
            Start a new request
          </Link>
        </div>

        {requests.length === 0 ? (
          <Card className="mt-8 text-center">
            <p className="text-ink-700">No requests yet.</p>
            <Link href="/request-help" className="mt-3 inline-block font-semibold text-hhh-700">
              Submit your first request
            </Link>
          </Card>
        ) : (
          <div className="mt-8 space-y-6">
            {requests.map((request) => {
              const updates = updatesByRequest.get(request.id) ?? [];
              return (
                <Card key={request.id}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-xl font-semibold text-ink">Request summary</p>
                      <p className="mt-1 text-sm text-ink-500">
                        Preferred model: {request.preferred_model === "company" ? "Company service" : "Caregiver registry"}
                      </p>
                    </div>
                    <Pill>{request.status}</Pill>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-cream-100 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Summary</p>
                      <p className="mt-1 text-sm text-ink-700 whitespace-pre-line">{request.support_summary}</p>
                    </div>
                    <div className="rounded-2xl bg-cream-100 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Schedule</p>
                      <p className="mt-1 text-sm text-ink-700">{request.preferred_schedule}</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-ink/5 p-5">
                    <p className="font-semibold text-ink">Updates</p>
                    {updates.length ? (
                      <ul className="mt-3 space-y-3 text-sm text-ink-700">
                        {updates.map((u) => (
                          <li key={u.id} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-hhh-500" />
                            <div>
                              <p>{u.message}</p>
                              <p className="mt-1 text-xs text-ink-500">
                                {new Date(u.created_at).toLocaleString()}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-sm text-ink-500">No updates yet — we'll post here as things progress.</p>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Container>
    </Section>
  );
}
