import { serviceTypes } from "@/lib/constants";
import type { Caregiver, FamilyRequest } from "@/lib/types";

export const sampleRequests: FamilyRequest[] = [
  {
    id: "req-1001",
    preferred_model: "company",
    support_summary: "Recurring companion visits, errands, and family updates for weekday mornings.",
    preferred_schedule: "Mon/Wed/Fri 9am-1pm",
    zip_code: "77007",
    city: "Houston",
    contact_name: "Jamie Ford",
    contact_email: "jamie@example.com",
    contact_phone: "713-555-0191",
    status: "reviewing"
  },
  {
    id: "req-1002",
    preferred_model: "registry",
    support_summary: "Weekend respite sitting and light housekeeping support.",
    preferred_schedule: "Sat-Sun 1pm-6pm",
    zip_code: "77024",
    city: "Houston",
    contact_name: "Sam Patel",
    contact_email: "sam@example.com",
    contact_phone: "713-555-0172",
    status: "new"
  },
  {
    id: "req-1003",
    preferred_model: "company",
    support_summary: "Twice-weekly check-in visits, simple meal prep, and laundry help.",
    preferred_schedule: "Tue/Thu 10am-2pm",
    zip_code: "77019",
    city: "Houston",
    contact_name: "Brenda Kim",
    contact_email: "brenda@example.com",
    contact_phone: "281-555-0144",
    status: "contacted"
  }
];

export const sampleCaregivers: Caregiver[] = [
  {
    id: "cg-2001",
    full_name: "Alicia Gomez",
    email: "alicia@example.com",
    phone: "832-555-0184",
    city: "Houston",
    zip_code: "77007",
    bio: "Companion-focused caregiver with 5 years supporting Houston families.",
    application_status: "approved",
    approved_for_company_service: true,
    approved_for_registry: true
  },
  {
    id: "cg-2002",
    full_name: "Marcus Lee",
    email: "marcus@example.com",
    phone: "346-555-0134",
    city: "Houston",
    zip_code: "77024",
    bio: "Experienced in social engagement, errands, and check-in visits.",
    application_status: "pending",
    approved_for_company_service: false,
    approved_for_registry: false
  },
  {
    id: "cg-2003",
    full_name: "Nia Johnson",
    email: "nia@example.com",
    phone: "713-555-0108",
    city: "Houston",
    zip_code: "77019",
    bio: "Respite sitting and household support specialist with flexible schedule.",
    application_status: "approved",
    approved_for_company_service: true,
    approved_for_registry: false
  }
];

export const sampleServices = serviceTypes.map((name, idx) => ({
  id: idx + 1,
  name
}));
