import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";

export type SessionContext = {
  userId: string;
  email: string | null;
  profile: Profile | null;
};

export async function getSession(): Promise<SessionContext | null> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, full_name, email, phone")
    .eq("id", user.id)
    .maybeSingle<Profile>();

  return {
    userId: user.id,
    email: user.email ?? null,
    profile: profile ?? null
  };
}

export async function requireSession(redirectTo = "/login") {
  const session = await getSession();
  if (!session) {
    redirect(redirectTo);
  }
  return session;
}

export async function requireRole(role: Profile["role"] | Array<Profile["role"]>, redirectTo = "/login") {
  const session = await requireSession(redirectTo);
  const allowed = Array.isArray(role) ? role : [role];
  if (!session.profile || !allowed.includes(session.profile.role)) {
    redirect("/portal?denied=1");
  }
  return session;
}
