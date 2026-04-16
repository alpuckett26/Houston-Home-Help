insert into public.service_types (slug, name)
values
  ('companion-visits', 'Companion visits'),
  ('check-in-visits', 'Check-in visits'),
  ('respite-sitting', 'Respite sitting'),
  ('light-housekeeping', 'Light housekeeping'),
  ('laundry-help', 'Laundry help'),
  ('simple-meal-prep', 'Simple meal prep'),
  ('errands-shopping', 'Errands and shopping'),
  ('transportation-accompaniment', 'Transportation accompaniment'),
  ('social-engagement', 'Social engagement'),
  ('family-updates', 'Family updates')
on conflict (slug) do update set name = excluded.name;

insert into public.profiles (id, role, full_name, email, phone)
values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'HHH Admin', 'admin@houstonhomehelp.com', '7135550001'),
  ('22222222-2222-2222-2222-222222222222', 'family', 'Jamie Ford', 'jamie@example.com', '7135550191'),
  ('33333333-3333-3333-3333-333333333333', 'caregiver', 'Alicia Gomez', 'alicia@example.com', '8325550184')
on conflict (id) do nothing;

insert into public.family_requests (id, family_profile_id, preferred_model, support_summary, preferred_schedule, zip_code, city, contact_name, contact_email, contact_phone, status)
values
  ('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'company', 'Recurring companion visits, errands, and family updates.', 'Mon/Wed/Fri 9am-1pm', '77007', 'Houston', 'Jamie Ford', 'jamie@example.com', '7135550191', 'reviewing'),
  ('55555555-5555-5555-5555-555555555555', null, 'registry', 'Weekend respite sitting and light housekeeping support.', 'Sat-Sun 1pm-6pm', '77024', 'Houston', 'Sam Patel', 'sam@example.com', '7135550172', 'new')
on conflict (id) do nothing;

insert into public.caregivers (id, profile_id, full_name, email, phone, city, zip_code, bio, transportation_available, languages, experience_summary, application_status, approved_for_company_service, approved_for_registry)
values
  ('66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'Alicia Gomez', 'alicia@example.com', '8325550184', 'Houston', '77007', 'Companion-focused caregiver with 5 years experience.', true, 'English, Spanish', 'Companion visits, check-ins, errands.', 'approved', true, true),
  ('77777777-7777-7777-7777-777777777777', null, 'Nia Johnson', 'nia@example.com', '7135550108', 'Houston', '77019', 'Respite sitting and household support specialist.', true, 'English', 'Respite sitting, laundry help, meal prep.', 'approved', true, false)
on conflict (id) do nothing;

insert into public.caregiver_availability (caregiver_id, day_of_week, start_time, end_time)
values
  ('66666666-6666-6666-6666-666666666666', 'monday', '09:00', '15:00'),
  ('66666666-6666-6666-6666-666666666666', 'wednesday', '09:00', '15:00'),
  ('77777777-7777-7777-7777-777777777777', 'saturday', '10:00', '18:00');

insert into public.caregiver_service_areas (caregiver_id, zip_code)
values
  ('66666666-6666-6666-6666-666666666666', '77007'),
  ('66666666-6666-6666-6666-666666666666', '77008'),
  ('77777777-7777-7777-7777-777777777777', '77019');
