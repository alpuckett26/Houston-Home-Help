import Link from "next/link";
import { brand } from "@/lib/constants";
import { Container } from "@/components/ui";

const primaryNav = [
  ["Services", "/services"],
  ["How It Works", "/how-it-works"],
  ["For Families", "/for-families"],
  ["For Caregivers", "/for-caregivers"],
  ["Our Team vs Matching", "/team-vs-matching"],
  ["FAQ", "/faq"]
] as const;

const footerCols = [
  {
    title: "Services",
    links: [
      ["Services", "/services"],
      ["How It Works", "/how-it-works"],
      ["Request Help", "/request-help"]
    ]
  },
  {
    title: "Join",
    links: [
      ["For Families", "/for-families"],
      ["For Caregivers", "/for-caregivers"],
      ["Apply as Caregiver", "/apply-caregiver"]
    ]
  },
  {
    title: "Company",
    links: [
      ["Our Team vs Matching", "/team-vs-matching"],
      ["FAQ", "/faq"],
      ["Contact", "/contact"]
    ]
  },
  {
    title: "Portals",
    links: [
      ["Admin", "/admin"],
      ["Family", "/family"],
      ["Caregiver", "/caregiver"]
    ]
  }
] as const;

function Logomark() {
  return (
    <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-hhh-700 text-cream shadow-soft">
      <span className="font-display text-sm font-semibold tracking-tight">HHH</span>
    </span>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream/85 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Logomark />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-base font-semibold text-ink">Houston Home Help</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-hhh-600">Non-medical support</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-ink-700 lg:flex">
            {primaryNav.map(([label, href]) => (
              <Link key={href} href={href} className="transition hover:text-hhh-700">
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/apply-caregiver"
              className="hidden rounded-full px-3 py-2 text-sm font-semibold text-ink-700 transition hover:text-hhh-700 sm:inline-flex"
            >
              Apply
            </Link>
            <Link
              href="/request-help"
              className="inline-flex items-center rounded-full bg-hhh-700 px-4 py-2 text-sm font-semibold text-cream shadow-soft transition hover:bg-hhh-800"
            >
              Get Help
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/5 bg-cream-200/50">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Logomark />
              <span className="font-display text-base font-semibold text-ink">Houston Home Help</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500">{brand.tagline}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-hhh-700">Houston, TX</p>
          </div>

          {footerCols.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-hhh-700">{col.title}</p>
              <ul className="mt-4 space-y-2 text-sm text-ink-700">
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="transition hover:text-hhh-700">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-ink/5 py-6 text-xs text-ink-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Houston Home Help. Non-medical in-home support coordination.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-hhh-700">Privacy</Link>
            <Link href="/terms" className="hover:text-hhh-700">Terms</Link>
            <Link href="/contact" className="hover:text-hhh-700">Contact</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
