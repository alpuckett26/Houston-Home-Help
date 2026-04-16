-- Profile bootstrap: create a profile row whenever an auth.user is created.
-- Role comes from raw_user_meta_data (set during signup); defaults to 'family'.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, full_name, email, phone)
  values (
    new.id,
    coalesce((new.raw_user_meta_data ->> 'role')::public.app_role, 'family'),
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'phone', null)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper: current user's role from profiles table.
create or replace function public.current_user_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

-- Enable RLS on all operational tables.
alter table public.profiles enable row level security;
alter table public.family_requests enable row level security;
alter table public.caregivers enable row level security;
alter table public.service_types enable row level security;
alter table public.caregiver_services enable row level security;
alter table public.caregiver_availability enable row level security;
alter table public.caregiver_service_areas enable row level security;
alter table public.matches enable row level security;
alter table public.request_updates enable row level security;
alter table public.admin_notes enable row level security;
alter table public.contact_submissions enable row level security;

-- Profiles: users see themselves; admins see all.
drop policy if exists profiles_select_self on public.profiles;
create policy profiles_select_self on public.profiles
  for select using (id = auth.uid() or public.current_user_role() = 'admin');

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles
  for update using (id = auth.uid() or public.current_user_role() = 'admin');

-- Family requests: family sees their own; admin sees all. Insert allowed for any signed-in user or anon (intake form).
drop policy if exists family_requests_select on public.family_requests;
create policy family_requests_select on public.family_requests
  for select using (
    public.current_user_role() = 'admin'
    or family_profile_id = auth.uid()
  );

drop policy if exists family_requests_insert on public.family_requests;
create policy family_requests_insert on public.family_requests
  for insert with check (true);

drop policy if exists family_requests_update_admin on public.family_requests;
create policy family_requests_update_admin on public.family_requests
  for update using (public.current_user_role() = 'admin');

-- Caregivers: caregiver sees own row; admin sees all; public intake insert allowed.
drop policy if exists caregivers_select on public.caregivers;
create policy caregivers_select on public.caregivers
  for select using (
    public.current_user_role() = 'admin'
    or profile_id = auth.uid()
  );

drop policy if exists caregivers_insert on public.caregivers;
create policy caregivers_insert on public.caregivers
  for insert with check (true);

drop policy if exists caregivers_update_admin on public.caregivers;
create policy caregivers_update_admin on public.caregivers
  for update using (public.current_user_role() = 'admin');

-- Service types: public read.
drop policy if exists service_types_select_all on public.service_types;
create policy service_types_select_all on public.service_types
  for select using (true);

-- Caregiver-linked tables: admin all; caregiver sees own rows.
drop policy if exists caregiver_services_select on public.caregiver_services;
create policy caregiver_services_select on public.caregiver_services
  for select using (
    public.current_user_role() = 'admin'
    or exists (
      select 1 from public.caregivers c
      where c.id = caregiver_services.caregiver_id and c.profile_id = auth.uid()
    )
  );

drop policy if exists caregiver_services_write on public.caregiver_services;
create policy caregiver_services_write on public.caregiver_services
  for all using (public.current_user_role() = 'admin')
  with check (public.current_user_role() = 'admin' or true);

drop policy if exists caregiver_availability_select on public.caregiver_availability;
create policy caregiver_availability_select on public.caregiver_availability
  for select using (
    public.current_user_role() = 'admin'
    or exists (
      select 1 from public.caregivers c
      where c.id = caregiver_availability.caregiver_id and c.profile_id = auth.uid()
    )
  );

drop policy if exists caregiver_availability_insert on public.caregiver_availability;
create policy caregiver_availability_insert on public.caregiver_availability
  for insert with check (true);

drop policy if exists caregiver_service_areas_select on public.caregiver_service_areas;
create policy caregiver_service_areas_select on public.caregiver_service_areas
  for select using (
    public.current_user_role() = 'admin'
    or exists (
      select 1 from public.caregivers c
      where c.id = caregiver_service_areas.caregiver_id and c.profile_id = auth.uid()
    )
  );

drop policy if exists caregiver_service_areas_insert on public.caregiver_service_areas;
create policy caregiver_service_areas_insert on public.caregiver_service_areas
  for insert with check (true);

-- Matches: family sees their own request's matches; caregiver sees own; admin all.
drop policy if exists matches_select on public.matches;
create policy matches_select on public.matches
  for select using (
    public.current_user_role() = 'admin'
    or exists (
      select 1 from public.caregivers c
      where c.id = matches.caregiver_id and c.profile_id = auth.uid()
    )
    or exists (
      select 1 from public.family_requests fr
      where fr.id = matches.family_request_id and fr.family_profile_id = auth.uid()
    )
  );

drop policy if exists matches_write_admin on public.matches;
create policy matches_write_admin on public.matches
  for all using (public.current_user_role() = 'admin')
  with check (public.current_user_role() = 'admin');

-- Request updates: family sees visible updates on their requests; admin all.
drop policy if exists request_updates_select on public.request_updates;
create policy request_updates_select on public.request_updates
  for select using (
    public.current_user_role() = 'admin'
    or (
      visible_to_family
      and exists (
        select 1 from public.family_requests fr
        where fr.id = request_updates.family_request_id and fr.family_profile_id = auth.uid()
      )
    )
  );

drop policy if exists request_updates_write_admin on public.request_updates;
create policy request_updates_write_admin on public.request_updates
  for all using (public.current_user_role() = 'admin')
  with check (public.current_user_role() = 'admin');

-- Admin notes: admin only.
drop policy if exists admin_notes_admin_only on public.admin_notes;
create policy admin_notes_admin_only on public.admin_notes
  for all using (public.current_user_role() = 'admin')
  with check (public.current_user_role() = 'admin');

-- Contact submissions: insert allowed for all; select admin only.
drop policy if exists contact_submissions_insert on public.contact_submissions;
create policy contact_submissions_insert on public.contact_submissions
  for insert with check (true);

drop policy if exists contact_submissions_select_admin on public.contact_submissions;
create policy contact_submissions_select_admin on public.contact_submissions
  for select using (public.current_user_role() = 'admin');
