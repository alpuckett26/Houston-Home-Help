import { SimplePage } from "@/components/simple-page";

export default function PrivacyPage() {
  return <SimplePage title="Privacy" intro="We collect only the information needed to coordinate support requests and caregiver applications." bullets={[
    "Contact details are used for follow-up and service coordination.",
    "Admin staff can access request and application records.",
    "You may contact us to update or remove your information."
  ]} />;
}
