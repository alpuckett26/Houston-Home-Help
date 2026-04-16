import { SimplePage } from "@/components/simple-page";

export default function FAQPage() {
  return <SimplePage title="FAQ" intro="Common questions from Houston families and caregivers." bullets={[
    "Q: Is Houston Home Help (HHH) medical care? A: No, HHH coordinates non-medical companion and household support only.",
    "Q: Can I request recurring visits? A: Yes, include your preferred schedule in the request form.",
    "Q: Can caregivers apply without an account? A: Yes, applications are public for MVP speed."
  ]} />;
}
