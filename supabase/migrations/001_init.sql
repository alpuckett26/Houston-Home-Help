create extension if not exists "pgcrypto";

create type public.app_role as enum ('admin', 'family', 'caregiver');
create type public.preferred_model as enum ('company', 'registry');
create type public.request_status as enum ('new', 'contacted', 'reviewing', 'matched', 'scheduled', 'completed', 'closed');
create type public.application_status as enum ('pending', 'approved', 'rejected');
create type public.match_type as enum ('company', 'registry');

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  role app_role not null,
  full_name text not null,
  email text unique not null,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.family_requests (
  id uuid primary key default gen_random_uuid(),
  family_profile_id uuid references public.profiles(id) on delete set null,
  preferred_model preferred_model not null,
  support_summary text not null,
  preferred_schedule text not null,
  zip_code text not null,
  city text not null default 'Houston',
  contact_name text not null,
  contact_email text not null,
  contact_phone text not null,
  status request_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.caregivers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text not null,
  city text not null,
  zip_code text not null,
  bio text,
  transportation_available boolean not null default false,
  languages text,
  experience_summary text,
  application_status application_status not null default 'pending',
  approved_for_company_service boolean not null default false,
  approved_for_registry boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_types (
  id bigserial primary key,
  slug text unique not null,
  name text not null,
  is_active boolean not null default true
);

create table if not exists public.caregiver_services (
  id bigserial primary key,
  caregiver_id uuid not null references public.caregivers(id) on delete cascade,
  service_type_id bigint not null references public.service_types(id) on delete cascade
);

create table if not exists public.caregiver_availability (
  id bigserial primary key,
  caregiver_id uuid not null references public.caregivers(id) on delete cascade,
  day_of_week text not null,
  start_time time not null,
  end_time time not null
);

create table if not exists public.caregiver_service_areas (
  id bigserial primary key,
  caregiver_id uuid not null references public.caregivers(id) on delete cascade,
  zip_code text not null
);

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  family_request_id uuid not null references public.family_requests(id) on delete cascade,
  caregiver_id uuid not null references public.caregivers(id) on delete cascade,
  match_type match_type not null,
  status request_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.request_updates (
  id uuid primary key default gen_random_uuid(),
  family_request_id uuid not null references public.family_requests(id) on delete cascade,
  visible_to_family boolean not null default true,
  message text not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  related_type text not null,
  related_id text not null,
  note text not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);
