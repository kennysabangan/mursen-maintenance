-- ============================================
-- Mursen Maintenance: initial schema
-- ============================================
-- Snapshot of the production Supabase project (ref zynaxtxujsesenacifde)
-- taken on 2026-09-24, right before it was deleted while the project was
-- paused. All tables were empty at that time, so there is no data to restore.
--
-- Differences from production (intentional):
--   * RLS is enabled on email_log (it was disabled in prod, which exposed it
--     to the anon key). Only the service role touches it, and the service
--     role bypasses RLS, so nothing breaks.
--
-- Used by:
--   api/leads.ts          -> leads
--   api/bookings.ts       -> bookings
--   api/stripe-webhook.ts -> customers, subscriptions, leads
--   (jobs, email_log are not used by code yet)

-- --------------------------------------------
-- leads: contact / quote form submissions
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS public.leads (
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
    CONSTRAINT leads_status_check
    CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  notes TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads (source);
CREATE INDEX IF NOT EXISTS idx_leads_created ON public.leads (created_at DESC);

-- --------------------------------------------
-- customers: paying customers (created by Stripe webhook)
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID CONSTRAINT customers_lead_id_fkey REFERENCES public.leads(id),
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

CREATE INDEX IF NOT EXISTS idx_customers_email ON public.customers (email);

-- --------------------------------------------
-- subscriptions: maintenance plans (Stripe subscriptions)
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID CONSTRAINT subscriptions_customer_id_fkey REFERENCES public.customers(id),
  plan TEXT NOT NULL
    CONSTRAINT subscriptions_plan_check
    CHECK (plan IN ('essential', 'complete', 'premium')),
  amount_cents INTEGER NOT NULL,
  status TEXT DEFAULT 'active'
    CONSTRAINT subscriptions_status_check
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

CREATE INDEX IF NOT EXISTS idx_subscriptions_customer ON public.subscriptions (customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions (status);

-- --------------------------------------------
-- jobs: scheduled / completed maintenance work
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID CONSTRAINT jobs_customer_id_fkey REFERENCES public.customers(id),
  subscription_id UUID CONSTRAINT jobs_subscription_id_fkey REFERENCES public.subscriptions(id),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'scheduled'
    CONSTRAINT jobs_status_check
    CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  priority TEXT DEFAULT 'normal'
    CONSTRAINT jobs_priority_check
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

CREATE INDEX IF NOT EXISTS idx_jobs_customer ON public.jobs (customer_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON public.jobs (status);
CREATE INDEX IF NOT EXISTS idx_jobs_scheduled ON public.jobs (scheduled_date);

-- --------------------------------------------
-- bookings: assessments / service appointments
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID CONSTRAINT bookings_lead_id_fkey REFERENCES public.leads(id),
  customer_id UUID CONSTRAINT bookings_customer_id_fkey REFERENCES public.customers(id),
  booking_type TEXT NOT NULL DEFAULT 'assessment'
    CONSTRAINT bookings_booking_type_check
    CHECK (booking_type IN ('assessment', 'service', 'consultation')),
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT DEFAULT 'pending'
    CONSTRAINT bookings_status_check
    CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  address TEXT,
  notes TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_scheduled ON public.bookings (scheduled_at);

-- --------------------------------------------
-- email_log: outbound email audit trail
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS public.email_log (
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
-- may do is insert a lead.
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY service_all_leads ON public.leads
  FOR ALL TO service_role USING (true);
CREATE POLICY anon_insert_leads ON public.leads
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY service_all_customers ON public.customers
  FOR ALL TO service_role USING (true);

CREATE POLICY service_all_subscriptions ON public.subscriptions
  FOR ALL TO service_role USING (true);

CREATE POLICY service_all_jobs ON public.jobs
  FOR ALL TO service_role USING (true);

CREATE POLICY service_all_bookings ON public.bookings
  FOR ALL TO service_role USING (true);
