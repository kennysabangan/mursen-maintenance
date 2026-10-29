import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

/**
 * Every public form (contact, instant quote, assessment booking) posts here.
 *
 * Each lead is emailed to the business straight away, and also saved to the
 * database when SUPABASE_URL and SUPABASE_SERVICE_KEY are both set. Either one
 * succeeding counts as success, so the forms keep working while the database
 * isn't configured (see docs/DATABASE.md).
 */

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'hello@mursenmaintenance.com';
// mursenmaintenance.com isn't verified with Resend, so alerts are sent from
// ScaleSolving's verified domain, with Reply-To set to the customer.
const FROM_EMAIL = process.env.LEAD_EMAIL_FROM || 'Mursen Maintenance Website <website@scalesolving.com>';
const BCC_EMAIL = process.env.LEAD_EMAIL_BCC;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = 5000;

const FIELDS: [key: string, label: string][] = [
  ['name', 'Name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['address', 'Address'],
  ['property_type', 'Property type'],
  ['units', 'Units'],
  ['preferred_date', 'Preferred date/time'],
  ['how_heard', 'How they heard about us'],
  ['plan_interest', 'Plan interest'],
  ['message', 'Message'],
];

const SOURCE_LABELS: Record<string, string> = {
  contact: 'Contact form',
  'instant-quote': 'Instant quote',
  assessment: 'Assessment booking',
};

const clean = (value: unknown) =>
  value === undefined || value === null || value === '' ? null : String(value).trim().slice(0, MAX_LEN) || null;

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Strip line breaks so a name can't inject extra email headers via the subject.
const oneLine = (text: string) => text.replace(/[\r\n]+/g, ' ');

type Lead = Record<string, string | null>;

const sendEmail = async (lead: Lead, source: string) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is not set');

  const rows = FIELDS.filter(([key]) => lead[key]).map(([key, label]) => [label, lead[key] as string]);
  const when = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  const sourceLabel = SOURCE_LABELS[source] || source;

  const { error } = await new Resend(apiKey).emails.send({
    from: FROM_EMAIL,
    to: [NOTIFY_EMAIL],
    ...(BCC_EMAIL ? { bcc: [BCC_EMAIL] } : {}),
    replyTo: lead.email as string,
    subject: oneLine(`New lead: ${lead.name} (${sourceLabel})`),
    text: [
      ...rows.map(([label, value]) => `${label}: ${value}`),
      `Form: ${sourceLabel}`,
      `Received: ${when} ET`,
    ].join('\n'),
    html: `
      <h2 style="margin:0 0 12px">New lead from the website</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="color:#555;vertical-align:top"><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`,
          )
          .join('')}
        <tr><td style="color:#555"><strong>Form</strong></td><td>${escapeHtml(sourceLabel)}</td></tr>
        <tr><td style="color:#555"><strong>Received</strong></td><td>${escapeHtml(when)} ET</td></tr>
      </table>
      <p style="color:#555">Reply to this email to answer the customer directly.</p>
    `,
  });
  if (error) throw new Error(`Resend: ${error.message}`);
};

const saveToDatabase = async (lead: Lead, source: string) => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error('Supabase is not configured');

  const { error } = await createClient(url, key)
    .from('mursen_leads')
    .insert({
      source,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: lead.message,
      address: lead.address,
      property_type: lead.property_type,
      units: lead.units,
      how_heard: lead.how_heard,
      preferred_date: lead.preferred_date,
      plan_interest: lead.plan_interest || 'complete',
      status: 'new',
    });
  if (error) throw error;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<string, unknown>;
  const lead: Lead = Object.fromEntries(FIELDS.map(([key]) => [key, clean(body[key])]));
  const source = clean(body.source) || 'contact';

  if (!lead.name || !lead.email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  if (!EMAIL_RE.test(lead.email)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  const [emailed, saved] = await Promise.allSettled([sendEmail(lead, source), saveToDatabase(lead, source)]);
  if (emailed.status === 'rejected') console.error('Lead email failed:', emailed.reason);
  if (saved.status === 'rejected') console.warn('Lead not saved to database:', saved.reason);

  if (emailed.status === 'fulfilled' || saved.status === 'fulfilled') {
    return res.status(200).json({ ok: true });
  }
  return res.status(500).json({ error: 'Failed to send lead' });
}
