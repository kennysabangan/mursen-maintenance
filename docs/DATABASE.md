# Database (Supabase)

## Where it lives: the shared "ScaleSolving Projects" DB

Mursen doesn't have its own Supabase project right now. Its tables live in
the shared **ScaleSolving Projects** project (ref `vnepcyensnlapkdwaslb`,
region `us-west-1`, Postgres 15), alongside other projects' tables. When
Mursen gets big enough it will move to its own project (see "Moving to a
dedicated project" below).

History: Mursen had its own project (ref `zynaxtxujsesenacifde`). It was
deleted on 2026-09-24 while every table was empty, so no data was lost. The
schema was moved into the shared DB on 2026-10-22.

### Naming rule: everything is prefixed `mursen_`

The shared DB's `public` schema already has tables from other projects,
including a generic `subscriptions` table, so Mursen's objects can't use
plain names. **Every** Mursen object starts with `mursen_`:

| Object      | Pattern                              | Example                          |
| ----------- | ------------------------------------ | -------------------------------- |
| Table       | `mursen_<name>`                      | `mursen_leads`                   |
| Index       | `idx_mursen_<table>_<column>`        | `idx_mursen_leads_status`        |
| Constraint  | `mursen_<table>_<column>_<check/fkey>` | `mursen_leads_status_check`    |
| Policy      | `mursen_<role>_<action>_<table>`     | `mursen_service_all_leads`       |
| Function / trigger (if added) | `mursen_<name>`    | `mursen_set_updated_at`          |
| Storage bucket (if added) | `mursen-<name>`        | `mursen-job-photos`              |

Never create, alter or drop anything without the prefix. Other projects'
tables (`el3vn_*`, `reducetax_*`, `orders`, `subscriptions`, ...) are not
ours to touch.

## What's in the database

| Table                  | Purpose                                  | Written by                          |
| ---------------------- | ---------------------------------------- | ----------------------------------- |
| `mursen_leads`         | Contact / quote form submissions         | `api/leads.ts`, `api/stripe-webhook.ts` |
| `mursen_customers`     | Paying customers                         | `api/stripe-webhook.ts`             |
| `mursen_subscriptions` | Maintenance plans (Stripe subscriptions) | `api/stripe-webhook.ts`             |
| `mursen_bookings`      | Assessments / service appointments       | `api/bookings.ts`                   |
| `mursen_jobs`          | Scheduled / completed maintenance work   | (not used by code yet)              |
| `mursen_email_log`     | Outbound email audit trail               | (not used by code yet)              |

Relationships: `mursen_customers.lead_id → mursen_leads`,
`mursen_subscriptions.customer_id → mursen_customers`,
`mursen_jobs.customer_id → mursen_customers`,
`mursen_jobs.subscription_id → mursen_subscriptions`,
`mursen_bookings.lead_id → mursen_leads`,
`mursen_bookings.customer_id → mursen_customers`.

The schema is in
`supabase/migrations/20261022113607_mursen_initial_schema.sql` (6 tables,
17 indexes, 19 constraints, 6 RLS policies). The version number matches the
entry in the shared DB's migration history.

**Access model:** the API routes in `api/` use the **service role key**, which
can do everything. The public **anon key** (shipped to the browser) can only
`INSERT` into `mursen_leads`. Every Mursen table has RLS enabled.
`mursen_email_log` has RLS on with no policies on purpose: only the service
role touches it (the Supabase advisor flags this as INFO; that's expected).

Because the DB is shared, the service role key used here can also read and
write **other projects' tables**. Only use it in server-side code (`api/`),
and only against `mursen_*` tables.

`supabase/drafts/estimates.sql` holds an estimates/quotes schema that was
**never applied**. It still uses unprefixed names (`estimates`, `quotes`,
...); rename everything to `mursen_*` before applying it. Its header lists
what else to fix.

## Environment variables

Get the values from the **ScaleSolving Projects** dashboard → **Project
Settings → API**.

| Variable                 | Where it's used                  | Value                                      |
| ------------------------ | -------------------------------- | ------------------------------------------ |
| `VITE_SUPABASE_URL`      | browser (`src/lib/supabase.ts`)  | `https://vnepcyensnlapkdwaslb.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | browser                          | anon / publishable key                     |
| `SUPABASE_URL`           | `api/*` serverless routes        | same URL                                   |
| `SUPABASE_SERVICE_KEY`   | `api/*` serverless routes        | service_role / secret key (**never** prefix with `VITE_`) |

Set them in:

- **Local:** copy `.env.example` to `.env.local` and fill in the keys.
  `.env.local` is gitignored.
- **Vercel:** Project → Settings → Environment Variables (Production +
  Preview), then **redeploy**. `VITE_*` values are baked in at build time.

Never commit real keys. `.env.example` should only ever contain placeholders.

Also check the integrations that write into the DB:

- **Stripe webhook** → `https://mursenmaintenance.com/api/stripe-webhook`,
  events `checkout.session.completed`, `customer.subscription.updated`,
  `customer.subscription.deleted`. `STRIPE_WEBHOOK_SECRET` must match.
- **Resend** (`RESEND_API_KEY`, `NOTIFY_EMAIL`) for lead notifications.

**Smoke test:** submit the contact form on the site (or `POST /api/leads`
with a `name` and `email`). A row should show up in `mursen_leads`.

## Making schema changes

Write each change as a new file in `supabase/migrations/` so the repo stays
the source of truth, and keep the `mursen_` prefix on every object.

**Don't run `npm run db:push` / `db:link` against the shared DB.** Its
migration history contains other projects' migrations, so the Supabase CLI
will see it as out of sync with this repo and refuse to push (or, worse,
tempt someone to "repair" it). Instead:

1. Write the SQL in a new file, e.g.
   `supabase/migrations/<YYYYMMDDHHMMSS>_mursen_<short_name>.sql`.
2. Apply it in the ScaleSolving Projects dashboard → **SQL Editor**, or with
   the Supabase MCP `apply_migration` tool using the name
   `mursen_<short_name>`.
3. If the tool assigned a different version, rename the file to match it:
   ```sql
   select version, name from supabase_migrations.schema_migrations
   where name like 'mursen_%' order by version;
   ```

Verify Mursen's objects at any time:

```sql
select tablename, rowsecurity from pg_tables
where schemaname = 'public' and tablename like 'mursen\_%';
-- expect 6 rows, all rowsecurity = true

select tablename, policyname, roles, cmd from pg_policies
where tablename like 'mursen\_%';
-- expect 6 policies: mursen_service_all_* on 5 tables + mursen_anon_insert_leads
```

## Moving to a dedicated project

When Mursen outgrows the shared DB:

1. Create a new Supabase project (e.g. **Mursen Maintenance**).
2. Apply `supabase/migrations/*` to it. Here the CLI works, because the new
   project's history is only Mursen's:
   ```bash
   npm run db:link -- --project-ref <new-project-ref>
   npm run db:push
   ```
3. Copy the data. Dump only Mursen's tables from the shared DB, then restore
   the file into the new project with `psql`:
   ```bash
   pg_dump "$SHARED_DB_URL" --data-only -t 'public.mursen_*' \
     -f supabase/backups/mursen_data.sql
   ```
4. Point the four env vars above at the new project and redeploy.
5. Once the new project is confirmed working, drop the `mursen_*` tables from
   the shared DB.

Keeping the `mursen_` prefix in the new project is fine (no code changes
needed). Dropping it means renaming the tables in a migration and updating
the `.from('mursen_...')` calls in `api/`.

## Backups

Take a backup before deleting anything that has data (needs the DB password
from Project Settings → Database). Use the `pg_dump -t 'public.mursen_*'`
command above so the dump contains only Mursen's tables. Store data dumps
**outside git** (they contain customer PII). `supabase/backups/` is
gitignored.
