import type { VercelRequest, VercelResponse } from '@vercel/node';

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  pageUrl?: string;
  website?: string; // honeypot field
};

type N8nResponse = {
  success?: boolean;
  message?: string;
};

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const {
      name,
      email,
      subject,
      message,
      pageUrl,
      website,
    } = req.body as ContactPayload;

    /**
     * Honeypot spam protection.
     * Real users will not fill this hidden field.
     * Bots often do.
     */
    if (website) {
      return res.status(200).json({
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
      });
    }

    // Basic required field validation
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields.',
      });
    }

    // Email validation
    if (!isValidEmail(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.',
      });
    }

    const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
    const secret = process.env.N8N_CONTACT_SECRET;

    if (!webhookUrl || !secret) {
      console.error('Missing N8N_CONTACT_WEBHOOK_URL or N8N_CONTACT_SECRET');

      return res.status(500).json({
        success: false,
        message: 'Server is not configured correctly.',
      });
    }

    const payload = {
      submittedAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: '',
      company: '',
      subject: subject.trim(),
      message: message.trim(),
      pageUrl: pageUrl || '',
      source: 'Website Contact Form',
      status: 'New',
    };

    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-contact-secret': secret,
      },
      body: JSON.stringify(payload),
    });

    const result = (await n8nResponse.json().catch(() => null)) as N8nResponse | null;

    if (!n8nResponse.ok) {
      console.error('n8n webhook failed:', {
        status: n8nResponse.status,
        result,
      });

      return res.status(n8nResponse.status).json({
        success: false,
        message: result?.message || 'Could not submit the form. Please try again.',
      });
    }

    return res.status(200).json({
      success: true,
      message: result?.message || 'Thank you for your message. We will get back to you soon!',
    });
  } catch (error) {
    console.error('Contact form error:', error);

    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.',
    });
  }
}