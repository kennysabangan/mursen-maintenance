import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name, email, phone, message,
    address, property_type, units,
    how_heard, preferred_date, plan_interest,
    source
  } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert({
        source: source || 'contact',
        name,
        email,
        phone: phone || null,
        message: message || null,
        address: address || null,
        property_type: property_type || null,
        units: units || null,
        how_heard: how_heard || null,
        preferred_date: preferred_date || null,
        plan_interest: plan_interest || 'complete',
        status: 'new',
      })
      .select('id')
      .single();

    if (error) throw error;

    // Fire-and-forget notification
    fetch('/api/notify-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, source: source || 'contact' }),
    }).catch(() => {});

    return res.status(200).json({ ok: true, leadId: data.id });
  } catch (error: any) {
    console.error('Lead insert error:', error);
    return res.status(500).json({ error: 'Failed to save lead' });
  }
}
