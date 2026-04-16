export type PreferredModel = "company" | "registry";
export type RequestStatus = "new" | "contacted" | "reviewing" | "matched" | "scheduled" | "completed" | "closed";
export type ApplicationStatus = "pending" | "approved" | "rejected";
export type UserRole = "admin" | "family" | "caregiver";

export type Profile = {
  id: string;
  role: UserRole;
  full_name: string;
  email: string;
  phone: string | null;
};

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
  family_profile_id?: string | null;
};

export type RequestUpdate = {
  id: string;
  family_request_id: string;
  visible_to_family: boolean;
  message: string;
  created_at: string;
};

export type AdminNote = {
  id: string;
  related_type: string;
  related_id: string;
  note: string;
  created_at: string;
};

export type Match = {
  id: string;
  family_request_id: string;
  caregiver_id: string;
  match_type: "company" | "registry";
  status: RequestStatus;
  created_at: string;
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
