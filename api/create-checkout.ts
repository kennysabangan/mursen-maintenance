import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const PLAN_PRICES: Record<string, { priceId: string; amount: number }> = {
  essential: { priceId: process.env.STRIPE_PRICE_ESSENTIAL!, amount: 14900 },
  complete: { priceId: process.env.STRIPE_PRICE_COMPLETE!, amount: 24900 },
  premium: { priceId: process.env.STRIPE_PRICE_PREMIUM!, amount: 39900 },
};

const SITE_URL = process.env.SITE_URL || 'https://mursenmaintenance.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { plan, customerEmail, customerName, leadId } = req.body;

  if (!plan || !PLAN_PRICES[plan]) {
    return res.status(400).json({ error: 'Invalid plan' });
  }

  if (!customerEmail) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const planConfig = PLAN_PRICES[plan];

  try {
    // Create or find Stripe customer
    const existingCustomers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    });

    let customerId: string;
    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        metadata: { lead_id: leadId || '' },
      });
      customerId = customer.id;
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [
        {
          price: planConfig.priceId,
          quantity: 1,
        },
      ],
      success_url: `${SITE_URL}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/pricing?canceled=true`,
      metadata: {
        plan,
        lead_id: leadId || '',
        customer_email: customerEmail,
      },
      subscription_data: {
        metadata: {
          plan,
          lead_id: leadId || '',
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      automatic_tax: { enabled: true },
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
