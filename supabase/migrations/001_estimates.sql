-- ============================================
-- Mursen Maintenance: Estimates & Quotes
-- ============================================

-- Estimates table
CREATE TABLE IF NOT EXISTS estimates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address TEXT NOT NULL,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  property_data JSONB DEFAULT '{}'::jsonb,
  notes TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'quoted', 'converted', 'expired')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Estimate line items
CREATE TABLE IF NOT EXISTS estimate_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estimate_id UUID NOT NULL REFERENCES estimates(id) ON DELETE CASCADE,
  service TEXT NOT NULL,
  sqft NUMERIC,
  rate NUMERIC,
  amount NUMERIC NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Quotes generated from estimates
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estimate_id UUID NOT NULL REFERENCES estimates(id) ON DELETE SET NULL,
  customer_id UUID,
  quote_number SERIAL UNIQUE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'declined', 'expired')),
  subtotal NUMERIC NOT NULL DEFAULT 0,
  tax NUMERIC DEFAULT 0,
  total NUMERIC NOT NULL DEFAULT 0,
  valid_until DATE DEFAULT (now() + INTERVAL '30 days'),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_estimates_status ON estimates(status);
CREATE INDEX idx_estimates_created ON estimates(created_at DESC);
CREATE INDEX idx_estimate_items_estimate ON estimate_items(estimate_id);
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_quotes_customer ON quotes(customer_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER estimates_updated_at
  BEFORE UPDATE ON estimates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE estimate_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Admin-only policies (adjust role as needed)
CREATE POLICY "Admin can manage estimates"
  ON estimates FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage estimate_items"
  ON estimate_items FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage quotes"
  ON quotes FOR ALL
  USING (auth.role() = 'authenticated');
