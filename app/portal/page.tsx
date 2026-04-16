import Link from "next/link";
import { Card, Container, Eyebrow, Section } from "@/components/ui";
import { ArrowRightIcon } from "@/components/icons";

const roles = [
  { label: "Admin", href: "/admin", desc: "Review requests, applications, matches, notes, and status updates." },
  { label: "Family", href: "/family", desc: "View request summary, status, and visible updates." },
  { label: "Caregiver", href: "/caregiver", desc: "View profile, application status, and introductions." }
];

export default function PortalPage() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Role portals</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink">Sign in to your space.</h1>
          <p className="mt-3 text-ink-500">Choose the portal that fits your role with HHH.</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {roles.map((role) => (
            <Card key={role.label} interactive>
              <p className="font-display text-xl font-semibold text-ink">{role.label}</p>
              <p className="mt-2 text-sm text-ink-500">{role.desc}</p>
              <Link href={role.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-hhh-700 hover:text-hhh-800">
                Open {role.label} <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
