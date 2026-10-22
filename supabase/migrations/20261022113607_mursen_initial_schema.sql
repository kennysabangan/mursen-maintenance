-- ============================================
-- Mursen Maintenance: initial schema (shared DB)
-- ============================================
-- Applied to the shared "ScaleSolving Projects" Supabase project
-- (ref vnepcyensnlapkdwaslb). Other projects live in the same `public`
-- schema, so every Mursen object is prefixed with `mursen_`: tables,
-- indexes, constraints and policies. Keep that prefix on anything new.
--
-- Same structure as the old dedicated project (ref zynaxtxujsesenacifde,
-- deleted 2026-09-24 while empty), with only the names changed. RLS is
-- enabled on mursen_email_log (it was disabled in the old project).
--
-- Used by:
--   api/leads.ts          -> mursen_leads
--   api/bookings.ts       -> mursen_bookings
--   api/stripe-webhook.ts -> mursen_customers, mursen_subscriptions, mursen_leads
--   (mursen_jobs, mursen_email_log are not used by code yet)

-- --------------------------------------------
-- mursen_leads: contact / quote form submissions
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS public.mursen_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL DEFAULT 'contact',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  address TEXT,
  property_type TEXT,
  units TEXT,
  how_heard TEXT,
  preferred_date TIMESTAMPTZ,
  plan_interest TEXT DEFAULT 'complete',
  status TEXT DEFAULT 'new'
    CONSTRAINT mursen_leads_status_check
    CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  notes TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mursen_leads_status ON public.mursen_leads (status);
CREATE INDEX IF NOT EXISTS idx_mursen_leads_source ON public.mursen_leads (source);
CREATE INDEX IF NOT EXISTS idx_mursen_leads_created ON public.mursen_leads (created_at DESC);

-- --------------------------------------------
-- mursen_customers: paying customers (created by Stripe webhook)
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS public.mursen_customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID CONSTRAINT mursen_customers_lead_id_fkey REFERENCES public.mursen_leads(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  property_type TEXT,
  notes TEXT,
  stripe_customer_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mursen_customers_email ON public.mursen_customers (email);

-- --------------------------------------------
-- mursen_subscriptions: maintenance plans (Stripe subscriptions)
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS public.mursen_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID CONSTRAINT mursen_subscriptions_customer_id_fkey REFERENCES public.mursen_customers(id),
  plan TEXT NOT NULL
    CONSTRAINT mursen_subscriptions_plan_check
    CHECK (plan IN ('essential', 'complete', 'premium')),
  amount_cents INTEGER NOT NULL,
  status TEXT DEFAULT 'active'
    CONSTRAINT mursen_subscriptions_status_check
    CHECK (status IN ('active', 'paused', 'cancelled', 'past_due')),
  stripe_subscription_id TEXT,
  stripe_price_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mursen_subscriptions_customer ON public.mursen_subscriptions (customer_id);
CREATE INDEX IF NOT EXISTS idx_mursen_subscriptions_status ON public.mursen_subscriptions (status);

-- --------------------------------------------
-- mursen_jobs: scheduled / completed maintenance work
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS public.mursen_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID CONSTRAINT mursen_jobs_customer_id_fkey REFERENCES public.mursen_customers(id),
  subscription_id UUID CONSTRAINT mursen_jobs_subscription_id_fkey REFERENCES public.mursen_subscriptions(id),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'scheduled'
    CONSTRAINT mursen_jobs_status_check
    CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  priority TEXT DEFAULT 'normal'
    CONSTRAINT mursen_jobs_priority_check
    CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  scheduled_date TIMESTAMPTZ,
  completed_date TIMESTAMPTZ,
  assigned_to TEXT,
  notes TEXT,
  photo_urls TEXT[],
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mursen_jobs_customer ON public.mursen_jobs (customer_id);
CREATE INDEX IF NOT EXISTS idx_mursen_jobs_status ON public.mursen_jobs (status);
CREATE INDEX IF NOT EXISTS idx_mursen_jobs_scheduled ON public.mursen_jobs (scheduled_date);

-- --------------------------------------------
-- mursen_bookings: assessments / service appointments
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS public.mursen_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID CONSTRAINT mursen_bookings_lead_id_fkey REFERENCES public.mursen_leads(id),
  customer_id UUID CONSTRAINT mursen_bookings_customer_id_fkey REFERENCES public.mursen_customers(id),
  booking_type TEXT NOT NULL DEFAULT 'assessment'
    CONSTRAINT mursen_bookings_booking_type_check
    CHECK (booking_type IN ('assessment', 'service', 'consultation')),
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT DEFAULT 'pending'
    CONSTRAINT mursen_bookings_status_check
    CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  address TEXT,
  notes TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mursen_bookings_status ON public.mursen_bookings (status);
CREATE INDEX IF NOT EXISTS idx_mursen_bookings_scheduled ON public.mursen_bookings (scheduled_at);

-- --------------------------------------------
-- mursen_email_log: outbound email audit trail
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS public.mursen_email_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient TEXT NOT NULL,
  template TEXT,
  subject TEXT,
  status TEXT DEFAULT 'queued',
  error TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- --------------------------------------------
-- Row Level Security
-- --------------------------------------------
-- API routes use the service role key. The only thing the public anon key
-- may do is insert a Mursen lead.
ALTER TABLE public.mursen_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mursen_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mursen_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mursen_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mursen_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mursen_email_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY mursen_service_all_leads ON public.mursen_leads
  FOR ALL TO service_role USING (true);
CREATE POLICY mursen_anon_insert_leads ON public.mursen_leads
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY mursen_service_all_customers ON public.mursen_customers
  FOR ALL TO service_role USING (true);

CREATE POLICY mursen_service_all_subscriptions ON public.mursen_subscriptions
  FOR ALL TO service_role USING (true);

CREATE POLICY mursen_service_all_jobs ON public.mursen_jobs
  FOR ALL TO service_role USING (true);

CREATE POLICY mursen_service_all_bookings ON public.mursen_bookings
  FOR ALL TO service_role USING (true);
