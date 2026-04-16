import { CTAButton, Container, Eyebrow, Section } from "@/components/ui";
import { CheckCircleIcon } from "@/components/icons";

export function SimplePage({
  title,
  intro,
  bullets,
  ctaHref,
  ctaLabel
}: {
  title: string;
  intro: string;
  bullets: string[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Houston Home Help</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-500">{intro}</p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-ink/5 bg-white p-8 shadow-soft sm:p-10">
          <ul className="divide-y divide-ink/5">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-xl bg-hhh-50 text-hhh-700">
                  <CheckCircleIcon className="h-4 w-4" />
                </span>
                <p className="text-base leading-relaxed text-ink-700">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        {ctaHref && ctaLabel ? (
          <div className="mt-10 flex justify-center">
            <CTAButton href={ctaHref} label={ctaLabel} icon />
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
