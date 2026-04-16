import { SimplePage } from "@/components/simple-page";

export default function ForCaregiversPage() {
  return <SimplePage title="For Caregivers" intro="Apply to Houston Home Help (HHH) for non-medical companion and household support opportunities." bullets={[
    "Offer approved non-medical services only.",
    "Set your ZIP service areas and availability.",
    "Await HHH admin review and approval for company service and/or registry matching."
  ]} ctaHref="/apply-caregiver" ctaLabel="Apply as a Caregiver" />;
}
