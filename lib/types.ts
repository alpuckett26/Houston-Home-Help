export type PreferredModel = "company" | "registry";
export type RequestStatus = "new" | "contacted" | "reviewing" | "matched" | "scheduled" | "completed" | "closed";
export type ApplicationStatus = "pending" | "approved" | "rejected";

export type FamilyRequest = {
  id: string;
  preferred_model: PreferredModel;
  support_summary: string;
  preferred_schedule: string;
  zip_code: string;
  city: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  status: RequestStatus;
  created_at?: string;
};

export type Caregiver = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  zip_code: string;
  bio?: string;
  application_status: ApplicationStatus;
  approved_for_company_service: boolean;
  approved_for_registry: boolean;
};

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};
