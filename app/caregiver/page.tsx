import Link from "next/link";
import { Card, Container, Eyebrow, Pill, Section } from "@/components/ui";
import { requireRole } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { Caregiver, Match } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function CaregiverDashboardPage() {
  const session = await requireRole(["caregiver", "admin"]);
  const supabase = await getSupabaseServerClient();

  let caregiver: Caregiver | null = null;
  let matches: Match[] = [];

  if (supabase && session.profile) {
    const { data: cg } = await supabase
      .from("caregivers")
      .select("id, full_name, email, phone, city, zip_code, bio, application_status, approved_for_company_service, approved_for_registry")
      .eq("profile_id", session.profile.id)
      .maybeSingle();
    caregiver = (cg ?? null) as Caregiver | null;

    if (caregiver) {
      const { data: ms } = await supabase
        .from("matches")
        .select("id, family_request_id, caregiver_id, match_type, status, created_at")
        .eq("caregiver_id", caregiver.id)
        .order("created_at", { ascending: false });
      matches = (ms ?? []) as Match[];
    }
  }

  return (
    <Section>
      <Container>
        <Eyebrow>Caregiver portal</Eyebrow>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink">Your profile</h1>
        {session.profile?.full_name ? (
          <p className="mt-1 text-sm text-ink-500">Signed in as {session.profile.full_name}</p>
        ) : null}

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
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Approvals</p>
                <p className="mt-1 text-sm text-ink-700">
                  Company service: {caregiver.approved_for_company_service ? "Yes" : "No"}
                  <br />
                  Registry: {caregiver.approved_for_registry ? "Yes" : "No"}
                </p>
              </div>
              <div className="rounded-2xl bg-cream-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Introductions / assignments</p>
                {matches.length ? (
                  <ul className="mt-1 space-y-1 text-sm text-ink-700">
                    {matches.slice(0, 5).map((m) => (
                      <li key={m.id}>
                        {m.match_type === "company" ? "Company" : "Registry"} · {m.status}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-sm text-ink-700">No active introductions yet.</p>
                )}
              </div>
            </div>
          </Card>
        ) : (
          <Card className="mt-8 text-center">
            <p className="text-ink-700">No caregiver profile found yet.</p>
            <Link href="/apply-caregiver" className="mt-3 inline-block font-semibold text-hhh-700">
              Submit caregiver application
            </Link>
          </Card>
        )}
      </Container>
    </Section>
  );
}
