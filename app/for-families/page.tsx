import { SimplePage } from "@/components/simple-page";

export default function ForFamiliesPage() {
  return <SimplePage title="For Families" intro="Houston Home Help (HHH) provides non-medical companion visits and household support for Houston families." bullets={[
    "Choose companion visits, check-ins, errands, simple meal prep, and light housekeeping.",
    "Pick HHH company service or independent caregiver matching.",
    "Receive request status updates and family-facing notes in your dashboard."
  ]} ctaHref="/request-help" ctaLabel="Get Help" />;
}
