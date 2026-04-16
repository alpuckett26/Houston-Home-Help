import Link from "next/link";
import { brand } from "@/lib/constants";
import { Container } from "@/components/ui";

const links = [
  ["Services", "/services"],
  ["How It Works", "/how-it-works"],
  ["For Families", "/for-families"],
  ["For Caregivers", "/for-caregivers"],
  ["Team vs Matching", "/team-vs-matching"],
  ["FAQ", "/faq"],
  ["Portals", "/portal"]
] as const;

const portalLinks = [
  ["Admin", "/admin"],
  ["Family", "/family"],
  ["Caregiver", "/caregiver"]
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-3 py-4">
          <Link href="/" className="font-bold text-brand-700">{brand.name} <span className="text-brand-500">(HHH)</span></Link>
          <nav className="hidden gap-5 text-sm md:flex">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="text-slate-700 hover:text-brand-700">
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              {portalLinks.map(([label, href]) => (
                <Link key={href} href={href} className="rounded-lg border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:border-brand-500 hover:text-brand-700">
                  {label}
                </Link>
              ))}
            </div>
            <Link href="/request-help" className="rounded-lg bg-brand-500 px-3 py-2 text-xs font-semibold text-white sm:text-sm">Get Help</Link>
            <Link href="/apply-caregiver" className="rounded-lg border border-brand-700 px-3 py-2 text-xs font-semibold text-brand-700 sm:text-sm">Apply</Link>
          </div>
        </div>
      </Container>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <Container>
        <div className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
          <p>{brand.tagline}</p>
          <div className="flex gap-4 sm:justify-end">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
