import Link from "next/link";
import { Card, Container, Section } from "@/components/ui";

const roles = [
  { label: "Admin", href: "/admin", desc: "Review requests, applications, matches, notes, and status updates." },
  { label: "Family", href: "/family", desc: "View request summary, status, and visible updates." },
  { label: "Caregiver", href: "/caregiver", desc: "View profile, application status, and introductions." }
];

export default function PortalPage() {
  return (
    <Section>
      <Container>
        <h1 className="mb-6 text-3xl font-bold">Role Portals</h1>
        <div className="grid gap-4 sm:grid-cols-3">
          {roles.map((role) => (
            <Card key={role.label}>
              <h2 className="text-lg font-semibold">{role.label} Portal</h2>
              <p className="mt-2 text-sm text-slate-600">{role.desc}</p>
              <Link href={role.href} className="mt-4 inline-block font-semibold text-brand-700">Open {role.label}</Link>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
