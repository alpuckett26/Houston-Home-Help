import { SimplePage } from "@/components/simple-page";

export default function TermsPage() {
  return <SimplePage title="Terms" intro="By using Houston Home Help, you agree to our non-medical service scope and platform terms." bullets={[
    "Houston Home Help provides non-medical companion and household support coordination.",
    "Service requests are reviewed manually and are not guaranteed until confirmed.",
    "Families and caregivers agree to provide accurate contact and availability details."
  ]} />;
}
