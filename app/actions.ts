"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionState } from "@/lib/types";
import { getSupabaseServerClient, getSupabaseAdminClient } from "@/lib/supabase/server";
import { adminRecipients, emailLayout, sendEmail } from "@/lib/email";
import { getSession } from "@/lib/auth";

const familySchema = z.object({
  services: z.array(z.string()).min(1, "Select at least one service"),
  preferredModel: z.enum(["company", "registry"]),
  supportSummary: z.string().min(10, "Please share a short summary"),
  preferredSchedule: z.string().min(3, "Please enter schedule preferences"),
  zipCode: z.string().regex(/^\d{5}$/, "ZIP must be 5 digits"),
  city: z.string().min(2),
  contactName: z.string().min(2),
  contactEmail: z.string().email("Enter a valid email"),
  contactPhone: z.string().min(10)
});

const caregiverSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  city: z.string().min(2),
  zipCode: z.string().regex(/^\d{5}$/),
  transportation: z.enum(["yes", "no"]),
  services: z.array(z.string()).min(1, "Choose at least one service"),
  availability: z.string().min(5),
  bio: z.string().min(20),
  languages: z.string().min(2),
  experience: z.string().min(10),
  backgroundReady: z.literal("on")
});

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(10)
});

const successState = (message: string): ActionState => ({ success: true, message });
const failureState = (message: string, errors?: Record<string, string[]>): ActionState => ({ success: false, message, errors });

export async function submitFamilyRequest(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = familySchema.safeParse({
    services: formData.getAll("services").map(String),
    preferredModel: String(formData.get("preferredModel")),
    supportSummary: String(formData.get("supportSummary")),
    preferredSchedule: String(formData.get("preferredSchedule")),
    zipCode: String(formData.get("zipCode")),
    city: String(formData.get("city")),
    contactName: String(formData.get("contactName")),
    contactEmail: String(formData.get("contactEmail")),
    contactPhone: String(formData.get("contactPhone"))
  });

  if (!parsed.success) {
    return failureState("Please fix the highlighted form fields.", parsed.error.flatten().fieldErrors);
  }

  const session = await getSession();
  const supabase = getSupabaseAdminClient() ?? (await getSupabaseServerClient());
  if (supabase) {
    const { error } = await supabase.from("family_requests").insert({
      family_profile_id: session?.profile?.id ?? null,
      preferred_model: parsed.data.preferredModel,
      support_summary: `${parsed.data.supportSummary}\nServices: ${parsed.data.services.join(", ")}`,
      preferred_schedule: parsed.data.preferredSchedule,
      zip_code: parsed.data.zipCode,
      city: parsed.data.city,
      contact_name: parsed.data.contactName,
      contact_email: parsed.data.contactEmail,
      contact_phone: parsed.data.contactPhone,
      status: "new"
    });

    if (error) {
      return failureState("Unable to save your request right now. Please try again.");
    }
  }

  const admins = adminRecipients();
  if (admins.length) {
    await sendEmail({
      to: admins,
      subject: `New family request · ${parsed.data.zipCode} · ${parsed.data.preferredModel}`,
      replyTo: parsed.data.contactEmail,
      html: emailLayout(
        "New family request",
        `<p><strong>${parsed.data.contactName}</strong> (${parsed.data.contactEmail} · ${parsed.data.contactPhone})</p>
         <p>ZIP ${parsed.data.zipCode} · ${parsed.data.city} · prefers ${parsed.data.preferredModel}</p>
         <p><strong>Schedule:</strong> ${parsed.data.preferredSchedule}</p>
         <p><strong>Services:</strong> ${parsed.data.services.join(", ")}</p>
         <p><strong>Summary:</strong><br/>${escapeHtml(parsed.data.supportSummary)}</p>`
      )
    });
  }

  await sendEmail({
    to: parsed.data.contactEmail,
    subject: "We received your Houston Home Help request",
    html: emailLayout(
      "Thanks — we received your request",
      `<p>Hi ${parsed.data.contactName.split(" ")[0] || "there"},</p>
       <p>Our coordination team is reviewing your request and will follow up, usually the same business day.</p>
       <p>You can sign in any time to see visible updates at <a href="https://houstonhomehelp.com/family" style="color:#265a54; font-weight:600;">your family dashboard</a>.</p>`
    )
  });

  revalidatePath("/admin");
  return successState("Request received. We will contact you shortly.");
}

export async function submitCaregiverApplication(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = caregiverSchema.safeParse({
    fullName: String(formData.get("fullName")),
    phone: String(formData.get("phone")),
    email: String(formData.get("email")),
    city: String(formData.get("city")),
    zipCode: String(formData.get("zipCode")),
    transportation: String(formData.get("transportation")),
    services: formData.getAll("services").map(String),
    availability: String(formData.get("availability")),
    bio: String(formData.get("bio")),
    languages: String(formData.get("languages")),
    experience: String(formData.get("experience")),
    backgroundReady: String(formData.get("backgroundReady"))
  });

  if (!parsed.success) {
    return failureState("Please fix the highlighted form fields.", parsed.error.flatten().fieldErrors);
  }

  const session = await getSession();
  const supabase = getSupabaseAdminClient() ?? (await getSupabaseServerClient());
  if (supabase) {
    const { data: caregiver, error } = await supabase
      .from("caregivers")
      .insert({
        profile_id: session?.profile?.id ?? null,
        full_name: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        city: parsed.data.city,
        zip_code: parsed.data.zipCode,
        bio: parsed.data.bio,
        transportation_available: parsed.data.transportation === "yes",
        languages: parsed.data.languages,
        experience_summary: parsed.data.experience,
        application_status: "pending"
      })
      .select("id")
      .single();

    if (error) {
      return failureState("Unable to save your application right now. Please try again.");
    }

    if (caregiver?.id) {
      await supabase.from("caregiver_availability").insert({
        caregiver_id: caregiver.id,
        day_of_week: "mixed",
        start_time: "08:00",
        end_time: "18:00"
      });
      await supabase.from("caregiver_service_areas").insert({
        caregiver_id: caregiver.id,
        zip_code: parsed.data.zipCode
      });
    }
  }

  const admins = adminRecipients();
  if (admins.length) {
    await sendEmail({
      to: admins,
      subject: `New caregiver application · ${parsed.data.fullName} · ${parsed.data.zipCode}`,
      replyTo: parsed.data.email,
      html: emailLayout(
        "New caregiver application",
        `<p><strong>${parsed.data.fullName}</strong> (${parsed.data.email} · ${parsed.data.phone})</p>
         <p>ZIP ${parsed.data.zipCode} · ${parsed.data.city} · Transportation: ${parsed.data.transportation}</p>
         <p><strong>Services:</strong> ${parsed.data.services.join(", ")}</p>
         <p><strong>Languages:</strong> ${parsed.data.languages}</p>
         <p><strong>Availability:</strong> ${escapeHtml(parsed.data.availability)}</p>
         <p><strong>Bio:</strong><br/>${escapeHtml(parsed.data.bio)}</p>
         <p><strong>Experience:</strong><br/>${escapeHtml(parsed.data.experience)}</p>`
      )
    });
  }

  await sendEmail({
    to: parsed.data.email,
    subject: "Houston Home Help application received",
    html: emailLayout(
      "Application received",
      `<p>Hi ${parsed.data.fullName.split(" ")[0] || "there"},</p>
       <p>We received your application to support Houston families. Our admin team will review your profile and follow up with approval status or next steps.</p>`
    )
  });

  revalidatePath("/admin");
  return successState("Application received. Our team will review your profile.");
}

export async function submitContactForm(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = contactSchema.safeParse({
    name: String(formData.get("name")),
    email: String(formData.get("email")),
    phone: String(formData.get("phone")),
    message: String(formData.get("message"))
  });

  if (!parsed.success) {
    return failureState("Please provide complete contact details.", parsed.error.flatten().fieldErrors);
  }

  const supabase = getSupabaseAdminClient() ?? (await getSupabaseServerClient());
  if (supabase) {
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message
    });

    if (error) {
      return failureState("Unable to send your message right now.");
    }
  }

  const admins = adminRecipients();
  if (admins.length) {
    await sendEmail({
      to: admins,
      subject: `Contact form · ${parsed.data.name}`,
      replyTo: parsed.data.email,
      html: emailLayout(
        "New contact message",
        `<p><strong>${parsed.data.name}</strong> (${parsed.data.email} · ${parsed.data.phone})</p>
         <p>${escapeHtml(parsed.data.message)}</p>`
      )
    });
  }

  return successState("Message sent. We will follow up soon.");
}

export const initialActionState: ActionState = {
  success: false,
  message: ""
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\n/g, "<br/>");
}
