import { SimplePage } from "@/components/simple-page";
import { serviceTypes } from "@/lib/constants";

export default function ServicesPage() {
  return (
    <SimplePage
      title="Services"
      intro="Houston Home Help (HHH) offers non-medical companion and household support services for Houston-area families."
      bullets={[...serviceTypes]}
      ctaHref="/request-help"
      ctaLabel="Request Support"
    />
  );
}
