import Link from "next/link";
import { Card, Container, Eyebrow, Section } from "@/components/ui";
import { ArrowRightIcon } from "@/components/icons";
import { getSession } from "@/lib/auth";
import { SignOutButton } from "@/components/auth/sign-out-button";

const ALL_ROLES = [
  { label: "Admin", href: "/admin", desc: "Review requests, applications, matches, notes, and status updates.", role: "admin" as const },
  { label: "Family", href: "/family", desc: "View request summary, status, and visible updates.", role: "family" as const },
  { label: "Caregiver", href: "/caregiver", desc: "View profile, application status, and introductions.", role: "caregiver" as const }
];

export default async function PortalPage({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const session = await getSession();
  const params = await searchParams;
  const role = session?.profile?.role;

  const visibleRoles = role === "admin" ? ALL_ROLES : ALL_ROLES.filter((r) => r.role === role);

  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Role portal</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink">
            {session ? "Open your dashboard" : "Sign in to your space"}
          </h1>
          <p className="mt-3 text-ink-500">
            {session
              ? `Signed in as ${session.profile?.full_name ?? session.email} · role: ${role ?? "—"}`
              : "Sign in or create an account to continue."}
          </p>
          {params?.denied ? (
            <p className="mt-4 rounded-xl bg-sun-50 px-4 py-3 text-sm text-sun-600 ring-1 ring-sun-200">
              Your account doesn't have access to that portal.
            </p>
          ) : null}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {(session ? visibleRoles : ALL_ROLES).map((r) => (
            <Card key={r.label} interactive>
              <p className="font-display text-xl font-semibold text-ink">{r.label}</p>
              <p className="mt-2 text-sm text-ink-500">{r.desc}</p>
              <Link href={r.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-hhh-700 hover:text-hhh-800">
                Open {r.label} <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          {session ? (
            <SignOutButton />
          ) : (
            <>
              <Link href="/login" className="inline-flex rounded-full bg-hhh-700 px-5 py-2.5 text-sm font-semibold text-cream hover:bg-hhh-800">
                Sign in
              </Link>
              <Link href="/signup" className="inline-flex rounded-full border border-hhh-700/30 px-5 py-2.5 text-sm font-semibold text-hhh-700 hover:bg-hhh-50">
                Create account
              </Link>
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}
