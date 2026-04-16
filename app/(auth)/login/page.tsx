import Link from "next/link";
import { Container, Eyebrow, Section } from "@/components/ui";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-md rounded-3xl border border-ink/5 bg-white p-8 shadow-soft sm:p-10">
          <Eyebrow>Sign in</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink">Welcome back.</h1>
          <p className="mt-2 text-sm text-ink-500">
            Sign in to access your family, caregiver, or admin dashboard.
          </p>
          <LoginForm />
          <p className="mt-6 text-sm text-ink-500">
            New to Houston Home Help?{" "}
            <Link href="/signup" className="font-semibold text-hhh-700 hover:text-hhh-800">
              Create an account
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
}
