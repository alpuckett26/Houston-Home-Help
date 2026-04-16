import { ContactForm } from "@/components/forms/contact-form";
import { Container, Eyebrow, Section } from "@/components/ui";
import { ClockIcon, MapPinIcon, MessageIcon } from "@/components/icons";

const cells = [
  { Icon: MessageIcon, label: "Email", value: "hello@houstonhomehelp.com" },
  { Icon: ClockIcon, label: "Phone", value: "(713) 555-0100" },
  { Icon: MapPinIcon, label: "Service area", value: "Greater Houston ZIPs" }
];

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Contact HHH</Eyebrow>
            <h1 className="mt-3 font-display text-4xl font-semibold text-ink">We're here for Houston families.</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-500">
              Reach our coordination team directly, or send a message and we'll follow up the same business day.
            </p>

            <div className="mt-8 space-y-3">
              {cells.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 rounded-2xl border border-ink/5 bg-white p-4 shadow-soft">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-hhh-50 text-hhh-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{label}</p>
                    <p className="text-sm font-semibold text-ink">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-ink/5 bg-white p-6 shadow-soft sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-ink">Send a message</h2>
            <p className="mt-2 text-sm text-ink-500">Tell us a bit about what you're looking for.</p>
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
