import type { VercelRequest, VercelResponse } from '@vercel/node';

type NewsletterPayload = {
  email?: string;
  pageUrl?: string;
  website?: string; // honeypot
};

type N8nResponse = {
  success?: boolean;
  message?: string;
};

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const { email, pageUrl, website } = req.body as NewsletterPayload;

    // Honeypot spam protection
    if (website) {
      return res.status(200).json({
        success: true,
        message: 'Thank you for subscribing.',
      });
    }

    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please enter your email address.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.',
      });
    }

    const webhookUrl = process.env.N8N_NEWSLETTER_WEBHOOK_URL;
    const secret = process.env.N8N_NEWSLETTER_SECRET;

    if (!webhookUrl || !secret) {
      console.error('Missing N8N_NEWSLETTER_WEBHOOK_URL or N8N_NEWSLETTER_SECRET');

      return res.status(500).json({
        success: false,
        message: 'Server is not configured correctly.',
      });
    }

    const payload = {
      subscribedAt: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }),
      email: cleanEmail,
      pageUrl: pageUrl || '',
      source: 'Footer Newsletter',
      status: 'Subscribed',
    };

    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-newsletter-secret': secret,
      },
      body: JSON.stringify(payload),
    });

    const result = (await n8nResponse.json().catch(() => null)) as N8nResponse | null;

    if (!n8nResponse.ok) {
      console.error('n8n newsletter webhook failed:', {
        status: n8nResponse.status,
        result,
      });

      return res.status(n8nResponse.status).json({
        success: false,
        message: result?.message || 'Could not subscribe. Please try again.',
      });
    }

    return res.status(200).json({
      success: true,
      message: result?.message || 'Thank you for subscribing.',
    });
  } catch (error) {
    console.error('Newsletter form error:', error);

    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.',
    });
  }
}