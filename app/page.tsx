import Link from "next/link";
import { CTAButton, Card, Container, Eyebrow, Pill, Section, SectionHeader, Stat } from "@/components/ui";
import { serviceTypes } from "@/lib/constants";
import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  ShieldIcon,
  StarIcon,
  serviceIconMap
} from "@/components/icons";

const faqs = [
  {
    q: "Is Houston Home Help medical care?",
    a: "No. HHH coordinates non-medical companion visits, check-ins, errands, respite sitting, and household support. We don't provide nursing, therapy, or personal medical care."
  },
  {
    q: "Can we choose between company service and caregiver matching?",
    a: "Yes. Families can request support from an HHH team companion or ask our admin to introduce independent caregivers from our registry."
  },
  {
    q: "Do you serve all of Houston?",
    a: "We serve Greater Houston with ZIP-based coverage. Share your ZIP on the request form and we'll confirm availability quickly."
  },
  {
    q: "How fast do you respond to a request?",
    a: "Most families hear back the same business day. Weekend requests are reviewed Monday morning."
  }
];

const steps = [
  {
    num: "01",
    title: "Share what you need",
    body: "Tell us your support preferences, schedule, and ZIP in a short online request."
  },
  {
    num: "02",
    title: "Pick a model",
    body: "Choose an HHH team companion, or ask admin to introduce an independent caregiver."
  },
  {
    num: "03",
    title: "Get matched",
    body: "We review, confirm availability, and keep your family updated from intake to scheduled visit."
  }
];

const trust = [
  {
    Icon: ShieldIcon,
    title: "Vetted caregivers",
    body: "Manual admin review with background-check readiness on every caregiver application."
  },
  {
    Icon: MapPinIcon,
    title: "Houston-focused",
    body: "ZIP-matched coverage across Greater Houston so support stays local and consistent."
  },
  {
    Icon: ClockIcon,
    title: "Quick response",
    body: "Same-business-day coordination for most requests, with visible status updates."
  }
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-fade" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-10%] hidden h-[520px] w-[520px] rounded-full bg-hhh-100 opacity-60 blur-3xl lg:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 left-[-10%] hidden h-[420px] w-[420px] rounded-full bg-sun-100 opacity-50 blur-3xl lg:block"
        />

        <Container>
          <div className="grid gap-14 pb-16 pt-20 sm:pt-24 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pb-24">
            <div className="flex flex-col gap-6">
              <Pill>
                <span className="h-1.5 w-1.5 rounded-full bg-hhh-600" /> Serving Greater Houston
              </Pill>

              <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.75rem]">
                Thoughtful, <span className="text-hhh-700">non-medical</span> in-home support for Houston families.
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-ink-500">
                Companion visits, check-ins, errands, respite sitting, and household help — delivered by an HHH team member
                or matched through our trusted caregiver registry.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <CTAButton href="/request-help" label="Request support" icon />
                <CTAButton href="/apply-caregiver" label="Apply as caregiver" variant="secondary" />
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 text-sm text-ink-500">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1 text-sun-500">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <StarIcon key={i} className="h-4 w-4 fill-current stroke-none" />
                    ))}
                  </div>
                  <span>Families across 40+ Houston ZIPs</span>
                </div>
                <span className="hidden h-4 w-px bg-ink/10 sm:block" />
                <span>Admin-reviewed matching · No medical claims</span>
              </div>
            </div>

            {/* Card cluster */}
            <div className="relative">
              <div className="relative rounded-3xl border border-ink/5 bg-white p-6 shadow-ring">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-hhh-700 text-cream">
                    <ShieldIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-ink">How HHH works</p>
                    <p className="text-sm text-ink-500">Three simple steps from intake to scheduled visit.</p>
                  </div>
                </div>
                <ol className="mt-6 space-y-4">
                  {steps.map((s) => (
                    <li key={s.num} className="flex gap-4 rounded-2xl bg-cream-100 p-4">
                      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-white font-display text-sm font-semibold text-hhh-700 ring-1 ring-hhh-700/10">
                        {s.num}
                      </span>
                      <div>
                        <p className="font-semibold text-ink">{s.title}</p>
                        <p className="mt-1 text-sm text-ink-500">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <Stat label="Avg response" value="Same day" />
                  <Stat label="Service area" value="Greater Houston" />
                  <Stat label="Service scope" value="Non-medical" />
                </div>
              </div>

              <div className="absolute -right-4 -top-4 hidden rotate-3 rounded-2xl bg-sun-300 px-4 py-2 text-sm font-semibold text-ink-900 shadow-soft md:block">
                Two ways to get help
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <Section>
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Services"
              title="Everyday support, done with care"
              description="Select one service or combine several — our team coordinates based on your family's needs and schedule."
            />
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-hhh-700 hover:text-hhh-800">
              See all services <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceTypes.map((service) => {
              const IconCmp = serviceIconMap[service];
              return (
                <Card key={service} interactive className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-hhh-50 text-hhh-700">
                    {IconCmp ? <IconCmp className="h-5 w-5" /> : null}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{service}</p>
                    <p className="mt-1 text-sm text-ink-500">Included in standard HHH coordination.</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* TWO MODELS */}
      <Section tone="cream">
        <Container>
          <SectionHeader
            eyebrow="Two ways to get help"
            title="Choose the model that fits your family"
            description="We run a company service and a caregiver registry side by side — you pick, we coordinate."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Card interactive className="relative overflow-hidden">
              <div aria-hidden className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-hhh-100" />
              <Eyebrow>Mode A</Eyebrow>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">Company service</h3>
              <p className="mt-3 text-ink-500">
                HHH assigns an approved companion or helper from our team — consistent, coordinated, and
                directly managed by HHH admin.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink-700">
                <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-hhh-500" /> Direct assignment from HHH roster</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-hhh-500" /> Admin-managed scheduling & updates</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-hhh-500" /> Single point of coordination</li>
              </ul>
              <div className="mt-6">
                <Link href="/request-help" className="inline-flex items-center gap-2 text-sm font-semibold text-hhh-700 hover:text-hhh-800">
                  Start a request <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </Card>

            <Card interactive className="relative overflow-hidden">
              <div aria-hidden className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-sun-100" />
              <Eyebrow>Mode B</Eyebrow>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">Caregiver matching / registry</h3>
              <p className="mt-3 text-ink-500">
                HHH admin introduces independent caregivers filtered by ZIP and service fit, so families can
                choose a trusted match.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink-700">
                <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-sun-500" /> Curated registry of independent caregivers</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-sun-500" /> ZIP + service filtered introductions</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-sun-500" /> Admin-managed communication</li>
              </ul>
              <div className="mt-6">
                <Link href="/team-vs-matching" className="inline-flex items-center gap-2 text-sm font-semibold text-hhh-700 hover:text-hhh-800">
                  Compare the two models <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* TRUST */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Why families trust HHH"
            title="Local, human, and carefully coordinated"
            description="We keep scope clear, communication simple, and every match admin-reviewed."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {trust.map(({ Icon, title, body }) => (
              <Card key={title} className="flex flex-col gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sun-100 text-sun-600">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-ink">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{body}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="cream">
        <Container>
          <SectionHeader
            eyebrow="FAQ"
            title="Straight answers about scope"
            description="We keep HHH honest about what we do — and what we don't."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {faqs.map((faq) => (
              <Card key={faq.q}>
                <p className="font-display text-lg font-semibold text-ink">{faq.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{faq.a}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA BAND */}
      <Section className="pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-hhh-900 px-8 py-12 text-cream shadow-ring sm:px-14 sm:py-16">
            <div aria-hidden className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-hhh-700/60 blur-2xl" />
            <div aria-hidden className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-sun-500/20 blur-2xl" />

            <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sun-300">Get started today</p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                  Ready for thoughtful, non-medical support in your Houston home?
                </h2>
                <p className="mt-4 text-base text-cream/80">
                  Tell us what you need and we'll confirm ZIP coverage, schedule, and next steps — usually the same business day.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/request-help"
                  className="inline-flex items-center gap-2 rounded-full bg-sun-400 px-5 py-3 text-sm font-semibold text-ink-900 shadow-soft transition hover:bg-sun-300"
                >
                  Request support <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-cream ring-1 ring-cream/30 transition hover:bg-cream/10"
                >
                  Talk with us
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
