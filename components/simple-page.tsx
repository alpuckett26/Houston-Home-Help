import { CTAButton, Card, Container, Section } from "@/components/ui";

export function SimplePage({ title, intro, bullets, ctaHref, ctaLabel }: { title: string; intro: string; bullets: string[]; ctaHref?: string; ctaLabel?: string }) {
  return (
    <Section>
      <Container>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="max-w-3xl text-slate-700">{intro}</p>
          <Card>
            <ul className="list-disc space-y-2 pl-5 text-slate-700">
              {bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          {ctaHref && ctaLabel ? <CTAButton href={ctaHref} label={ctaLabel} /> : null}
        </div>
      </Container>
    </Section>
  );
}
