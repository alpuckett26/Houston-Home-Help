# Houston Home Help (HHH) MVP

Production-lean, web-first MVP for **Houston Home Help (HHH)**.

> HHH provides **non-medical** in-home support coordination only: companion visits, check-ins, errands, respite sitting, transportation accompaniment, and household help.

---

## 1) What this repo includes

### Public pages
- `/` (conversion homepage)
- `/services`
- `/how-it-works`
- `/for-families`
- `/for-caregivers`
- `/team-vs-matching`
- `/request-help`
- `/apply-caregiver`
- `/contact`
- `/faq`
- `/privacy`
- `/terms`

### Dashboards (light MVP)
- `/admin`
- `/family`
- `/caregiver`

### Core flows
1. Family request intake (company service vs registry match)
2. Caregiver application intake
3. Admin manual matching workflow (ZIP + mode filtered)

---

## 2) Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres/Auth-ready)
- Vercel deployment target

---

## 3) Environment variables

Create `.env.local` from `.env.example`.

```bash
cp .env.example .env.local
```

Required:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase-anon-key>
```

Recommended for server actions writing securely:

```bash
SUPABASE_SERVICE_ROLE_KEY=<supabase-service-role-key>
```

---

## 4) Exact local run steps (copy/paste)

```bash
# 1) Install dependencies
npm install

# 2) Configure environment
cp .env.example .env.local
# then edit .env.local with your Supabase values

# 3) Run SQL in Supabase SQL Editor
#    - supabase/migrations/001_init.sql
#    - supabase/seed.sql

# 4) Start dev server
npm run dev

# 5) Open app
# http://localhost:3000
```

Optional checks:

```bash
npm run lint
npm run typecheck
npm run build
```

---

## 5) Supabase schema overview

Tables:
- `profiles`
- `family_requests`
- `caregivers`
- `service_types`
- `caregiver_services`
- `caregiver_availability`
- `caregiver_service_areas`
- `matches`
- `request_updates`
- `admin_notes`
- `contact_submissions`

SQL files:
- `supabase/migrations/001_init.sql`
- `supabase/seed.sql`

---

## 6) Deployment steps (Vercel)

```bash
# 1) Push repo to GitHub/GitLab/Bitbucket
# 2) In Vercel: Add New Project -> Import repo
# 3) Framework preset: Next.js
# 4) Add env vars:
#    NEXT_PUBLIC_SUPABASE_URL
#    NEXT_PUBLIC_SUPABASE_ANON_KEY
#    SUPABASE_SERVICE_ROLE_KEY
# 5) Deploy
```

After deploy:
1. Confirm routes load.
2. Submit `/request-help`, `/apply-caregiver`, `/contact` forms.
3. Verify inserts in Supabase tables.
4. Validate admin dashboard/manual matching demo UI.

---

## 7) Production notes

### Current MVP strengths
- Clear non-medical public positioning
- Fast lead capture and caregiver intake
- Admin-friendly manual matching workflow
- Houston-first copy and structure

### Current limitations
- Dashboards currently use sample arrays for read views (admin/family/caregiver listing)
- No full role-guarded auth gating yet
- No automated notifications (email/SMS)
- Manual workflow is intentionally lightweight

---

## 8) Suggested next tasks

1. Replace dashboard sample reads with live Supabase queries.
2. Add auth session + role guards for `/admin`, `/family`, `/caregiver`.
3. Add RLS policies and strict role claims.
4. Persist admin match actions (`matches`, `request_updates`, `admin_notes`).
5. Add email notifications for new requests and application status updates.

---

## 9) Legal/copy guardrails

Public copy in this repo intentionally avoids medical/lPAS language.

Do not add public references to:
- nursing
- therapy
- medication support
- toileting/personal care ADL claims
- licensed PAS or medical home health terminology
