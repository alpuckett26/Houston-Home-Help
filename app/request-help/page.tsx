import { FamilyRequestForm } from "@/components/forms/family-request-form";
import { Card, Container, Section } from "@/components/ui";

export default function RequestHelpPage() {
  return (
    <Section>
      <Container>
        <Card>
          <h1 className="mb-2 text-3xl font-bold">Request Help</h1>
          <p className="mb-5 text-slate-600">Share your needs for companion visits, errands, respite sitting, check-ins, and household support.</p>
          <FamilyRequestForm />
        </Card>
      </Container>
    </Section>
  );
}
