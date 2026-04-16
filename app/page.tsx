import { CTAButton, Card, Container, Section } from "@/components/ui";
import { brand, serviceTypes } from "@/lib/constants";

const faqs = [
  {
    q: "Is Houston Home Help medical care?",
    a: "No. Houston Home Help (HHH) provides non-medical companion visits, check-ins, errands, respite sitting, and household support."
  },
  {
    q: "Can we choose between company service and caregiver matching?",
    a: "Yes. Families can request support from HHH team companions or ask for independent caregiver matching."
  },
  {
    q: "Do you serve all of Houston?",
    a: "HHH serves Greater Houston with ZIP-based coverage and scheduling review."
  }
];

export default function HomePage() {
  return (
    <>
      <Section>
        <Container>
          <div className="grid gap-8 rounded-3xl bg-gradient-to-br from-white to-brand-50 p-8 shadow-sm ring-1 ring-slate-200 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-4">
              <p className="font-semibold text-brand-700">{brand.tagline}</p>
              <h1 className="text-4xl font-bold sm:text-5xl">Non-medical in-home support for Houston families</h1>
              <p className="max-w-2xl text-slate-600">Houston Home Help connects families with companion visits, check-ins, errands, respite sitting, and household support — either through our HHH team or through matched independent caregivers.</p>
              <div className="flex flex-wrap gap-3">
                <CTAButton href="/request-help" label="Get Help" />
                <CTAButton href="/apply-caregiver" label="Apply as a Caregiver" variant="secondary" />
              </div>
            </div>
            <Card>
              <h2 className="mb-3 text-xl font-semibold">How HHH works</h2>
              <ol className="list-decimal space-y-2 pl-5 text-slate-700">
                <li>Share your support needs, schedule, and ZIP code.</li>
                <li>Choose company service or caregiver matching.</li>
                <li>Receive updates from our coordination team until scheduled.</li>
              </ol>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="mb-6 text-2xl font-bold">Services</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceTypes.map((service) => (
              <Card key={service}>
                <p className="font-medium">{service}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="mb-6 text-2xl font-bold">Two ways to get support</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <h3 className="text-xl font-semibold">Mode A: Houston Home Help Company Service</h3>
              <p className="mt-2 text-slate-600">HHH admin assigns approved companions/helpers for family requests.</p>
            </Card>
            <Card>
              <h3 className="text-xl font-semibold">Mode B: Caregiver Matching / Registry</h3>
              <p className="mt-2 text-slate-600">HHH admin manually introduces independent caregiver options based on ZIP and service needs.</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="mb-6 text-2xl font-bold">Why families choose Houston Home Help</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card><p className="font-semibold">Fast intake</p><p className="mt-2 text-sm text-slate-600">Simple online request flow with clear non-medical scope.</p></Card>
            <Card><p className="font-semibold">Manual quality control</p><p className="mt-2 text-sm text-slate-600">Admin-reviewed matching and assignment decisions.</p></Card>
            <Card><p className="font-semibold">Family updates</p><p className="mt-2 text-sm text-slate-600">Status and communication touchpoints from request to closure.</p></Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="mb-6 text-2xl font-bold">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <Card key={faq.q}>
                <p className="font-semibold">{faq.q}</p>
                <p className="mt-2 text-slate-600">{faq.a}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
