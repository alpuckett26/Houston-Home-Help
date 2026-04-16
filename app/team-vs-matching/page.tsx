import { SimplePage } from "@/components/simple-page";

export default function TeamVsMatchingPage() {
  return <SimplePage title="Our Team vs Caregiver Matching" intro="HHH offers two operating models in one platform so families can choose what fits best." bullets={[
    "Company service: Houston Home Help assigns an approved companion/helper.",
    "Registry matching: HHH admin introduces independent caregiver options.",
    "Both models include admin-managed status updates and communication."
  ]} ctaHref="/request-help" ctaLabel="Choose Your Support Model" />;
}
