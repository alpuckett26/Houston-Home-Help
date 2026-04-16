import { SimplePage } from "@/components/simple-page";

export default function HowItWorksPage() {
  return <SimplePage title="How It Works" intro="A simple process designed for fast support coordination." bullets={[
    "Submit your request and choose company service or caregiver matching.",
    "Admin reviews your ZIP, schedule, and service preferences.",
    "We share updates as your request moves from new to scheduled."
  ]} ctaHref="/request-help" ctaLabel="Start a Request" />;
}
