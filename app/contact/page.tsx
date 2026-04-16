import { ContactForm } from "@/components/forms/contact-form";
import { Card, Container, Section } from "@/components/ui";

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <Card>
          <h1 className="text-3xl font-bold">Contact Houston Home Help (HHH)</h1>
          <p className="mt-2 text-slate-700">Call or email our Houston coordination team, or submit this form for faster follow-up.</p>
          <div className="mt-4 space-y-1 text-slate-700">
            <p>Phone: (713) 555-0100</p>
            <p>Email: hello@houstonhomehelp.com</p>
            <p>Service Area: Greater Houston ZIP coverage</p>
          </div>
          <ContactForm />
        </Card>
      </Container>
    </Section>
  );
}
