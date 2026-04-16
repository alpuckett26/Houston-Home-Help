# Houston Home Help (HHH) MVP

Production-lean, web-first MVP for **Houston Home Help (HHH)**.

> HHH provides **non-medical** in-home support coordination only: companion visits, check-ins, errands, respite sitting, transportation accompaniment, and household help.

---

## 1) What this repo includes

### Public pages
- `/` (conversion homepage)
- `/services`, `/how-it-works`, `/for-families`, `/for-caregivers`, `/team-vs-matching`
- `/request-help`, `/apply-caregiver`, `/contact`
- `/faq`, `/privacy`, `/terms`

### Auth + dashboards
- `/login`, `/signup` — Supabase email/password auth
- `/portal` — role-aware landing page
- `/admin` — admin-only: live requests, live caregivers, manual match workbench, status updates that email the family
- `/family` — signed-in family: their requests + admin-posted visible updates
- `/caregiver` — signed-in caregiver: profile + assignments

### Core flows
1. Family request intake → writes to `family_requests`, emails admin + family
2. Caregiver application intake → writes to `caregivers` + `caregiver_availability` + `caregiver_service_areas`, emails admin + applicant
3. Admin manual matching → writes to `matches`, posts a `request_updates` row, updates `family_requests.status`
4. Admin status changes → optional family-visible message stored in `request_updates` and sent by email

---

## 2) Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS
- Supabase (Auth + Postgres, RLS enabled)
- Resend (transactional email)
- Vercel deployment target

---

## 3) Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (browser + SSR) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only, used to bypass RLS for public intake writes |
| `RESEND_API_KEY` | Resend API key for notification emails |
| `RESEND_FROM_EMAIL` | `Display Name <sender@domain>` — must be on a verified domain |
| `HHH_ADMIN_EMAILS` | Comma-separated recipients for new intake / application alerts |

If `RESEND_API_KEY` is missing, emails are silently skipped (forms still work).

---

## 4) Local run steps

```bash
# 1) Install dependencies
npm install

# 2) Configure environment
cp .env.example .env.local
# then edit .env.local

# 3) Apply SQL in Supabase SQL Editor, in order:
#    supabase/migrations/001_init.sql
#    supabase/migrations/002_auth_rls.sql
#    supabase/seed.sql            (optional — service types + sample data)

# 4) Start dev server
npm run dev

# 5) Open http://localhost:3000
```

Optional:

```bash
npm run lint
npm run typecheck
npm run build
```

---

## 5) First-admin bootstrap

Auth signup only allows `family` or `caregiver` roles. To promote an account to admin:

1. Sign up at `/signup` with the email you'll use for admin.
2. Confirm the email (check Supabase > Authentication > Users if needed).
3. In the Supabase SQL Editor, run:
   ```sql
   update public.profiles
   set role = 'admin'
   where email = 'you@example.com';
   ```
4. Sign in at `/login` and visit `/admin`.

Subsequent admins can be promoted the same way until an admin-provisioning UI is built.

---

## 6) Supabase schema overview

Tables:
- `profiles` (one row per auth user, autocreated by `handle_new_user` trigger)
- `family_requests`, `request_updates`, `admin_notes`
- `caregivers`, `caregiver_services`, `caregiver_availability`, `caregiver_service_areas`
- `service_types`
- `matches`
- `contact_submissions`

SQL files:
- `supabase/migrations/001_init.sql` — schema
- `supabase/migrations/002_auth_rls.sql` — RLS policies, profile bootstrap trigger, `current_user_role()` helper
- `supabase/seed.sql` — service types, sample profiles/requests/caregivers

RLS summary:
- Families see their own requests + visible updates
- Caregivers see their own caregiver row + matches assigned to them
- Admins see everything and are the only role that can update status / create matches / post updates
- Public intake inserts allowed anonymously so the marketing forms still work

---

## 7) Deployment (Vercel)

1. Push to GitHub.
2. Vercel > Add New Project > Import this repo (framework preset: Next.js).
3. Add env vars listed in section 3.
4. Deploy.

Post-deploy smoke test:
1. Submit `/request-help`, `/apply-caregiver`, `/contact` — verify Supabase rows and Resend logs.
2. Sign up at `/signup`, promote to admin via SQL, log in at `/login`, confirm `/admin` loads live data.
3. Create a match from the admin workbench and verify the family sees an update at `/family`.

---

## 8) Current limitations / next tasks

- Email confirmation flow relies on Supabase's default templates — swap in branded templates via the Supabase dashboard
- No password reset page yet (use Supabase dashboard's "send magic link / reset")
- No caregiver approval UI — flip `approved_for_company_service` / `approved_for_registry` via SQL or build a toggle in admin
- No scheduling layer (confirmed visit dates, recurring bookings, reminders)
- No payments (Stripe Connect for family pay + caregiver payouts)
- SMS coordination (Twilio) not wired

---

## 9) Legal / copy guardrails

Public copy intentionally avoids medical / licensed-PAS language.

Do not add public references to:
- nursing
- therapy
- medication support
- toileting / personal care ADL claims
- licensed PAS or medical home health terminology
