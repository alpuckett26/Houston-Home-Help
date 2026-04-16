"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionState, RequestStatus } from "@/lib/types";
import { requireRole } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { emailLayout, sendEmail } from "@/lib/email";

const matchSchema = z.object({
  requestId: z.string().uuid("Pick a request"),
  caregiverId: z.string().uuid("Pick a caregiver"),
  mode: z.enum(["company", "registry"])
});

const noteSchema = z.object({
  relatedType: z.string().min(1),
  relatedId: z.string().min(1),
  note: z.string().min(2)
});

const statusSchema = z.object({
  requestId: z.string().uuid(),
  status: z.enum([
    "new",
    "contacted",
    "reviewing",
    "matched",
    "scheduled",
    "completed",
    "closed"
  ]) satisfies z.ZodType<RequestStatus>,
  familyMessage: z.string().optional()
});

export async function createMatchAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireRole("admin");
  const parsed = matchSchema.safeParse({
    requestId: String(formData.get("requestId") ?? ""),
    caregiverId: String(formData.get("caregiverId") ?? ""),
    mode: String(formData.get("mode") ?? "company")
  });

  if (!parsed.success) {
    return { success: false, message: "Pick a request and caregiver.", errors: parsed.error.flatten().fieldErrors };
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return { success: false, message: "Supabase is not configured." };
  }

  const session = await requireRole("admin");
  const { error: matchError } = await supabase.from("matches").insert({
    family_request_id: parsed.data.requestId,
    caregiver_id: parsed.data.caregiverId,
    match_type: parsed.data.mode,
    status: "matched"
  });

  if (matchError) {
    return { success: false, message: matchError.message };
  }

  await supabase
    .from("family_requests")
    .update({ status: "matched", updated_at: new Date().toISOString() })
    .eq("id", parsed.data.requestId);

  await supabase.from("request_updates").insert({
    family_request_id: parsed.data.requestId,
    visible_to_family: true,
    message:
      parsed.data.mode === "company"
        ? "A Houston Home Help companion has been matched to your request."
        : "An independent caregiver has been introduced for your request.",
    created_by: session.profile?.id ?? null
  });

  revalidatePath("/admin");
  revalidatePath("/family");
  return { success: true, message: "Match created and visible update posted." };
}

export async function saveAdminNoteAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const session = await requireRole("admin");
  const parsed = noteSchema.safeParse({
    relatedType: String(formData.get("relatedType") ?? ""),
    relatedId: String(formData.get("relatedId") ?? ""),
    note: String(formData.get("note") ?? "")
  });

  if (!parsed.success) {
    return { success: false, message: "Note is too short.", errors: parsed.error.flatten().fieldErrors };
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return { success: false, message: "Supabase is not configured." };
  }

  const { error } = await supabase.from("admin_notes").insert({
    related_type: parsed.data.relatedType,
    related_id: parsed.data.relatedId,
    note: parsed.data.note,
    created_by: session.profile?.id ?? null
  });

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/admin");
  return { success: true, message: "Internal note saved." };
}

export async function updateRequestStatusAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const session = await requireRole("admin");
  const parsed = statusSchema.safeParse({
    requestId: String(formData.get("requestId") ?? ""),
    status: String(formData.get("status") ?? ""),
    familyMessage: String(formData.get("familyMessage") ?? "") || undefined
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid status update.", errors: parsed.error.flatten().fieldErrors };
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return { success: false, message: "Supabase is not configured." };
  }

  const { data: request, error: fetchErr } = await supabase
    .from("family_requests")
    .select("id, contact_name, contact_email")
    .eq("id", parsed.data.requestId)
    .maybeSingle();

  if (fetchErr || !request) {
    return { success: false, message: "Request not found." };
  }

  const { error } = await supabase
    .from("family_requests")
    .update({ status: parsed.data.status, updated_at: new Date().toISOString() })
    .eq("id", parsed.data.requestId);

  if (error) {
    return { success: false, message: error.message };
  }

  if (parsed.data.familyMessage) {
    await supabase.from("request_updates").insert({
      family_request_id: parsed.data.requestId,
      visible_to_family: true,
      message: parsed.data.familyMessage,
      created_by: session.profile?.id ?? null
    });

    if (request.contact_email) {
      await sendEmail({
        to: request.contact_email,
        subject: `Update on your Houston Home Help request`,
        html: emailLayout(
          `Your request is now ${parsed.data.status}`,
          `<p>${parsed.data.familyMessage}</p>
           <p>Sign in at <a href="https://houstonhomehelp.com/family" style="color:#265a54; font-weight:600;">your family dashboard</a> to see full updates.</p>`
        )
      });
    }
  }

  revalidatePath("/admin");
  revalidatePath("/family");
  return { success: true, message: `Request updated to ${parsed.data.status}.` };
}
