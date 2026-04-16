"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionState } from "@/lib/types";
import { getSupabaseServerClient } from "@/lib/supabase-server";

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

  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { error } = await supabase.from("family_requests").insert({
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

  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { data: caregiver, error } = await supabase
      .from("caregivers")
      .insert({
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
    }
  }

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

  const supabase = getSupabaseServerClient();
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

  return successState("Message sent. We will follow up soon.");
}

export const initialActionState: ActionState = {
  success: false,
  message: ""
};
