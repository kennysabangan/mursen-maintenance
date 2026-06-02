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
    lead_id,
    customer_id,
    booking_type,
    scheduled_at,
    duration_minutes,
    address,
    notes,
  } = req.body;

  if (!scheduled_at) {
    return res.status(400).json({ error: 'scheduled_at is required' });
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        lead_id: lead_id || null,
        customer_id: customer_id || null,
        booking_type: booking_type || 'assessment',
        scheduled_at,
        duration_minutes: duration_minutes || 60,
        address: address || null,
        notes: notes || null,
        status: 'pending',
      })
      .select('*')
      .single();

    if (error) throw error;

    return res.status(200).json({ ok: true, booking: data });
  } catch (error: any) {
    console.error('Booking error:', error);
    return res.status(500).json({ error: 'Failed to create booking' });
  }
}
