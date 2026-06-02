import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'] as string;
  const rawBody = await getRawBody(req);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature failed:', err.message);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const { plan, lead_id, customer_email } = session.metadata || {};

        // Find or create customer in our DB
        const { data: existingCustomer } = await supabase
          .from('customers')
          .select('id')
          .eq('email', customer_email)
          .maybeSingle();

        let customerId = existingCustomer?.id;

        if (!customerId) {
          const { data: newCustomer } = await supabase
            .from('customers')
            .insert({
              lead_id: lead_id || null,
              name: session.customer_details?.name || customer_email,
              email: customer_email,
              phone: session.customer_details?.phone || null,
              stripe_customer_id: session.customer as string,
            })
            .select('id')
            .single();
          customerId = newCustomer?.id;
        }

        // Create subscription record
        if (customerId) {
          await supabase.from('subscriptions').insert({
            customer_id: customerId,
            plan: plan || 'complete',
            amount_cents: session.amount_total || 0,
            status: 'active',
            stripe_subscription_id: session.subscription as string,
          });
        }

        // Update lead status
        if (lead_id) {
          await supabase
            .from('leads')
            .update({ status: 'converted', updated_at: new Date().toISOString() })
            .eq('id', lead_id);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const { plan } = subscription.metadata;

        await supabase
          .from('subscriptions')
          .update({
            status: subscription.status === 'active' ? 'active' : subscription.status,
            current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
            current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          })
          .eq('stripe_subscription_id', subscription.id);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await supabase
          .from('subscriptions')
          .update({ status: 'cancelled' })
          .eq('stripe_subscription_id', subscription.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return res.status(500).json({ error: 'Webhook handler failed' });
  }
}
