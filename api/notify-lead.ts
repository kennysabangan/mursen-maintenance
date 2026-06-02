import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'hello@mursenmaintenance.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, source } = req.body;

  try {
    await resend.emails.send({
      from: 'Mursen Alerts <alerts@mursenmaintenance.com>',
      to: [NOTIFY_EMAIL],
      subject: `🔔 New Lead: ${name} (${source})`,
      html: `
        <h2>New Lead Alert</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Source:</strong> ${source}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
        <hr/>
        <p>Check the CRM for full details.</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send notification' });
  }
}
