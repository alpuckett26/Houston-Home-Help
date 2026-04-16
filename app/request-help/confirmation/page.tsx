import Link from "next/link";
import { Card, Container, Section } from "@/components/ui";

export default function RequestConfirmationPage() {
  return (
    <Section>
      <Container>
        <Card>
          <h1 className="text-2xl font-bold">Request Received</h1>
          <p className="mt-2 text-slate-700">Thank you. Our team will review your request and send updates on next steps.</p>
          <Link className="mt-4 inline-block text-brand-700" href="/family">Go to Family Dashboard</Link>
        </Card>
      </Container>
    </Section>
  );
}
