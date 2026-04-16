import { CaregiverApplicationForm } from "@/components/forms/caregiver-application-form";
import { Card, Container, Section } from "@/components/ui";

export default function ApplyCaregiverPage() {
  return (
    <Section>
      <Container>
        <Card>
          <h1 className="mb-2 text-3xl font-bold">Apply as a Caregiver</h1>
          <p className="mb-5 text-slate-600">Apply to support Houston families through non-medical companion and household support opportunities.</p>
          <CaregiverApplicationForm />
        </Card>
      </Container>
    </Section>
  );
}
