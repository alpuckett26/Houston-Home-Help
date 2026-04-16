import Link from "next/link";
import { Container, Eyebrow, Section } from "@/components/ui";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-md rounded-3xl border border-ink/5 bg-white p-8 shadow-soft sm:p-10">
          <Eyebrow>Create account</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink">Join Houston Home Help.</h1>
          <p className="mt-2 text-sm text-ink-500">
            Families and caregivers can create an account here. Admin accounts are provisioned by the HHH team.
          </p>
          <SignupForm />
          <p className="mt-6 text-sm text-ink-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-hhh-700 hover:text-hhh-800">
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
}
