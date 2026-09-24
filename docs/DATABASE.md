# Database (Supabase)

## Status: paused (September 2026)

The production Supabase project **Mursen Maintenance** (ref
`zynaxtxujsesenacifde`, region `us-east-2`, Postgres 17) was deleted on
2026-09-24 while the project is paused.

- **No data was lost.** Every table had 0 rows, and there were no auth users,
  storage buckets, edge functions, or custom Postgres functions/triggers.
- **The full schema is in the repo** at
  `supabase/migrations/20260602000000_initial_schema.sql`. It was rebuilt from
  the live database and checked against it: 6 tables, 17 indexes,
  19 constraints and 6 RLS policies all match.
- The old URL and keys no longer work. Anything that still uses them
  (`.env.local`, Vercel env vars) will fail until they're updated.

### What's broken while the DB is gone

The deletion was confirmed on 2026-09-24: the project is no longer listed in
the Supabase org. Until a new DB is set up, these will return errors:

- **Lead capture:** `/api/leads`, which is called by the Contact page, the
  Instant Quote page and the Assessment Booking page. Form submissions are
  **not saved**.
- **Bookings:** `/api/bookings`
- **Stripe webhook:** `/api/stripe-webhook` can't record customers or
  subscriptions. Checkout itself (`/api/create-checkout`) only talks to
  Stripe, so people can still pay, but those payments **won't show up in
  the DB**. Leave live Stripe prices switched off while the project is paused.

Static pages, the blog (`/api/posts`) and the pricing calculators don't use
Supabase and keep working.

**Developers:** don't create a new Supabase project or point env vars at
another project without talking to the team first. Follow
"Resuming" below when the project restarts.

## What's in the database

| Table           | Purpose                                 | Written by                          |
| --------------- | --------------------------------------- | ----------------------------------- |
| `leads`         | Contact / quote form submissions        | `api/leads.ts`, `api/stripe-webhook.ts` |
| `customers`     | Paying customers                        | `api/stripe-webhook.ts`             |
| `subscriptions` | Maintenance plans (Stripe subscriptions)| `api/stripe-webhook.ts`             |
| `bookings`      | Assessments / service appointments      | `api/bookings.ts`                   |
| `jobs`          | Scheduled / completed maintenance work  | (not used by code yet)              |
| `email_log`     | Outbound email audit trail              | (not used by code yet)              |

Relationships: `customers.lead_id → leads`, `subscriptions.customer_id →
customers`, `jobs.customer_id → customers`, `jobs.subscription_id →
subscriptions`, `bookings.lead_id → leads`, `bookings.customer_id → customers`.

**Access model:** the API routes in `api/` use the **service role key**, which
can do everything. The public **anon key** (shipped to the browser) can only
`INSERT` into `leads`. Every table has RLS enabled.

`supabase/drafts/estimates.sql` holds an estimates/quotes schema that was
**never applied** to production. It isn't in `migrations/`, so it won't be
applied automatically. Its header lists what to fix before using it.

## Resuming: set up a new database (~10 minutes)

### 1. Create the Supabase project

1. Go to https://supabase.com/dashboard, click **New project**, and name it
   `Mursen Maintenance`. Region `us-east-2` (Ohio) matches the old one.
2. Save the database password in your password manager.
3. When it finishes provisioning, note the **project ref**. It's the
   `xxxx` in `https://xxxx.supabase.co`, and it also appears in the dashboard URL.

### 2. Apply the schema

**Option A: Supabase CLI (recommended).** This keeps migration history in
sync, so later `db push` / `db diff` calls work.

```bash
npm run db:link -- --project-ref <project-ref>   # asks for the DB password
npm run db:push                                   # applies supabase/migrations/*
```

`npx` downloads the CLI on first use; nothing needs to be installed globally.
The CLI asks for a login the first time (`npx supabase login`).

**Option B: SQL editor (no CLI).** Open **SQL Editor** in the dashboard, then
paste and run the contents of
`supabase/migrations/20260602000000_initial_schema.sql`. If you do this, the
CLI won't know the migration already ran. If you switch to the CLI later,
run `npx supabase migration repair --status applied 20260602000000` once.

### 3. Verify

Run this in the SQL editor:

```sql
select tablename, rowsecurity from pg_tables where schemaname = 'public';
-- expect 6 rows: leads, customers, subscriptions, jobs, bookings, email_log,
-- all with rowsecurity = true

select tablename, policyname, roles, cmd from pg_policies where schemaname = 'public';
-- expect 6 policies: service_all_* on 5 tables + anon_insert_leads
```

### 4. Update environment variables

Get the values from **Project Settings → API** (URL, `anon` public key,
`service_role` secret key).

| Variable                 | Where it's used          | Value                         |
| ------------------------ | ------------------------ | ----------------------------- |
| `VITE_SUPABASE_URL`      | browser (`src/lib/supabase.ts`) | `https://<project-ref>.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | browser                  | anon / publishable key        |
| `SUPABASE_URL`           | `api/*` serverless routes | same URL                     |
| `SUPABASE_SERVICE_KEY`   | `api/*` serverless routes | service_role / secret key (**never** prefix with `VITE_`) |

Update them in:

- **Local:** copy `.env.example` to `.env.local` and fill in the values. `.env.local` is
  gitignored.
- **Vercel:** Project → Settings → Environment Variables (Production +
  Preview), then **redeploy**. `VITE_*` values are baked in at build time.

Never commit real keys. `.env.example` should only ever contain placeholders.

### 5. Re-check the other integrations

These don't live in Supabase, but they write into it, so check them when you resume:

- **Stripe webhook** → `https://mursenmaintenance.com/api/stripe-webhook`,
  events `checkout.session.completed`, `customer.subscription.updated`,
  `customer.subscription.deleted`. `STRIPE_WEBHOOK_SECRET` must match.
- **Resend** (`RESEND_API_KEY`, `NOTIFY_EMAIL`) for lead notifications.

### 6. Smoke test

Submit the contact form on the site (or `POST /api/leads` with a `name` and
`email`). A row should show up in `leads`.

## Making schema changes later

Always change the schema through a migration file so the repo stays the
source of truth:

```bash
npm run db:new -- <short_name>    # creates supabase/migrations/<timestamp>_<short_name>.sql
# edit the file, then
npm run db:push
```

If you changed something in the dashboard by hand, run `npm run db:diff -- -f
<short_name>` to capture it as a migration.

## If you ever need to delete a DB that has data

Take a backup first (needs the DB password from Project Settings → Database):

```bash
npx supabase db dump --db-url "$DB_URL" -f supabase/backups/schema.sql
npx supabase db dump --db-url "$DB_URL" --data-only -f supabase/backups/data.sql
```

Store data dumps **outside git** (they contain customer PII).
