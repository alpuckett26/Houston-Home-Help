import Link from "next/link";
import { Card, Container, Section } from "@/components/ui";

export default function CaregiverConfirmationPage() {
  return (
    <Section>
      <Container>
        <Card>
          <h1 className="text-2xl font-bold">Application Received</h1>
          <p className="mt-2 text-slate-700">Thank you for applying. Our admin team will review your profile and follow up soon.</p>
          <Link className="mt-4 inline-block text-brand-700" href="/caregiver">Go to Caregiver Dashboard</Link>
        </Card>
      </Container>
    </Section>
  );
}
